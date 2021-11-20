import {errorResponse, successResponse} from "../models/RestResponse";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase";
import CrudService from "./CrudService";


function keysOf<T>(keyRecord: Record<keyof T, any>): (keyof T)[] {
    return Object.keys(keyRecord) as any
}

export const firestoreCrudService = <T extends {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}>(col: string, compare?: (a: T, b: T) => number): CrudService<T> => {

    return {
        path: col,
        read: async function (id) {
            const snapshot = await getDoc(doc(db, col, id));
            const data = snapshot.data() as T;
            keysOf<T>(data).forEach((key) => {
                const field = data[key] as any;
                if (typeof field?.toDate === 'function') {
                    data[key] = field?.toDate();
                }
            })

            return successResponse(data);
        },
        set: async function (e) {
            e.updatedAt = new Date();
            await setDoc(doc(db, col, e.id), e);
            return successResponse(e);
        },
        create: async function (e) {
            e.createdAt = new Date();
            e.updatedAt = new Date();
            const snapshot = await addDoc(collection(db, col), e);
            e.id = snapshot.id;
            return successResponse(e);
        },
        readAll: async function () {
            const e: T[] = [];
            const snapshot = await getDocs(collection(db, col));
            snapshot.forEach((doc) => {
                console.log(doc);
                return e.push({
                    ...doc.data(),
                    id: doc.id,
                } as T);
            });
            if (!!compare) e.sort(compare);
            return successResponse(e);
        },
        update: async function (e) {
            const id = e.id;
            if (!id) return errorResponse(400);
            await updateDoc(doc(db, col, id), {
                updatedAt: new Date(),
                ...e,
            });
            return this.read(id);
        },
        delete: async function (e) {
            const id = typeof e === "string" ? e : e.id;
            if (id === undefined) return errorResponse(400)
            await deleteDoc(doc(db, col, id));
            return successResponse(e);
        },
    }
}
