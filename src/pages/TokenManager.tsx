import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RebelMintTokenManager } from '../RebelMint/src/RebelMint'
import { useAccount } from 'wagmi'
import chainsData from '../RebelMint/src/contract/ChainsData'

interface ChainStruct {
    url: string
    chainID: number
}

interface ChainsDataStruct {
    [key: string]: ChainStruct
}

function findKeyByChainID(chains: ChainsDataStruct, targetChainID: number) {
    for (const key in chains) {
        if (chains[key].chainID === targetChainID) {
            return key
        }
    }
    return null
}

const TokenManager = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [input, setInput] = useState('')
    const address = searchParams.get('contract')
    const account = useAccount()
    const { chainId } = useAccount()
    console.log(account)
    console.log(chainId)

    const chainName = findKeyByChainID(chainsData, chainId as number) as
        | 'base'
        | 'ethereum'
        | 'sepolia'
        | 'baseSepolia'

    if (address && chainId) {
        return (
            <div className="bg-base-900 relative flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 text-wrap p-24 font-satoshi text-9xl font-bold text-textcol">
                <div className="absolute right-0 top-0 m-5 h-fit w-fit">
                    <w3m-network-button />
                </div>
                <h1 className="w-full text-5xl">Token Manager</h1>
                <RebelMintTokenManager
                    contractAddress={address}
                    chain={chainName}
                    bypassWeb3={true}
                />
            </div>
        )
    } else {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center justify-center gap-5 text-wrap bg-bgcol p-24 font-satoshi text-9xl font-bold text-textcol">
                <div className="absolute right-0 top-0 m-5 h-fit w-fit">
                    <w3m-network-button />
                </div>
                <form
                    className="mb-4 flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault()
                        setSearchParams(input ? { contract: input } : '')
                    }}
                >
                    <input
                        spellCheck={false}
                        className="h-[3rem] w-[23rem] rounded-md border-2 border-textcol bg-bgcol p-2 text-textcol md:w-[26rem]"
                        placeholder="Contract Address"
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                    ></input>
                    <button
                        type="submit"
                        className="h-[3rem] w-[23rem] rounded-lg bg-textcol text-bgcol hover:invert-[5%] active:invert-[10%] md:w-[26rem] lg:w-fit lg:px-4"
                    >
                        Load Tokens
                    </button>
                </form>
            </div>
        )
    }
}

export default TokenManager
