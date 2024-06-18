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

export const TokenPreview = ({ metadata }: TokenPreviewInputs) => {
    const token = JSON.parse(metadata) as FormStruct
    const { name, image, description, attributes, animation_url, artist } =
        token
    const style = {
        '--image-url': ` url(${image})`,
    } as React.CSSProperties

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
                        <div key={index} className="bg-card flex w-fit p-1">
                            <p key={index}>{a.trait_type + ': '}</p>
                            <p key={index + attributes.length}>{a.value}</p>
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
                    className="bg-bgcol relative flex aspect-square h-full w-1/2 items-center rounded-lg"
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
                        <p className="group-hover:bg-bgcol hidden p-2 text-neutral-300 duration-100 group-hover:block">
                            Open Live View
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="bg-bgcol relative flex aspect-square max-h-full w-1/2 items-center rounded-lg">
                    <div
                        className="aspect-square max-h-full w-full bg-[image:var(--image-url)] bg-contain bg-center bg-no-repeat"
                        style={style}
                        onClick={openInNewTab}
                    ></div>
                    <div
                        className="group absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center duration-100 hover:cursor-pointer hover:backdrop-blur-sm"
                        onClick={openInNewTab}
                    >
                        <p className="group-hover:bg-bgcol hidden p-2 duration-100 group-hover:block">
                            Open Live View
                        </p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className="bg-bghover relative flex h-4/5 w-4/5 flex-col justify-between rounded-lg p-5"
            >
                <div
                    id="OM-popup-token-card"
                    className="@md:flex-col flex h-3/4 w-full flex-row flex-nowrap gap-12"
                >
                    <Display />
                    <div
                        id="OM-popup-token-info"
                        className="flex h-full w-1/2 flex-col justify-start"
                    >
                        <h1 className="text-center text-2xl font-bold">
                            {name}
                        </h1>
                        <h1 className="mb-8 text-center text-lg font-light">
                            {artist ? `by ${artist}` : ''}
                        </h1>
                        <p className="max-h-96 overflow-y-auto text-wrap font-light">
                            {description}
                        </p>

                        <AllTraits />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenPreview
