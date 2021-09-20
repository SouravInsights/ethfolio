import React from "react";
import { Flex, Stack, VStack, Image, Text } from '@chakra-ui/react';
import { valueFormatter, dollarFormatter } from '../../utils/general';

interface TokenProps {
  address?: string,
  token?: any,
}

const TokenIcon = ({ address }: TokenProps) => (
  <Flex w='40px' h='40px' borderRadius='50%' mr='8px' boxShadow='rgba(0, 0, 0, 0.1) 0px 5px 10px'>
    <Image w='40px' h='40px' borderRadius='50%' src={`https://assets.trustwalletapp.com/blockchains/ethereum/assets/${address}/logo.png`} alt='Token Icon' />
  </Flex>
)

const TokenItem = ({ token }: TokenProps) => {
  const {
    tokenInfo: {
      symbol,
      name,
      decimals,
      price,
      address,
    },
    balance,
  } = token;

  const tokenAmount = valueFormatter(balance / Math.pow(10, decimals), 3);
  const tokenPrice = price.rate;
  const tokenTotalValue = dollarFormatter.format(tokenAmount * tokenPrice);
  const openTokenLink = () => {
    window.open(`https://info.uniswap.org/token/${address}`, "_blank");
  };
  return (
    <Flex 
      alignItems='center' 
      justify='space-between'
      p='16px' 
      borderRadius='10px'
      _hover={{ bg: '#F5F7FA'}}
      transition='bg 200ms ease'
      cursor='pointer'
      m='5px'
      textAlign='left'
      onClick={openTokenLink}
    >
      <Stack direction='row' alignItems='center'>
        <TokenIcon address={address} />
        <Flex direction='column' alignItems='flex-start'>
          <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>{symbol}</Text>
          <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>{name}</Text>
        </Flex>
      </Stack>
      <Flex direction='column' alignItems='flex-end'>
        <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>{tokenAmount}</Text>
        <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>{tokenTotalValue}</Text>
      </Flex>
    </Flex>
  )
}

export default TokenItem;