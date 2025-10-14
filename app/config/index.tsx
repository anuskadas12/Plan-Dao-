import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, defineChain } from '@reown/appkit/networks'
import { custom } from 'zod'
import { createAppKit } from '@reown/appkit'

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// const customNetwork = defineChain({
//   id: 97,
//   caipNetworkId: 'eip155:123456789',
//   chainNamespace: 'eip155',
//   name: 'BNB Testnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'BNB TESTNET',
//     symbol: 'BNB',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
//       webSocket: ['WS_RPC_URL'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://testnet.bscscan.com' },
//   },
//   contracts: {
//     // Add the contracts here
//   }
// })

const customNetwork = defineChain({
  id: 39,
  caipNetworkId: 'eip155:39',
  chainNamespace: 'eip155',
  name: 'U2U Solaris Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet.u2u.xyz'],
      webSocket: ['wss://rpc-mainnet.u2u.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'U2U Explorer',
      url: 'https://u2uscan.xyz/',
    },
  },
  contracts: {
    // Add your contracts here if any
  },
})

const customNetwork2 = defineChain({
  id: 11155111,
  caipNetworkId: 'eip155:11155111',
  chainNamespace: 'eip155',
  name: 'Sepolia ETH',
  nativeCurrency: {
    decimals: 18,
    name: 'SepoliaETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.infura.io/v3/147ac26d4875d31fbecca54c782a112d'],
      webSocket: ['wss://sepolia.infura.io/ws/v3/147ac26d4875d31fbecca54c782a112d'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sepolia Explorer',
      url: 'https://sepolia.etherscan.io',
    },
  },
  contracts: {
    // Add your contracts here if any
  },
})


// Define networks before using them
export const networks = [mainnet, arbitrum, customNetwork,customNetwork2]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

// Now use wagmiAdapter in createAppKit
const modal = createAppKit({
  adapters: [wagmiAdapter], // Add valid adapter objects here if needed
  networks: [customNetwork, customNetwork2],
  // chainImages: {
  //   39: 'https://s2.coinmarketcap.com/static/img/coins/200x200/23254.png',
  //   11155111: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  // },
  projectId: '147ac26d4875d31fbecca54c782a112d',
})

export const config = wagmiAdapter.wagmiConfig