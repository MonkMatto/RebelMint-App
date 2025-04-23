import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { RMInfo } from '../RebelMint/src/contract/RMInfo'

interface ChainDropdownProps {
    connectedChain: any
    network: any
    showTestnets: boolean
    setShowTestnets: (value: boolean) => void
}

const ChainDropdown: React.FC<ChainDropdownProps> = ({
    connectedChain,
    network,
    showTestnets,
    setShowTestnets,
}) => {
    const navigate = useNavigate()
    const [chainSelectorOpen, setChainSelectorOpen] = useState(false)

    const dropdownNetworks = showTestnets
        ? RMInfo.getAllNetworks()
        : RMInfo.getMainnets()

    return (
        <div
            onClick={() => {
                setChainSelectorOpen(!chainSelectorOpen)
            }}
            className="relative flex cursor-pointer items-center gap-2"
        >
            <img className="size-6 rounded-md" src={network?.icon} />
            <ChevronDown
                size={16}
                className={`text-base-400 duration-200 ${chainSelectorOpen ? 'rotate-180' : ''}`}
            />
            {chainSelectorOpen && (
                <div className="absolute left-0 top-10 z-10 flex h-64 w-72 translate-x-[-50%] flex-col gap-4 rounded-md border border-base-800 bg-base-850 p-1 shadow-sm md:translate-x-0">
                    <div className="flex items-center justify-between rounded-md bg-base-800 p-2">
                        <h1 className="text-base-200">Select a network</h1>
                        <div className="h-6 border-r border-base-600" />
                        <label
                            onClick={(e) => e.stopPropagation()}
                            className="flex cursor-pointer items-center gap-2"
                        >
                            <span className="text-base-600">testnets</span>
                            <span className="relative inline-block h-6 w-12">
                                <input
                                    type="checkbox"
                                    className="peer h-0 w-0 opacity-0"
                                    checked={showTestnets}
                                    onClick={(e) => {
                                        setShowTestnets(!showTestnets)
                                        e.stopPropagation()
                                    }}
                                />
                                <span className="absolute inset-0 rounded-full bg-base-700 transition-colors duration-300 peer-checked:bg-blue-700"></span>
                                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-base-200 transition-transform duration-300 peer-checked:translate-x-6"></span>
                            </span>
                        </label>
                    </div>
                    <div className="flex flex-col overflow-y-auto">
                        {dropdownNetworks.map((networkOption) => {
                            const isConnectedChain =
                                connectedChain?.id === networkOption.chainId
                            const isSelectedChain =
                                network?.chainId === networkOption.chainId
                            return (
                                <div
                                    key={networkOption.name}
                                    className={`flex items-center gap-2 rounded-md p-2 text-base-100 ${
                                        isSelectedChain
                                            ? 'border border-base-700 bg-blue-700'
                                            : 'hover:bg-base-800'
                                    }`}
                                    onClick={() => {
                                        navigate(`/${networkOption.name}`)
                                        setChainSelectorOpen(false)
                                    }}
                                >
                                    <img
                                        className="size-6"
                                        src={networkOption.icon}
                                    />
                                    <div className="flex flex-col">
                                        {networkOption.displayName}
                                        {isConnectedChain && (
                                            <p className="text-xs text-blue-500">
                                                Connected
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChainDropdown
