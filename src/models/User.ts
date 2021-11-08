export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}


export const emptyUser: User = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
}


export default User;
