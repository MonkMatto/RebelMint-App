// TokenPreview.tsx

import { Display } from '../RebelMint/src/components/PopUp/Display'
import { PopUpInfo } from '../RebelMint/src/components/PopUp/PopUpInfo'

interface TokenPreviewInputs {
    metadata: string
}

interface Trait {
    trait_type: string
    value: string
}

interface FormStruct {
    name: string
    artist?: string
    created_by?: string
    external_url?: string
    description: string
    image: string
    animation_url?: string
    attributes: Trait[]
    [key: string]: any // Allows for custom metadata fields
}

function objectToStringArray<T extends Record<string, any>>(obj: T): string[] {
    const result: string[] = []
    Object.entries(obj).forEach(([key, value]) => {
        result.push(`${key}: ${String(value)}`)
    })
    return result
}

const filterKeys = (obj: FormStruct) => {
    const keysToExclude = [
        'name',
        'artist',
        'created_by',
        'external_url',
        'description',
        'image',
        'animation_url',
        'attributes',
    ]

    const result: { [key: string]: any } = {}
    for (const key in obj) {
        if (!keysToExclude.includes(key)) {
            result[key] = obj[key]
        }
    }

    return result
}

export const TokenPreview = ({ metadata }: TokenPreviewInputs) => {
    const token = JSON.parse(metadata) as FormStruct
    const customData = objectToStringArray(filterKeys(token))

    // Transform the FormStruct object to match the selection shape expected by PopUpInfo
    const selection = {
        ...token,
        created_by: token.artist || token.created_by,
    }

    function AllCustomData() {
        if (customData && customData[0]) {
            return (
                <div className="mt-auto flex flex-wrap gap-2 justify-self-end overflow-y-auto">
                    {customData.map((a, index: number) => (
                        <div
                            key={index}
                            className="flex w-fit rounded-lg bg-card p-2"
                        >
                            <p key={index}>{`${a}`}</p>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
            <div
                id="OM-popup-window"
                className="flex h-[90svh] w-full flex-col justify-between overflow-y-auto rounded-lg bg-bghover p-5 lg:h-fit"
            >
                <div className="flex w-full flex-col bg-base-800">
                    <div
                        id="OM-popup-token-card"
                        className="flex h-fit w-full flex-col items-center gap-12 lg:flex-row lg:items-start"
                    >
                        <div className="flex aspect-square h-full w-full items-center justify-center">
                            <Display
                                image={token.image}
                                animation_url={token.animation_url}
                            />
                        </div>

                        <PopUpInfo selection={selection} />
                    </div>
                </div>
            </div>
            {customData && customData[0] && (
                <div className="mt-12 flex w-full flex-col gap-5">
                    <h3 className="text-3xl font-bold">Custom Data:</h3>
                    <AllCustomData />
                </div>
            )}
        </div>
    )
}

export default TokenPreview
