import React, {useState} from "react";
import {StoryLineEntry} from "./StoryLinePage";
import {Popover} from "@material-ui/core";


const weekMillis = 604800000;

export const StoryLineGrid: React.FC<{
    skip?: number;
    take?: number;
    birthDate?: Date;
    entries: StoryLineEntry[];
}> = (
    {
        entries,
        skip,
        take,
        birthDate
    }
) => {
    const now = new Date();
    const blockSize = 16;
    const rows = 90;
    const columns = 52;

    const birthDateWeeks = Math.floor((now.getTime() - (birthDate?.getTime() ?? 0)) / weekMillis);
    const weekColors = entries.map((e) => Array(e.weeks).fill(e.color)).flat()


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
                    open={Boolean(popover.anchorEl)}
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
                    return <div>
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
                            const color = weekColors[index];
                            return <div
                                style={{
                                    display: 'inline-block',
                                    width: blockSize,
                                    height: blockSize,
                                    marginRight: 8,
                                    backgroundColor: color ?? '#e0e0e0',
                                    opacity: isPast ? 0.4 : 1,
                                    // borderRadius: 100,
                                    borderRadius: 1,
                                    border: index === popover.index ? '2px solid black' : undefined,
                                    boxSizing: 'border-box',
                                }}
                                onMouseLeave={handlePopoverClose}
                                onMouseEnter={(e) => {
                                    if (!color) return;
                                    handlePopoverOpen(e, index);
                                }}
                            />
                        })}
                    </div>
                })}
            </div>
        </div>

    )
}
export default StoryLineGrid;