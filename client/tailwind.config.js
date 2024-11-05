/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        underlineThickness: {
            '2': '2px',
            '4': '4px',
            '8': '8px',
            // Add more sizes as needed
        },
        extend: {
            colors: {
                'dark-blue': '#06377B',
            }
        },
    },
    plugins: [
        function({ addUtilities }) {
            addUtilities({
                '.underline-2': {
                    'text-decoration-thickness': '2px',
                },
                '.underline-4': {
                    'text-decoration-thickness': '4px',
                },
                '.underline-8': {
                    'text-decoration-thickness': '8px',
                },
                // Add more sizes as needed
            })
        },
    ],
}