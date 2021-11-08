import {db, firebaseAuth} from "../services/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocument} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import User from "../models/User";


export const useCurrentUser = () => {
    const [user] = useAuthState(firebaseAuth);
    const [snapshot] = useDocument(doc(db, 'users', user?.uid ?? 'undefined'));

    return {
        ...snapshot?.data(),
        id: user?.uid,
    } as User

}