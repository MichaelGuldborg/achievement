import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.spacing(2),
    }
}))

interface LabeledInputProps {
    label: string;
    id: string
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, id, children }) => {
    const { root } = useStyles();

    return (
        <FormControl>
            <InputLabel shrink htmlFor={id} className={root} >
                {label}
            </InputLabel>
            {children}
        </FormControl>
    )
}

export default LabeledInput;
