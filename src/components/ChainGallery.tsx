import React from 'react'
import { NetworkConfig, RMInfo } from '../RebelMint/src/contract/ChainsData'

interface ChainGalleryProps {
    baseDestination: string // sets the base destination for the links
    // e.g. /create or /tokenmanager
    // goes to /create/chainId or /tokenmanager/chainId
}
const ChainGallery: React.FC<ChainGalleryProps> = ({ baseDestination }) => {
    const rmInfo = new RMInfo()
    const [showTestnets, setShowTestnets] = React.useState(false)
    const toggleTestnets = () => {
        setShowTestnets((prev) => !prev)
    }
    const networks = showTestnets
        ? (rmInfo.getAllNetworks() as NetworkConfig[])
        : (rmInfo.getMainnets() as NetworkConfig[])
    return (
        <div className="text-base">
            <label className="label cursor-pointer">
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={showTestnets}
                    onChange={toggleTestnets}
                />
                <span className="label-text">Show Testnets</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
                {networks.map((network) => {
                    return (
                        <div
                            key={network.chainId}
                            className="aspect-[1:2] flex flex-col items-center justify-center bg-base-800 p-4 hover:bg-base-700"
                        >
                            <a
                                href={`/${baseDestination}/${network.name}`}
                                className="btn btn-primary m-2"
                            >
                                {network.displayName}
                            </a>
                            {/* <img
                    src={network.logo}
                    alt={network.name}
                    className="h-20 w-20"
                    /> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChainGallery
