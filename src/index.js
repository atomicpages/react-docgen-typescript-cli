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

    if (argv.verbose) {
        console.log(chalk.gray(`Processing files:\n${files}`));
    }

    if (argv.skipComponentsWithName) {
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
            savePropValueAsString: argv['save-value-as-string'],
        }
    ).parse;

    const json = parser(files).reduce(
        (acc, { description, displayName, methods, props }, index) => {
            if (!EXCLUDE_DOCLETS.has(displayName)) {
                if (argv.verbose) {
                    console.log(
                        chalk.gray(`Adding component with name ${chalk.underline(displayName)}`)
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
                        path.join(argv.d, `${path.parse(files[index]).name}.json`),
                        JSON.stringify(acc[displayName], null, argv.minified ? undefined : 4)
                    );
                }
            } else if (argv.verbose) {
                console.log(
                    chalk.gray(`Skipping component with name ${chalk.underline(displayName)}`)
                );
            }

            return acc;
        },
        {}
    );

    if (argv.o) {
        fs.writeFileSync(argv.o, JSON.stringify(json, null, argv.minified ? undefined : 4));
    } else if ((!argv.o && !argv.d) || argv.verbose) {
        console.log(JSON.stringify(json, null, 4));
    }
};
