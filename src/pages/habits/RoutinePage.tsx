import React, {useState} from "react";
import {dayNames} from "../../lib/date/toLocalISO";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import balances from "../../data/balances";
import CrudDialog from "../../components/dialogs/CrudDialog";
import HabitForm from "./HabitForm";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {useCrudListQuery} from "../../hooks/useCrudListQuery";
import Habit, {defaultHabit} from "../../models/Habit";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from 'remixicon-react/Eye2LineIcon';
import VisibilityOffIcon from 'remixicon-react/EyeCloseLineIcon';
import {firestoreCrudService} from "../../services/firestoreCrudService";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import MobileStepper from "@material-ui/core/MobileStepper";
import capitalize from "@material-ui/core/utils/capitalize";
import {CreateButton} from "../../components/containers/BasePageToolbar";


export const currentUserCollection = (col?: string) => {
    const currentUserId = '6m5nIL8gRMQ0zGkfXwXfNcE87Wm2';
    const path = `users/${currentUserId}`;
    return !col ? path : path + col;
}

const now = new Date();
const nowDayOfWeek = (now.getDay() + 6) % 7;
export const RoutinePage: React.FC = () => {

    const currentUser = useCurrentUser();
    const collection = `users/${currentUser?.id}/habits`;

    const [submitButtonRef] = useSubmitButtonRef();
    const [editElement, setEditElement] = useState<Habit | undefined>(undefined)
    const {elements, onUpdate, onDelete} = useCrudListQuery<Habit>(firestoreCrudService(collection))
    elements.sort((a, b) => {
        if (!a.startTime || !b.startTime) return 0;
        return a.startTime.localeCompare(b.startTime);
    })
    const minStartTime = elements[0]?.startTime ?? '08:00';
    const [showDuration, setShowDuration] = useState(false);

    const getDuration = (startTime?: string, endTime?: string) => {
        if (!startTime || !endTime) return 0;
        const startHour = parseInt(startTime.split(':')[0])
        const startMinute = parseInt(startTime.split(':')[1])
        const endHour = parseInt(endTime.split(':')[0])
        const endMinute = parseInt(endTime.split(':')[1])
        const hourDiff = endHour - startHour;
        const minuteDiff = endMinute - startMinute;
        return hourDiff * 60 + minuteDiff;
    }


    const renderHabit = (habit: Habit) => {
        const balance = balances.find(e => e.id === habit.type);
        const duration = getDuration(habit.startTime, habit.endTime);
        const height = showDuration && !habit.isDaily && !habit.isMonthly && !habit.isYearly ? duration : undefined

        return (
            <div
                style={{marginRight: 0, cursor: 'pointer'}}
                onClick={() => setEditElement(habit)}
            >
                <div style={{
                    width: 'calc(100% - 24px)',
                    height: height,
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                    marginBottom: 8,
                    // margin: '0px 0px 12px 6px',
                    padding: 10,
                    paddingRight: 4,
                    backgroundColor: balance?.color ?? '#A79B8E',
                    // color: theme.palette.getContrastText(color ?? '#000000'),
                    color: '#ffffff',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {balance?.icon !== undefined && <balance.icon style={{
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
                    }}>{habit.name}</span>
                    <span style={{
                        fontSize: 12,
                        fontWeight: 'normal',
                        lineHeight: '18px',
                        letterSpacing: '0.06em',
                    }}>{habit.startTime + ' - ' + habit.endTime}</span>
                </div>
            </div>
        )

    }


    const [dayIndex, setDayIndex] = useState(nowDayOfWeek);

    return (
        <div style={{width: '100vw'}}>
            <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>

            <div style={{padding: 16}}>


                <CrudDialog
                    submitButtonRef={submitButtonRef}
                    onDelete={(v) => onDelete(v).then(() => setEditElement(undefined))}
                    onCancel={() => setEditElement(undefined)}
                    element={editElement}
                >
                    <HabitForm
                        submitButtonRef={submitButtonRef}
                        initial={editElement}
                        onSubmit={(v) => onUpdate(v).then(() => setEditElement(undefined))}
                    />
                </CrudDialog>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <div style={{padding: '8px 16px', display: 'flex', alignItems: 'center'}}>
                                <Hidden mdUp>
                                    <div style={{fontSize: 18, fontWeight: 600}}>
                                        {capitalize(dayNames[dayIndex])}
                                    </div>
                                </Hidden>
                                <div style={{flex: 1}}/>
                                <IconButton onClick={() => setShowDuration(!showDuration)}>
                                    {showDuration ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                                </IconButton>
                                <CreateButton
                                    text={'Add item'}
                                    onClick={() => setEditElement({...defaultHabit})}
                                />
                            </div>


                            <Hidden smDown>
                                <div style={{display: 'flex'}}>
                                    {Array(7).fill(0).map((e, index) => {
                                        return <div style={{flex: 1, fontWeight: 600}}>
                                            <div style={{marginRight: 32, textAlign: 'center'}}>
                                                {dayNames[index]}
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <Divider style={{marginTop: 16, marginBottom: 16}}/>
                                <div style={{display: 'flex'}}>
                                    {Array(7).fill(0).map((e, index) => {
                                        const habitsThisDay = elements.filter(h => {
                                            if (h.isMonthly || h.isYearly) return false;
                                            return h.dayOfWeek === dayNames[index].toLowerCase();
                                        })

                                        const minStartTimeDuration = getDuration(minStartTime, habitsThisDay[0]?.startTime)

                                        return (
                                            <div style={{flex: 1,}}>
                                                <div style={{height: 6}}/>
                                                {showDuration && <div style={{height: minStartTimeDuration}}/>}
                                                {habitsThisDay.map(renderHabit)}
                                            </div>
                                        )
                                    })}
                                </div>
                            </Hidden>
                            <Hidden mdUp>

                                <div style={{padding: '0px 16px'}}>
                                    {elements.filter(h => {
                                        if (h.isMonthly || h.isYearly) return false;
                                        return h.dayOfWeek === dayNames[dayIndex].toLowerCase();
                                    }).map(renderHabit)}
                                </div>

                                <MobileStepper
                                    variant="dots"
                                    steps={7}
                                    position="static"
                                    activeStep={dayIndex}
                                    style={{flexGrow: 1}}
                                    backButton={<Button
                                        onClick={() => setDayIndex((dayIndex + 6) % 7)}
                                        size="small"
                                    >
                                        <ArrowLeftIcon/> Back
                                    </Button>}
                                    nextButton={<Button
                                        onClick={() => setDayIndex((dayIndex + 1) % 7)}
                                        size="small"
                                    >
                                        Next <ArrowRightIcon/>
                                    </Button>}
                                />
                            </Hidden>

                        </Paper>
                    </Grid>
                    {['Daily', 'Monthly', 'Yearly'].map((e, index) => {
                        return (
                            <Grid item xl={4} lg={4} xs={12}>
                                <Paper style={{padding: '16px 16px'}}>
                                    <div style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>
                                        {e}
                                    </div>
                                    <div>
                                        {elements.filter(e => {
                                            if (index === 0 && e.isDaily) return true;
                                            if (index === 1 && e.isMonthly) return true;
                                            if (index === 2 && e.isYearly) return true
                                            return false;
                                        }).map(renderHabit)}
                                    </div>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>

    )
}


export default RoutinePage;
