import LineClamp from '@tailwindcss/line-clamp';

export default {
    mode: 'jit',
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
    },
    plugins: [
        LineClamp,
    ],
};