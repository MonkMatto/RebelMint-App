import React from 'react'
import { NetworkConfig, RMInfo } from '../RebelMint/src/contract/RMInfo'
import { useAccount } from 'wagmi'

interface ChainGalleryProps {
    baseDestination: string // sets the base destination for the links
    // e.g. /create or /tokenmanager
    // goes to /create/chainId or /tokenmanager/chainId
}
const ChainGallery: React.FC<ChainGalleryProps> = ({ baseDestination }) => {
    const [showTestnets, setShowTestnets] = React.useState(false)
    const toggleTestnets = () => {
        setShowTestnets((prev) => !prev)
    }
    const persistedAccount = localStorage.getItem('persistedAccount')
        ? JSON.parse(localStorage.getItem('persistedAccount') || '')
        : {}
    const { isConnected: localIsConnected, chain: localChain } = useAccount()
    const chain = localChain || persistedAccount.chain
    const isConnected = localIsConnected || persistedAccount.isConnected
    const networks = showTestnets
        ? (RMInfo.getTestnets() as NetworkConfig[])
        : (RMInfo.getMainnets() as NetworkConfig[])
    return (
        <div className="flex w-full max-w-[80ch] flex-col items-center justify-center gap-8 pt-24 text-base">
            {isConnected && chain && (
                <div className="flex flex-col items-center justify-center gap-4">
                    <a
                        href={`/${baseDestination}/${RMInfo.getNetworkByChainId(chain.id)?.name}`}
                        className="aspect-[1:2] indie-selectable flex flex-col items-center justify-center gap-4 p-4"
                    >
                        {' '}
                        <img
                            className="size-14 rounded-lg"
                            src={RMInfo.getNetworkById(chain?.id)?.icon}
                        />
                        {`Continue with ${chain?.name}`}
                    </a>
                    <span className="flex w-full items-center justify-center gap-2 text-base-600">
                        <span className="h-0.5 w-full border-b border-base-600"></span>
                        OR
                        <span className="h-1 w-full border-b border-base-600"></span>
                    </span>
                </div>
            )}
            <h2 className="text-xl text-base-200">Select Network</h2>
            <label
                onClick={(e) => e.stopPropagation()}
                className="flex cursor-pointer items-center gap-2"
            >
                <span className="text-sm text-base-600">Use Testnet</span>
                <span className="relative inline-block h-3 w-6">
                    <input
                        type="checkbox"
                        className="peer h-0 w-0 opacity-0"
                        checked={showTestnets}
                        onClick={(e) => {
                            toggleTestnets()
                            e.stopPropagation()
                        }}
                    />
                    <span className="absolute inset-0 rounded-full bg-base-700 transition-colors duration-300 peer-checked:bg-blue-700"></span>
                    <span className="absolute left-0.5 top-0.5 h-2 w-2 rounded-full bg-base-200 transition-transform duration-300 peer-checked:translate-x-3"></span>
                </span>
            </label>
            <div className="flex w-full flex-col items-center gap-4">
                {networks.map((network) => {
                    if (isConnected && chain && network.chainId === chain.id) {
                        return
                    }
                    return (
                        <div
                            key={network.chainId}
                            className="indie-selectable flex min-w-[30ch] flex-col items-center p-4"
                        >
                            <a
                                href={`/${baseDestination}/${network.name}`}
                                className="flex h-full w-full items-center gap-4 p-1"
                            >
                                <img
                                    className="aspect-square size-6 rounded-lg"
                                    src={network.icon}
                                />
                                {network.displayName}
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChainGallery
