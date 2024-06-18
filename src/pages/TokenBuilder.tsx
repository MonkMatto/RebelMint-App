import { useState, useCallback, useRef, useEffect } from 'react'

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
    externalUrl: string
    description: string
    image: string
    animation: string
    traits: Trait[]
    customMetadata: CustomMetadata[]
}

const TokenBuilder = () => {
    const [form, setForm] = useState<FormStruct>({
        name: '',
        artist: '',
        externalUrl: '',
        description: '',
        image: '',
        animation: '',
        traits: [],
        customMetadata: [],
    })

    const [errors, setErrors] = useState<number[]>([])
    const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(
        null
    )
    const [focusedInput, setFocusedInput] = useState<
        | 'name'
        | 'artist'
        | 'externalUrl'
        | 'description'
        | 'image'
        | 'animation'
        | 'trait_type'
        | 'value'
        | 'metadata_key'
        | 'metadata_value'
        | null
    >(null)
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

        setFocusedInput(
            name as
                | 'name'
                | 'artist'
                | 'externalUrl'
                | 'description'
                | 'image'
                | 'animation'
                | 'trait_type'
                | 'metadata_key'
                | 'metadata_value'
                | 'value'
                | null
        )
    }

    const checkForDuplicates = (
        traits: Trait[],
        customMetadata: CustomMetadata[]
    ) => {
        const traitNames = traits.map((trait) => trait.trait_type.toLowerCase())
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
                duplicates.add(index + traits.length)
            }
        })

        return Array.from(duplicates)
    }

    const handleTraitChange = useCallback(
        (
            index: number,
            field: keyof Trait,
            value: string,
            inputType: 'trait_type' | 'value'
        ) => {
            setForm((prevForm) => {
                const newTraits = [...prevForm.traits]
                newTraits[index] = {
                    ...newTraits[index],
                    [field]: value,
                }

                const duplicates = checkForDuplicates(
                    newTraits,
                    prevForm.customMetadata
                )
                setErrors(duplicates)

                return {
                    ...prevForm,
                    traits: newTraits,
                }
            })

            setSelectedInputIndex(index) // Remember the selected input
            setFocusedInput(inputType) // Remember the focused input type
        },
        [form]
    )

    const handleMetadataChange = useCallback(
        (
            index: number,
            field: keyof CustomMetadata,
            value: string,
            inputType: 'metadata_key' | 'metadata_value'
        ) => {
            setForm((prevForm) => {
                const newMetadata = [...prevForm.customMetadata]
                newMetadata[index] = {
                    ...newMetadata[index],
                    [field]: value,
                }

                const duplicates = checkForDuplicates(
                    prevForm.traits,
                    newMetadata
                )
                setErrors(duplicates)

                return {
                    ...prevForm,
                    customMetadata: newMetadata,
                }
            })

            setSelectedInputIndex(index + form.traits.length) // Remember the selected input
            setFocusedInput(inputType) // Remember the focused input type
        },
        [form]
    )

    const addTrait = () => {
        setForm((prevForm) => ({
            ...prevForm,
            traits: [...prevForm.traits, { trait_type: '', value: '' }],
        }))
    }

    const addMetadata = () => {
        setForm((prevForm) => ({
            ...prevForm,
            customMetadata: [
                ...prevForm.customMetadata,
                { key: '', value: '' },
            ],
        }))
    }

    useEffect(() => {
        // Restore focus to the previously focused element
        if (focusedElementRef.current) {
            focusedElementRef.current.focus()
        }
    }, [form])

    const TraitInputs = () => {
        const traitTypeRefs = useRef<(HTMLInputElement | null)[]>([])
        const valueTypeRefs = useRef<(HTMLInputElement | null)[]>([])

        useEffect(() => {
            // Focus on the last edited trait input on render
            if (selectedInputIndex !== null && focusedInput !== null) {
                if (
                    focusedInput === 'trait_type' &&
                    traitTypeRefs.current[selectedInputIndex]
                ) {
                    focusedElementRef.current =
                        traitTypeRefs.current[selectedInputIndex]
                } else if (
                    focusedInput === 'value' &&
                    valueTypeRefs.current[selectedInputIndex]
                ) {
                    focusedElementRef.current =
                        valueTypeRefs.current[selectedInputIndex]
                }
            }
        }, [selectedInputIndex, focusedInput])

        const inputClass =
            'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

        return (
            <div className="mb-12 flex h-fit w-full flex-col gap-5">
                <h1 className="text-2xl font-bold">Traits</h1>
                {form.traits.map((trait, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex gap-5">
                            <input
                                ref={(ref) =>
                                    (traitTypeRefs.current[index] = ref)
                                }
                                className={`${inputClass} ${errors.includes(index) ? 'border-red-500' : ''}`}
                                placeholder="Trait Type"
                                value={trait.trait_type}
                                onChange={(e) =>
                                    handleTraitChange(
                                        index,
                                        'trait_type',
                                        e.target.value,
                                        'trait_type'
                                    )
                                }
                            />
                            <input
                                ref={(ref) =>
                                    (valueTypeRefs.current[index] = ref)
                                }
                                className={`${inputClass} ${errors.includes(index) ? 'border-red-500' : ''}`}
                                placeholder="Value"
                                value={trait.value}
                                onChange={(e) =>
                                    handleTraitChange(
                                        index,
                                        'value',
                                        e.target.value,
                                        'value'
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
                {errors.some((index) => index < form.traits.length) && (
                    <p className="text-red-500">
                        Trait keys must be unique and cannot match form keys or
                        custom metadata keys.
                    </p>
                )}
                <button
                    className="border-textcol w-1/3 rounded-lg border-2 p-3 hover:invert-[10%] active:invert-[20%]"
                    type="button"
                    onClick={addTrait}
                >
                    Add Trait
                </button>
            </div>
        )
    }

    const CustomMetadataInputs = () => {
        const metadataKeyRefs = useRef<(HTMLInputElement | null)[]>([])
        const metadataValueRefs = useRef<(HTMLInputElement | null)[]>([])

        useEffect(() => {
            // Focus on the last edited metadata input on render
            if (
                focusedInput === 'metadata_key' ||
                focusedInput === 'metadata_value'
            ) {
                const lastEditedIndex =
                    focusedInput === 'metadata_key'
                        ? metadataKeyRefs.current.length - 1
                        : metadataValueRefs.current.length - 1

                if (
                    focusedInput === 'metadata_key' &&
                    metadataKeyRefs.current[lastEditedIndex]
                ) {
                    focusedElementRef.current =
                        metadataKeyRefs.current[lastEditedIndex]
                } else if (
                    focusedInput === 'metadata_value' &&
                    metadataValueRefs.current[lastEditedIndex]
                ) {
                    focusedElementRef.current =
                        metadataValueRefs.current[lastEditedIndex]
                }
            }
        }, [focusedInput])

        const inputClass =
            'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

        return (
            <div className="mb-12 flex h-fit w-full flex-col gap-5">
                <h1 className="text-2xl font-bold">Custom Metadata</h1>
                {form.customMetadata.map((metadata, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex gap-5">
                            <input
                                ref={(ref) =>
                                    (metadataKeyRefs.current[index] = ref)
                                }
                                className={`${inputClass} ${errors.includes(index + form.traits.length) ? 'border-red-500' : ''}`}
                                placeholder="Metadata Key"
                                value={metadata.key}
                                onChange={(e) =>
                                    handleMetadataChange(
                                        index,
                                        'key',
                                        e.target.value,
                                        'metadata_key'
                                    )
                                }
                            />
                            <input
                                ref={(ref) =>
                                    (metadataValueRefs.current[index] = ref)
                                }
                                className={`${inputClass} ${errors.includes(index + form.traits.length) ? 'border-red-500' : ''}`}
                                placeholder="Metadata Value"
                                value={metadata.value}
                                onChange={(e) =>
                                    handleMetadataChange(
                                        index,
                                        'value',
                                        e.target.value,
                                        'metadata_value'
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}
                {errors.some((index) => index >= form.traits.length) && (
                    <p className="text-red-500">
                        Metadata keys must be unique and cannot match form keys
                        or trait keys.
                    </p>
                )}
                <button
                    className="border-textcol w-1/3 rounded-lg border-2 p-3 hover:invert-[10%] active:invert-[20%]"
                    type="button"
                    onClick={addMetadata}
                >
                    Add Metadata
                </button>
            </div>
        )
    }

    const metadata = JSON.stringify(form, null, 2)
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(metadata)
    }

    const inputClass = 'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

    return (
        <div className="bg-bgcol text-textcol mint-h-[100svh] font-satoshi flex h-fit w-full flex-col items-center p-24">
            <h1 className="mt-5 w-full text-5xl font-bold">
                Token Metadata Builder
            </h1>
            <p className="text-md mb-10 mt-5 w-full">
                Use this form to generate the JSON for your tokenURI metadata
                object. Use complete URLs, and avoid special characters.
            </p>
            <form className="flex w-full flex-col gap-5">
                <div className="flex w-full gap-5">
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
                        name="externalUrl"
                        placeholder="External URL"
                        value={form.externalUrl}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    className="border-textcol bg-bgcol h-[40svh] w-full rounded-lg border-2 p-3"
                    name="description"
                    placeholder="Token Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <div className="mb-8 flex gap-5">
                    <input
                        className={inputClass}
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                    />
                    <input
                        className={inputClass}
                        name="animation"
                        placeholder="Animation or HTML URL (optional)"
                        value={form.animation}
                        onChange={handleChange}
                    />
                </div>
                <TraitInputs />
                <CustomMetadataInputs />
            </form>

            <div
                id="metadata-display"
                onClick={copyToClipboard}
                className="border-textcol h-fit min-h-10 w-full cursor-copy rounded-lg border-2 p-3 hover:invert-[10%] active:invert-[20%]"
            >
                {metadata}
            </div>
        </div>
    )
}

export default TokenBuilder
