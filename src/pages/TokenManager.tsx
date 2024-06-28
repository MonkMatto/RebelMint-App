import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RebelMintTokenManager } from '../RebelMint/src/RebelMint'
import { useAccount } from 'wagmi'
import chainsData from '../RebelMint/src/contract/ChainsData'
import { NavBar } from '../components/NavBar'

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
    console.log(address)
    if (address) {
        return (
            <div className="bg-base-900 flex h-fit min-h-[100svh] w-full flex-col gap-5 text-wrap p-4 pt-32 font-satoshi font-bold text-textcol md:p-24">
                <NavBar />
                <span className="mt-12 px-2 font-normal">
                    <span>
                        {
                            'To create a token, you must upload the metadata to Arweave, '
                        }
                    </span>
                    <a
                        href="http://docs.rebelmint.org/nft-assets/arweave"
                        target="_blank"
                        className="bg-card p-1 font-semibold underline"
                    >
                        <span>{'Follow Our Guide'}</span>
                    </a>
                </span>
                <span className="px-2 font-normal">
                    <span>{'You can use our '}</span>
                    <a
                        href="/metadatabuilder"
                        target="_blank"
                        className="bg-card p-1 font-semibold underline"
                    >
                        <span>{'Metadata Builder'}</span>
                    </a>
                    <span>{` to create the metadata. Bookmark or keep this tab open to finish creation.`}</span>
                </span>

                <RebelMintTokenManager
                    contractAddress={address}
                    chain={chainName}
                    bypassWeb3={true}
                />
            </div>
        )
    } else {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center justify-center gap-5 text-wrap bg-bgcol p-32 font-satoshi text-9xl font-bold text-textcol">
                <NavBar />
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
