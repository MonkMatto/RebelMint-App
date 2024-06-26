import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useSearchParams } from 'react-router-dom'

function App() {
    const [searchParams, setSearchParams] = useSearchParams()
    const contractAddress = searchParams.get('contract')
    const [inputAddress, setInputAddress] = useState<string>('')
    useEffect(() => {}, [inputAddress])
    let invalidInput = false
    if (inputAddress && inputAddress.length != 0 && inputAddress.length != 42) {
        invalidInput = true
    }

    //0x078AAdc0Bf407B3845603B2Fe5f66eB51A5AF4ed
    if (contractAddress) {
        return (
            <div className="flex h-fit min-h-[100svh] flex-col items-center justify-start">
                <h1>This is an app running the RebelMint Component</h1>
                <div className="justify-cente flex h-full min-h-[100svh] w-[100vw] bg-bgcol align-middle">
                    <RebelMint
                        contractAddress={contractAddress}
                        chain={'baseSepolia'}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="relative flex h-fit min-h-[100svh] w-[100vw] flex-col items-center justify-center p-3 md:p-10">
                <a
                    href="/createcontract"
                    className="absolute right-0 top-0 m-5 flex w-fit items-center justify-center gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                >
                    NEW SHOP
                    <img src="add.svg" />
                </a>
                <div
                    id="hero"
                    className="mb-24 mt-[30svh] flex flex-col items-center rounded-lg bg-bgcol p-10 text-textcol"
                >
                    <h1 className="mb-4 text-5xl font-extrabold lg:text-9xl">
                        REBELMINT
                    </h1>
                    <p>{`WEB3 STOREFRONTS`}</p>
                </div>
                {/* <span className="mb-2 text-base md:text-lg">
                    <span>Enter a shop's </span>
                    <a
                        href="https://ethereum.org/en/developers/docs/accounts/#contract-accounts"
                        target="_blank"
                    >
                        <span className="font-semibold">Contract Address</span>
                    </a>
                    <span> to view the listings</span>
                </span> */}
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
                        className="h-[3rem] w-[23rem] rounded-lg bg-bgcol text-textcol hover:invert-[5%] active:invert-[10%] md:w-[26rem] lg:w-fit lg:px-4"
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
                                '0x078aadc0bf407b3845603b2fe5f66eb51a5af4ed',
                        })
                    }}
                    className="bg-base-100 mb-52 h-[2rem] w-[13rem] rounded-lg text-sm font-extralight text-bgcol hover:invert-[5%] active:invert-[10%]"
                >
                    View example shop
                </button>
                <div className="bg-base-100 flex flex-col rounded-lg p-5">
                    <h1 className="mb-4 flex items-center justify-center font-semibold">
                        TOOLS
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/tokenbuilder"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            TOKEN BUILDER
                            <img src="create.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/tokenpreviewer"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            TOKEN PREVIEWER
                            <img src="eye.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/createcontract"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            CONTRACT BUILDER
                            <img src="store.svg" className="brightness-110" />
                        </a>
                        <a
                            href="/tokenmanager"
                            className="flex w-64 items-center justify-between gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            TOKEN MANAGER
                            <img src="store.svg" className="brightness-110" />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
