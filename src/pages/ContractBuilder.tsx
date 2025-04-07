import { useState, useEffect } from 'react'
import versionData from '../data/versionData'
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWalletClient,
} from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { NavBar } from '../components/NavBar'
import { setPageTitle } from '../util/setPageTitle'
import ChainGallery from '../components/ChainGallery'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { RMInfo } from '../RebelMint/src/contract/ChainsData'

const versions = ['v0j0'] as const
type Version = (typeof versions)[number]

const ContractBuilderPage = () => {
    setPageTitle('New Shop')
    const { address, chain, isConnected } = useAccount()
    const { open } = isConnected ? useWeb3Modal() : { open: () => {} }
    const rmInfo = new RMInfo()
    const { chain: chainParam } = useParams()
    const chainId = chainParam
        ? rmInfo.getNetworkByName(chainParam as string)?.chainId
        : chain?.id

    const { data: walletClient } = useWalletClient({ chainId: chainId })
    const [version, setVersion] = useState<Version>(versions[0])
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [contractAddress, setContractAddress] = useState<string | null>(null)
    const [recentHash, setRecentHash] = useState<`0x${string}` | undefined>(
        undefined
    )
    const getSubdomain = () => {
        const host = window.location.hostname
        const parts = host.split('.')

        if (parts[0].length > 2) {
            return parts[0]
        }

        return null
    }

    const subdomain = getSubdomain()

    const scanURL =
        chain && chain.blockExplorers ? chain.blockExplorers.default.url : ''

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'version') setVersion(e.target.value as Version)
    }

    const {
        data: receipt,
        isSuccess,
        isPending,
    } = useWaitForTransactionReceipt({
        hash: recentHash,
    })

    const { ABI, bytecode } = versionData[version]

    async function onSubmit() {
        if (!walletClient) {
            console.error('Wallet client not available')
            return
        }

        if (!ABI || !bytecode) {
            console.error('ABI or bytecode not available')
            return
        }

        try {
            const hash: `0x${string}` | undefined =
                await walletClient.deployContract({
                    abi: ABI,
                    account: address,
                    bytecode: bytecode as `0x${string}`,
                    args: [],
                })
            console.log(hash)
            console.log(scanURL + '/tx/' + hash)
            setRecentHash(hash)
        } catch (error) {
            console.error('Error deploying contract:', error)
        }
    }
    const createContract = () => {
        console.log(`Creating contract version ${version} on ${chain?.name}`)
        onSubmit()
    }

    useEffect(() => {
        if (receipt?.contractAddress) {
            setContractAddress(receipt.contractAddress)
        }
        // Log link to transaction
        console.log(scanURL + '/tx/' + recentHash)
    }, [receipt, recentHash])

    if (!chainParam) {
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 text-wrap bg-bgcol p-24 font-satoshi text-9xl font-bold text-textcol">
                <NavBar />

                <ChainGallery baseDestination={'createcontract'} />
            </div>
        )
    }

    if (!isConnected || !chain || chain?.id !== chainId) {
        const intendedChain = rmInfo.getNetworkByName(chainParam)
        return (
            <div className="flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 text-wrap bg-bgcol p-24 font-satoshi text-9xl font-bold text-textcol">
                <NavBar />
                <span className="text-justify leading-[10rem]">
                    <span
                        onClick={() => {
                            open()
                        }}
                    >
                        Please Connect Wallet with{' '}
                    </span>
                    <a href={intendedChain?.explorer} target="_blank">
                        <span className="text-red-500">
                            {intendedChain?.displayName}
                        </span>
                    </a>
                    <span> to use the RebelMint Contract Creator</span>
                </span>
            </div>
        )
    }

    return (
        <div className="flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 bg-bgcol p-24 pb-0 pt-32 font-satoshi text-textcol">
            <NavBar />
            {!recentHash && (
                <div className="flex h-fit w-full flex-col gap-5">
                    <h1 className="mt-5 w-full text-5xl font-bold">
                        Create New RebelMint Contract
                    </h1>
                    <p className="text-md mb-10 mt-5 w-full">
                        Creates a new RebelMint Contract on the chain of your
                        choosing
                    </p>

                    <div className="flex w-full gap-5">
                        <select
                            name="version"
                            value={version}
                            onChange={handleChange}
                            className="h-fit flex-1 rounded-lg border-2 border-textcol bg-bgcol p-5"
                        >
                            {versions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                    className="font-bold"
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <input
                            id="termsCheckbox"
                            type="checkbox"
                            onClick={() => setAcceptedTerms(!acceptedTerms)}
                            checked={acceptedTerms}
                        />
                        <label htmlFor="termsCheckbox">
                            Agree to the{' '}
                            <a
                                href="/tos"
                                target="_blank"
                                className="underline"
                            >
                                Terms of Use
                            </a>
                        </label>
                    </div>

                    <button
                        onClick={createContract}
                        disabled={
                            recentHash != undefined || acceptedTerms != true
                        }
                        className="h-fit w-full rounded-lg border-2 border-bgcol bg-textcol p-5 font-bold text-bgcol disabled:invert-[30%]"
                    >
                        {`Create Contract on ${chain?.name}`}
                    </button>
                </div>
            )}
            {isPending && recentHash && !isSuccess && (
                <div className="mt-24 flex h-fit w-full flex-col items-center justify-center gap-5 p-5">
                    <h1>{`Please do not refresh or leave the page`}</h1>
                    <div className="flex h-24 w-52 items-center justify-center rounded-lg bg-yellow-200 text-center text-bgcol">
                        {`Deploying Contract to ${chain?.name}...`}
                    </div>
                </div>
            )}
            {isSuccess && contractAddress && (
                <div className="flex h-[60svh] flex-col items-center justify-center gap-12">
                    <div className="flex items-center justify-center text-center text-9xl font-bold">
                        {`CONTRACT DEPLOYED`}
                    </div>
                    <a href={scanURL + '/tx/' + recentHash} target="_blank">
                        <div className="flex h-fit w-fit items-center justify-center rounded-lg p-1 text-center">
                            {`View Transaction On ${chain && chain.blockExplorers ? chain.blockExplorers.default.name : ''}`}
                        </div>
                    </a>

                    <a
                        href={scanURL + '/address/' + contractAddress}
                        target="_blank"
                    >
                        <div className="flex h-24 w-fit items-center justify-center rounded-lg border-2 border-textcol p-5 text-center font-bold">
                            {`View Contract On ${chain && chain.blockExplorers ? chain.blockExplorers.default.name : ''}`}
                        </div>
                    </a>
                    <a href={`/editcontract/${chainParam}/${contractAddress}`}>
                        <div className="flex h-24 w-fit items-center justify-center rounded-lg border-2 border-textcol bg-textcol p-5 text-center text-3xl font-bold text-bgcol">
                            {`Next Step: Set Up Details`}
                            <img src="arrowright.svg" />
                        </div>
                    </a>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default ContractBuilderPage
