/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{html,js,jsx,tsx,ts}',
        './src/**/*.{html,js,jsx,tsx,ts}',
        '!./src/components/RebelMint/**/*.{html,js,ts,tsx,jsx}',
        '!./src/components/RebelMint/node_modules/**/*.{html,js,ts,tsx,jsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
