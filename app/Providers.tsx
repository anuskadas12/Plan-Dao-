// // app/providers.tsx
// 'use client'

// import { JSX, ReactNode } from 'react'
// import { WagmiProvider, createConfig } from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'
// import { http } from 'viem'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import {
//   RainbowKitProvider,
//   getDefaultWallets,
//   connectorsForWallets,
// } from '@rainbow-me/rainbowkit'
// import '@rainbow-me/rainbowkit/styles.css'

// const { wallets } = getDefaultWallets({
//   appName: 'PlanDAO',
//   projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
// })

// const connectors = connectorsForWallets([...wallets], {
//   projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
//   appName: 'PlanDAO'
// })

// const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
//   connectors,
// })

// const queryClient = new QueryClient()

// interface ProvidersProps {
//   children: ReactNode;
// }

// export function Providers({ children }: ProvidersProps): JSX.Element {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>
//           {children}
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   )
// }