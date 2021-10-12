import React from 'react';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        position: 'relative',
    },
    sendButton: {
        fontWeight: 'bold',
        // margin: theme.spacing(3, 0, 2),
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        borderRadius: 40,
    },
    buttonProgress: {
        color: 'white',
        position: 'absolute',
        display: 'flex',
        margin: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
}));

interface FormButtonProps {
    text?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
}

export const FormButton: React.FC<FormButtonProps> =
    ({
         children,
         text,
         disabled = false,
         loading = false,
         fullWidth = true,
         onClick
     }) => {
        const classes = useStyles();
        return (
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.sendButton}
                    fullWidth={fullWidth}
                    variant="contained"
                    aria-label="submit"
                    type="submit"
                    disabled={disabled || loading}
                    onClick={onClick}
                >
                    {text ?? children}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
            </div>
        );
    };

export default FormButton;
