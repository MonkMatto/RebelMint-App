import { useState } from 'react'
import TokenPreview from '../components/TokenPreview'
import { NavBar } from '../components/NavBar'
import { setPageTitle } from '../util/setPageTitle'
import Footer from '../components/Footer'

const MetadataPreviewPage = () => {
    setPageTitle('Metadata Preview')
    const [metadata, setMetadata] = useState('{}')
    const [link, setLink] = useState('')
    const [isLinkError, setIsLinkError] = useState(false)
    const [isValidJSON, setIsValidJSON] = useState<boolean>(true)
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        if (e.target.name == 'data') {
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

        if (e.target.name == 'link') {
            setLink(e.target.value)
        }
    }

    const fetchJsonFromUri = async (uri: string) => {
        try {
            const response = await fetch(uri)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            console.log(data)
            setMetadata(JSON.stringify(data))
            setIsLinkError(false)
        } catch (error) {
            console.error('Error fetching JSON:', error)
            setIsLinkError(true)
            throw error
        }
    }

    console.log(metadata)
    return (
        <div className="flex h-fit min-h-[100svh] w-full flex-col items-center bg-bgcol p-32 font-satoshi text-textcol">
            <NavBar hasNewShop={true} />
            <h1 className="mt-5 w-full text-5xl font-bold">
                Metadata Previewer
            </h1>
            <p className="text-md mb-10 mt-5 w-full">
                Input metadata and see a token preview
            </p>
            <h3 className="w-full text-2xl font-bold">Paste URI:</h3>
            <div className="mb-5 flex h-fit w-full items-center gap-4">
                <input
                    name="link"
                    id="metadata-uri-display"
                    placeholder="Paste URI Link"
                    onChange={handleChange}
                    className={`h-full min-h-10 w-full rounded-lg border-2 border-textcol bg-bgcol p-3`}
                    value={link}
                />
                <button
                    onClick={() => fetchJsonFromUri(link)}
                    className="h-full w-1/3 rounded-lg bg-base-50 p-4 text-base-950 hover:bg-base-100"
                >
                    Fetch Data
                </button>
            </div>
            {isLinkError && (
                <p className="mb-16 text-sm text-red-500">
                    Error fetching from that URL
                </p>
            )}
            <h3 className="mb-4 w-full text-2xl font-bold">
                Or paste data directly:
            </h3>
            <textarea
                name="data"
                id="metadata-display"
                placeholder="{...someMetadata}"
                onChange={handleChange}
                className={`${isValidJSON ? 'border-textcol' : 'border-red-500 focus:outline-none'} mb-24 h-fit min-h-10 w-full resize-none rounded-lg border-2 bg-bgcol p-3`}
                value={metadata}
            />

            <TokenPreview metadata={isValidJSON ? metadata : '{}'} />
            <Footer />
        </div>
    )
}

export default MetadataPreviewPage
