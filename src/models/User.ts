import UserProject from "./UserProject";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    imageUrl: string,
    projects: UserProject[];
    roleId: string;
    permissions: { [p: string]: boolean };
}

export interface UserIdentification {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
}


export const emptyUser: User = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    imageUrl: "",
    projects: [],
    roleId: "",
    permissions: {},
}


export default User;
