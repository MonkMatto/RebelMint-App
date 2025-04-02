import { createWeb3Modal } from '@web3modal/wagmi/react'
import { ReactNode, useEffect, useState } from 'react'

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
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
import { NetworkConfig, RMInfo } from '../RebelMint/src/contract/ChainsData'

interface Web3ModalProviderProps {
    children: ReactNode
}

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Your WalletConnect Cloud project ID
const projectId = '915bfa8adb5da85a137c332d75b35ae4'

// 2. Create metadata
const metadata = {
    name: 'RebelMint-App-Dev',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Map all available chains
const allChains = {
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
}

// Function to extract chain name from URL
const getChainFromUrl = (): string | null => {
    // Get the pathname from the URL
    const path = window.location.pathname

    // Check if there's a pattern like /chainName/contractAddress
    const parts = path.split('/').filter((part) => part !== '')

    // If we have at least one part and it's a known chain
    if (parts.length >= 1) {
        const possibleChain = parts[0].toLowerCase()
        return possibleChain
    }

    return null
}

// Function to get chain object based on name or return default chains
const getChainConfig = (): readonly Chain[] => {
    const chainName = getChainFromUrl()

    if (chainName) {
        // Try to find the chain by name directly
        const directMatch = Object.entries(allChains).find(
            ([key]) => key.toLowerCase() === chainName
        )

        if (directMatch) {
            console.log(`Using chain from URL: ${chainName}`)
            return [directMatch[1]] as const
        }

        // If no direct match, try using RMInfo to get chainId
        try {
            const rmInfo = new RMInfo()
            const networks = rmInfo.getAllNetworks() as NetworkConfig[]
            const network = networks.find(
                (net) =>
                    net.name.toLowerCase() === chainName ||
                    net.displayName.toLowerCase() === chainName
            )

            if (network) {
                const chainId = network.chainId
                const matchingChain = Object.values(allChains).find(
                    (chain) => chain.id === chainId
                )

                if (matchingChain) {
                    console.log(
                        `Found matching chain with ID ${chainId} from URL: ${chainName}`
                    )
                    return [matchingChain] as const
                }
            }
        } catch (error) {
            console.error('Error accessing RMInfo:', error)
        }
    }

    // If no valid chain found from URL, return all chains
    console.log('No specific chain from URL, allowing all networks')
    return Object.values(allChains) as readonly Chain[]
}

export function Web3ModalProvider({ children }: Web3ModalProviderProps) {
    const [chains, setChains] = useState<readonly Chain[]>([base, baseSepolia])
    const [config, setConfig] = useState(
        defaultWagmiConfig({
            chains: chains as unknown as [
                typeof mainnet,
                ...(typeof mainnet)[],
            ],
            projectId,
            metadata,
        })
    )

    useEffect(() => {
        // Get chains based on URL
        const detectedChains = getChainConfig()
        setChains(detectedChains)

        // Create the config with the detected chains
        const newConfig = defaultWagmiConfig({
            chains: detectedChains as unknown as [
                typeof mainnet,
                ...(typeof mainnet)[],
            ],
            projectId,
            metadata,
        })

        setConfig(newConfig)

        // Create modal with the specific config
        createWeb3Modal({
            wagmiConfig: newConfig,
            projectId,
            enableAnalytics: true,
            enableOnramp: true,
            themeVariables: {
                '--w3m-accent': '#3481CB',
                '--w3m-border-radius-master': '8px',
            },
        })
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
