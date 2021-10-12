import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "50%",
        height: 60,
        width: 60,
        backgroundColor: theme.palette.primary.main + '0c',
    }
}));

const CircleContainer: React.FC = ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

export default CircleContainer;