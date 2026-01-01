import globals from 'globals'
import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base.mjs'

export default tseslint.config(
  ...baseConfig,
  {
    ignores: ['eslint.config.mjs', 'dist'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
