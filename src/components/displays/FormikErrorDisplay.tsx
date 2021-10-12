import React from "react";
import {FormikErrors} from "formik";
import Alert from "@material-ui/lab/Alert";
import {Box} from "@material-ui/core";


export const FormikErrorDisplay: React.FC<{ errors: FormikErrors<unknown> }> = ({errors}) => {
    const keys = Object.keys(errors);
    const values = Object.values(errors);
    if (keys === undefined || keys.length === 0) {
        return <React.Fragment/>
    }
    const firstKey = keys[0];
    const firstKeyText = firstKey.substr(0, 1).toUpperCase() + firstKey.substr(1)
    const firstValueText = `${values[0]}`.toLowerCase();
    return (
        <Box mt={2}>
            <Alert severity={'warning'}>
                <span>{`"${firstKeyText}": ${firstValueText}`}</span>
            </Alert>
        </Box>
    );
}

export default FormikErrorDisplay;