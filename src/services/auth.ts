import {RegisterUserRequest} from "../pages/auth/RegisterUserForm";
import RestResponse, {errorResponse, successResponse} from "../models/RestResponse";
import User from "../models/User";
import {db, firebaseAuth} from "./firebase";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInAnonymously,
    signInWithEmailAndPassword
} from "firebase/auth"
import {doc, getDoc, setDoc} from "firebase/firestore";
import {randomId} from "../lib/math/randomId";

export interface AuthServiceType {
    registerWithEmail: (request: RegisterUserRequest) => RestResponse<Required<User>>;
    signInWithEmail: (email: string, password: string) => RestResponse<Required<User>>;
    signInAnonymously: () => RestResponse<Required<User>>;
    forgotPassword: (email: string) => RestResponse<undefined>;
    resetPassword: (password: string, token: string) => RestResponse<undefined>;
}


export const auth: AuthServiceType = {
    registerWithEmail: async (request) => {
        const response = await createUserWithEmailAndPassword(firebaseAuth, request.email, request.password);
        const currentUserId = response.user.uid;
        if (currentUserId === undefined) {
            return errorResponse(401, {
                severity: "warning",
                message: 'A user with this email already exists',
            })
        }

        const user: User = {
            id: currentUserId,
            firstName: request.firstName,
            lastName: request.lastName,
            email: request.email,
            phoneNumber: request.phoneNumber,
        };

        await setDoc(doc(db, "users", currentUserId), user);

        return successResponse(user)
    },
    signInWithEmail: async (email, password) => {
        const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const currentUserId = response.user.uid;
        const snapshot = await getDoc(doc(db, "users", currentUserId))
        const user = snapshot.data() as User;

        if (user === undefined) {
            return errorResponse(404, {
                severity: "warning",
                message: 'User not found',
            })
        }

        return successResponse(user);
    },
    signInAnonymously: async () => {
        const response = await signInAnonymously(firebaseAuth);
        console.log("response")
        console.log(response)
        const currentUserId = response.user.uid;
        const user: User = {
            id: currentUserId,
            firstName: 'Anonymous',
            lastName: randomId(),
            email: "",
            phoneNumber: "",
        }

        await setDoc(doc(db, "users", currentUserId), user)


        return successResponse(user);
    },
    forgotPassword: async (email: string) => {
        await sendPasswordResetEmail(firebaseAuth, email);
        return successResponse(undefined, 'We have sent you an email with instructions to reset your password')
    },
    resetPassword: async (password: string, token: string) => {
        throw new Error('Not implemented')
    },
}

export default auth;