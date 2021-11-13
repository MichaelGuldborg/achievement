import RestResponse from "../models/RestResponse";

export interface CrudService<T> {
    path: string;
    set?: (e: T) => RestResponse<T>;
    create: (e: T) => RestResponse<T>;
    read: (id: string) => RestResponse<T>;
    readAll: () => RestResponse<T[]>;
    update: (e: T) => RestResponse<T>;
    delete: (e: {id?: string} | string) => RestResponse<unknown>;
}

export default CrudService;