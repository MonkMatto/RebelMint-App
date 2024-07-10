/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/components/**/*.{html,js,jsx,tsx,ts}',
        './src/**/*.{html,js,jsx,tsx,ts}',
        '!./src/components/RebelMint/**/*.{html,js,ts,tsx,jsx}',
        '!./src/components/RebelMint/node_modules/**/*.{html,js,ts,tsx,jsx}',
        '!./node_nodules/**/*.{html,js,jsx,tsx,ts}',
    ],
    theme: {
        extend: {
            fontFamily: {
                satoshi: [
                    'Satoshi',
                    'Roboto',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
            },
            backgroundImage: (theme) => ({
                logo: "url('/public/android-chrome-512x512.png')",
            }),
            colors: {
                textcol: '#ffffff',
                bgcol: '#000000',
                base: {
                    DEFAULT: '#000000',
                    50: '#FFFFFF',
                    100: '#F0F0F0',
                    200: '#D1D1D1',
                    300: '#B3B3B3',
                    400: '#949494',
                    500: '#767676',
                    600: '#5C5C5C',
                    700: '#434343',
                    800: '#292929',
                    900: '#101010',
                    950: '#000000',
                },
                sapphire: {
                    DEFAULT: '#303399',
                    50: '#D4D5F1',
                    100: '#BFC0EB',
                    200: '#9496DD',
                    300: '#696CD0',
                    400: '#3E42C3',
                    500: '#303399',
                    600: '#272A7E',
                    700: '#1F2163',
                    800: '#161847',
                    900: '#0E0F2C',
                    950: '#0A0A1F',
                },
                bghover: '#2a2a2a',
                card: '#3c3c3c',
                cardhover: '#4e4e4e',
                depth: '#eeeeee',
                accent: '#E66799',
                accentB: '#303399',
                rmaccent: '#EF4444',
            },
        },
    },
    plugins: [],
}
