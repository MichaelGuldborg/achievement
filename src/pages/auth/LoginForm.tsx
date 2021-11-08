import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';

import TextField from '@material-ui/core/TextField/TextField';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import VisibilityIcon from 'remixicon-react/Eye2LineIcon';
import VisibilityOffIcon from 'remixicon-react/EyeCloseLineIcon';
import Button from '@material-ui/core/Button';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Routes from "../../constants/Routes";
import history from "../../history";
import auth from "../../services/auth";


const useStyles = makeStyles((theme) => ({
    showPasswordIcon: {
        position: 'absolute',
        right: '0px',
        top: '0',
        margin: '20px 4px 4px 4px',
        color: theme.palette.common.black,
    },
}));

export interface LoginFormProps {
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export const LoginForm: React.FC<LoginFormProps> = () => {
    const classes = useStyles();
    const [remember, setRemember] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit = async (values: LoginFormValues) => {
        const response = await auth.signInWithEmail(values.email, values.password);
        history.push(Routes.home)
    };


    const initialValues = {
        email: '',
        password: '',
    };

    return (
        <Formik<LoginFormValues> onSubmit={onSubmit} initialValues={initialValues}>
            {({errors, values, touched}) => (
                <Form>
                    <h2>Login</h2>
                    <Field
                        as={TextField}
                        error={errors.email && touched.email && values.email.length !== 0}
                        helperText={values.email.length !== 0 && errors.email}
                        variant="filled"
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
                    <Box position="relative">
                        <Field
                            as={TextField}
                            error={errors.password && touched.password && values.password.length !== 0}
                            placeholder={values.password.length === 0 ? '' : errors.password}
                            variant="filled"
                            margin="normal"
                            fullWidth
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                        />
                        <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                            <IconButton
                                size="medium"
                                className={classes.showPasswordIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon color="#aaaaaa"/>}
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 12,
                        marginBottom: 12,
                    }}>
                        <FormControlLabel
                            label="Remember me"
                            control={<Checkbox
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                color="primary"
                            />}
                        />
                        <Button color="primary" onClick={() => {
                            history.push(Routes.forgotPassword)
                        }}>
                            Forgot your password?
                        </Button>
                    </div>


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
                        Login
                    </Button>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16,
                    }}>
                        <Button color="primary" onClick={() => {
                            history.push(Routes.register)
                        }}>
                            Register a user?
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
