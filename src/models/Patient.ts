import searchFilter from "../lib/list/searchFilter";
import SearchListElement from "./SearchListElement";
import Issue from "./Issue";
import PatientChange from "./PatientChange";

export interface Patient extends SearchListElement {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    active?: boolean;

    // statistics
    sex?: string;
    birthDate?: Date;
    postalCode?: number;
    municipality?: string;
    region?: string;
    employment?: 'su' | 'kontanthjælp' | 'ledig' | 'førtids pension' | 'pension' | 'sygmeldt' | 'dagpenge'

    // registered info
    issues?: Issue[]
    changes?: PatientChange[]

    // surveys
    enableWHO5?: boolean;
    enableUCLA3?: boolean;
}

export interface PatientCreateRequest extends Partial<Patient> {

}

export const emptyPatient: Patient = {
    id: '',
    name: "",
    firstName: '',
}


export const patientSearchFilter = (search: string) => ({name, firstName, lastName, email, phoneNumber}: Patient) => searchFilter({
    name: name || (firstName + ' ' + lastName),
    email: email ?? '',
    phoneNumber: phoneNumber ?? '',
}, search);

export default Patient;