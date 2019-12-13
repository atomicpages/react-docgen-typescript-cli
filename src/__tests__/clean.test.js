const { addExcludedDoclets, cleanProps, EXCLUDE_DOCLETS } = require('../clean');
const MOCK_PROPS = require('../../__mocks__/square_props.json');

const EXPECTED_PROPS = {
    height: {
        defaultValue: { value: 50 },
        description: 'The height of the square',
        name: 'height',
        required: false,
        type: { name: 'number' },
    },
    width: {
        defaultValue: { value: 50 },
        description: 'The width of the square',
        name: 'width',
        required: false,
        type: { name: 'number' },
    },
    children: {
        defaultValue: null,
        description: 'Children to render',
        name: 'children',
        required: true,
        type: { name: 'ReactNode' },
    },
};

describe('Clean module tests', () => {
    afterEach(() => {
        EXCLUDE_DOCLETS.clear();
    });

    it('should contain no exclusions by default', () => {
        expect(EXCLUDE_DOCLETS.size).toBe(0);
    });

    it('should contain exclusions after adding', () => {
        addExcludedDoclets(['a', 'b', 'c']);

        expect(EXCLUDE_DOCLETS.size).toBe(3);
        expect(Array.from(EXCLUDE_DOCLETS)).toEqual(['a', 'b', 'c']);
    });

    it('should clean props', () => {
        expect(cleanProps(MOCK_PROPS)).toMatchObject(EXPECTED_PROPS);
    });
});
