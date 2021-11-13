import {Field, Form, Formik} from "formik";
import {randomId} from "../../lib/math/randomId";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import SelectNamed from "../../components/inputs/SelectNamed";
import React from "react";
import FormProps from "../../models/FormProps";
import {Challenge} from "../../models/Activity";
import capitalize from "@material-ui/core/utils/capitalize";
import {CheckIcon} from "../AgendaPage";
import {activityTypes} from "../../data/activities";


export const ChallengeForm: React.FC<FormProps<Challenge>> = ({onSubmit, initial, submitButtonRef}) => {
    return (
        <Formik<Challenge> onSubmit={onSubmit} initialValues={{
            id: randomId(),
            name: '',
            ...initial,
        }}>
            {({values, setFieldValue}) => {

                return (
                    <Form>
                        <button aria-label="submit" type="submit" style={{display: 'none'}} ref={submitButtonRef}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="name"
                                    // label="Title"
                                    placeholder={'Title'}
                                    inputProps={{style: {fontSize: 18, letterSpacing: 1.2}}}
                                    autoFocus
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={SelectNamed}
                                    name="activity"
                                    // label="Activity"
                                    variant="outlined"
                                    options={activityTypes.map(e => ({
                                        id: e.id,
                                        name: capitalize(e.id),
                                    }))}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={SelectNamed}
                                    name="level"
                                    // label="Level"
                                    variant="outlined"
                                    options={[{
                                        id: 'beginner',
                                        name: 'Beginner'
                                    }, {
                                        id: 'intermediate',
                                        name: 'Intermediate'
                                    }, {
                                        id: 'experienced',
                                        name: 'Experienced'
                                    }, {
                                        id: 'expert',
                                        name: 'Expert'
                                    }]}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    name="description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{display: 'flex'}}>
                                    <CheckIcon
                                        onClick={() => setFieldValue('hidden', !values.hidden)}
                                        checked={values.hidden}
                                    />
                                    <span>Hidden</span>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{display: 'flex'}}>
                                    <CheckIcon
                                        onClick={() => setFieldValue('checked', !values.checked)}
                                        checked={values.checked}
                                    />
                                    <span>Checked</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>

    )
}
export default ChallengeForm;