import React, {useState} from "react";
import {dayNames} from "../../lib/date/toLocalISO";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import balances, {BalanceType} from "../../data/balances";
import CrudDialog from "../../components/dialogs/CrudDialog";
import HabitForm from "./HabitForm";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {useListQuery} from "../../hooks/useListQuery";
import habits from "../../data/habits";


export interface Habit {
    id: string;
    name: string,
    type?: BalanceType,
    secondaryTypes?: BalanceType[]
    isDaily?: boolean,
    isMonthly?: boolean,
    isYearly?: boolean,
    dayOfWeek?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    timeOfDay: string,
}

const now = new Date();
const nowDayOfWeek = (now.getDay() + 6) % 7;
export const HabitsPage: React.FC = () => {

    const [submitButtonRef] = useSubmitButtonRef();
    const [editElement, setEditElement] = useState<Habit | undefined>(undefined)
    const {elements, onUpdate, onDelete} = useListQuery<Habit>('habits', async () => [], habits)

    return (
        <div style={{width: '100vw', padding: 16}}>

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
                                        {habitsThisDay.map(h => {
                                            const balance = balances.find(e => e.id === h.type);
                                            return <EventCard
                                                title={h.name}
                                                subtitle={h.timeOfDay}
                                                color={balance?.color}
                                                onClick={() => setEditElement(h)}
                                            />
                                        })}
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
                                    }).map(h => {
                                        const balance = balances.find(e => e.id === h.type);
                                        return <EventCard
                                            title={h.name}
                                            subtitle={h.timeOfDay}
                                            color={balance?.color}
                                            onClick={() => setEditElement(h)}
                                        />
                                    })}
                                </div>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>

    )
}

export const EventCard: React.FC<{
    title: string;
    subtitle: string;
    color?: string;
    onClick?: VoidFunction;
}> = (
    {
        title,
        subtitle,
        color,
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

export default HabitsPage;
