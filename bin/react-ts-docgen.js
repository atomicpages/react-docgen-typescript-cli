#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const { main } = require('../src');

const argv = require('yargs')
    .usage(
        '$0 [options] <files..>',
        'Generate JSON from your typescript react components',
        yargs => {
            yargs.positional('files', {
                array: 'files',
                describe: 'The list or pattern of files to match',
            });
        }
    )
    .options({
        'out-dir': {
            alias: 'd',
            describe: 'The path to write the JSON files',
            type: 'string',
            conflicts: 'o',
            requiresArg: true,
            nargs: 1,
        },
        'out-file': {
            alias: 'o',
            describe: 'Concatenate all JSON files into one to the specified file',
            type: 'string',
            conflicts: 'd',
            requiresArg: true,
            nargs: 1,
        },
        minified: {
            describe: 'Compact JSON output',
            type: 'boolean',
        },
        verbose: {
            describe: 'Log everything',
        },
        extension: {
            alias: 'x',
            array: 'extension',
            describe: 'File extensions to consider. Repeat to define multiple extensions.',
            default: ['ts', 'tsx'],
        },
        config: {
            describe:
                'Path to your tsconfig.json. By default the script will look in the current working directory to find the tsconfig',
            type: 'string',
            requiresArg: true,
            nargs: 1,
            group: 'React Docgen Typescript Options:',
        },
        'skip-props-without-doc': {
            describe: 'Skip props without doc',
            group: 'React Docgen Typescript Options:',
            default: true,
            boolean: true,
        },
        'skip-props-with-name': {
            describe: 'Skip the specified list of props without doc',
            group: 'React Docgen Typescript Options:',
            array: 'skipPropsWithName',
        },
        'skip-components-with-name': {
            describe: 'Skip the ',
            group: 'React Docgen Typescript Options:',
            array: 'skipComponentsWithName',
        },
        'extract-literal-values-from-enum': {
            describe: 'Convert enums and unions to docgen enum format',
            group: 'React Docgen Typescript Options:',
            boolean: true,
            default: false,
        },
        'save-value-as-string': {
            describe: 'Save default value props as strings regardless of type',
            group: 'React Docgen Typescript Options:',
            boolean: true,
            default: false,
        },
    })
    .coerce(['o', 'd', 'config'], arg => path.normalize(path.resolve(arg)))
    .coerce('extension', arg => {
        return new Set(
            arg.map(ext => {
                const dot = ext.indexOf('.');

                if (dot !== -1) {
                    return ext.slice(dot + 1);
                }

                return ext;
            })
        );
    })
    .epilogue('For more information see https://github.com/styleguidist/react-docgen-typescript')
    .help()
    .version().argv;

const files = argv.files.reduce((acc, file) => {
    if (glob.hasMagic(file)) {
        Array.prototype.push.apply(
            acc,
            glob.sync(file).filter(resolvedFile => {
                return argv.extension.has(path.parse(resolvedFile).ext.slice(1));
            })
        );
    } else {
        if (argv.extension.has(path.parse(file).ext.slice(1))) {
            acc.push(file);
        }
    }

    return acc;
}, []);

main(files, argv);
