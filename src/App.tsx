import { useEffect, useState } from 'react'
import RebelMint from './RebelMint/src/RebelMint'
import { useSearchParams } from 'react-router-dom'

function App() {
    const [searchParams, setSearchParams] = useSearchParams()
    const contractAddress = searchParams.get('contract')
    const [inputAddress, setInputAddress] = useState<string>()
    useEffect(() => {}, [inputAddress])
    //0xfbE3687896B583E9E9727a58BD96207f35fD015c
    if (contractAddress) {
        return (
            <div className="flex h-[100svh] w-[100vw] justify-center bg-blue-200 align-middle">
                <RebelMint contractAddress={contractAddress} />
            </div>
        )
    } else {
        return (
            <>
                <h1>Please enter a Contract Address</h1>
                <p>/?contract=0x62d8cf316aD924D887533e67BC7067De3cE124eB</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSearchParams(
                            inputAddress ? { contract: inputAddress } : ''
                        )
                        // setSearchParams({e.target.value})
                    }}
                >
                    <input
                        className="bg-black"
                        onChange={(e) => {
                            setInputAddress(e.target.value)
                        }}
                    ></input>
                    <button type="submit"></button>
                </form>
            </>
        )
    }
}

export default App
