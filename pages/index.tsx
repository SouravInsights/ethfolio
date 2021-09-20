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
    <Stack 
      direction='column'
      justify='center'
      align='center' 
      py='20' 
      px={['4', '8', '10', '14', '26']} 
      spacing={8}
      
    >
      <Image 
        src='https://res.cloudinary.com/emishalabs/image/upload/v1632000476/ethfolio/Ethereum_perspective_matte_sy4gxg.png'
        alt='ethfolio-logo'
        w='xs'
      />
      <Heading 
        fontSize={['5xl', '5xl', '5xl', '6xl', '6xl' ]}
        fontWeight='extrabold' 
        color='blackAlpha.900' 
        w={['sm', 'md', '2xl', '3xl', '4xl' ]}
        textAlign='center'
      >
        Let the world know what you do <Text as='s' color='blackAlpha.800'>online</Text> on-chain!
      </Heading>
      <Stack direction='column' spacing='4' px='4'>
        <Input
          py={8}
          w={['xs', 'md', '2xl', '3xl', '4xl']}
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
        <Button 
          py={8} 
          borderRadius='2xl' 
          bg='#8299F8' 
          _focus={{ bg: '#6481f9' }} 
          _hover={{ bg: '#6481f9' }} 
          color='white' 
          fontSize='lg' 
          fontWeight='bold'
          onClick={handleSubmit}
        >
          Lets go!
        </Button>
      </Stack>
    </Stack>
  )
}

export default Home
