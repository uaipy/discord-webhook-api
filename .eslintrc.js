module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      // Apply these rules only to TypeScript React files
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'function',
            format: ['PascalCase'],
            custom: {
              regex: '^[A-Z]',
              match: true,
            },
          },
        ],
      },
    },
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      /* Classes should use PascalCase. @example `class MyClass {}` */
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      /* Interfaces or Types name should not start with I. @example `interface MyInterface {}` instead of `interface IMyInterface {}` */
      {
        selector: ['interface', 'typeLike'],
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
      /* Enum should be in PascalCase. @example `enum MyEnum {}` */
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      /* Enum members should be in UPPER_CASE. @example `enum MyEnum { MY_ENUM_MEMBER }` */
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      /* Variables should be on camelCase. @example `private myVariable = 0` */
      {
        selector: 'variable',
        format: ['camelCase'],
      },
      /* Exported variables should be on camelCase or PascalCase. @example `export private myVariable = 0` or `export private MyVariable = 0` */
      {
        selector: 'variable',
        modifiers: ['exported'],
        format: ['camelCase', 'PascalCase'],
      },
      /* String const exported should be in UPPER_CASE. @example `export const MY_STRING = 'Hello World'` */
      {
        selector: 'variable',
        modifiers: ['const', 'exported'],
        types: ['string', 'boolean', 'number'],
        format: ['UPPER_CASE'],
      },
      /* Boolean variable should start with an allowed verb and be in PascalCase after the prefix. @example `const isReady = true` */
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      /* Unused variables and functions should start with a leading underscore. @example `private _myVariable = 0` */
      {
        selector: ['variable', 'function'],
        modifiers: ['unused'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
