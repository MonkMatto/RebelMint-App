import { traitStruct } from '../RebelMint/src/contract/typeInterfacing'

interface TokenPreviewInputs {
    metadata: string
}

interface Trait {
    trait_type: string
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
    const {
        name,
        image,
        description,
        attributes,
        animation_url,
        artist,
        external_url,
    } = token
    const style = {
        '--image-url': ` url(${image})`,
    } as React.CSSProperties

    const customData = objectToStringArray(filterKeys(token))
    console.log(customData)

    const openInNewTab = () => {
        window.open(
            animation_url ? animation_url : image,
            '_blank',
            'noreferrer'
        )
    }

    function AllTraits() {
        if (attributes && attributes[0]) {
            return (
                <div className="mt-auto flex flex-wrap gap-2 justify-self-end overflow-y-auto">
                    {attributes.map((a: traitStruct, index: number) => (
                        <div
                            key={index}
                            className="flex w-fit rounded-lg bg-card p-2"
                        >
                            <p key={index}>{`${a.trait_type}: ${a.value}`}</p>
                            {/* <p key={index + attributes.length}>{a.value}</p> */}
                        </div>
                    ))}
                </div>
            )
        }
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
    }

    function Display() {
        if (animation_url) {
            return (
                <div
                    className="relative flex aspect-square h-full w-full items-center rounded-lg bg-bgcol"
                    onClick={openInNewTab}
                >
                    <iframe
                        className="h-full max-h-full w-full"
                        src={animation_url}
                        onClick={openInNewTab}
                    ></iframe>
                    <div
                        className="hover:curs group absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center duration-100 hover:backdrop-blur-sm"
                        onClick={openInNewTab}
                    >
                        <p className="hidden p-2 text-neutral-300 duration-100 group-hover:block group-hover:bg-bgcol">
                            Open Live View
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="relative flex aspect-square max-h-full w-full items-center rounded-lg bg-bgcol">
                    <div
                        className="aspect-square max-h-full w-full bg-[image:var(--image-url)] bg-contain bg-center bg-no-repeat"
                        style={style}
                        onClick={openInNewTab}
                    ></div>
                    <div
                        className="group absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center duration-100 hover:cursor-pointer hover:backdrop-blur-sm"
                        onClick={openInNewTab}
                    >
                        <p className="hidden p-2 duration-100 group-hover:block group-hover:bg-bgcol">
                            Open Live View
                        </p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
            <div
                id="OM-popup-window"
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="flex h-[90svh] w-full flex-col justify-between overflow-y-auto rounded-lg bg-bghover p-5 lg:h-fit"
            >
                <div className="bg-base-800 flex w-full flex-col">
                    <div
                        id="OM-popup-token-card"
                        className="flex h-fit w-full flex-col items-center gap-12 lg:flex-row lg:items-start"
                    >
                        <div className="flex aspect-square h-full w-full items-center justify-center">
                            <Display />
                        </div>

                        <div
                            id="OM-popup-token-info"
                            className="flex h-full w-full flex-col justify-start p-4"
                        >
                            <div className="bg-base-50 text-base-950 flex h-fit w-full flex-nowrap items-center justify-between gap-8 rounded-lg p-6">
                                <div className="flex h-fit w-3/4 flex-col">
                                    <h1 className="w-fit text-3xl font-bold">
                                        {name}
                                    </h1>
                                    {artist && (
                                        <h1 className="w-fit text-lg font-thin">
                                            {artist}
                                        </h1>
                                    )}
                                </div>
                                {external_url && (
                                    <a
                                        href={
                                            external_url
                                                ? external_url
                                                : 'https://rebel-mint.vercel.app'
                                        }
                                        target="_blank"
                                        className="aspect-square h-full"
                                    >
                                        <img
                                            className="aspect-square h-full"
                                            src="opennew.svg"
                                        />
                                    </a>
                                )}
                            </div>
                            <p className="border-base-800 bg-base-950 my-4 max-h-[50svh] overflow-y-auto text-wrap rounded-lg p-6 font-light">
                                {description}
                            </p>
                            <div className="flex h-fit max-h-[20svh] w-full justify-self-end">
                                <AllTraits />
                            </div>
                        </div>
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
