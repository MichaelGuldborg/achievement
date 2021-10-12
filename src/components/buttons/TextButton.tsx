import Button, { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({ btn: { textTransform: "none" }}))

const TextButton: React.FC<ButtonProps> = ({children, ...props}) => {
    const classes = useStyles();

    return (
        <Button variant="text" className={classes.btn} {...props}>
            {children}
        </Button>
    )
}

export default TextButton;

