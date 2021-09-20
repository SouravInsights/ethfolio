import React from "react";
import { Flex, Stack, VStack, Image, Text } from '@chakra-ui/react'
import { dollarFormatter } from '../../utils/general'

interface EthTokenProps {
  price?: any,
  amount?: string,
}

const EthTokenIcon = () => (
  <Flex w='40px' h='40px' borderRadius='50%' mr='8px' boxShadow='rgba(0, 0, 0, 0.1) 0px 5px 10px'>
    <Image w='40px' h='40px' borderRadius='50%' src='https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png' alt='Token Icon' />
  </Flex>
)

const EthTokenItem = ({ price, amount }: EthTokenProps) => {
  const tokenTotalValue = dollarFormatter.format(price * Number(amount));
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
        <EthTokenIcon />
        <Flex direction='column' alignItems='flex-start'>
          <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>ETH</Text>
          <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>Ethereum</Text>
        </Flex>
      </Stack>
      <Flex direction='column' alignItems='flex-end'>
        <Text fontSize='xl' fontWeight='semibold' color='blackAlpha.900'>{amount}</Text>
        <Text fontSize='xl' fontWeight='normal' color='blackAlpha.900'>{tokenTotalValue}</Text>
      </Flex>
    </Flex>
  )
}

export default EthTokenItem;