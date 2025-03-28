import { Blocks, Eye, Grip, MonitorCog, Store } from 'lucide-react'
import NavDropdown from './NavDropdown'

const NavItem = ({ dest, label }: { dest: string; label: string }) => {
    let itemClass
    if (window.location.pathname == dest) {
        itemClass =
            'flex items-center gap-2 px-4 py-2 text-base-400 transition-all hover:cursor-pointer hover:text-base-950 dark:hover:text-base-50'
    } else {
        itemClass =
            'flex items-center gap-2 px-4 py-2 text-base-400 transition-all hover:cursor-pointer hover:text-base-950 dark:hover:text-base-50'
    }
    return (
        <a
            href={dest}
            key={label}
            className="flex items-center gap-2 px-4 py-2 text-base-400 transition-all hover:cursor-pointer hover:text-base-950 dark:hover:text-base-50"
        >
            {label}
        </a>
    )
}

export const NavBar = ({
    hasNewShop,
}: {
    hasNewShop?: boolean
    hasConnector?: boolean
}) => {
    return (
        <div className="absolute left-0 right-0 top-0 z-20 h-24 w-full p-3 text-base">
            <div className="h-18 flex max-h-24 w-full items-center justify-start gap-2 rounded-lg bg-base-50 px-1 py-1">
                <a
                    href="/"
                    className="flex items-center gap-2 rounded-lg bg-base-900 p-1 pl-2 pr-4"
                >
                    <div className="h-12 w-12 flex-shrink-0">
                        <img
                            src="/android-chrome-512x512.png"
                            className="h-full w-full object-cover"
                            alt="Site Logo"
                        />
                    </div>
                    <div className="w-fit">
                        <p className="text-lg font-bold text-base-50">
                            REBELMINT
                        </p>
                    </div>
                </a>

                <div className="hidden h-12 w-full flex-1 items-center justify-start gap-5 border-base-400 px-5 md:flex">
                    <NavItem dest="/about" label="Manifesto" />
                    {/* <NavItem dest="/tokenmanager" label="TOKEN MANAGER" /> */}
                    <NavDropdown
                        title="Prepare"
                        options={[
                            {
                                label: 'Metadata Previewer',
                                destination: '/metadatapreviewer',
                                icon: <Eye size={16} />,
                            },
                            {
                                label: 'Metadata Builder',
                                destination: '/metadatabuilder',
                                icon: <Blocks size={16} />,
                            },
                        ]}
                    />
                    <NavDropdown
                        title="Execute"
                        options={[
                            {
                                label: 'Contract Builder',
                                destination: '/createcontract',
                                icon: <Store size={16} />,
                            },
                            {
                                label: 'Token Manager',
                                destination: '/tokenmanager',
                                icon: <Grip size={16} />,
                            },
                        ]}
                    />
                </div>
                {hasNewShop && (
                    <a
                        href="/createcontract"
                        className="active:bg-800 ml-auto flex w-fit items-center justify-center gap-2 text-nowrap rounded-lg bg-base-950 p-4 text-base-50 duration-200 hover:scale-[103%] hover:bg-base-800 active:bg-base-200"
                    >
                        NEW SHOP
                        <img src="add.svg" className="brighten-110" />
                    </a>
                )}
                {!hasNewShop && (
                    <div className="hover:bg-900 active:bg-800 ml-auto mr-2 flex w-fit items-center justify-center gap-2 rounded-lg bg-base-950 text-base-50">
                        <w3m-network-button />
                    </div>
                )}
            </div>
        </div>
    )
}
