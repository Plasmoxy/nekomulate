import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        container: {
            center: true,
            screens: {
                sm: '600px',
                md: '628px',
                lg: '884px',
                xl: '1040px',
                '2xl': '1096px',
            },
        },
    },
    plugins: [],
    safelist: ['bg-teal-200', 'bg-rose-200', 'bg-amber-300', 'bg-cyan-100', 'white', 'green-400'],
};
export default config;
