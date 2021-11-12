import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {Divider, Popover, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import {
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    subMonths,
    subQuarters,
    subWeeks,
    subYears
} from "date-fns";
import CalendarTodoLineIcon from "remixicon-react/CalendarTodoLineIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import useURIData from "../../hooks/useURIData";
import {DatePicker} from "@material-ui/pickers";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: "none",
        // borderStyle: "dashed",
        borderRadius: 18,
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
        fontSize: 16
    },
    link: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 8,
    }
}))

export interface TimePreset {
    id: string;
    name: string;
    start: (d: Date) => Date;
    end: (d: Date) => Date;
}

export interface TimeData {
    preset: string;
    start: number;
    end: number;
}

const customTime: TimePreset = {
    id: "custom",
    name: "Tilpasset",
    start: d => d,
    end: d => d,
}

export const presets: TimePreset[] = [
    {
        id: "thisWeek",
        name: "Denne uge",
        start: startOfWeek,
        end: endOfWeek
    },
    {
        id: "lastWeek",
        name: "Sidste uge",
        start: d => startOfWeek(subWeeks(d, 1)),
        end: d => endOfWeek(subWeeks(d, 1)),
    },
    {
        id: "thisMonth",
        name: "Denne måned",
        start: startOfMonth,
        end: endOfMonth,
    },
    {
        id: "lastMonth",
        name: "Sidste måned",
        start: d => startOfMonth(subMonths(d, 1)),
        end: d => endOfMonth(subMonths(d, 1)),
    },
    {
        id: "thisQuarter",
        name: "Dette kvartal",
        start: startOfQuarter,
        end: endOfQuarter,
    },
    {
        id: "lastQuarter",
        name: "Sidste kvartal",
        start: d => startOfQuarter(subQuarters(d, 1)),
        end: d => endOfQuarter(subQuarters(d, 1)),
    },
    {
        id: "thisYear",
        name: "Dette år",
        start: startOfYear,
        end: endOfYear,
    },
    {
        id: "lastYear",
        name: "Sidste år",
        start: d => startOfYear(subYears(d, 1)),
        end: d => endOfYear(subYears(d, 1))
    },
    customTime
]

const TimeRangeSelector = () => {
    const classes = useStyles();
    const theme = useTheme();

    const [timeData, setTimeData] = useURIData<TimeData>("timeData");
    const initialPreset = presets.find(p => p.id === timeData.preset) ?? presets[0];
    const initialStart = timeData.start ? new Date(timeData.start) :presets[0].start(new Date());
    const initialEnd = timeData.end ? new Date(timeData.end) : presets[0].end(new Date());

    const [preset, setPreset] = useState<TimePreset>(initialPreset);
    const [startDate, setStartDate] = useState<Date | null>(initialStart);
    const [endDate, setEndDate] = useState<Date | null>(initialEnd);

    const [isCustom, setIsCustom] = useState(false);

    const handleRange = (p: TimePreset) => () => {
        const now = new Date();
        const start = p.start(now);
        const end = p.end(now);

        setPreset(p);
        setStartDate(start);
        setEndDate(end);

        setTimeData({
            preset: p.id,
            start: start?.getTime(),
            end: end?.getTime()
        })
    }

    const handleApplyCustom = () => {
        if (startDate && endDate) {
            setTimeData({
                preset: "custom",
                start: startDate?.getTime(),
                end: endDate?.getTime()
            })
        }
        setIsCustom(false);
        setPreset(customTime);
        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        if (!isCustom) setAnchorEl(null);
    }

    let timeRange = "";
    if (startDate && endDate) {
        const isSameYear = startDate.getFullYear() === endDate.getFullYear();
        const start = startDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: isSameYear ? undefined : "2-digit" });
        const end = endDate.toLocaleDateString("da-DK", { day: "numeric", month: "short", year: isSameYear ? "numeric" : "2-digit" });

        timeRange = start + " - " + end;
    }

    return (
        <React.Fragment>
            <Button
                id="time-button"
                aria-controls="time-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleButtonClick}
                variant="outlined"
                endIcon={<CalendarTodoLineIcon color={theme.palette.primary.light} />}
                className={classes.button}
            >
                {preset.id === "custom" ? timeRange : preset.name}
            </Button>
            <Popover
                id="time-menu"
                aria-labelledby="time-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top"
                }}
                transformOrigin={{
                    horizontal: "right",
                    vertical: "top"
                }}
                PaperProps={{
                    style: { display: "flex", flexDirection: "column" },
                }}
            >
                <Box pl={2} pr={2} pt={1} pb={1}>
                    <Typography variant="subtitle1">{preset.id !== "custom" ? preset.name : ""}</Typography>
                    <Typography variant="h5">{timeRange}</Typography>
                </Box>

                <Divider orientation="horizontal" />
                <Box pl={2} pr={2} pt={1}>
                    <Typography variant="subtitle1">Ofte anvendt</Typography>
                </Box>
                {!isCustom && (
                    <Box pl={2} pr={2} pt={1} pb={1} display="flex" justifyContent="space-between">
                        <Box display="flex" flexDirection="column" alignItems="baseline">
                            {presets.slice(0, presets.length / 2).map(p => (
                                <Link
                                    key={p.id}
                                    component="button"
                                    onClick={handleRange(p)}
                                    className={classes.link}
                                >
                                    {p.name}
                                </Link>
                            ))}
                        </Box>
                        <Box width={32} />
                        <Box display="flex" flexDirection="column" alignItems="baseline">
                            {presets.slice(presets.length / 2, presets.length).map(p => (
                                <Link
                                    key={p.id}
                                    component="button"
                                    onClick={handleRange(p)}
                                    className={classes.link}
                                >
                                    {p.name}
                                </Link>
                            ))}
                        </Box>
                    </Box>
                )}

                {isCustom && (
                    <Box display="flex" >
                        <DatePicker autoOk disableToolbar variant="static" value={startDate} onChange={setStartDate}/>
                        <DatePicker disableToolbar variant="static" value={endDate} onChange={setEndDate}/>
                    </Box>
                )}

                <Divider orientation="horizontal" />
                <Box pl={2} pr={2} pt={1.5} pb={1}>
                    {!isCustom && (
                        <Link
                            component="button"
                            className={classes.link}
                            onClick={(e) => {
                                setIsCustom(true);
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            Tilpas...
                        </Link>
                    )}
                    {isCustom && (
                        <Box display="flex" justifyContent="space-between">
                            <Link
                                component="button"
                                className={classes.link}
                                onClick={(e) => {
                                    setIsCustom(false);
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <ArrowLeftLineIcon />
                            </Link>
                            <Link
                                component="button"
                                className={classes.link}
                                onClick={handleApplyCustom}
                            >
                                Anvend
                            </Link>
                        </Box>
                    )}
                </Box>
            </Popover>
        </React.Fragment>
    )
}

export default TimeRangeSelector;
