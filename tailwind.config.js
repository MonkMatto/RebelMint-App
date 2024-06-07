/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{html,js,jsx,tsx,ts}',
        './src/**/*.{html,js,jsx,tsx,ts}',
        '!./src/components/OpenMint/**/*.{html,js,ts,tsx,jsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
