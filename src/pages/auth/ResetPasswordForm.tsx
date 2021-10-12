import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField/TextField";
import FormButton from "../../components/buttons/FormButton";
import {Alert} from "@material-ui/lab";
import Validators from "../../lib/Validators";

export interface ResetPasswordFormProps {
}

export interface ResetPasswordFormValues {
    password: string;
    passwordRepeat: string;
    token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = () => {
    // const paramsSearch = useTypedSelector(state => state.router?.location.search);
    // const params = qs.parse(paramsSearch ?? '', {ignoreQueryPrefix: true});
    // const token = "" + params['token'];

    const [sendtRequest, setSendtRequest] = useState<boolean>(false);

    const onSubmit = async (values: ResetPasswordFormValues) => {
        // const response = await services.auth.resetPassword(values.password, values.token);
        // if (response.success) {
        //     setSendtRequest(true);
        // }
    };

    const initialValues = {
        password: '',
        passwordRepeat: '',
        token: '',
    };

    return (
        <React.Fragment>
            <Formik<ResetPasswordFormValues> onSubmit={onSubmit} initialValues={initialValues}>
                {({errors, values, touched}) => (
                    <Form>
                        <Field
                            as={TextField}
                            error={errors.password && touched.password && values.password.length !== 0}
                            helperText={values.password.length !== 0 && errors.password}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="password"
                            name="password"
                            label="Adgangskode"
                            type={'password'}
                            autoComplete="current-password"
                        />

                        <Field
                            as={TextField}
                            validate={(s: string) => Validators.passwordRepeat(values.password, s)}
                            error={errors.passwordRepeat && touched.passwordRepeat && values.passwordRepeat.length !== 0}
                            helperText={values.passwordRepeat.length !== 0 && errors.passwordRepeat}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="passwordRepeat"
                            name="passwordRepeat"
                            label="Gentag adgangskode"
                            type={'password'}
                            autoComplete="current-password-repeat"
                        />
                        <FormButton>
                            Opdater adgangskode
                        </FormButton>
                    </Form>
                )}
            </Formik>
            {sendtRequest && (
                <Alert severity={'success'}>
                    Din adgangskode er succesfuldt blevet ændret
                </Alert>
            )}
        </React.Fragment>
    );
}

export default ResetPasswordForm;
