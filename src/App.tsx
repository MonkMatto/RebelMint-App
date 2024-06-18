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
            <div className="flex h-[100svh] w-[100vw] flex-col items-center justify-center">
                <h1 className="text-2xl">Please enter a Contract Address</h1>
                <form
                    className="text-md mb-5 flex flex-col gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSearchParams(
                            inputAddress ? { contract: inputAddress } : ''
                        )
                    }}
                >
                    <input
                        className="w-[26rem] rounded-md border-2 border-black p-2"
                        onChange={(e) => {
                            setInputAddress(e.target.value)
                        }}
                    ></input>
                    <button
                        type="submit"
                        className="h-[5rem] w-[26rem] rounded-lg bg-black text-white"
                    >
                        Load Contract
                    </button>
                </form>
                <p className="text-sm">or enter this into the url</p>
                <p className="text-sm">
                    /?contract=0x078AAdc0Bf407B3845603B2Fe5f66eB51A5AF4ed
                </p>
            </div>
        )
    }
}

export default App
