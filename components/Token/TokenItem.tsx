import React from "react";
import { Flex, Stack, VStack, Image, Text } from '@chakra-ui/react'

interface TokenProps {
  address?: string,
  token?: any,
}

const TokenIcon = ({ address }: TokenProps) => (
  <Flex w='40px' h='40px' borderRadius='50%' mr='8px' boxShadow='rgba(0, 0, 0, 0.1) 0px 5px 10px'>
    <Image w='40px' h='40px' borderRadius='50%' src={`https://assets.trustwalletapp.com/blockchains/ethereum/assets/${address}/logo.png`} alt='Token Icon' w='40px' h='40px' />
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
    >
      <Stack direction='row' alignItems='center'>
        <TokenIcon address={address} />
        <Flex direction='column' alignItems='flex-start'>
          <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>{symbol}</Text>
          <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>{name}</Text>
        </Flex>
      </Stack>
      <Flex direction='column' alignItems='flex-end'>
        <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>amount</Text>
        <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>value</Text>
      </Flex>
    </Flex>
  )
}

export default TokenItem;