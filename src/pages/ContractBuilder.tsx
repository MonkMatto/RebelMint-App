import { useState, useEffect } from 'react'
import versionData from '../data/versionData'
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWalletClient,
} from 'wagmi'
import { sepolia, mainnet, base, baseSepolia } from 'wagmi/chains'

const ContractBuilderPage = () => {
    const versions = ['v0j0']
    const chains = {
        mainnet: mainnet,
        sepolia: sepolia,
        base: base,
        baseSepolia: baseSepolia,
    }
    const [version, setVersion] = useState(versions[0])
    const [chain, setChain] = useState('sepolia')
    const scanURL = chains[chain]
        ? chains[chain].blockExplorers.default.url
        : ''

    const chainName = chains[chain].name
    console.log(scanURL)
    const [contractAddress, setContractAddress] = useState<string | null>(null)
    const chainId = chains[chain].id
    const [recentHash, setRecentHash] = useState<`0x${string}` | undefined>(
        undefined
    )
    const { ABI, bytecode } = versionData[version]
    const { address } = useAccount()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'version') setVersion(e.target.value)
        if (e.target.name === 'chain') setChain(e.target.value)
    }

    const {
        data: receipt,
        isSuccess,
        isPending,
    } = useWaitForTransactionReceipt({
        hash: recentHash,
    })

    const { data: walletClient } = useWalletClient({ chainId })

    useEffect(() => {
        if (isSuccess && receipt?.contractAddress) {
            console.log('New contract deployed at:', receipt.contractAddress)
            setContractAddress(receipt.contractAddress)
        }
    }, [isSuccess, receipt])

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
        console.log(`Creating contract version ${version} on ${chain}`)
        onSubmit()
    }

    useEffect(() => {
        console.log(scanURL + '/tx/' + recentHash)
    }, [recentHash])

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
                    value={chain}
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
            {isPending && (
                <div className="flex h-24 w-52 items-center justify-center bg-yellow-400 text-center">
                    Pending
                </div>
            )}
            {isSuccess && (
                <a href={scanURL + '/tx/' + recentHash}>
                    <div className="flex h-24 w-52 items-center justify-center bg-green-400 text-center">
                        Success
                    </div>
                </a>
            )}
        </div>
    )
}

export default ContractBuilderPage
