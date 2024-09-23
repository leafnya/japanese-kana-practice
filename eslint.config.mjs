import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    tailwindcss: pluginTailwindCSS,
  },
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-contradicting-classname': 'error',
  },
})
