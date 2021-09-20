import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import TokenItem from './TokenItem';
import EthTokenItem from './EthTokenItem';

interface TokenListProps {
  tokens: any;
  ethBalance: string;
  ethPrice: number;
}

const TokenList = ({ tokens, ethBalance, ethPrice }: TokenListProps) => (
  <Flex 
    direction='column' 
    p='10px'
    borderRadius='10px'
    boxShadow='rgba(0, 0, 0, 0.1) 0px 5px 10px'
    maxW='600px'
    minW='600px'
    m='auto'
    bg='white'
  >
    <EthTokenItem amount={ethBalance} price={ethPrice} />
    {tokens?.map((token: any) => (
      <TokenItem token={token} key={token.tokenInfo.address} />
    ))}
  </Flex>
)

export default TokenList;