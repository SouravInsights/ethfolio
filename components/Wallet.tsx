import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { ethers } from 'ethers';
import { getERC20Tokens } from '../utils/getTokens'
import { Stack, HStack, Box, Image, Heading, Text } from '@chakra-ui/react'
import TokenList from './Token/TokenList';
import { truncateAddress } from '../utils/general';
import router from 'next/router';
import Resolution from '@unstoppabledomains/resolution'

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
  domainAddress: string | undefined;
  ethBalance: string;
}

const WalletHeader = ({
  walletId,
  domainAddress,
  ethBalance,
}: WalletHeaderProps) => (
  <Stack spacing='8' alignItems='center' justify='center' direction={['column', 'column', 'row', 'row', 'row']}>
    {console.log('walletId:', walletId)}
    <WalletHeaderItem 
      label='ADDRESS'
      value={truncateAddress(walletId)}
    />
     <WalletHeaderItem 
      label='ENS / UD'
      value={domainAddress ? domainAddress : "—"}
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
  const [domainAddress, setDomainAddress] = useState<string>();
  const [ethBalance, setEthBalance] = useState<string>("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [tokens, setTokens] = useState<Array<object>>();

  // Unstoppable Domains resolution
  const udResolution = new Resolution();
  const resolveUD = (domain: string, currency: string = 'ETH') => {
    udResolution
      .addr(domain, currency)
      .then((udAddress: string) => {
        setDomainAddress(domain)
        setWalletId(udAddress);
      })
  }

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
        setDomainAddress(ensAddr);
      } else if (walletParam.includes('.crypto') || walletParam.includes('.nft') || walletParam.includes('.x') ||
      walletParam.includes('.wallet') || walletParam.includes('.zil') || walletParam.includes('.bitcoin') ||
      walletParam.includes('.dao') || walletParam.includes('.888') || walletParam.includes('.coin')) {
        resolveUD(walletParam, 'ETH');
      } else {
        addressParam = walletParam + ".eth";
        const walletAddress = await provider.resolveName(addressParam);
        setWalletId(walletAddress);
        setDomainAddress(addressParam);
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
        <title>{domainAddress || "ethfolio"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="twitter:title" content={domainAddress || "ethfolio"} />
        <meta property="og:title" content={domainAddress || "ethfolio"} />
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
        <WalletHeader walletId={walletId} ethBalance={ethBalance} domainAddress={domainAddress} />
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