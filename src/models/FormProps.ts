import React from "react";


export interface FormProps<T> {
    submitButtonRef?: React.RefObject<HTMLButtonElement>;
    initial?: T;
    onSubmit: (element: T) => void;
}


export default FormProps;