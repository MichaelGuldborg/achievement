import React, {useState} from "react";
import {dayNames} from "../../lib/date/toLocalISO";
import {Fab, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import balances from "../../data/balances";
import CrudDialog from "../../components/dialogs/CrudDialog";
import HabitForm from "./HabitForm";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {useListQuery} from "../../hooks/useListQuery";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Habit, {defaultHabit} from "../../models/Habit";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import BasePage from "../../components/containers/BasePage";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from 'remixicon-react/Eye2LineIcon';
import VisibilityOffIcon from 'remixicon-react/EyeCloseLineIcon';
import {firestoreCrudService} from "../../services/firestoreCrudService";


export const currentUserCollection = (col?: string) => {
    const currentUserId = '6m5nIL8gRMQ0zGkfXwXfNcE87Wm2';
    const path = `users/${currentUserId}`;
    return !col ? path : path + col;
}

const now = new Date();
const nowDayOfWeek = (now.getDay() + 6) % 7;
export const HabitsPage: React.FC = () => {

    const currentUser = useCurrentUser();
    const collection = `users/${currentUser?.id}/habits`;

    const [submitButtonRef] = useSubmitButtonRef();
    const [editElement, setEditElement] = useState<Habit | undefined>(undefined)
    const {elements, onUpdate, onDelete} = useListQuery<Habit>(firestoreCrudService(collection))
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
                style={{marginRight: 32, cursor: 'pointer'}}
                onClick={() => setEditElement(habit)}
            >
                <div style={{
                    width: '100%',
                    height: height,
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                    margin: '0px 6px 12px 6px',
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


    return (
        <BasePage>

            <div style={{position: 'fixed', bottom: 32, right: 32, zIndex: 1000}}>
                <Fab color="primary" aria-label="add" onClick={() => {
                    setEditElement({...defaultHabit});
                }}>
                    <AddLineIcon/>
                </Fab>
            </div>

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
                <Grid item xl={12} lg={12} xs={12}>
                    <Paper style={{padding: 16}}>
                        <IconButton onClick={() => setShowDuration(!showDuration)}>
                            {showDuration ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>
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
                                    <div
                                        style={{
                                            flex: 1,
                                            backgroundColor: index === nowDayOfWeek ? '#eee' : undefined,
                                            borderRadius: 4
                                        }}>
                                        <div style={{height: 6}}/>
                                        {showDuration && <div style={{height: minStartTimeDuration}}/>}
                                        {habitsThisDay.map(renderHabit)}
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                </Grid>
                {['Daily', 'Monthly', 'Yearly'].map((e, index) => {
                    return (
                        <Grid item xl={4} lg={4} xs={12}>
                            <Paper style={{padding: 16}}>
                                <div style={{fontWeight: 600, marginBottom: 32}}>
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
        </BasePage>

    )
}


export default HabitsPage;
