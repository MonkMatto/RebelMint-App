import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
    base,
    baseSepolia,
    arbitrum,
    arbitrumSepolia,
    mainnet,
    sepolia,
    polygon,
    polygonAmoy,
    optimism,
    optimismSepolia,
    Chain,
} from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RMInfo } from '../RebelMint/src/contract/RMInfo'
import { shape } from '../RebelMint/src/contract/custom-networks/shape'
import { shapeSepolia } from '../RebelMint/src/contract/custom-networks/shapeSepolia'

const queryClient = new QueryClient()
const projectId = '915bfa8adb5da85a137c332d75b35ae4'

const metadata = {
    name: 'RebelMint-App-Dev',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Define all available chains
const allChains = [
    base,
    baseSepolia,
    arbitrum,
    arbitrumSepolia,
    mainnet,
    sepolia,
    polygon,
    polygonAmoy,
    optimism,
    optimismSepolia,
    shape,
    shapeSepolia,
]

export function Web3ModalProvider({ children }: { children: ReactNode }) {
    const { chain, contractAddress } = useParams()
    const [config, setConfig] = useState<any>(null)
    const [ready, setReady] = useState(false)

    console.log('Web3ModalProvider initialized')
    console.log(`params: ${JSON.stringify(useParams())}`)
    console.log('Chain param:', chain)
    console.log('All chains:', allChains)

    useEffect(() => {
        // Set up available chains based on URL param
        let availableChains: Chain[] = [...allChains]

        // If we have a chain parameter and the route isn't base, filter to only include that chain
        if (
            chain &&
            contractAddress &&
            window.location.pathname != `/${chain}`
        ) {
            try {
                const network = RMInfo.getNetworkByName(chain)

                if (network) {
                    // Filter chains to only include the one matching the chain ID
                    const filteredChains = allChains.filter(
                        (c) => c.id === network.chainId
                    )

                    if (filteredChains.length > 0) {
                        availableChains = filteredChains
                        console.log(
                            `Restricting to chain: ${chain} (ID: ${network.chainId})`
                        )
                    } else {
                        console.error(
                            `No matching chain found for ${chain} with ID ${network.chainId}`
                        )
                    }
                } else {
                    console.error(`Network for ${chain} not found in RMInfo`)
                }
            } catch (error) {
                console.error('Error resolving chain from URL:', error)
            }
        }

        // Make sure we have at least one chain for the type requirement
        if (availableChains.length === 0) {
            availableChains = [mainnet]
        }

        // Create config with ONLY the filtered chains
        const wagmiConfig = defaultWagmiConfig({
            chains: availableChains as [Chain, ...Chain[]],
            projectId,
            metadata,
        })

        // Create the Web3Modal with the filtered chains
        createWeb3Modal({
            wagmiConfig,
            projectId,
            enableAnalytics: true,
            enableOnramp: true,
            themeVariables: {
                '--w3m-accent': '#3481CB',
                '--w3m-border-radius-master': '8px',
            },
        })

        setConfig(wagmiConfig)
        setReady(true)
    }, [chain, contractAddress])

    if (!ready || !config) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-bgcol text-textcol">
                Initializing wallet connection...
            </div>
        )
    }

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
