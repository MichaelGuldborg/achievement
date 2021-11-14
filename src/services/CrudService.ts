import RestResponse from "../models/RestResponse";

export interface CrudService<T extends {
    id: string;
    [key: string]: any;
}> {
    path: string;
    set?: (e: T) => RestResponse<T>;
    create: (e: T) => RestResponse<T>;
    read: (id: string) => RestResponse<T>;
    readAll: () => RestResponse<T[]>;
    update: (e: Partial<T>) => RestResponse<T>;
    delete: (e: { id?: string } | string) => RestResponse<unknown>;
}

export default CrudService;