import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { Stack, Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react'
import { truncateAddress } from '../utils/general'

const Home: NextPage = () => {
  const router = useRouter()
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (address) {
      const trunkatedAddress = truncateAddress(address);
      if (trunkatedAddress) {
        router.push(`/${trunkatedAddress}`);
      }
    }
  };
  
  return (
    <Stack direction='column' justify='center' align='center' py='20' px='26' spacing={12}>
      <Heading fontSize='6xl' fontWeight='extrabold' color='blackAlpha.900' w='4xl' textAlign='center'>
        Let the world know what you do <Text as='s'>online</Text> on-chain!
      </Heading>
      <Stack as='form' onSubmit={handleSubmit} direction='column' spacing='4'>
        <Input
          py={8}
          w='6xl'
          bg='white'
          borderRadius='2xl'
          textAlign='center'
          size='md'
          fontSize='lg' 
          fontWeight='normal'
          focusBorderColor='#8299F8'
          placeholder='address / ens'
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <Button py={8} borderRadius='2xl' bg='#8299F8' _focus={{ bg: '#6481f9' }} _hover={{ bg: '#6481f9' }} color='white' fontSize='lg' fontWeight='bold'>
          Let's go!
        </Button>
      </Stack>
      <Image 
        src='https://res.cloudinary.com/emishalabs/image/upload/v1632000476/ethfolio/Ethereum_perspective_matte_sy4gxg.png'
        alt='ethfolio-logo'
        w='xs'
      />
    </Stack>
  )
}

export default Home
