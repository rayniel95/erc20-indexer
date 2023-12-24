'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@rainbow-me/rainbowkit/styles.css';

import Head from 'next/head'
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from 'react-redux';
import store from '@/stateManager/store';

//TODO - how to add the api key for mainnet?
const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: process.env.ETHEREUM_MAINNET_API_KEY! }),
    alchemyProvider({ apiKey: process.env.ETHEREUM_SEPOLIA_API_KEY! }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'erc20-indexer',
  projectId: 'bf583d6f62ad91e6aa73335e2ace5257',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Erc20 Indexer</title>
        <meta name="description" content="AU Module 3 project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {/* TODO - this provider would be not necessary */}
          <Provider store={store}>
            {children}
          </Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}