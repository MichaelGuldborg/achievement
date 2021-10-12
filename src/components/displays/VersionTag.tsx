import React from "react";
import packageJson from '../../../package.json';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        bottom: 8,
        right: 16,
        color: theme.palette.info.dark
    }
}))

export const VersionTag: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span>{packageJson['name']} v{packageJson['version']}</span>
        </div>
    )
};

export default VersionTag;
