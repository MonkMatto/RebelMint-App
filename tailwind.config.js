/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{html,js,jsx,tsx,ts}',
        './src/**/*.{html,js,jsx,tsx,ts}',
        '!./src/components/RebelMint/**/*.{html,js,ts,tsx,jsx}',
        '!./src/components/RebelMint/node_modules/**/*.{html,js,ts,tsx,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi'],
            },
            colors: {
                textcol: '#ffffff',
                bgcol: '#11191E',
                bghover: '#2a2a2a',
                card: '#3c3c3c',
                cardhover: '#4e4e4e',
                accent: '#E66799',
            },
        },
    },
    plugins: [],
}
