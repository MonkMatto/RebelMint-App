import { useState, useRef, useEffect, useCallback } from 'react'
import TraitInputs from '../components/TraitInputs'
import CustomMetadataInputs from '../components/CustomMetadataInputs'
import TokenPreview from '../components/TokenPreview'
import { downloadJSON, removeSpaces } from '../util/handleJson'
import { NavBar } from '../components/NavBar'
import { setPageTitle } from '../util/setPageTitle'
import Footer from '../components/Footer'

interface Trait {
    trait_type: string
    value: string
}

interface CustomMetadata {
    key: string
    value: string
}

interface FormStruct {
    name: string
    artist: string
    external_url: string
    description: string
    image: string
    animation_url: string
    attributes: Trait[]
    customMetadata: CustomMetadata[]
    [key: string]: any // Allows for custom metadata fields
}

const MetadataBuilder = () => {
    setPageTitle('Metadata Builder')
    const [form, setForm] = useState<FormStruct>({
        name: '',
        artist: '',
        external_url: '',
        description: '',
        image: '',
        animation_url: '',
        attributes: [],
        customMetadata: [], // Initialize custom metadata
    })

    const [errors, setErrors] = useState<number[]>([])
    const [focusedInput, setFocusedInput] = useState<string | null>(null)
    const focusedElementRef = useRef<
        HTMLInputElement | HTMLTextAreaElement | null
    >(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
        setFocusedInput(name)
    }

    const checkForDuplicates = (
        attributes: Trait[],
        customMetadata: CustomMetadata[]
    ) => {
        const traitNames = attributes.map((trait) =>
            trait.trait_type.toLowerCase()
        )
        const metadataKeys = customMetadata.map((metadata) =>
            metadata.key.toLowerCase()
        )
        const formKeys = Object.keys(form).map((key) => key.toLowerCase())

        const duplicates = new Set<number>()

        traitNames.forEach((name, index) => {
            if (
                traitNames.indexOf(name) !== index ||
                metadataKeys.includes(name) ||
                formKeys.includes(name)
            ) {
                duplicates.add(index)
            }
        })

        metadataKeys.forEach((key, index) => {
            if (
                metadataKeys.indexOf(key) !== index ||
                traitNames.includes(key) ||
                formKeys.includes(key)
            ) {
                duplicates.add(index + attributes.length)
            }
        })

        return Array.from(duplicates)
    }

    const handleTraitChange = useCallback(
        (index: number, field: keyof Trait, value: string) => {
            setForm((prevForm) => {
                const newAttributes = [...prevForm.attributes]
                newAttributes[index] = {
                    ...newAttributes[index],
                    [field]: value,
                }

                const duplicates = checkForDuplicates(
                    newAttributes,
                    form.customMetadata || []
                )
                setErrors(duplicates)

                return {
                    ...prevForm,
                    attributes: newAttributes,
                }
            })
            setFocusedInput(`attribute-${index}-${field}`)
        },
        [form]
    )

    const handleMetadataChange = useCallback(
        (index: number, field: keyof CustomMetadata, value: string) => {
            setForm((prevForm) => {
                const newMetadata = [...(prevForm.customMetadata || [])]
                newMetadata[index] = {
                    ...newMetadata[index],
                    [field]: value,
                }

                const duplicates = checkForDuplicates(
                    prevForm.attributes,
                    newMetadata
                )
                setErrors(duplicates)

                return {
                    ...prevForm,
                    customMetadata: newMetadata,
                }
            })
            setFocusedInput(`metadata-${index}-${field}`)
        },
        [form]
    )

    const addTrait = () => {
        setForm((prevForm) => ({
            ...prevForm,
            attributes: [...prevForm.attributes, { trait_type: '', value: '' }],
        }))
        setFocusedInput(`attribute-${form.attributes.length}-trait_type`)
    }

    const addMetadata = () => {
        setForm((prevForm) => ({
            ...prevForm,
            customMetadata: [
                ...(prevForm.customMetadata || []),
                { key: '', value: '' },
            ],
        }))
        setFocusedInput(`metadata-${form.customMetadata.length}-key`)
    }

    useEffect(() => {
        const [type, field] = (focusedInput || '').split('-')
        let targetRef = null
        if (type === 'attribute') {
            targetRef =
                field === 'trait_type'
                    ? focusedElementRef.current
                    : focusedElementRef.current
        } else if (type === 'metadata') {
            targetRef =
                field === 'metadata_key'
                    ? focusedElementRef.current
                    : focusedElementRef.current
        } else {
            targetRef = document.querySelector(`[name="${focusedInput}"]`)
        }
        if (targetRef) {
            ;(targetRef as HTMLInputElement | HTMLTextAreaElement).focus()
        }
    }, [form])

    const prepareMetadataForExport = () => {
        const { customMetadata, attributes, ...rest } = form

        // Filter out attributes with empty trait_type or value
        const filteredAttributes = attributes.filter(
            (attr) => attr.trait_type && attr.value
        )

        // Prepare the metadata object with official fields first
        const metadata: { [key: string]: any } = {}

        // Add other fields from the form if they have a value
        Object.keys(rest).forEach((key) => {
            if (rest[key]) {
                metadata[key] = rest[key]
            }
        })

        // Add non-empty attributes array if there are attributes
        if (filteredAttributes.length > 0) {
            metadata.attributes = filteredAttributes
        }

        // Append custom metadata
        customMetadata.forEach((item) => {
            if (item.key && item.value) {
                metadata[item.key] = item.value
            }
        })

        return JSON.stringify(metadata, null, 2)
    }

    const inputClass = 'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

    const metadata = prepareMetadataForExport()
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(metadata)
    }

    const handleDownload = () => {
        downloadJSON(metadata, removeSpaces(form.name) + '_metadata')
    }

    return (
        <div className="mint-h-[100svh] flex h-fit w-full flex-col items-center bg-bgcol p-4 font-satoshi text-textcol md:p-24">
            <NavBar />

            <h1 className="mt-5 w-full text-5xl font-bold">
                Token Metadata Builder
            </h1>
            <p className="text-md mb-10 mt-5 w-full">
                Use this form to generate the JSON for your tokenURI metadata
                object. Use complete URLs, and avoid special characters.
            </p>
            <form className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-wrap gap-5">
                    <input
                        className={inputClass}
                        name="name"
                        placeholder="Title"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="artist"
                        placeholder="Artist"
                        value={form.artist}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="external_url"
                        placeholder="External URL"
                        value={form.external_url}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    className={`${inputClass} h-[40svh] w-full rounded-lg border-2 border-textcol p-3`}
                    name="description"
                    placeholder="Token Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <div className="mb-8 flex flex-wrap gap-5">
                    <input
                        className={inputClass}
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="animation_url"
                        placeholder="Animation or HTML URL (optional)"
                        value={form.animation_url}
                        onChange={handleChange}
                    />
                </div>
                <TraitInputs
                    attributes={form.attributes}
                    errors={errors}
                    handleTraitChange={handleTraitChange}
                    addTrait={addTrait}
                    focusedElementRef={focusedElementRef}
                    setFocusedInput={setFocusedInput}
                />
                <CustomMetadataInputs
                    customMetadata={form.customMetadata}
                    errors={errors}
                    handleMetadataChange={handleMetadataChange}
                    addMetadata={addMetadata}
                    focusedElementRef={focusedElementRef}
                    setFocusedInput={setFocusedInput}
                />
            </form>
            <h1 className="mb-6 mt-5 w-full text-5xl font-bold">
                Metadata Output
            </h1>
            <div
                id="metadata-display"
                onClick={copyToClipboard}
                className="mb-4 h-fit min-h-10 w-full cursor-copy overflow-hidden text-wrap rounded-lg border-2 border-textcol p-3 hover:invert-[10%] active:invert-[20%]"
            >
                {metadata}
            </div>
            <button
                onClick={handleDownload}
                className="mb-24 w-fit rounded-lg border bg-textcol p-4 font-medium text-bgcol"
            >
                Download JSON
            </button>
            <h1 className="mb-6 w-full text-5xl font-bold">Token Preview</h1>
            <TokenPreview metadata={metadata} />
            <Footer />
        </div>
    )
}

export default MetadataBuilder
