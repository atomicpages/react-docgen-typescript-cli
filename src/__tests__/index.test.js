const path = require('path');
const { main } = require('../index');

// const EXPECTED_RESULT = require('../../__mocks__/square_real.json');

beforeAll(() => {
    jest.mock('fs');
    jest.mock('mkdirp');
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('index tests', () => {
    it('should run without errors', () => {
        expect(() => {
            const spy = jest.spyOn(global.console, 'log').mockImplementation();

            main([path.resolve(__dirname, '../../test/Square.tsx')], {
                config: path.resolve(__dirname, '../../test/tsconfig.json'),
            });

            expect(spy).toHaveBeenCalledTimes(1);
            // expect(spy).toHaveBeenCalledWith(JSON.stringify(EXPECTED_RESULT, null, 4));

            spy.mockRestore();
        }).not.toThrow();
    });
});
