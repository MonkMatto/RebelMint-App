import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useNavigate, useParams } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import Footer from './components/Footer'
import { RMInfo } from './RebelMint/src/contract/ChainsData'
import { AlertTriangle } from 'lucide-react'

function App() {
    const { chain, contractAddress } = useParams()
    const navigate = useNavigate()
    const [inputAddress, setInputAddress] = useState<string>('')
    useEffect(() => {}, [inputAddress])
    let invalidInput = false
    if (inputAddress && inputAddress.length != 0 && inputAddress.length != 42) {
        invalidInput = true
    }

    const rmInfo = new RMInfo()
    const network = rmInfo.getNetworkByName(chain as string)
    const chainId = network?.chainId
    const chainIsValid = !!network

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
                                    navigate(`/${inputAddress}`)
                                }
                            }}
                        >
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
                                    chain == 'base-sepolia'
                                        ? '/base-sepolia/0x73fd10aa4d3d12c1db2074d8b2cb7bf6fb1356fe'
                                        : '/base/0x69Cc263973b1b22F7d81C5Be880A27CAd4c4E0De'
                                )
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
