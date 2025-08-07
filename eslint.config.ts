import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
  },

  typescript: true,
  vue: true,

  ignores: ['coverage', 'docs/**/*.md'],

  rules: {
    'semi': ['error', 'never'],
    'newline-before-return': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'quotes': ['error', 'single'],
    'no-multiple-empty-lines': 'error',
    'no-sequences': 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'array-bracket-spacing': [2, 'never'],
    'comma-spacing': [2, { before: false, after: true }],
    'comma-style': [2, 'last'],
    'eol-last': 2,
    'no-multi-spaces': 1,
    'no-spaced-func': 2,
    'unused-imports/no-unused-vars': 'off',
    'no-unreachable-loop': 'off',
    'ts/no-use-before-define': 'off',
    'no-trailing-spaces': 1,
    'arrow-spacing': 0,
    'ts/no-redeclare': 'off',
    'prefer-rest-params': 'off',
    'prefer-const': 'off',
    'no-throw-literal': 'off',
    'no-console': 'off',
    'style/max-statements-per-line': 'off',
    'antfu/top-level-function': 'off',
    'antfu/no-top-level-await': 'off',
    'test/no-identical-title': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
})
