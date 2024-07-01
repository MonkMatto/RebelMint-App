import { NavBar } from '../components/NavBar'

export const About = () => {
    const headerClass = 'text-3xl font-bold'
    const paragraphClass = 'text-lg font-light'
    const itemClass =
        'text-base-950 bg-base-50 p-10 flex flex-col gap-8 rounded-lg'
    return (
        <div className="bg-base-900 flex h-fit min-h-[100svh] w-full flex-col gap-8 text-wrap p-4 pt-24 font-satoshi font-bold text-textcol md:px-24">
            <NavBar />
            <div className="bg-base-50 text-base-950 mt-12 flex w-full flex-col gap-8 rounded-lg p-10">
                <h1 id="rebelmint-manifesto" className="text-7xl font-bold">
                    RebelMint Manifesto
                </h1>
                <p className="text-lg font-medium">
                    Listen up, rebels. This isn&#39;t your average, play-it-safe
                    NFT platform. This is RebelMint, where we’re ripping up the
                    rulebooks.
                </p>
            </div>
            <div className="grid h-fit w-full grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                <div className={itemClass}>
                    <h2 id="censorship-not-here" className={headerClass}>
                        Censorship? Not Here
                    </h2>
                    <p className={paragraphClass}>
                        We made the tools so you can use them however you want.
                        Want to make edgy shit? Political shit? F’kin shit up,
                        shit? RebelMint doesn’t censor shit! You&#39;re the
                        artist and creator, not us. Push whatever boundaries you
                        want, give ‘em hell.
                    </p>
                </div>
                <div className={itemClass}>
                    <h2 id="your-art-your-profit" className={headerClass}>
                        Your Art, Your Profit
                    </h2>
                    <p className={paragraphClass}>
                        Sick of platforms treating you like a cash cow, cutting
                        into your take with fees or mint charges? Not here. You
                        create, you sell and earn, you keep it all. No fees, no
                        hidden charges, no middlemen, no bullshit. Artists ⬅️➡️
                        Supporters.
                    </p>
                </div>
                <div className={itemClass}>
                    <h2 id="power-to-the-cypherpunks" className={headerClass}>
                        Power to the Cypherpunks
                    </h2>
                    <p className={paragraphClass}>
                        This isn&#39;t some VC-backed corporate tech celebrity
                        influencer pushed ‘product’. Reward staking? Token Drop?
                        Farming Ponzi? Get outta here. RebelMint is a no fluff
                        bare bones cypherpunk toolset, built by outcasts, for
                        outcasts. Everything is open source, the contracts, the
                        modules, and the app. Launch your own contracts and
                        create your own tokens. Do it, we double-dog dare you!
                    </p>
                </div>
                <div className={itemClass}>
                    <h2
                        id="simple-tools-maximum-impact"
                        className={headerClass}
                    >
                        Simple Tools, Maximum Impact
                    </h2>
                    <p className={paragraphClass}>
                        We keep it simple so you can focus on shaking things up.
                        Follow our guides to launch a shop and mint some tokens.
                        Share your collection with a URL and let supporters mint
                        straight from your contract with our simple UI. No fancy
                        frills, and no gatekeeping. Just raw power at your
                        fingertips. You make it, we make it easy.{' '}
                    </p>
                </div>

                <div className={itemClass}>
                    <h2 id="scarcity-if-desired" className={headerClass}>
                        Scarcity if Desired
                    </h2>
                    <p className={paragraphClass}>
                        Scarcity is a choice, not a requirement. Set your own
                        prices, low or high or free &#40;like actually f’kin
                        free&#41;. Make your art as accessible or exclusive as
                        you want. Sell it as 1/1s, editions of 420 billion, or
                        anywhere in between. It&#39;s your call, not ours.
                    </p>
                </div>
                <div className={itemClass}>
                    <h2 id="your-money-your-rules" className={headerClass}>
                        Your Money, Your Rules
                    </h2>
                    <p className={paragraphClass}>
                        Want all tokens’ earnings sent to the same account? Or
                        do you want to split it up and send funds all over? Our
                        contracts let you send mint money where you want. Tokens
                        can set different payout accounts, and you can change
                        ‘em whenever you want. It&#39;s your crypto, your
                        choice.
                    </p>
                </div>

                <div className={itemClass}>
                    <h2 id="currency-rebellion" className={headerClass}>
                        Currency Rebellion
                    </h2>
                    <p className={paragraphClass}>
                        Want to sell your masterpiece for Eth? Cool, that’s
                        default. Or maybe some obscure shitcoin? Go all in on
                        it, have fun. Accept any ERC-20 you fancy, and change it
                        up if the dev rugs. Your art, your decisions. Unleash
                        your mayhem.
                    </p>
                </div>
                <div className={itemClass}>
                    <h2 id="gas-prices-that-dont-bite" className={headerClass}>
                        Gas Prices That Don&#39;t Bite
                    </h2>
                    <p className={paragraphClass}>
                        We&#39;re on Base, so gas fees won&#39;t drain your
                        wallet. Create more, collect more, pay less. Because
                        sharing art and sending a message shouldn&#39;t cost an
                        arm and a leg. If you want to use the tech on a
                        different chain, go for it. More power to you!{' '}
                    </p>
                </div>

                <div className={itemClass}>
                    <h2 id="unapologetically-bold" className={headerClass}>
                        Unapologetically Bold
                    </h2>
                    <p className={paragraphClass}>
                        See our logo with the hand throwing horns? That&#39;s us
                        telling the establishment we&#39;re here to disrupt.
                        We&#39;re loud, we&#39;re proud, and we&#39;re here to
                        turn heads. Make your statement, scream it until they
                        can’t ignore you. Be seen, be heard.
                    </p>
                </div>
                <div className={itemClass}>
                    <h2 id="creator-control" className={headerClass}>
                        Creator Control
                    </h2>
                    <p className={paragraphClass}>
                        Create as many or as few tokens as your bloody heart
                        desires. Update your work whenever you want. Change
                        prices, swap currencies, alter traits—go wild. The only
                        thing you can&#39;t do on RebelMint is increase a
                        token’s max mintable once it’s selling. And if you don’t
                        like that, good for you! Go fork the repo and do
                        whatever the f’ck you want.
                    </p>

                    <p className={paragraphClass}>
                        So, are you with us? RebelMint isn&#39;t for the timid.
                        It’s for the urchin rebel punk metal hippie troublemaker
                        renegades who’re tired of the fake celebrity pump and
                        dump corporate bullshit. Join in or get out of the way,
                        because we’ve got the tech, we’re giving it to everyone,
                        and there’s no stopping us.
                    </p>
                </div>
            </div>
        </div>
    )
}
