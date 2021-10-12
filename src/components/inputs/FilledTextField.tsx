import React from "react";
import TextField, {TextFieldProps} from "@material-ui/core/TextField/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {KeyboardTimePicker} from "@material-ui/pickers";
import {KeyboardTimePickerProps} from "@material-ui/pickers/TimePicker/TimePicker";


const useStyles = makeStyles(({palette, spacing}) => ({
    textField: {
        margin: 0,
        minWidth: 124,
        '& .MuiFilledInput-root, .MuiInput-root': {
            borderRadius: spacing(0.5),
            backgroundColor: palette.info.main,
        },
        '& .MuiInputAdornment-positionEnd': {
            marginLeft: 0,
        },
        '& .MuiAutocomplete-inputRoot': {
            paddingTop: 0,
        },
        '& .MuiFilledInput-underline:before, .MuiFilledInput-underline:after, .MuiInput-underline:before, .MuiInput-underline:after': {
            borderBottom: 'none'
        },
        '& input': {
            padding: spacing(1, 2),
        },
        '& input[type=number]': {
            paddingLeft: 0,
            textAlign: 'right',
        },
    },

}));

export const FilledTextField: React.FC<TextFieldProps> = ({variant, ...rest}) => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.textField}
            variant={"filled"}
            fullWidth
            {...rest}
        />

    )
}


export const FilledTimeField: React.FC<KeyboardTimePickerProps> = ({onChange, value, ...rest}) => {
    const classes = useStyles();
    return (
        <KeyboardTimePicker
            className={classes.textField}
            required
            margin="normal"
            ampm={false}
            KeyboardButtonProps={{
                'aria-label': 'skift tidspunkt',
            }}
            value={value}
            onChange={onChange}
            {...rest}
        />
    )
}
