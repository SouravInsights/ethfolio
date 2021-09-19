import React from 'react';
import { useRouter } from 'next/router'
import Wallet from '../components/Wallet';

const WalletPage = () => {
  const router = useRouter();
  const { walletParam } = router.query;
  return <Wallet walletParam={walletParam} />
}

export default WalletPage;