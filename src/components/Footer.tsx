const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className="mt-24 flex w-full items-start justify-between gap-4 rounded-md bg-base-100 bg-opacity-30 p-4 text-sm text-base-400">
            <div className="flex w-full flex-col gap-4">
                <a
                    href="https://docs.rebelmint.org"
                    target="_blank"
                    className="w-fit underline hover:text-base-900"
                >
                    Documentation
                </a>
                <span>
                    By using RebelMint you accept the{' '}
                    <a href="/tos" className="underline hover:text-base-900">
                        Terms Of Use
                    </a>
                </span>
            </div>
            <p className="text-nowrap">© RebelMint {year}</p>
        </div>
    )
}

export default Footer
