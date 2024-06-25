import { useEffect, useRef } from 'react'

interface Trait {
    trait_type: string
    value: string
}

interface TraitInputsProps {
    attributes: Trait[]
    errors: number[]
    handleTraitChange: (
        index: number,
        field: keyof Trait,
        value: string,
        inputType: 'trait_type' | 'value'
    ) => void
    addTrait: () => void
    focusedElementRef: React.MutableRefObject<
        HTMLInputElement | HTMLTextAreaElement | null
    >
    setFocusedInput: (input: string | null) => void
}

const TraitInputs: React.FC<TraitInputsProps> = ({
    attributes,
    errors,
    handleTraitChange,
    addTrait,
    focusedElementRef,
    setFocusedInput,
}) => {
    const traitTypeRefs = useRef<(HTMLInputElement | null)[]>([])
    const valueTypeRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (focusedElementRef.current) {
            focusedElementRef.current.focus()
        }
    }, [focusedElementRef.current])

    const inputClass = 'flex-1 p-3 border-2 bg-bgcol border-textcol rounded-lg'

    return (
        <div className="mb-12 flex h-fit w-full flex-col gap-5">
            <h1 className="text-2xl font-bold">Traits</h1>
            {attributes.map((trait, index) => (
                <div key={index} className="flex flex-col gap-1">
                    <div className="flex gap-5">
                        <input
                            ref={(ref) => (traitTypeRefs.current[index] = ref)}
                            className={`${inputClass} ${errors.includes(index) ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Trait Type"
                            value={trait.trait_type}
                            onChange={(e) => {
                                handleTraitChange(
                                    index,
                                    'trait_type',
                                    e.target.value,
                                    'trait_type'
                                )
                                setFocusedInput(`trait-${index}-trait_type`)
                                focusedElementRef.current =
                                    traitTypeRefs.current[index]
                            }}
                        />
                        <input
                            ref={(ref) => (valueTypeRefs.current[index] = ref)}
                            className={`${inputClass} ${errors.includes(index) ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Value"
                            value={trait.value}
                            onChange={(e) => {
                                handleTraitChange(
                                    index,
                                    'value',
                                    e.target.value,
                                    'value'
                                )
                                setFocusedInput(`trait-${index}-value`)
                                focusedElementRef.current =
                                    valueTypeRefs.current[index]
                            }}
                        />
                    </div>
                </div>
            ))}
            {errors.some((error) => error < attributes.length) && (
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

export default TraitInputs
