import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { RebelMintTokenManager } from '../RebelMint/src/RebelMint'
import { NavBar } from '../components/NavBar'
import { setPageTitle } from '../util/setPageTitle'
import Footer from '../components/Footer'
import { RMInfo } from '../RebelMint/src/contract/RMInfo'
import ChainGallery from '../components/ChainGallery'

const TokenManager = () => {
    setPageTitle('Token Manager')
    const { chain, contractAddress } = useParams()
    const [input, setInput] = useState('')

    const network = RMInfo.getNetworkByName(chain as string)
    const chainId = network?.chainId

    if (!chain) {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 text-wrap bg-bgcol p-24 font-satoshi font-bold text-textcol">
                <NavBar hasConnector />
                <h1 className="text-5xl">Token Manager</h1>
                <ChainGallery baseDestination={'tokenmanager'} />
            </div>
        )
    }

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
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center justify-center gap-5 text-wrap bg-bgcol p-32 pb-0 font-satoshi text-9xl font-bold text-textcol">
                <NavBar hasConnector />
                <div className="flex h-[80svh] flex-col items-center justify-center gap-4">
                    <h1 className="w-full text-3xl">Token Manager</h1>
                    <form
                        className="mb-4 flex flex-col items-center gap-2 text-sm md:text-base lg:flex-row"
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (input) {
                                window.location.href = `/tokenmanager/${chain}/${input}`
                            }
                        }}
                    >
                        <input
                            spellCheck={false}
                            className="address-input"
                            placeholder="Contract Address"
                            onChange={(e) => {
                                setInput(e.target.value)
                            }}
                        ></input>
                        <button
                            type="submit"
                            disabled={!input}
                            className="submit-button px-2 py-3"
                        >
                            Load Tokens
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default TokenManager
