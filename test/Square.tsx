import * as React from 'react';

export type SquareProps = {
    /**
     * The height of the square
     */
    height: number;

    /**
     * The width of the square
     */
    width: number;

    /**
     * Children to render
     */
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Square: React.FC<SquareProps> = ({ width = 50, height = 50, children, ...rest }: SquareProps) => {
    const memoziedStyles = React.useMemo(() => {
        return {
            height,
            width,
        };
    }, [height, width]);

    if (width !== height) {
        throw new Error('Squares must have equal height and width');
    }

    return <div style={memoziedStyles}>{children}</div>;
};
