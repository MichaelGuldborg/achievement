import React, {CSSProperties} from "react";

export const Banner: React.FC<{
    size?: number;
    color?: string,
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
    style?: CSSProperties,
}> = (
    {
        size = 24,
        color,
        position,
        style,
        children
    }
) => {
    if (position === 'top-left') {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: -size,
                    left: -size,
                    width: size * 2,
                    height: size * 2,
                    transform: 'rotate(45deg)',
                    backgroundColor: color,
                    ...style
                }}>
                {children}
            </div>
        )
    }
    if (position === 'bottom-right') {
        return (
            <div
                style={{
                    position: 'absolute',
                    bottom: -size,
                    right: -size,
                    width: size * 2,
                    height: size * 2,
                    transform: 'rotate(45deg)',
                    backgroundColor: color,
                    ...style
                }}>
                {children}
            </div>
        )
    }

    return <div/>
}

export default Banner;