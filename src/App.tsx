import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useNavigate, useParams } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import Footer from './components/Footer'
import { AlertTriangle } from 'lucide-react'
import { useAccount } from 'wagmi'
import ChainDropdown from './components/ChainDropdown'
import { RMInfo } from './RebelMint/src/contract/RMInfo'

function App() {
    // UNIVERSAL
    const navigate = useNavigate()

    // CHAIN CONTEXT (connected wallet and url params)
    const { chain, contractAddress } = useParams()
    const { isConnected: localIsConnected, chain: localConnectedChain } =
        useAccount()
    // Use the wrapper above navigation to have a fallback when useAccount is not ready between navigations
    const storedAccount = JSON.parse(
        sessionStorage.getItem('persistedAccount') as string
    )
    // Persist the account state to sessionStorage, the wallet will disconnect and reconnect between navigations
    // this persists it to sessionStorage for that moment
    useEffect(() => {
        if (localIsConnected) {
            sessionStorage.setItem(
                'persistedAccount',
                JSON.stringify({
                    isConnected: localIsConnected,
                    chain: localConnectedChain,
                })
            )
        }
    }, [localIsConnected, localConnectedChain])
    const isConnected = storedAccount?.isConnected
    const connectedChain = storedAccount?.chain

    const connectedNetwork = isConnected
        ? RMInfo.getNetworkById(connectedChain?.id as number)
        : null

    if (isConnected) {
        console.log(`connected to wallet`)
    } else {
        console.log(`trouble connecting to wallet`)
    }
    const network =
        (chain ? RMInfo.getNetworkByName(chain as string) : null) ||
        (isConnected
            ? RMInfo.getNetworkById(connectedChain?.id as number)
            : null) ||
        RMInfo.getNetworkByName('ethereum')
    console.log(`connectedChain: ${connectedChain?.name}`)
    console.log(`connectedNetwork: ${connectedNetwork?.name}`)
    console.log(`network: ${network?.name}`)
    const chainId = network?.chainId
    const chainIsValid = !!network

    // CONTRACT NAVIGATOR
    const [showTestnets, setShowTestnets] = useState(
        connectedChain?.testnet || network?.isTestnet || false
    )

    const [inputAddress, setInputAddress] = useState<string>('')
    let invalidInput =
        (inputAddress &&
            inputAddress.length != 0 &&
            inputAddress.length != 42) ||
        false

    console.log(`network:`)
    console.log(network)

    if (chain && !chainIsValid) {
        return (
            <div className="flex h-fit min-h-[100svh] flex-col items-center justify-center pt-24">
                <NavBar hasConnector />
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
                <NavBar hasConnector />

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
            <div className="relative flex min-h-[100svh] w-[100vw] flex-col items-center justify-center bg-bgcol p-3 pb-2 md:p-10 md:pb-2">
                <NavBar hasConnector />
                <section
                    id="hero-and-form"
                    className="flex min-h-[100svh] w-full flex-col items-center justify-center gap-24"
                >
                    <div
                        id="hero"
                        className="bg-black-950 mt-[30svh] flex flex-col items-center gap-4 rounded-lg border-2 border-base-850 p-10 text-base-200 shadow-lg shadow-[#27141433]"
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
                                        `/${connectedNetwork?.name ?? 'ethereum'}/${inputAddress}`
                                    )
                                }
                            }}
                        >
                            <ChainDropdown
                                network={network}
                                connectedChain={connectedChain}
                                showTestnets={showTestnets}
                                setShowTestnets={setShowTestnets}
                            />
                            <input
                                spellCheck={false}
                                placeholder="Enter a shop's Contract Address"
                                className="h-[3rem] w-[23rem] rounded-md border-2 border-base-800 bg-base-850 p-2 text-base-100 md:w-[26rem]"
                                onChange={(e) => {
                                    setInputAddress(e.target.value)
                                }}
                            ></input>
                            <button
                                type="submit"
                                disabled={!inputAddress || invalidInput}
                                className="h-[3rem] w-[23rem] rounded-lg bg-base-200 text-base-900 hover:bg-base-100 active:bg-base-50 disabled:opacity-40 md:w-[26rem] lg:w-fit lg:px-4"
                            >
                                Load Shop
                            </button>
                        </form>
                        {invalidInput && (
                            <p className="mb-5 text-red-500">Invalid address</p>
                        )}

                        <a
                            href={`/${network?.name}/${network?.address}`}
                            className="mb-52 flex items-center rounded-lg bg-base-800 px-4 py-2 text-center text-sm font-extralight text-base-200 hover:invert-[5%] active:invert-[10%]"
                        >
                            View example shop
                        </a>
                    </div>
                </section>
                <div className="flex flex-col rounded-lg bg-base-850 p-5">
                    <h1 className="mb-4 flex items-center justify-center font-bold text-base-400">
                        PREPARE YOUR TOKENS
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/metadatabuilder"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg border border-base-800 bg-base-850 p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            METADATA BUILDER
                            <img src="create.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/metadatapreviewer"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg border border-base-800 bg-base-850 p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            METADATA PREVIEWER
                            <img src="eye.svg" className="brightness-110" />
                        </a>
                    </div>
                </div>
                <br></br>
                <div className="mb-24 flex flex-col rounded-lg bg-base-850 p-5">
                    <h1 className="mb-4 flex items-center justify-center font-bold text-base-400">
                        EXECUTE YOUR VISION
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/createcontract"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg border border-base-800 bg-base-850 p-4 text-textcol hover:bg-base-800 active:bg-base-700"
                        >
                            CONTRACT BUILDER
                            <img src="store.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/tokenmanager"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg border border-base-800 bg-base-850 p-4 text-textcol hover:bg-base-800 active:bg-base-700"
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
