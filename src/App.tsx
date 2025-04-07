import { useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useNavigate, useParams } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import Footer from './components/Footer'
import { RMInfo } from './RebelMint/src/contract/ChainsData'
import { AlertTriangle, ChevronDown } from 'lucide-react'
import { useAccount } from 'wagmi'

function App() {
    // UNIVERSAL
    const rmInfo = new RMInfo()
    const navigate = useNavigate()

    // CHAIN CONTEXT (connected wallet and url params)
    const { chain, contractAddress } = useParams()
    const { chain: connectedChain } = useAccount()
    const connectedChainKey = rmInfo.getNetworkById(
        connectedChain?.id as number
    )?.name
    const network = chain
        ? rmInfo.getNetworkByName(chain as string)
        : rmInfo.getNetworkById(connectedChain?.id as number)
    const chainId = network?.chainId
    const chainIsValid = !!network

    // CONTRACT NAVIGATOR
    const [chainSelectorOpen, setChainSelectorOpen] = useState(false)
    const [showTestnets, setShowTestnets] = useState(
        connectedChain?.testnet || network?.isTestnet || false
    )
    const dropdownNetworks = showTestnets
        ? rmInfo.getAllNetworks()
        : rmInfo.getMainnets()

    const [inputAddress, setInputAddress] = useState<string>('')
    let invalidInput = false
    if (inputAddress && inputAddress.length != 0 && inputAddress.length != 42) {
        invalidInput = true
    }

    console.log(`network:`)
    console.log(network)

    if (chain && !chainIsValid) {
        return (
            <div className="flex h-fit min-h-[100svh] flex-col items-center justify-center pt-24">
                <NavBar />
                <h1 className="flex items-center gap-2 text-2xl text-red-500 lg:text-5xl">
                    <AlertTriangle size={32} /> Invalid Chain
                </h1>
                <p>{`Please select a valid chain`}</p>
            </div>
        )
    }

    if (chain && contractAddress) {
        return (
            <div className="flex h-fit min-h-[100svh] flex-col items-center justify-start pt-24">
                <NavBar />

                <div className="flex h-full min-h-[100svh] w-[100vw] justify-center bg-base-900 align-middle">
                    <RebelMint
                        contractAddress={contractAddress}
                        chainId={chainId as number}
                        apiKey={import.meta.env.VITE_ALCHEMY_KEY}
                    />
                </div>
                <Footer showInfo />
            </div>
        )
    } else {
        const body = document.getElementById('body')
        if (body) {
            body?.setAttribute('class', 'bg-base-50')
        }
        return (
            <div className="relative flex min-h-[100svh] w-[100vw] flex-col items-center justify-center p-3 pb-2 md:p-10 md:pb-2">
                <NavBar />
                <section
                    id="hero-and-form"
                    className="flex min-h-[100svh] w-full flex-col items-center justify-center gap-24"
                >
                    <div
                        id="hero"
                        className="mt-[30svh] flex flex-col items-center gap-4 rounded-lg bg-base-900 p-10 text-base-50"
                    >
                        <h1 className="text-5xl font-extrabold lg:text-9xl">
                            REBELMINT
                        </h1>
                        <p>{`WEB3 STOREFRONTS WITH ATTITUDE`}</p>
                    </div>
                    <div
                        id="form-and-example"
                        className="flex flex-col items-center justify-center gap-4"
                    >
                        <form
                            className="flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (inputAddress) {
                                    navigate(
                                        `/${connectedChainKey ?? 'ethereum'}/${inputAddress}`
                                    )
                                }
                            }}
                        >
                            <div
                                onClick={() => {
                                    setChainSelectorOpen(!chainSelectorOpen)
                                }}
                                className="relative flex cursor-pointer items-center gap-2"
                            >
                                <img className="size-6" src={network?.icon} />{' '}
                                <ChevronDown
                                    size={16}
                                    className={`duration-200 ${chainSelectorOpen ? 'rotate-180' : ''}`}
                                />
                                {chainSelectorOpen && (
                                    <div className="absolute left-0 top-10 z-10 flex h-64 w-72 translate-x-[-50%] flex-col gap-4 rounded-md border bg-base-100 p-1 shadow-sm md:translate-x-0">
                                        <div className="flex items-center justify-between rounded-md bg-base-150 p-2">
                                            <h1 className="text-base-600">
                                                Select a network
                                            </h1>
                                            <div className="h-6 border-r border-base-200" />

                                            <label
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="flex cursor-pointer items-center gap-2"
                                            >
                                                <span className="text-base-300">
                                                    testnets
                                                </span>
                                                <span className="relative inline-block h-6 w-12">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-0 w-0 opacity-0"
                                                        checked={showTestnets}
                                                        onClick={(e) => {
                                                            setShowTestnets(
                                                                !showTestnets
                                                            )
                                                            e.stopPropagation()
                                                        }}
                                                    />
                                                    <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-300 peer-checked:bg-blue-300"></span>
                                                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-6"></span>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex flex-col overflow-y-auto">
                                            {dropdownNetworks.map(
                                                (networkOption) => {
                                                    return (
                                                        <div
                                                            key={
                                                                networkOption.name
                                                            }
                                                            className={`flex items-center gap-2 rounded-md p-2 ${
                                                                network?.name ==
                                                                networkOption.name
                                                                    ? 'border bg-blue-50'
                                                                    : 'hover:bg-base-150'
                                                            }`}
                                                            onClick={() => {
                                                                navigate(
                                                                    `/${networkOption.name}`
                                                                )
                                                                setChainSelectorOpen(
                                                                    false
                                                                )
                                                            }}
                                                        >
                                                            <img
                                                                className="size-6"
                                                                src={
                                                                    networkOption.icon
                                                                }
                                                            />
                                                            <div className="flex flex-col">
                                                                {
                                                                    networkOption.displayName
                                                                }
                                                                {networkOption.name ==
                                                                    connectedChainKey && (
                                                                    <p className="text-xs text-blue-500">
                                                                        Connected
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                spellCheck={false}
                                placeholder="Enter a shop's Contract Address"
                                className="h-[3rem] w-[23rem] rounded-md border-2 border-bgcol p-2 md:w-[26rem]"
                                onChange={(e) => {
                                    setInputAddress(e.target.value)
                                }}
                            ></input>
                            <button
                                type="submit"
                                className="h-[3rem] w-[23rem] rounded-lg bg-bgcol text-textcol hover:bg-base-800 active:bg-base-700 md:w-[26rem] lg:w-fit lg:px-4"
                            >
                                Load Shop
                            </button>
                        </form>
                        {invalidInput && (
                            <p className="mb-5 text-red-500">Invalid address</p>
                        )}

                        <button
                            onClick={() => {
                                navigate(
                                    `/${network?.name}/${network?.address}`
                                    // chain == 'base-sepolia'
                                    //     ? '/base-sepolia/0x73fd10aa4d3d12c1db2074d8b2cb7bf6fb1356fe'
                                    //     : '/base/0x69Cc263973b1b22F7d81C5Be880A27CAd4c4E0De'
                                )
                                // chain == 'base-sepolia'
                                //     ? '/base-sepolia/0x73fd10aa4d3d12c1db2074d8b2cb7bf6fb1356fe'
                                //     : '/base/0x69Cc263973b1b22F7d81C5Be880A27CAd4c4E0De'
                            }}
                            className="mb-52 h-[2rem] w-[13rem] rounded-lg bg-base-100 text-sm font-extralight text-bgcol hover:invert-[5%] active:invert-[10%]"
                        >
                            View example shop
                        </button>
                    </div>
                </section>
                <div className="flex flex-col rounded-lg bg-base-100 p-5">
                    <h1 className="mb-4 flex items-center justify-center font-bold">
                        PREPARE YOUR TOKENS
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/metadatabuilder"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            METADATA BUILDER
                            <img src="create.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/metadatapreviewer"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            METADATA PREVIEWER
                            <img src="eye.svg" className="brightness-110" />
                        </a>
                    </div>
                </div>
                <br></br>
                <div className="flex flex-col rounded-lg bg-base-100 p-5">
                    <h1 className="mb-4 flex items-center justify-center font-bold">
                        EXECUTE YOUR VISION
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/createcontract"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            CONTRACT BUILDER
                            <img src="store.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/tokenmanager"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            TOKEN MANAGER
                            <img src="apps.svg" className="brightness-110" />
                        </a>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App
