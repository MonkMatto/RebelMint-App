interface FooterProps {
    showInfo?: boolean
}
const Footer: React.FC<FooterProps> = ({ showInfo }) => {
    const year = new Date().getFullYear()
    return (
        <div className="mt-auto flex w-full flex-col items-start justify-between gap-4 rounded-md border-t border-base-800 bg-base-850 bg-opacity-30 p-4 text-sm text-base-400 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:w-1/3">
                <a
                    href="https://docs.rebelmint.org"
                    target="_blank"
                    className="w-fit underline hover:text-base-50"
                >
                    Documentation
                </a>
                <span>
                    By using RebelMint you accept the{' '}
                    <a href="/tos" className="underline hover:text-base-50">
                        Terms Of Use
                    </a>
                </span>
            </div>
            {showInfo && (
                <span className="flex justify-center gap-2 text-center md:w-1/3 md:text-left">
                    This app was built with the RebelMint SDK.{' '}
                    <a
                        href="https://github.com/MonkMatto/RebelMint"
                        target="_blank"
                        className="hover:text-base-50 hover:underline"
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
