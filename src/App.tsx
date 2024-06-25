import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useSearchParams } from 'react-router-dom'

function App() {
    const [searchParams, setSearchParams] = useSearchParams()
    const contractAddress = searchParams.get('contract')
    const [inputAddress, setInputAddress] = useState<string>()
    useEffect(() => {}, [inputAddress])
    //0x078AAdc0Bf407B3845603B2Fe5f66eB51A5AF4ed
    if (contractAddress) {
        return (
            <div className="flex h-[100svh] flex-col items-center justify-center">
                <a href="/tokenbuilder">token builder</a>
                <a href="/tokenpreviewer">token previewer</a>
                <a href="/createContract">contract builder</a>
                <h1>This is an app running the RebelMint Component</h1>
                <div className="flex h-[80svh] w-[80vw] justify-center bg-blue-200 align-middle">
                    <RebelMint
                        contractAddress={contractAddress}
                        chain={'sepolia'}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex h-fit min-h-[100svh] w-[100vw] flex-col items-center justify-center p-3 md:p-10">
                <div
                    id="hero"
                    className="mb-24 mt-[30svh] flex flex-col items-center rounded-lg bg-bgcol p-10 text-textcol"
                >
                    <h1 className="mb-4 text-5xl font-extrabold md:text-9xl">
                        REBELMINT
                    </h1>
                    <p>{`WEB3 STOREFRONTS`}</p>
                </div>
                <span className="mb-2 text-base font-extralight md:text-lg">
                    <span>Enter a shop's</span>
                    <span className="bg-depth m-1 font-normal">
                        {' '}
                        Contract Address{' '}
                    </span>
                    <span>to view the listings</span>
                </span>
                <form
                    className="mb-6 flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSearchParams(
                            inputAddress ? { contract: inputAddress } : ''
                        )
                    }}
                >
                    <input
                        className="h-[3rem] w-[23rem] rounded-md border-2 border-black p-2 md:w-[26rem]"
                        onChange={(e) => {
                            setInputAddress(e.target.value)
                        }}
                    ></input>
                    <button
                        type="submit"
                        className="h-[3rem] w-[23rem] rounded-lg bg-black text-white hover:invert-[5%] active:invert-[10%] md:w-[26rem] lg:w-fit lg:px-4"
                    >
                        Load Shop
                    </button>
                </form>
                <button
                    onClick={() => {
                        setSearchParams({
                            contract:
                                '0x078aadc0bf407b3845603b2fe5f66eb51a5af4ed',
                        })
                    }}
                    className="bg-depth mb-52 h-[2rem] w-[13rem] rounded-lg text-sm text-black hover:invert-[5%] active:invert-[10%]"
                >
                    Or view this example storefront
                </button>
                <div className="bg-depth flex flex-col p-5">
                    <h1 className="mb-4 flex items-center justify-center font-semibold">
                        TOOLS
                    </h1>
                    <div className="grid grid-cols-1 gap-4 font-bold md:grid-cols-2">
                        <a
                            href="/tokenbuilder"
                            className="flex w-64 items-center justify-center gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            <img src="create.svg" />
                            TOKEN BUILDER
                        </a>
                        <a
                            href="/tokenpreviewer"
                            className="flex w-64 items-center justify-center gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            <img src="eye.svg" />
                            TOKEN PREVIEWER
                        </a>
                        <a
                            href="/createContract"
                            className="flex w-64 items-center justify-center gap-2 rounded-lg bg-bgcol p-4 text-textcol hover:invert-[5%] active:invert-[10%]"
                        >
                            <img src="store.svg" />
                            CONTRACT BUILDER
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
