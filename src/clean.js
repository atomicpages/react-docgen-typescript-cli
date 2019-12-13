const EXCLUDE_DOCLETS = new Set([]);

exports.addExcludedDoclets = doclets => doclets.forEach(doclet => EXCLUDE_DOCLETS.add(doclet));

exports.cleanProps = (props, argv = {}) => {
    const ref = {};
    const propKeys = Object.keys(props);

    if (argv.verbose) {
        console.log(`Processing props ${propKeys}`);
    }

    for (let i = 0; i < propKeys.length; i++) {
        if (!(props[propKeys[i]].parent || { fileName: '' }).fileName.includes('node_modules')) {
            // eslint-disable-next-line no-unused-vars
            const { parent, ...rest } = props[propKeys[i]];
            ref[propKeys[i]] = rest;
        }
    }

    return ref;
};

exports.EXCLUDE_DOCLETS = EXCLUDE_DOCLETS;
