const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className="flex h-16 w-full justify-between p-4 pt-24 text-sm text-base-500">
            <p>© RebelMint {year}</p>
            <span>
                By using RebelMint you accept the{' '}
                <a href="/tos" className="underline">
                    Terms Of Use
                </a>
            </span>
        </div>
    )
}

export default Footer
