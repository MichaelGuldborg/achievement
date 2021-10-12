import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    indicator: {
        position: 'absolute',
        left: 0,
        width: 5,
        height: '100%',
        backgroundColor: theme.palette.primary.main,
    }
}));

export const Indicator: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.indicator}/>
    )
}

export default Indicator;