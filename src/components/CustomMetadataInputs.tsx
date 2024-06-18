import { useEffect, useRef } from 'react'

interface CustomMetadata {
    key: string
    value: string
}

interface CustomMetadataInputsProps {
    customMetadata: CustomMetadata[]
    errors: number[]
    handleMetadataChange: (
        index: number,
        field: keyof CustomMetadata,
        value: string,
        inputType: 'metadata_key' | 'metadata_value'
    ) => void
    addMetadata: () => void
    focusedElementRef: React.MutableRefObject<
        HTMLInputElement | HTMLTextAreaElement | null
    >
    setFocusedInput: (input: string | null) => void
}

const CustomMetadataInputs: React.FC<CustomMetadataInputsProps> = ({
    customMetadata,
    errors,
    handleMetadataChange,
    addMetadata,
    focusedElementRef,
    setFocusedInput,
}) => {
    const metadataKeyRefs = useRef<(HTMLInputElement | null)[]>([])
    const metadataValueRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (focusedElementRef.current) {
            focusedElementRef.current.focus()
        }
    }, [focusedElementRef.current])

    const inputClass = 'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

    return (
        <div className="mb-12 flex h-fit w-full flex-col gap-5">
            <h1 className="text-2xl font-bold">Custom Metadata</h1>
            {customMetadata.map((metadata, index) => (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex gap-5">
                        <input
                            ref={(ref) =>
                                (metadataKeyRefs.current[index] = ref)
                            }
                            className={`${inputClass} ${errors.includes(index + customMetadata.length) ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Metadata Key"
                            value={metadata.key}
                            onChange={(e) => {
                                handleMetadataChange(
                                    index,
                                    'key',
                                    e.target.value,
                                    'metadata_key'
                                )
                                setFocusedInput(`metadata-${index}-key`)
                                focusedElementRef.current =
                                    metadataKeyRefs.current[index]
                            }}
                        />
                        <input
                            ref={(ref) =>
                                (metadataValueRefs.current[index] = ref)
                            }
                            className={`${inputClass} ${errors.includes(index + customMetadata.length) ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Metadata Value"
                            value={metadata.value}
                            onChange={(e) => {
                                handleMetadataChange(
                                    index,
                                    'value',
                                    e.target.value,
                                    'metadata_value'
                                )
                                setFocusedInput(`metadata-${index}-value`)
                                focusedElementRef.current =
                                    metadataValueRefs.current[index]
                            }}
                        />
                    </div>
                </div>
            ))}
            {errors.some((error) => error >= customMetadata.length) && (
                <p className="text-red-500">
                    Metadata keys must be unique and cannot match form keys or
                    trait keys.
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

export default CustomMetadataInputs
