module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  env: {
    node: true,
    browser: true
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off', // equivalent to member-access: no-public
    '@typescript-eslint/no-empty': 'off', // equivalent to no-empty: false
    'quotes': ['error', 'single'], // equivalent to quotemark: single
    'sort-keys': 'off', // equivalent to object-literal-sort-keys: false
    'comma-dangle': 'off', // equivalent to trailing-comma: false
    'arrow-parens': 'off', // equivalent to arrow-parens: false
    'sort-imports': 'off', // equivalent to ordered-imports: false
    '@typescript-eslint/no-string-literal': 'off', // equivalent to no-string-literal: false
    '@typescript-eslint/max-classes-per-file': 'off', // equivalent to max-classes-per-file: false
    '@typescript-eslint/member-ordering': 'off', // equivalent to member-ordering: false
    'indent': ['error', 4, { "SwitchCase": 1 }], // equivalent to indent: [true, "spaces", 4]
    'no-shadow': 'off', // equivalent to no-shadowed-variable: false
    'quote-props': 'off', // allow quoted properties
    'no-fallthrough': 'error', // equivalent to no-switch-case-fall-through: true
    'no-case-declarations': 'off', // permit declarations in case blocks
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'default',
        'format': ['camelCase', 'PascalCase']
      },
      {
        'selector': 'variable',
        'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': 'method',
        'format': ['camelCase', 'PascalCase'],
        'leadingUnderscore': 'allow'
      }
    ],
    
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-irregular-whitespace': 'warn'
  },
  ignorePatterns: [
    '**/*.js',
    'out/**',
    'node_modules/**',
    'public/**'
  ]
}; 