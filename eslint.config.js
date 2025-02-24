import antfu from '@antfu/eslint-config'

export default antfu({
  extends: ['@unocss'],
  ignores: [
    '*.scss',
    'bun.lockb',
    '*.yml',
  ],
  rules: {
    'no-console': 'off',
    'import/no-mutable-exports': 'off',
    'import/order': 'off',
  },
},
)
