import { Box, Flex, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { GithubIcon } from 'icons/GithubIcon';
import { GnosisChainIcon } from 'icons/GnosisChainIcon';
import { OmniBridgeIcon } from 'icons/OmniBridgeIcon';
import BahamasIcon from 'assets/bahamas_icon.png';
import { RaidGuildIcon } from 'icons/RaidGuildIcon';
import { TelegramIcon } from 'icons/TelegramIcon';
import { TwitterIcon } from 'icons/TwitterIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
} from '@chakra-ui/react';

export const Footer = () => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      position="relative"
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      h={20}
      maxW="75rem"
      px={8}
      w="100%"
      color="grey"
    >
      {!smallScreen && (
        <Link to="/" display={{ base: 'none', sm: 'block' }}>
          <Flex
            justify="space-around"
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            {/* <OmniBridgeIcon w={6} /> */}
            <Image width={10} height={10} src={BahamasIcon} mr={4} />
          </Flex>
        </Link>
      )}
      <HStack spacing={4}>
        {/* <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://bahamas.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            <Image src={BahamasIcon} width={30} height={30} mb={4} />
          </a>
        </Box> */}
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://twitter.com/bahamas"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://t.me/bahamas"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TelegramIcon />
          </a>
        </Box>
        {/* <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://github.com/bahamas"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </Box> */}
        {/* <Box w="1px" h={5} background="grey" />
        <a
          href="https://bahamas.com"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Flex
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <Text>Built by</Text>
            <RaidGuildIcon boxSize={16} ml={2} />
          </Flex>
        </a> */}
      </HStack>
    </Flex>
  );
};
