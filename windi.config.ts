import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
      backgroundImage: {
        gacha: 'url(/img/background.png)',
        gachabtn: 'url(/img/gachabtn.png)',
        topBtnDark: 'url(/img/TopBtnDark.png)',
        topBtnLight: 'url(/img/topBtnLight.png)',
        gacha2: 'url(/img/background2.jpg)'
      },
      fontFamily: {
        genshin: ['Genshin']
      }
    },
  },
})
