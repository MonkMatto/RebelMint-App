import { useState, useEffect } from 'react'
import versionData from '../data/versionData'
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWalletClient,
} from 'wagmi'
import { sepolia, mainnet, base, baseSepolia } from 'wagmi/chains'

const versions = ['v0j0'] as const
const chains = {
    mainnet: mainnet,
    sepolia: sepolia,
    base: base,
    baseSepolia: baseSepolia,
} as const

type Version = (typeof versions)[number]
type ChainKey = keyof typeof chains

const ContractBuilderPage = () => {
    const [version, setVersion] = useState<Version>(versions[0])
    const [chainSelected, setChainSelected] = useState<ChainKey>('sepolia')
    const [contractAddress, setContractAddress] = useState<string | null>(null)
    const [recentHash, setRecentHash] = useState<`0x${string}` | undefined>(
        undefined
    )
    const chain = chains[chainSelected]

    const scanURL = chain ? chain.blockExplorers.default.url : ''
    const chainId = chain.id

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'version') setVersion(e.target.value as Version)
        if (e.target.name === 'chain')
            setChainSelected(e.target.value as ChainKey)
    }

    const {
        data: receipt,
        isSuccess,
        isPending,
    } = useWaitForTransactionReceipt({
        hash: recentHash,
    })

    const { data: walletClient } = useWalletClient({ chainId })
    const { ABI, bytecode } = versionData[version]
    const { address } = useAccount()
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
            console.log(scanURL + '/tx/' + recentHash)
            setRecentHash(hash)
        } catch (error) {
            console.error('Error deploying contract:', error)
        }
    }
    const createContract = () => {
        console.log(`Creating contract version ${version} on ${chain.name}`)
        onSubmit()
    }

    useEffect(() => {
        if (receipt?.contractAddress) {
            setContractAddress(receipt.contractAddress)
        }
        // Log link to transaction
        console.log(scanURL + '/tx/' + recentHash)
    }, [receipt, recentHash])

    return (
        <div className="bg-bgcol text-textcol font-satoshi flex h-fit min-h-[100svh] w-full flex-col items-center gap-5 p-24">
            <div className="fixed right-0 top-0 m-5">
                <w3m-button balance="hide" />
            </div>
            <h1 className="mt-5 w-full text-5xl font-bold">
                Create New RebelMint Contract
            </h1>
            <p className="text-md mb-10 mt-5 w-full">
                Creates a new RebelMint Contract on the chain of your choosing
            </p>
            <div className="flex w-full gap-5">
                <select
                    name="version"
                    value={version}
                    onChange={handleChange}
                    className="bg-bgcol border-textcol h-fit flex-1 rounded-lg border-2 p-5"
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
                <select
                    name="chain"
                    value={chainSelected}
                    onChange={handleChange}
                    className="bg-bgcol border-textcol h-fit flex-1 rounded-lg border-2 p-5"
                >
                    {Object.keys(chains).map((option) => (
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
            <button
                onClick={createContract}
                className="bg-textcol border-bgcol text-bgcol h-fit w-full rounded-lg border-2 p-5 font-bold"
            >
                Create Contract
            </button>
            {isPending && recentHash && (
                <div className="flex h-24 w-52 items-center justify-center bg-yellow-400 text-center">
                    Pending
                </div>
            )}
            {isSuccess && (
                <a href={scanURL + '/tx/' + recentHash} target="_blank">
                    <div className="flex h-24 w-52 items-center justify-center bg-green-400 text-center">
                        {` Success, View Transaction On ${chain.blockExplorers.default.name}`}
                    </div>
                </a>
            )}
            {contractAddress && (
                <a
                    href={scanURL + '/address/' + contractAddress}
                    target="_blank"
                >
                    <div className="flex h-24 w-52 items-center justify-center bg-blue-400 text-center">
                        {`Contract Address: ${contractAddress} /n View On ${chain.blockExplorers.default.name}`}
                    </div>
                </a>
            )}
        </div>
    )
}

export default ContractBuilderPage
