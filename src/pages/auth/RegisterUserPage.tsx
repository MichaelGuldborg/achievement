import React, {useState} from 'react';
import RegisterUserForm, {RegisterUserRequest} from "./RegisterUserForm";
import LogoPage from "../../components/containers/LogoPage";
import RequestFeedback from "../../models/ResponseFeedback";

export const RegisterUserPage: React.FC = () => {
    const [feedback, setFeedback] = useState<RequestFeedback | undefined>(undefined);

    // const paramsSearch = useTypedSelector(state => state.router?.location.search);
    // const params = qs.parse(paramsSearch ?? '', {ignoreQueryPrefix: true});
    // const token = params['token']?.toString() ?? '';
    // const initialValues: RegisterUserRequest = {
    //     firstName: params['firstName']?.toString() ?? '',
    //     lastName: params['lastName']?.toString() ?? '',
    //     email: params['email']?.toString() ?? '',
    //     phoneNumber: params['phoneNumber']?.toString() ?? '',
    //     privacyPolicy: false,
    //     password: '',
    //     passwordRepeat: '',
    // }

    const handleSubmit = async (values: RegisterUserRequest) => {
        // const response = await services.auth.register(values, token);
        // if (response.success) response.feedback.message = "Din bruger er nu registreret og du kan logge ind på platformen";
        // setFeedback(response.feedback)
    }

    // const handleAction = () => dispatch(push(Routes.landing));
    // const feedbackAction = <Button onClick={handleAction}>OK</Button>;

    return (
        <LogoPage>
            <h2>Bekræft dine oplysninger og sæt din adgangskode</h2>
            <RegisterUserForm
                // initial={initialValues}
                onSubmit={handleSubmit}
            />
            {/*<Box p={2}>*/}
            {/*    <RequestFeedbackDisplay feedback={feedback} action={feedbackAction}/>*/}
            {/*</Box>*/}
        </LogoPage>
    )
}

export default RegisterUserPage;







