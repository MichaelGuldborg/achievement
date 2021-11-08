import React from 'react';
import RegisterUserForm, {RegisterUserRequest} from "./RegisterUserForm";
import LogoPage from "../../components/containers/LogoPage";

export const RegisterUserPage: React.FC = () => {

    return (
        <LogoPage>
            <h2>Register a new user</h2>
            <RegisterUserForm/>
        </LogoPage>
    )
}

export default RegisterUserPage;







