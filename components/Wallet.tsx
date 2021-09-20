import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { ethers } from 'ethers';
import { getERC20Tokens } from '../utils/getTokens'
import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import TokenList from './Token/TokenList';

const Wallet: React.FC = ({ walletParam }: any) => {
  const [walletId, setWalletId] = useState<string>("");
  const [ensAddress, setEnsAddress] = useState<string>();
  const [ethBalance, setEthBalance] = useState<string>("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [tokens, setTokens] = useState<Array<object>>();

  useEffect(() => {
    const getWeb3 = async () => {
      let addressParam;
      const provider = new ethers.providers.InfuraProvider(
        1,
        process.env.INFURA_PROJECT_ID
      );
      if (walletParam?.length === 42) {
        setWalletId(walletParam);
        addressParam = walletParam;
        const ensAddr = await provider.lookupAddress(addressParam);
        setEnsAddress(ensAddr);
      } else {
        addressParam = walletParam + ".eth";
        const walletAddress = await provider.resolveName(addressParam);
        setWalletId(walletAddress);
        setEnsAddress(addressParam);
      }
    };
    getWeb3();
  }, [walletParam]);

  useEffect(() => {
    const getERC20s = async (wId: string) => {
      const [eth, tokens] = await getERC20Tokens(wId);
      setEthPrice(eth.price.rate);
      setEthBalance(Number(eth.balance).toFixed(5).toString());
      setTokens(tokens);
    };
    if (walletId) {
      getERC20s(walletId);
    }
  }, [walletId]);


  return (
    <Box py='36'>
      <Head>
        <title>{ensAddress || "ethfolio"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:title" content={ensAddress || "ethfolio"} />
        <meta property="og:title" content={ensAddress || "ethfolio"} />
      </Head>
      <Flex py={6} px='24' justify='center' align='center' direction='column'>
        <Text fontSize='4xl' fontWeight='bold'>
          Work is still in progress. 
        </Text>
        <Text fontSize='2xl' fontWeight='medium' align='center'>
          The ethereum balance of&nbsp;
          <Text as='span' color='blackAlpha.700'>{ensAddress}</Text>
          &nbsp;is <Text as='span' color='blackAlpha.700'>{ethBalance}</Text>.
        </Text>
        <Text fontSize='2xl' fontWeight='medium' align='center'>
          The current price of eth is&nbsp; 
          <Text as='span' color='blackAlpha.700'>{ethPrice}</Text> usd.
        </Text>
      </Flex>
      <Heading  fontSize='5xl' fontWeight='extrabold' textAlign='center' py='6'>Tokens</Heading>
      <TokenList
        tokens={tokens}
        ethBalance={ethBalance}
        ethPrice={ethPrice}
      />
    </Box>
  )
} 

export default Wallet;