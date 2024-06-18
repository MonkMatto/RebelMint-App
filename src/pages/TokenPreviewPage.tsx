import { useState } from 'react'
import TokenPreview from '../components/TokenPreview'

const TokenPreviewPage = () => {
    const [metadata, setMetadata] = useState('{}')
    const [isValidJSON, setIsValidJSON] = useState<boolean>(true)
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        try {
            JSON.parse(value)
            setMetadata(value)
            setIsValidJSON(true)
        } catch (error) {
            setMetadata(value)
            setIsValidJSON(false)
        }
    }
    console.log(metadata)
    return (
        <div className="bg-bgcol text-textcol font-satoshi flex h-fit min-h-[100svh] w-full flex-col items-center p-24">
            <h1 className="mt-5 w-full text-5xl font-bold">Token Previewer</h1>
            <p className="text-md mb-10 mt-5 w-full">
                Input metadata and see a token preview
            </p>
            <textarea
                id="metadata-display"
                placeholder="{...someMetadata}"
                onChange={handleChange}
                className={`${isValidJSON ? 'border-textcol' : 'border-red-500 focus:outline-none'} bg-bgcol mb-24 h-fit min-h-10 w-full rounded-lg border-2 p-3`}
                value={metadata}
            />

            <TokenPreview metadata={isValidJSON ? metadata : '{}'} />
        </div>
    )
}

export default TokenPreviewPage
