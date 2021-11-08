import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box";
import FormButton from "../../components/buttons/FormButton";
import {Alert} from "@material-ui/lab";
import {Button, Typography} from "@material-ui/core";
import ArrowGoBackLineIcon from "remixicon-react/ArrowGoBackLineIcon";
import history from "../../history";
import Routes from "../../constants/Routes";


export interface ForgotPasswordFormProps {
}

export interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
    const [sendtRequest, setSendtRequest] = useState<boolean>(false);

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        // const response = await services.auth.forgotPassword(values.email);
        // if (response.success) {
        //     setSendtRequest(true);
        // }
    };

    return (
        <Box>
            <h2>Nulstil adgangskode</h2>
            <Box pt={2} pb={2} display={'flex'} justifyContent={'flex-start'}>
                <Typography>Indtast din email, så sender vi dig instruktioner om at nulstille din
                    adgangskode</Typography>
            </Box>
            <Formik<ForgotPasswordFormValues> onSubmit={onSubmit} initialValues={{
                email: '',
            }}>
                {({errors, values, touched}) => (
                    <Form>
                        <Field
                            as={TextField}
                            error={errors.email && touched.email && values.email.length !== 0}
                            helperText={values.email.length !== 0 && errors.email}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />

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
                            Reset password
                        </Button>
                    </Form>
                )}
            </Formik>
            {sendtRequest && (
                <Alert severity={'success'}>
                    Vi har sendt dig en mail med information om hvordan du nulstiller din adgangskode
                </Alert>
            )}
            <Box width="100%" mt={2} mb={1} display="flex" justifyContent="flex-start" alignItems="center">
                <Button color="primary" onClick={() => {
                    history.push(Routes.landing)
                }}>
                    <ArrowGoBackLineIcon/>
                    <span style={{marginLeft: '4px'}}>Tilbage til log ind</span>
                </Button>
            </Box>
        </Box>
    );
}

export default ForgotPasswordForm;
