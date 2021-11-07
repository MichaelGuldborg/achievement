import React, {useState} from "react";
import {LifeMapEntry} from "./LifeMapPage";
import {Popover} from "@material-ui/core";
import theme from "../../constants/theme";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import ArrowDownLineIcon from "remixicon-react/ArrowDownLineIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";


const weekMillis = 604800000;
const blockSize = 16;
const rows = 90;
const columns = 52;

const useStyles = makeStyles((theme) => ({
    block: {
        width: blockSize,
        height: blockSize,
        borderRadius: 1,
        boxSizing: 'border-box',
        // backgroundColor: color ?? '#e0e0e0',
        // opacity: isPast ? 0.4 : 1,
        // border: index === popover.index ? '2px solid black' : undefined,
        // boxShadow: '0 4px 6px ' + fade(theme.palette.primary.main, 0.25),
        // transition: theme.transitions.create(['background-color', 'box-shadow']),
        "&:hover": {
            // cursor: 'pointer',
            border: '2px solid black',
            // background: fade(theme.palette.grey.A400, 1),
            // boxShadow: '0px 0px 8px ' + fade(theme.palette.grey.A400, 0.3),
        }
    }

}))

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
        skip,
        take,
        birthDate,
        selectedWeek,
        hoverColor,
    }
) => {
    const classes = useStyles();
    const now = new Date();


    const birthDateWeeks = Math.floor((now.getTime() - (birthDate?.getTime() ?? 0)) / weekMillis);
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

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>

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
                    color: theme.palette.grey["500"],
                    fontSize: 18,
                }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <ArrowDownLineIcon/>
                        <span style={{marginLeft: 8}}>Number of years</span>
                        <div style={{width: 16}}/>
                        <ArrowRightLineIcon/>
                        <span style={{marginLeft: 8}}>Week of the year</span>
                    </div>
                </div>

                <div>
                    <div style={{
                        display: 'inline-block',
                        width: blockSize,
                        height: blockSize,
                        marginRight: 2,
                        textAlign: 'end',
                    }}/>
                    {Array.from({length: columns}).map((_, i) => {
                        return <div style={{
                            display: 'inline-block',
                            width: blockSize,
                            height: blockSize,
                            marginLeft: 4,
                            marginRight: 4,
                            marginBottom: 8,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 600,
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
                            width: blockSize,
                            height: blockSize,
                            lineHeight: blockSize - 2 + 'px',
                            textAlign: 'end',
                            paddingRight: 8,
                            fontSize: 16,
                            fontWeight: 600,
                        }}>
                            {i % 5 === 0 ? i : ''}
                        </div>
                        {Array.from({length: columns}).map((_, j) => {
                            const index = i * columns + j
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
                                    padding: 4,
                                    cursor: onClick ? 'pointer' : undefined
                                }}
                                onMouseLeave={handlePopoverClose}
                                onMouseEnter={(e) => {
                                    handlePopoverOpen(e, index);
                                }}
                            >
                                <div
                                    className={classes.block}
                                    onClick={() => onClick?.(index)}
                                    style={{
                                        backgroundColor: color,
                                        opacity: isPast ? 0.4 : 1,
                                    }}
                                />
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>

    )
}
export default LifeMapGrid;