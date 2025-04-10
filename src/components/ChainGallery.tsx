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
    const { isConnected, chain } = useAccount()
    const networks = showTestnets
        ? (RMInfo.getTestnets() as NetworkConfig[])
        : (RMInfo.getMainnets() as NetworkConfig[])
    return (
        <div className="flex w-full max-w-[80ch] flex-col items-center justify-center gap-8 pt-24 text-base">
            {isConnected && chain && (
                <div className="flex flex-col items-center justify-center gap-4">
                    <a
                        href={`/${baseDestination}/${RMInfo.getNetworkByChainId(chain.id)?.name}`}
                        className="aspect-[1:2] flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border border-base-800 bg-base-850 p-4 text-base-300 shadow-inner hover:bg-base-800 hover:text-base-50"
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

            <label className="label cursor-pointer">
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={showTestnets}
                    onChange={toggleTestnets}
                />
                <span className="label-text">Use Testnet</span>
            </label>
            <div className="grid w-full grid-cols-5 gap-4">
                {networks.map((network) => {
                    if (isConnected && chain && network.chainId === chain.id) {
                        return
                    }
                    return (
                        <div
                            key={network.chainId}
                            className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-md border border-base-800 bg-base-850 p-4 text-base-300 shadow-inner hover:bg-base-800 hover:text-base-50"
                        >
                            <a
                                href={`/${baseDestination}/${network.name}`}
                                className="flex h-full w-full flex-col items-center justify-center gap-4 p-1"
                            >
                                <img
                                    className="aspect-square h-full w-full rounded-lg"
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
