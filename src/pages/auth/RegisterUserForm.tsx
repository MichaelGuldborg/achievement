import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField/TextField";
import React from "react";
import {Grid} from "@material-ui/core";
import Validators from "../../lib/Validators";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button/Button";
import auth from "../../services/auth";
import history from "../../history";
import Routes from "../../constants/Routes";

export interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    passwordRepeat: string;
    privacyPolicy: boolean;
}


export const RegisterUserForm: React.FC = () => {

    const onSubmit = async (values: RegisterUserRequest) => {
        const response = await auth.registerWithEmail(values);
        if (response.success) {
            history.push(Routes.home);
        }
    }


    return (
        <div>
            <Formik<RegisterUserRequest>
                onSubmit={onSubmit}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    phoneNumber: '',
                    privacyPolicy: false,
                }}
            >
                {({values, errors, touched}) => {
                    return (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        validate={Validators.name}
                                        error={errors.firstName && touched.firstName && values.firstName.length !== 0}
                                        helperText={values.firstName.length !== 0 && errors.firstName}
                                        required
                                        fullWidth
                                        variant='filled'
                                        id="firstName"
                                        label="First name"
                                        name="firstName"
                                        type="text"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        validate={Validators.name}
                                        error={errors.lastName && touched.lastName && values.lastName.length !== 0}
                                        helperText={values.lastName.length !== 0 && errors.lastName}
                                        required
                                        fullWidth
                                        variant='filled'
                                        id="lastName"
                                        label="Last name"
                                        name="lastName"
                                        type="text"
                                    />
                                </Grid>

                                {/*<Grid item xs={12}>*/}
                                {/*    <Field*/}
                                {/*        as={TextField}*/}
                                {/*        validate={() => Validators.phoneNumber(values.phoneNumber)}*/}
                                {/*        error={errors.phoneNumber && touched.phoneNumber}*/}
                                {/*        helperText={errors.phoneNumber}*/}
                                {/*        fullWidth*/}
                                {/*        variant='filled'*/}
                                {/*        id="phoneNumber"*/}
                                {/*        name="phoneNumber"*/}
                                {/*        label="Phone number"*/}
                                {/*        type="phone"*/}
                                {/*        autoComplete='phone'*/}
                                {/*    />*/}
                                {/*</Grid>*/}

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        validate={Validators.email}
                                        error={errors.email && touched.email && values.email.length !== 0}
                                        helperText={values.email.length !== 0 && errors.email}
                                        required
                                        fullWidth
                                        variant='filled'
                                        id="email"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        autoComplete='email'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        validate={Validators.password}
                                        error={errors.password && touched.password && values.password.length !== 0}
                                        helperText={values.password.length !== 0 && errors.password}
                                        required
                                        fullWidth
                                        variant='filled'
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autoComplete='password'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        validate={(s: string) => Validators.passwordRepeat(values.password, s)}
                                        error={errors.passwordRepeat && touched.passwordRepeat && values.passwordRepeat.length !== 0}
                                        helperText={values.passwordRepeat.length !== 0 && errors.passwordRepeat}
                                        required
                                        fullWidth
                                        variant='filled'
                                        id="passwordRepeat"
                                        label="Repeat password"
                                        name="passwordRepeat"
                                        type="password"
                                        autoComplete='password'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        as={Checkbox}
                                        required
                                        name="policy"
                                        id="policy"
                                    />
                                    <span>
                                    {'* I accept the '}
                                        <a href="https://michaelguldborg.dk/privacy" target="_blank"
                                           rel="noopener noreferrer">
                                        privacypolicy
                                    </a>
                                </span>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        aria-label="submit"
                                        variant="contained"
                                        color={"primary"}
                                        fullWidth
                                        style={{
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            borderRadius: 40,
                                        }}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default RegisterUserForm;