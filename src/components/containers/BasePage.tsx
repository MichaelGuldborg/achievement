import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CustomTheme} from "../../constants/theme";

const useStyles = makeStyles<CustomTheme>((theme) => ({
    root: {
        flex: 1,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "start",
        position: 'relative',
        marginTop: 32,
        padding: theme.spacing(4, 2, 2, 2),
        [theme.breakpoints.down("sm")]:{
            // justifyContent: 'center',
            paddingTop: theme.spacing(4),
        }
    }
}))

interface BasePageProps {
    className?: string;
}

const BasePage: React.FC<BasePageProps> =
    ({
         children,
         className,
     }) => {
        const classes = useStyles();

        return (
            <div className={classes.root + " " + className}>
                {children}
            </div>
        );
    }

export default BasePage;

