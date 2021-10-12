import {Fab} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RemixiconReactIconProps} from "remixicon-react";

const useStyles = makeStyles(theme => ({
    on: {
        margin: theme.spacing(1),
        pointerEvents: 'auto',
        background: theme.palette.text.primary,
        opacity: 0.7,
        '&:hover': {
            opacity: 0.9
        }
    },
    off: {
        margin: theme.spacing(1),
        pointerEvents: 'auto',
        background: theme.palette.error.dark,
    }
}))

export interface FabToggleButtonProps {
    onIcon: React.ComponentClass<RemixiconReactIconProps> | React.FunctionComponent<RemixiconReactIconProps>;
    offIcon: React.ComponentClass<RemixiconReactIconProps> | React.FunctionComponent<RemixiconReactIconProps>;
    on: boolean;
    onToggle: () => void;
}

export const FabToggleButton: React.FC<FabToggleButtonProps> =
    ({
        onIcon: OnIcon,
        offIcon: OffIcon,
        on,
        onToggle,
     }) => {
        const classes = useStyles();

        if (on) return (
            <Fab onClick={onToggle} className={classes.on}>
                <OnIcon color="white"/>
            </Fab>
        )

        return (
            <Fab onClick={onToggle} className={classes.off}>
                <OffIcon color="white"/>
            </Fab>
        )
    }

export default FabToggleButton;
