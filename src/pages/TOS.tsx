import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'

const TOS: React.FC = () => {
    return (
        <div className="h-full w-full pt-32">
            <NavBar />
            <div className="container mx-auto text-white">
                <h1 className="mb-4 text-2xl font-bold">
                    RebelMint Terms of Use and Disclaimer
                </h1>
                <p>
                    <strong>Effective Date:</strong> August 1, 2024
                </p>
                <p>
                    <strong>Welcome to RebelMint</strong>
                </p>
                <p>
                    RebelMint is an open-source contract builder, NFT minter,
                    and app platform that enables users to create contracts,
                    create NFTs, and share links for others to mint the work
                    from RebelMint created contracts. By using the RebelMint
                    platform and services, you agree to comply with and be bound
                    by the following Terms of Use and Disclaimer.
                </p>
                <h2 className="mt-4 text-xl font-bold">
                    1. Acceptance of Terms
                </h2>
                <p>
                    By accessing or using the RebelMint platform, you agree to
                    these Terms of Use and Disclaimer. If you do not agree with
                    these terms, you cannot use the platform.
                </p>
                <h2 className="mt-4 text-xl font-bold">
                    2. Platform Description
                </h2>
                <ul className="ml-6 list-disc">
                    <li>Create smart contracts.</li>
                    <li>
                        Mint NFTs that address third party decentralized
                        storage.
                    </li>
                    <li>Share links for others to mint the NFTs.</li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">
                    3. Content Responsibility
                </h2>
                <ul className="ml-6 list-disc">
                    <li>
                        <strong>User-Generated Content:</strong> All content
                        uploaded to third party decentralized storage and
                        addressed by mints on RebelMint is the sole
                        responsibility of the user who created it. RebelMint
                        does not control, monitor, or verify the content
                        uploaded or minted by users.
                    </li>
                    <li>
                        <strong>No Censorship:</strong> RebelMint does not
                        censor content. However, users are responsible for
                        ensuring that their content complies with all applicable
                        laws and regulations.
                    </li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">
                    4. Intellectual Property
                </h2>
                <ul className="ml-6 list-disc">
                    <li>
                        <strong>User Content:</strong> Users retain ownership of
                        the content they mint with RebelMint. By minting
                        content, users grant RebelMint a non-exclusive,
                        royalty-free license to display and distribute the
                        content on the platform.
                    </li>
                    <li>
                        <strong>Third-Party Rights:</strong> Users must not
                        upload or mint content that infringes on the
                        intellectual property rights of others.
                    </li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">
                    5. Prohibited Activities
                </h2>
                <ul className="ml-6 list-disc">
                    <li>
                        Engage in illegal activities or promote illegal
                        activities.
                    </li>
                    <li>Distribute illegal content.</li>
                    <li>Violate the intellectual property rights of others.</li>
                    <li>
                        Disrupt or interfere with the platform's operations or
                        security.
                    </li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">
                    6. Disclaimer of Warranties
                </h2>
                <ul className="ml-6 list-disc">
                    <li>
                        <strong>As-Is Basis:</strong> RebelMint is provided on
                        an "as-is" and "as-available" basis. RebelMint makes no
                        warranties, express or implied, regarding the platform's
                        operation or the content available on the platform.
                    </li>
                    <li>
                        <strong>No Guarantee of Results:</strong> RebelMint does
                        not guarantee any specific results from using the
                        platform.
                    </li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">
                    7. Limitation of Liability
                </h2>
                <ul className="ml-6 list-disc">
                    <li>
                        <strong>No Liability for Content:</strong> RebelMint is
                        not responsible or liable for any content minted by
                        users or any actions taken by users on the platform.
                    </li>
                    <li>
                        <strong>No Liability for Damages:</strong> RebelMint
                        will not be liable for any direct, indirect, incidental,
                        special, or consequential damages arising from the use
                        of or inability to use the platform.
                    </li>
                </ul>
                <h2 className="mt-4 text-xl font-bold">8. Indemnification</h2>
                <p>
                    Users agree to indemnify and hold harmless RebelMint and its
                    affiliates, officers, directors, employees, and agents from
                    any claims, damages, liabilities, and expenses arising from
                    their use of the platform or violation of these Terms of
                    Use.
                </p>
                <h2 className="mt-4 text-xl font-bold">
                    9. Modifications to Terms
                </h2>
                <p>
                    RebelMint reserves the right to modify these Terms of Use at
                    any time. Users will be notified of any changes, and
                    continued use of the platform constitutes acceptance of the
                    modified terms.
                </p>
                <h2 className="mt-4 text-xl font-bold">10. Governing Law</h2>
                <p>
                    These Terms of Use are governed by and construed in
                    accordance with the laws of North Carolina, USA, without
                    regard to its conflict of law principles.
                </p>
                <h2 className="mt-4 text-xl font-bold">
                    11. Contact Information
                </h2>
                <p>
                    For any questions or concerns regarding these Terms of Use,
                    please contact us at monkmatto@protonmail.com.
                </p>
                <p>
                    By using the RebelMint platform, you acknowledge that you
                    have read, understood, and agree to be bound by these Terms
                    of Use and Disclaimer.
                </p>
            </div>
            <Footer />
        </div>
    )
}

export default TOS
