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
import ColoredCard from "./ColoredCard";
import {crudService} from "../../services/database";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Habit, {defaultHabit} from "../../models/Habit";
import {useCurrentUser} from "../../hooks/useCurrentUser";


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
    const {elements, onUpdate, onDelete} = useListQuery<Habit>(crudService(collection))


    const renderHabit = (habit: Habit) => {
        const balance = balances.find(e => e.id === habit.type);
        return <ColoredCard
            title={habit.name}
            subtitle={habit.timeOfDay}
            color={balance?.color}
            icon={balance?.icon}
            onClick={() => setEditElement(habit)}
        />
    }

    return (
        <div style={{width: '100vw', padding: 16}}>

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
                                    // return h.isDaily || h.dayOfWeek === dayNames[index].toLowerCase();
                                    return h.dayOfWeek === dayNames[index].toLowerCase();
                                })
                                habitsThisDay.sort((a, b) => a.timeOfDay.localeCompare(b.timeOfDay))
                                return (
                                    <div
                                        style={{
                                            flex: 1,
                                            backgroundColor: index === nowDayOfWeek ? '#eee' : undefined,
                                            borderRadius: 4
                                        }}>
                                        <div style={{height: 6}}/>
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
        </div>

    )
}


export default HabitsPage;
