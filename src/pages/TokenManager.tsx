import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RebelMintTokenManager } from '../RebelMint/src/RebelMint'
import { NavBar } from '../components/NavBar'
import { setPageTitle } from '../util/setPageTitle'
import Footer from '../components/Footer'
import { RMInfo } from '../RebelMint/src/contract/RMInfo'

const TokenManager = () => {
    setPageTitle('Token Manager')
    const navigate = useNavigate()
    const { chain, contractAddress } = useParams()
    const [input, setInput] = useState('')
    const network = RMInfo.getNetworkByName(chain as string)
    const chainId = network?.chainId

    if (contractAddress) {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col gap-5 text-wrap bg-base-900 p-4 pt-32 font-satoshi font-bold text-textcol md:p-24">
                <NavBar hasConnector />
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
                    contractAddress={contractAddress}
                    chainId={chainId as number}
                    bypassWeb3={true}
                    apiKey={import.meta.env.VITE_ALCHEMY_KEY}
                />
            </div>
        )
    } else {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center justify-center gap-5 text-wrap bg-bgcol p-32 font-satoshi text-9xl font-bold text-textcol">
                <NavBar hasConnector />
                <form
                    className="mb-4 flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (input) {
                            navigate(`/tokenmanager/${input}`)
                        }
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
                <Footer />
            </div>
        )
    }
}

export default TokenManager
