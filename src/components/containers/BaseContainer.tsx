import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {IconButton, Paper, Theme} from "@material-ui/core";
import ArrowGoBackLineIcon from "remixicon-react/ArrowGoBackLineIcon";

interface BaseContainerStyleProps {
    fixedHeight?: boolean;
    background?: string;
    boxShadow?: string;
}

const borderRadius = 4;
const useStyles = makeStyles<Theme, BaseContainerStyleProps>(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        backgroundColor: ({background}) => background ? background : 'white',
        borderRadius: borderRadius
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
}))

export interface BaseContainerProps {
    flex?: number;
    hidden?: boolean;
    fixedHeight?: boolean;
    background?: string;
    onBack?: VoidFunction;
}

export const BaseContainer: React.FC<BaseContainerProps> =
    ({
         children,
         flex,
         hidden,
         fixedHeight,
         onBack,
         background
     }) => {
        const classes = useStyles({fixedHeight, background});

        return (
            <Paper elevation={1} className={classes.root} style={{flex: flex, display: hidden ? 'none' : undefined}}>
                {onBack &&
                <div className={classes.title}>
                    <IconButton onClick={onBack} color="inherit">
                        <ArrowGoBackLineIcon />
                    </IconButton>
                </div>}
                {children}
            </Paper>
        );
    }

export default BaseContainer;
