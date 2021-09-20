import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { ethers } from 'ethers';
import { getERC20Tokens } from '../utils/getTokens'
import { Stack, HStack, Box, Image, Heading, Text } from '@chakra-ui/react'
import TokenList from './Token/TokenList';
import { truncateAddress } from '../utils/general';
import router from 'next/router';

interface WalletHeaderItemProps {
  label: string;
  value: string;
}

const WalletHeaderItem = ({ label, value }: WalletHeaderItemProps) => (
  <Stack 
    bg='white'
    alignItems='center'
    boxShadow='rgba(0, 0, 0, 0.1) 0px 5px 10px'
    padding='10px 20px 15px 20px'
    borderRadius='10px'
  >
    <Text p='2' bg='blackAlpha.100' borderRadius='8px' fontSize='sm' fontWeight='bold' color='blackAlpha.600'>{label}</Text>
    <Text fontSize='md' fontWeight='bold' color='blackAlpha.700'>{value}</Text>
  </Stack>
)

interface WalletHeaderProps {
  walletId: string;
  ensAddress: string | undefined;
  ethBalance: string;
}

const WalletHeader = ({
  walletId,
  ensAddress,
  ethBalance,
}: WalletHeaderProps) => (
  <Stack spacing='8' alignItems='center' justify='center' direction={['column', 'column', 'row', 'row', 'row']}>
    {console.log('walletId:', walletId)}
    <WalletHeaderItem 
      label='ADDRESS'
      value={truncateAddress(walletId)}
    />
     <WalletHeaderItem 
      label='ENS'
      value={ensAddress ? ensAddress : "—"}
    />
     <WalletHeaderItem 
      label='BALANCE'
      value={`${ethBalance} ETH`}
    />
  </Stack>
)

interface WalletProps {
  walletParam: any;
}

const Wallet = ({ walletParam }: WalletProps) => {
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
    <Box py='24'>
      <Head>
        <title>{ensAddress || "ethfolio"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:title" content={ensAddress || "ethfolio"} />
        <meta property="og:title" content={ensAddress || "ethfolio"} />
      </Head>
      <Stack 
        direction='column'
        justify='center'
        align='center' 
        px={['4', '8', '10', '14', '26']} 
        spacing={8}
      >
        <Image 
          src='https://res.cloudinary.com/emishalabs/image/upload/v1632000476/ethfolio/Ethereum_perspective_matte_sy4gxg.png'
          alt='ethfolio-logo'
          w='xs'
          onClick={() => router.push('./')}
          cursor='pointer'
        />
        <WalletHeader walletId={walletId} ethBalance={ethBalance} ensAddress={ensAddress} />
      </Stack> 
      <Heading fontSize='5xl' fontWeight='extrabold' textAlign='center' py='8'>Tokens</Heading>
      <TokenList
        tokens={tokens}
        ethBalance={ethBalance}
        ethPrice={ethPrice}
      />
    </Box>
  )
} 

export default Wallet;