import {errorResponse, successResponse} from "../models/RestResponse";
import Identifiable from "../models/Identifyable";
import CrudService from "./CrudService";
import {randomId} from "../lib/math/randomId";


export const localCrudService = <T extends Identifiable>(col: string): CrudService<T> => {
    const getElements = (): T[] => {
        const json = localStorage.getItem(col);
        if (json === null || json === undefined) return [];
        return JSON.parse(json);
    }
    const setElements = (elements: T[]) => {
        if (elements === null || elements === undefined) return;
        const json = JSON.stringify(elements);
        localStorage.setItem(col, json);
    }

    return {
        path: col,
        create: async (e) => {
            e.id = randomId();
            const elements = getElements()
            elements.unshift(e);
            setElements(elements);
            return successResponse(e);
        },
        read: async (id) => {
            const e = getElements().find(e => e.id === id);
            if (e === undefined) return errorResponse(404);
            return successResponse(e);
        },
        readAll: async () => {
            const elements = getElements();
            return successResponse(elements);
        },
        update: async (element) => {
            const elements = getElements()
            const index = elements.findIndex(e => e.id === element.id);
            if (index === -1) return errorResponse(404);
            elements[index] = element;
            setElements(elements)
            return successResponse(element);
        },
        delete: async (element) => {
            const id = typeof element === "string" ? element : element.id;
            const elements = getElements()
            const index = elements.findIndex(e => e.id === id);
            if (index === -1) return errorResponse(404);
            // use splice instead
            setElements(elements.filter(e => e.id !== id));
            return successResponse(element);
        },
    }
}

export default localCrudService;