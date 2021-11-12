import React from "react";
import {RemixiconReactIconComponentType} from "remixicon-react";

export const ColoredCard: React.FC<{
    title: string;
    subtitle?: string;
    color?: string;
    icon?: RemixiconReactIconComponentType;
    onClick?: VoidFunction;
}> = (
    {
        title,
        subtitle,
        color,
        icon: Icon,
        onClick
    }
) => {
    return (
        <div
            onClick={onClick}
            style={{
                marginRight: 32,
                cursor: onClick !== undefined ? 'pointer' : undefined
            }}
        >
            <div style={{
                width: '100%',
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                margin: '0px 6px 12px 6px',
                padding: 10,
                paddingRight: 4,
                backgroundColor: color ?? '#A79B8E',
                // color: theme.palette.getContrastText(color ?? '#000000'),
                color: '#ffffff',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>
                {Icon !== undefined && <Icon style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    margin: 10,
                }}/>}
                <span style={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: '22px',
                    letterSpacing: '0.06em',
                }}>{title}</span>
                <span style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight: '18px',
                    letterSpacing: '0.06em',
                }}>{subtitle}</span>
            </div>
        </div>

    )
}

export default ColoredCard;