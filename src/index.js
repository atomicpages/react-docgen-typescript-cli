const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const chalk = require('chalk');

const docgen = require('react-docgen-typescript');

const { cleanProps, addExcludedDoclets, EXCLUDE_DOCLETS } = require('./clean');

const createDir = ({ o, d } = {}) => {
    if (d && !fs.existsSync(d)) {
        mkdirp.sync(d);
    }

    if (o) {
        const { dir } = path.parse(o);

        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
};

exports.main = (files, argv = {}) => {
    createDir(argv);

    if (argv.skipComponentsWithName) {
        if (argv.verbose) {
            console.log(
                chalk.gray(`Skipping components with name :\n${argv.skipComponentsWithName}`)
            );
        }

        addExcludedDoclets(argv.skipComponentsWithName);
    }

    const parser = docgen.withCustomConfig(
        argv.config || path.join(process.cwd(), 'tsconfig.json'),
        {
            propFilter: {
                skipPropsWithoutDoc: argv['skip-props-without-doc'],
                skipPropsWithName: argv.skipPropsWithName,
            },
            shouldExtractLiteralValuesFromEnum: argv['extract-literal-values-from-enum'],
            shouldRemoveUndefinedFromOptional: argv['remove-undefined-from-optional'],
            shouldExtractValuesFromUnion: argv['extract-values-from-union'],
            savePropValueAsString: argv['save-value-as-string'],
        }
    ).parse;

    const json = files
        .map(file => ({
            file,
            result: parser(file),
        }))
        .reduce((acc, res, index) => {
            const { file } = res;
            const { description, displayName, methods, props } = res.result[0];

            console.log(chalk.gray(`Processing file: ${file}`));

            if (!EXCLUDE_DOCLETS.has(displayName)) {
                if (argv.verbose) {
                    console.log(
                        chalk.gray(`Detected displayName: ${chalk.underline(displayName)}`)
                    );
                }

                acc[displayName] = {
                    ...acc[displayName],
                    methods,
                    description,
                    props: cleanProps(props, { verbose: argv.verbose }),
                };

                if (argv.d) {
                    fs.writeFileSync(
                        path.join(argv.d, `${displayName || `file_${index}`}.json`),
                        JSON.stringify(acc[displayName], null, argv.minified ? undefined : 4)
                    );
                }
            } else if (argv.verbose) {
                console.log(
                    chalk.gray(`Skipping component with name ${chalk.underline(displayName)}`)
                );
            }

            return acc;
        }, {});

    if (argv.o) {
        fs.writeFileSync(argv.o, JSON.stringify(json, null, argv.minified ? undefined : 4));
    } else if (!argv.o && !argv.d) {
        console.log(JSON.stringify(json, null, 4));
    }
};
