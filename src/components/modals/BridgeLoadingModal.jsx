import { CheckIcon } from '@chakra-ui/icons';
import {
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  ModalFooter,
  ModalHeader,
  Button,
  ModalCloseButton,

} from '@chakra-ui/react';
import ClaimTokensImage from 'assets/multiple-claim.svg';
import LoadingImage from 'assets/loading.svg';
import Logo from 'assets/bahamas_logo.png';
import { ProgressRing } from 'components/common/ProgressRing';
import { ClaimTokensModal } from 'components/modals/ClaimTokensModal';
import { ClaimTransferModal } from 'components/modals/ClaimTransferModal';
import { NeedsConfirmationModal } from 'components/modals/NeedsConfirmationModal';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useSettings } from 'contexts/SettingsContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useTransactionStatus } from 'hooks/useTransactionStatus';
import { getAccountString } from 'lib/helpers';
import { LOCAL_STORAGE_KEYS } from 'lib/constants';
import React, { useEffect, useState } from 'react';
import { fetchToToken } from 'lib/bridge';
import { useCopyToClipboard } from 'hooks/useCopyToClipboard';

const { DONT_SHOW_CLAIMS } = LOCAL_STORAGE_KEYS;

const getTransactionString = hash => {
  if (!hash) return 'here';
  const len = hash.length;
  return `${hash.substr(0, 6)}...${hash.substr(len - 4, len - 1)}`;
};

const Success = ({
  isOpen,
  fetching,
  toToken,
  setOpenDlg,
  handleCopy,
  copied,
  setComplete
}) => {
  let value = 'None';
  if (fetching) {
    value = 'Waiting...'
  } else if (toToken) {
    value = toToken.address;
  }
  return (
    <Modal
      isOpen
      isCentered
      closeOnEsc
      closeOnOverlayClick
    >
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius={{ base: '1rem', md: 'full' }}
          mx={{ base: 12, lg: 0 }}
          maxW={{ base: '20rem', md: '35rem' }}
        >
          <ModalBody px={4} py={8}>
            <Flex
              align={{ base: 'center', md: 'stretch' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Flex
                h="3.25rem"
                w="3.25rem"
                align="center"
                justify="center"
                border="5px solid #eef4fd"
                borderRadius="50%"
                mx={4}
                mb={{ base: 2, md: 0 }}
                position="relative"
              >
                <>
                  <CheckIcon color="blue.500" boxSize="0.85rem" />
                  <Spinner
                    position="absolute"
                    color="blue.500"
                    thickness="5px"
                    w="3.25rem"
                    h="3.25rem"
                    speed="0.5s"
                  />
                </>
              </Flex>
              <Flex
                flex={1}
                direction="column"
                align={{ base: 'center', md: 'flex-start' }}
                justify="center"
                mt={{ base: 2, md: 0 }}
              >
                <Text textAlign="center">
                  {'Success '}
                </Text>
                {fetching ? 'Waiting...' :
                  <>
                    <Text color="grey" textAlign="center">
                      {'Copy briged token address by clicking... '}
                    </Text>
                    <Tooltip
                      label={copied ? 'Copied!' : 'Copy to clipboard'}
                      closeOnClick={false}
                    >
                      <Button
                        size="xs"
                        fontSize="md"
                        onClick={() =>
                          handleCopy(toToken?.address.toLowerCase())
                        }
                        variant="ghost"
                      >
                        {
                          toToken ? getAccountString(toToken.address) : 'None'
                        }
                      </Button>
                    </Tooltip>
                  </>
                }
              </Flex>

              <Flex
                align={{ base: 'stretch', md: 'center' }}>
                <Button px={12}
                  onClick={() => {
                    setOpenDlg(false);
                    setComplete(false);
                  }}
                  align='right'
                  background="background"
                  _hover={{ background: '#bfd3f2' }}
                  color="#687D9D" >
                  Close
                </Button>

              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay >
    </Modal >
  );
}

const BridgeLoader = ({
  loading,
  loadingText,
  txHash,
  confirmations,
  totalConfirms,
  getMonitorUrl,
  chainId,
}) => {
  const showConfirmations = confirmations < totalConfirms;
  const displayConfirms = showConfirmations ? confirmations : totalConfirms;

  return (
    <Modal
      isOpen={loading}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay background="modalBG">
        {loadingText ? (
          <ModalContent
            boxShadow="0px 1rem 2rem #617492"
            borderRadius={{ base: '1rem', md: 'full' }}
            mx={{ base: 12, lg: 0 }}
            maxW={{ base: '20rem', md: '25rem' }}
          >
            <ModalBody px={4} py={8}>
              <Flex
                align={{ base: 'center', md: 'stretch' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Flex
                  h="3.25rem"
                  w="3.25rem"
                  align="center"
                  justify="center"
                  border="5px solid #eef4fd"
                  borderRadius="50%"
                  mx={4}
                  mb={{ base: 2, md: 0 }}
                  position="relative"
                >
                  {showConfirmations ? (
                    <>
                      <Text fontSize="sm">
                        {displayConfirms}/{totalConfirms}
                      </Text>
                      <Flex
                        position="absolute"
                        justify="center"
                        align="center"
                        color="blue.500"
                      >
                        <ProgressRing
                          radius={33.5}
                          stroke={5}
                          progress={displayConfirms}
                          totalProgress={totalConfirms}
                        />
                      </Flex>
                    </>
                  ) : (
                    <>
                      <CheckIcon color="blue.500" boxSize="0.85rem" />
                      <Spinner
                        position="absolute"
                        color="blue.500"
                        thickness="5px"
                        w="3.25rem"
                        h="3.25rem"
                        speed="0.5s"
                      />
                    </>
                  )}
                </Flex>
                <Flex
                  flex={1}
                  direction="column"
                  align={{ base: 'center', md: 'flex-start' }}
                  justify="center"
                  mt={{ base: 2, md: 0 }}
                >
                  <Text textAlign="center">
                    {`${loadingText || 'Waiting for Block Confirmations'}...`}
                  </Text>
                  <Text color="grey" textAlign="center">
                    {'Monitor at ALM '}
                    <Link
                      href={getMonitorUrl(chainId, txHash)}
                      rel="noreferrer noopener"
                      target="_blank"
                      color="blue.500"
                    >
                      {getTransactionString(txHash)}
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        ) : (
          <ModalContent background="none" boxShadow="none" borderRadius="0">
            <Flex direction="column" align="center" justify="center">
              <Image src={Logo} width={30} height={30} mb={4} />
              <Text color="white" fontWeight="bold">
                Loading ...
              </Text>
            </Flex>
          </ModalContent>
        )}
      </ModalOverlay>
    </Modal>
  );
};

export const BridgeLoadingModal = () => {
  const { account, providerChainId: chainId } = useWeb3Context();
  const { getMonitorUrl, homeChainId, foreignChainId, getTotalConfirms, bridgeDirection, getBridgeChainId } =
    useBridgeDirection();
  const { fromToken, loading, txHash } = useBridgeContext();
  const totalConfirms = getTotalConfirms(chainId);
  const [message, setMessage] = useState();
  const [fetching, setFetching] = useState(true);
  const [toToken, setToToken] = useState();
  const [copied, handleCopy] = useCopyToClipboard();

  const {
    loadingText,
    needsConfirmation,
    setNeedsConfirmation,
    confirmations,
    complete,
    setComplete
  } = useTransactionStatus(setMessage);
  const { neverShowClaims, needsSaving } = useSettings();
  const [isOpenDlg, setOpenDlg] = useState(false);

  useEffect(() => {
    if (chainId === homeChainId) {
      setMessage();
    }
  }, [chainId, homeChainId]);

  useEffect(async () => {
    if (complete && !loading) {
      setFetching(true);
      setOpenDlg(true);
      setToToken(await fetchToToken(bridgeDirection, fromToken, getBridgeChainId(fromToken.chainId)));
      console.log("HHHHHHHH Complete : ", fromToken, toToken);
      setFetching(false);
    }
  }, [complete, loading]);

  useEffect(() => {
    window.localStorage.setItem(DONT_SHOW_CLAIMS, 'false');
  }, [account, chainId]);

  const txNeedsClaiming =
    !!message && !!txHash && !loading && chainId === foreignChainId;

  const claimTransfer = () =>
    txNeedsClaiming ? (
      <ClaimTransferModal message={message} setMessage={setMessage} />
    ) : null;

  const claimAllTokens = () =>
    txNeedsClaiming ||
      neverShowClaims ||
      needsSaving ||
      loading ||
      needsConfirmation ? null : (
      <ClaimTokensModal />
    );

  const completeDlg = () =>
    isOpenDlg ?
      (
        <Success
          isOpen
          toToken={toToken}
          fetching={fetching}
          setOpenDlg={setOpenDlg}
          handleCopy={handleCopy}
          copied={copied}
          setComplete={setComplete}
        />
      )
      : null;


  const loader = () =>
    needsConfirmation ? (
      <NeedsConfirmationModal
        setNeedsConfirmation={setNeedsConfirmation}
        setMessage={setMessage}
      />
    ) : (
      <BridgeLoader
        loadingText={loadingText}
        loading={loading || !fromToken}
        confirmations={confirmations}
        totalConfirms={totalConfirms}
        chainId={chainId}
        getMonitorUrl={getMonitorUrl}
        txHash={txHash}
      />
    );

  return (
    <>
      {/* <Button
        onClick={() => { setOpenDlg(true) }}
      >Open Modal</Button> */}
      {completeDlg()}
      {claimTransfer()}
      {claimAllTokens()}
      {loader()}
    </>
  );
};
