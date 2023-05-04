import Head from 'next/head'
import SupportedNfts from './components/Home/SupportedNfts'
import CouponSection from './components/Home/CouponSection'
import HowToCoupons from './components/Home/HowToCoupons'
import LandingSection from './components/Home/LandingSection'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useAccount } from 'wagmi'
export default function Home({
  setScale,
  user,
  setUser,
  setUserNFTcollection,
  userNFTcollection,
}) {
  const { address, isConnected } = useAccount('')
  // const [address, setAddress] = useState(
  //   '0x7A02A9b9A7Ce979cFEB7456D40B6c8b3C3d6E98B',
  // )
  // const [isConnected, setIsConnected] = useState(true)
  const [loading, setLoading] = useState(false)
  const [requestInProgress, setRequestInProgress] = useState(false)
  const [verified, setVerified] = useState(false)
  useEffect(() => {
    if (isConnected && !requestInProgress && !verified) {
      setRequestInProgress(true)
      let checkwallet = async () => {
        setLoading(true)
        let response = await fetch('/api/checkWalletinDB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        })
        let data = await response.json()
        setLoading(false)
        setRequestInProgress(false)
        // if (data.wallet == 'new' || data.wallet == 'unverified') {
        //   Router.push('/Wallet')
        // } else if (data.wallet == 'verified') {
          setVerified(true)
          setUser(data.name)
        // }
      }
      checkwallet()
    }
  }, [isConnected, address, requestInProgress])

  return (
    <>
      <Head>
        <title>Boom</title>
        <meta name="description" content="Generated by Boom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div
        className={`overflow-x-hidden  caret-transparent ${
          loading ? 'blur-sm pointer-events-none' : ''
        } `}
        onClick={() => setScale(0)}
      >
        <LandingSection
          user={user}
          setUser={setUser}
          setUserNFTcollection={setUserNFTcollection}
        />
        <HowToCoupons />
        <CouponSection userNFTcollection={userNFTcollection} />
        <SupportedNfts />
        <Footer />
      </div>
    </>
  )
}
