import {ProviderContext, SnackbarProvider, useSnackbar, VariantType} from 'notistack';
import React from "react";
import RequestFeedback from "../models/ResponseFeedback";


let snackbarRef: ProviderContext | undefined = undefined;
export const InitSnackbarRef = () => {
    snackbarRef = useSnackbar();
    return null;
};

export const AppSnackbarProvider: React.FC = ({children}) => {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
            <InitSnackbarRef/>
            {children}
        </SnackbarProvider>
    )
}


export const snackbar = {
    showFeedback: function (feedback: RequestFeedback) {
        this.showMessage(feedback.message, feedback.severity);
    },
    success: function (message: string) {
        this.showMessage(message, 'success');
    },
    warning: function (message: string) {
        this.showMessage(message, 'warning');
    },
    info: function (message: string) {
        this.showMessage(message, 'info');
    },
    error: function (message: string) {
        this.showMessage(message, 'error');
    },
    showMessage: function (message: string, variant: VariantType = 'default') {
        snackbarRef?.enqueueSnackbar(message, {variant});
    },
}


export default snackbar;

