/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spongebob: {
          yellow: '#FFD700',
          blue: '#87CEEB',
          red: '#FF6B6B',
          brown: '#8B4513',
          white: '#FFFFFF',
        },
        meme: {
          black: '#000000',
          gray: '#808080',
        }
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive'],
        'impact': ['Impact', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
