import {Field, Form, Formik} from "formik";
import {randomId} from "../../lib/math/randomId";
import {Checkbox, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import SelectNamed from "../../components/inputs/SelectNamed";
import balances from "../../data/balances";
import {dayNames} from "../../lib/date/toLocalISO";
import React from "react";
import FormProps from "../../models/FormProps";
import Habit from "../../models/Habit";


export const HabitForm: React.FC<FormProps<Habit>> = ({onSubmit, initial, submitButtonRef}) => {
    return (
        <Formik<Habit> onSubmit={onSubmit} initialValues={{
            id: randomId(),
            name: '',
            isDaily: false,
            isMonthly: false,
            isYearly: false,
            dayOfWeek: undefined,
            startTime: '10:00',
            endTime: '12:00',
            ...initial,
        }}>
            {({values, setFieldValue}) => {
                const onChangeCheckBox = (s: string) => (_: any, b: boolean) => {
                    setFieldValue('isDaily', false);
                    setFieldValue('isBiWeekly', false);
                    setFieldValue('isMonthly', false);
                    setFieldValue('isYearly', false);
                    setFieldValue(s, b);
                }
                return (
                    <Form>
                        <button aria-label="submit" type="submit" style={{display: 'none'}} ref={submitButtonRef}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={SelectNamed}
                                    name="type"
                                    options={balances}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={SelectNamed}
                                    name={'dayOfWeek'}
                                    options={[{
                                        id: 'undefined',
                                        name: 'None'
                                    }, ...dayNames.map((e) => ({id: e.toLowerCase(), name: e}))]}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name={'startTime'}
                                    type={'time'}
                                    label={'Start time'}
                                    InputLabelProps={{shrink: true}}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    name={'endTime'}
                                    type={'time'}
                                    label={'End time'}
                                    InputLabelProps={{shrink: true}}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={Checkbox}
                                    checked={values.isDaily}
                                    onChange={onChangeCheckBox('isDaily')}
                                />
                                <span>Daily</span>
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={Checkbox}
                                    checked={values.isMonthly}
                                    onChange={onChangeCheckBox('isMonthly')}
                                />
                                <span>Monthly</span>
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={Checkbox}
                                    checked={values.isYearly}
                                    onChange={onChangeCheckBox('isYearly')}
                                />
                                <span>Yearly</span>
                            </Grid>

                        </Grid>
                    </Form>
                );
            }}
        </Formik>

    )
}
export default HabitForm;