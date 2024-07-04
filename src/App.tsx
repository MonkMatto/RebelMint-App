import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useSearchParams } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {
    const [searchParams, setSearchParams] = useSearchParams()
    const contractAddress = searchParams.get('contract')
    const [inputAddress, setInputAddress] = useState<string>('')
    useEffect(() => {}, [inputAddress])
    let invalidInput = false
    if (inputAddress && inputAddress.length != 0 && inputAddress.length != 42) {
        invalidInput = true
    }

    const getSubdomain = () => {
        const host = window.location.hostname
        const parts = host.split('.')

        if (parts[0].length > 2) {
            return parts[0]
        }

        return null
    }

    const subdomain = getSubdomain()

    //0x21fed8cd09e1355ec79c79a195bd0d43cb26e52a
    if (contractAddress) {
        return (
            <div className="flex h-fit min-h-[100svh] flex-col items-center justify-start pt-24">
                <NavBar hasNewShop={true} />
                <h1>This is an app running the RebelMint Component</h1>
                <div className="justify-cente flex h-full min-h-[100svh] w-[100vw] bg-base-900 align-middle">
                    <RebelMint
                        contractAddress={contractAddress}
                        test={subdomain == 'test' ? true : false}
                        apiKey={import.meta.env.VITE_ALCHEMY_KEY}
                    />
                </div>
            </div>
        )
    } else {
        const body = document.getElementById('body')
        if (body) {
            body?.setAttribute('class', 'bg-base-50')
        }
        return (
            <div className="relative flex h-fit min-h-[100svh] w-[100vw] flex-col items-center justify-center p-3 md:p-10">
                <NavBar hasNewShop={true} />
                <div
                    id="hero"
                    className="mb-24 mt-[30svh] flex flex-col items-center rounded-lg bg-base-900 p-10 text-base-50"
                >
                    <h1 className="mb-4 text-5xl font-extrabold lg:text-9xl">
                        REBELMINT
                    </h1>
                    <p>{`WEB3 STOREFRONTS`}</p>
                </div>
                <form
                    className="mb-4 flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSearchParams(
                            inputAddress ? { contract: inputAddress } : ''
                        )
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
                        setSearchParams({
                            contract:
                                '0x73fd10aa4d3d12c1db2074d8b2cb7bf6fb1356fe',
                        })
                    }}
                    className="mb-52 h-[2rem] w-[13rem] rounded-lg bg-base-100 text-sm font-extralight text-bgcol hover:invert-[5%] active:invert-[10%]"
                >
                    View example shop
                </button>
                <div className="flex flex-col rounded-lg bg-base-100 p-5">
                    <h1 className="mb-4 flex items-center justify-center font-semibold">
                        TOOLS
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
            </div>
        )
    }
}

export default App
