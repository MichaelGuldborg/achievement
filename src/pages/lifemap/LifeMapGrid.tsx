import React, {useState} from "react";
import {LifeMapEntry} from "./LifeMapPage";
import {Popover} from "@material-ui/core";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import ArrowDownLineIcon from "remixicon-react/ArrowDownLineIcon";
import theme from "../../constants/theme";


const now = new Date();
const weekMillis = 604800000;
export const toWeeks = (date?: Date) => {
    return Math.floor((now.getTime() - (date?.getTime() ?? 0)) / weekMillis);
}

export const LifeMapGrid: React.FC<{
    entries: LifeMapEntry[];
    onClick?: (index: number) => void
    skip?: number;
    take?: number;
    birthDate?: Date;
    selectedWeek?: number;
    hoverColor?: string;
}> = (
    {
        entries,
        onClick,
        birthDate,
        selectedWeek,
        hoverColor,
    }
) => {

    const birthDateWeeks = toWeeks(birthDate);
    // const weekColors = entries.map((e) => Array(e.weeks).fill(e.color)).flat()
    const weekColors = entries.reduce((result, e) => {
        Array(e.end - e.start).fill(undefined).forEach((_, i) => {
            result[e.start + i] = e.color;
        })
        return result;
    }, Array(90 * 52).fill(undefined));


    const [popover, setPopover] = useState({
        index: null,
        anchorEl: null,
    })
    const handlePopoverOpen = (event: any, index: any) => {
        setPopover({
            index: index,
            anchorEl: event.target,
        })
    }
    const handlePopoverClose = () => {
        if (popover.anchorEl === null) return;
        setPopover({
            index: null,
            anchorEl: null,
        })
    }
    const popoverEntry = entries.find(e => e.color === weekColors[popover.index ?? 0]);


    const isWindowSmall = window.screen.width < 900;
    const isWindowMedium = window.screen.width >= 900 && window.screen.width < 1600;
    const isWindowLarge = window.screen.width >= 1600;
    const size = 22;
    const spacing = 4;
    const [rows, cols] = isWindowSmall ? [360, 13] : isWindowMedium ? [180, 26] : [90, 52];
    const skip = Math.floor(birthDateWeeks / cols)
    const take = 0; // always take all


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

            <div>
                <Popover
                    style={{
                        pointerEvents: 'none',
                        marginLeft: 12
                    }}
                    open={Boolean(popover.anchorEl) && Boolean(popoverEntry)}
                    anchorEl={popover.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div style={{padding: 16}}>
                        {popoverEntry?.name}
                    </div>
                </Popover>

                <div style={{
                    color: theme.colors.textGrey,
                    fontSize: 18,
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <ArrowDownLineIcon/>
                        <span style={{marginLeft: 8}}>Number of years</span>
                        <div style={{width: 16}}/>
                        <ArrowRightLineIcon/>
                        <span style={{marginLeft: 8}}>Number of weeks</span>
                    </div>
                </div>

                <div>
                    <div style={{
                        display: 'inline-block',
                        width: size,
                        height: size,
                        padding: spacing,
                        // marginRight: 2,
                        textAlign: 'end',
                    }}/>
                    {Array.from({length: cols}).map((_, i) => {
                        return <div style={{
                            display: 'inline-block',
                            width: size,
                            height: size,
                            padding: spacing,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 600,
                            color: theme.colors.textGrey,
                        }}>
                            {i % 10 === 0 ? i : ''}
                        </div>
                    })}
                </div>

                {Array.from({length: rows}).map((_, i) => {
                    if (!!skip && skip > i) return <div/>
                    if (!!skip && !!take && skip + take < i) return <div/>
                    return <div style={{display: 'flex'}}>
                        <div style={{
                            display: 'inline-block',
                            overflow: 'hidden',
                            width: size,
                            height: size,
                            lineHeight: size - 2 + 'px',
                            textAlign: 'end',
                            paddingRight: 8,
                            marginTop: 4,
                            // marginRight: 8,
                            fontSize: 16,
                            fontWeight: 600,
                            color: theme.colors.textGrey,
                        }}>
                            {isWindowSmall && i % 4 === 0 ? Math.floor(i / 4) : ''}
                            {isWindowMedium && i % 4 === 0 ? Math.floor(i / 2) : ''}
                            {isWindowLarge && i % 5 === 0 ? i : ''}
                        </div>
                        {Array.from({length: cols}).map((_, j) => {
                            const index = i * cols + j
                            const isPast = birthDateWeeks - index > 0;
                            let color = weekColors[index] ?? '#e0e0e0';

                            if (selectedWeek !== undefined) {
                                const hoverIndex = (popover.index === null ? selectedWeek : popover.index) as unknown as number;
                                if (selectedWeek <= index && hoverIndex >= index) {
                                    color = hoverColor
                                }
                                if (selectedWeek >= index && hoverIndex <= index) {
                                    color = hoverColor
                                }
                            }

                            return <div
                                style={{
                                    display: 'inline-block',
                                    padding: spacing,
                                    cursor: onClick ? 'pointer' : undefined
                                }}
                                onMouseLeave={handlePopoverClose}
                                onMouseEnter={(e) => {
                                    handlePopoverOpen(e, index);
                                }}
                            >
                                <div
                                    onClick={() => onClick?.(index)}
                                    style={{
                                        width: size,
                                        height: size,
                                        borderRadius: 1,
                                        boxSizing: 'border-box',
                                        backgroundColor: color,
                                        opacity: isPast ? 0.4 : 1,
                                    }}
                                />
                            </div>
                        })}
                        <div style={{
                            width: size,
                            height: size,
                            padding: spacing,
                        }}/>
                    </div>
                })}
            </div>
        </div>

    )
}
export default LifeMapGrid;