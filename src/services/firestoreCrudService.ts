import {errorResponse, successResponse} from "../models/RestResponse";
import Identifiable from "../models/Identifyable";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "./firebase";
import CrudService from "./CrudService";

export const firestoreCrudService = <T extends Identifiable>(col: string): CrudService<T> => {
    return {
        path: col,
        create: async (e) => {
            const snapshot = await addDoc(collection(db, col), e);
            e.id = snapshot.id;
            return successResponse(e);
        },
        read: async (id) => {
            const snapshot = await getDoc(doc(db, col, id));
            const e = snapshot.data() as T;
            return successResponse(e);
        },
        readAll: async () => {
            const e: T[] = [];
            const snapshot = await getDocs(collection(db, col));
            snapshot.forEach((doc) => e.push({
                ...doc.data(),
                id: doc.id,
            } as T));
            console.log("crudService", col, "readAll", e)
            return successResponse(e);
        },
        update: async (e) => {
            await updateDoc(doc(db, col, e.id), e);
            return successResponse(e);
        },
        delete: async (e) => {
            const id = typeof e === "string" ? e : e.id;
            if (id === undefined) return errorResponse(400)
            await deleteDoc(doc(db, col, id));
            return successResponse(e);
        },
    }
}
