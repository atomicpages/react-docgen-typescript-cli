# react-docgen-typescript-cli

A tiny CLI wrapper around [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript).

## Installation

```bash
npm i react-docgen-typescript @types/react react-docgen-typescript-cli typescript --save-dev

# yarn
yarn add react-docgen-typescript @types/react react-docgen-typescript-cli typescript --dev
```

`react-docgen-typescript`, `@types/react`, and `typescript` are all **peer dependencies** of this package.

## Usage

The main intended usage of this module is via CLI.

```bash
# See the help docs
npx react-docgen-typescript-cli --help

# Glob patterns are supported
# Write each file out to a directory with -d, or --out-dir
npx react-docgen-typescript-cli ./src/**/* -d ./out

# Filter extensions with -x
npx react-docgen-typescript-cli ./src/**/* -x tsx -d ./out

# Full globbing goodness is supported
npx react-docgen-typescript-cli ./src/**/*.{ts,tsx}

# Concat all doclets into a single file
npx react-docgen-typescript-cli ./src/**/* -o ./out/doclet/files.json
```

Any custom options that you want to pass to `react-docgen-typescript` can be done through options:

```bash
  React Docgen Typescript Options:
  --config                            Path to your tsconfig.json. By default the
                                      script will look in the current working
                                      directory to find the tsconfig    [string]
  --skip-props-without-doc            Skip props without doc
                                                      [boolean] [default: false]
  --skip-props-with-name              Skip the specified list of props without
                                      doc                                [array]
  --skip-components-with-name         Skip the components with the specified
                                      name                               [array]
  --extract-values-from-union         Convert unions to docgen enum format
                                                                       [boolean]
  --remove-undefined-from-optional    If set, types with optional will not
                                      display "| undefined" in the type[boolean]
  --extract-literal-values-from-enum  Convert enums and unions to docgen enum
                                      format          [boolean] [default: false]
  --save-value-as-string              Save default value props as strings
                                      regardless of type
                                                      [boolean] [default: false]
```
