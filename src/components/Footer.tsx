interface FooterProps {
    showInfo?: boolean
}
const Footer: React.FC<FooterProps> = ({ showInfo }) => {
    const year = new Date().getFullYear()
    return (
        <div className="flex w-full items-start justify-between gap-4 rounded-md bg-base-100 bg-opacity-30 p-4 text-sm text-base-400">
            <div className="flex w-full flex-col gap-4 md:w-1/3">
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
            {showInfo && (
                <span className="flex w-full justify-center gap-2 text-center md:w-1/3">
                    This app was built with the RebelMint SDK.{' '}
                    <a
                        href="https://github.com/MonkMatto/RebelMint"
                        target="_blank"
                        className="hover:text-base-900 hover:underline"
                    >
                        Learn more
                    </a>
                </span>
            )}
            <p className="text-nowrap text-right md:w-1/3">
                © RebelMint {year}
            </p>
        </div>
    )
}

export default Footer
