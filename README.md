# react-ts-docgen

A tiny CLI wrapper around [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript).

## Installation

```bash
npm i react-docgen-typescript @types/react react-ts-docgen typescript --save-dev

# yarn
yarn add react-docgen-typescript @types/react react-ts-docgen typescript --dev
```

`react-docgen-typescript`, `@types/react`, and `typescript` are all **peer dependencies** of this packae.

## Usage

The main intended usage of this module is via CLI.

```bash
# See the help docs
npx react-ts-docgen --help

# Glob patterns are supported
# Write each file out to a directory with -d, or --out-dir
npx react-ts-docgen ./src/**/* -d ./out

# Filter extensions with -x
npx react-ts-docgen ./src/**/* -x tsx -d ./out

# Full globbing goodness is supported
npx react-ts-docgen ./src/**/*.{ts,tsx}

# Concat all doclets into a single file
npx react-ts-docgen ./src/**/* -o ./out/doclet/files.json
```

Any custom options that you want to pass to `react-docgen-typescript` can be done through options:

```bash
  --config                            Path to your tsconfig.json. By default the
                                      script will look in the current working
                                      directory to find the tsconfig    [string]
  --skip-props-without-doc            Skip props without doc
                                                       [boolean] [default: true]
  --skip-props-with-name              Skip the specified list of props without
                                      doc                                [array]
  --skip-components-with-name         Skip the                           [array]
  --extract-literal-values-from-enum  Convert enums and unions to docgen enum
                                      format          [boolean] [default: false]
  --save-value-as-string              Save default value props as strings
                                      regardless of type
                                                      [boolean] [default: false]
```
