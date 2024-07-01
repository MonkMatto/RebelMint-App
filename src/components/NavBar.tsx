const NavItem = ({ dest, label }: { dest: string; label: string }) => {
    console.log(window.location.pathname)
    let itemClass
    if (window.location.pathname == dest) {
        itemClass =
            'bg-base-100 text-base-950  font-bold flex w-fit items-center justify-center gap-2 rounded-lg p-2 hover:bg-base-100 duration-200 active:bg-base-200'
    } else {
        itemClass =
            ' text-base-950 flex font-normal w-fit items-center justify-center gap-2 rounded-lg p-2 hover:bg-base-200 duration-200 active:bg-base-200'
    }
    return (
        <a href={dest} key={label} className={itemClass}>
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
            <div className="bg-base-50 h-18 flex max-h-24 w-full items-center justify-start gap-2 rounded-lg px-1 py-1">
                <a
                    href="/"
                    className="bg-base-900 flex items-center gap-2 rounded-lg p-1 pl-2 pr-4"
                >
                    <div className="h-12 w-12 flex-shrink-0">
                        <img
                            src="android-chrome-512x512.png"
                            className="h-full w-full object-cover"
                            alt="Site Logo"
                        />
                    </div>
                    <div className="w-fit">
                        <p className="text-base-50 text-lg font-bold">
                            REBELMINT
                        </p>
                    </div>
                </a>

                <div className="border-base-400 hidden h-12 w-full flex-1 items-center justify-start gap-5 px-5 md:flex">
                    <NavItem dest="/about" label="MANIFESTO" />
                    <NavItem dest="/tokenmanager" label="TOKEN MANAGER" />
                </div>
                {hasNewShop && (
                    <a
                        href="/createcontract"
                        className="bg-base-950 text-base-50 hover:bg-base-800 active:bg-base-200 active:bg-800 ml-auto flex w-fit items-center justify-center gap-2 text-nowrap rounded-lg p-4 duration-200 hover:scale-[103%]"
                    >
                        NEW SHOP
                        <img src="add.svg" className="brighten-110" />
                    </a>
                )}
                {!hasNewShop && (
                    <div className="bg-base-950 text-base-50 hover:bg-900 active:bg-800 ml-auto mr-2 flex w-fit items-center justify-center gap-2 rounded-lg">
                        <w3m-network-button />
                    </div>
                )}
            </div>
        </div>
    )
}
