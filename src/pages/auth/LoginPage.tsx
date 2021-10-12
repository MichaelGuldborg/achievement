import React from "react";
import {LoginForm} from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LogoPage from "../../components/containers/LogoPage";
import history from "../../history";


const LoginPage: React.FC = () => {

    const anchor = history.location.hash;
    const showForgotPassword = anchor === "#forgot-password";

    return (
        <LogoPage>
            {showForgotPassword ? <ForgotPasswordForm/> : <LoginForm/>}
        </LogoPage>
    )
}

export default LoginPage;

