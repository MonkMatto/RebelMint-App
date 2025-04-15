import { Blocks, Eye, Grip, Store } from 'lucide-react'
import NavDropdown from './NavDropdown'

const NavItem = ({ dest, label }: { dest: string; label: string }) => {
    return (
        <a
            href={dest}
            key={label}
            className="flex items-center gap-2 px-4 py-2 text-base-500 transition-all hover:cursor-pointer hover:text-base-200"
        >
            {label}
        </a>
    )
}

export const NavBar = ({ hasConnector }: { hasConnector?: boolean }) => {
    return (
        <div className="absolute left-0 right-0 top-0 z-20 h-24 w-full p-3">
            <div className="h-18 flex max-h-24 w-full items-center justify-start gap-2 rounded-lg px-1 py-1">
                <a
                    href="/"
                    className="flex items-center gap-2 rounded-md bg-base-900 p-1 pl-2 pr-4 font-bold text-white hover:bg-base-800"
                >
                    <img
                        src="/android-chrome-512x512.png"
                        className="h-8 w-8 object-cover"
                        alt="Site Logo"
                    />
                    REBELMINT
                </a>

                <div className="hidden h-12 w-full flex-1 items-center justify-start gap-5 border-base-400 px-5 md:flex">
                    <NavItem dest="/about" label="Manifesto" />
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

                <div className="hover:bg-900 ml-auto mr-2 flex w-fit items-center justify-center gap-2 rounded-lg text-base-50">
                    {hasConnector && <w3m-network-button />}
                </div>
            </div>
        </div>
    )
}
