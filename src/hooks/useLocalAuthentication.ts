import {RestErrorResponse, RestSuccessResponse} from "../models/RestResponse";
import {useEffect} from "react";
import auth from "../services/auth";
import useStorageState from "./useStorageState";


export const useLocalAuthentication = (onResponse: (response: RestErrorResponse | RestSuccessResponse<unknown>) => void) => {
    useEffect(() => {
        const signInWithAccessToken = async () => {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            if (!email || !password || !onResponse) return;
            const response = await auth.signInWithEmail(email, password);
            onResponse(response);
        }
        signInWithAccessToken();
    }, [])
    return {
        setCredentials: (email: string, password: string) => {
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        },
        clearCredentials: () => {
            localStorage.setItem('email', '')
            localStorage.setItem('password', '')
        }
    }
}
export const useLocalRoute = () => {
    return useStorageState('route')
}

export default useLocalAuthentication;