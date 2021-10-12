import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {CustomTheme} from "../../constants/theme";
import RequestFeedbackDisplay from "../../components/displays/FeedbackDisplay";
import Paper from "@material-ui/core/Paper";
import RequestFeedback from "../../models/ResponseFeedback";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const useStyles = makeStyles<CustomTheme>((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    appBar: {
        height: theme.custom.appBarHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(0, 2),
        "& h2": {
            margin: "0 !important",
        }
    },
    save: {
        borderRadius: 25,
    },
    close: {
        marginRight: theme.spacing(1)
    },
    buttonContainer: {
        position: 'relative',
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
    children: {
        flex: 1,
        padding: theme.spacing(2),
        overflowY: 'auto',
        overflowX: 'hidden',
    }
}))


export interface SettingsContainerProps {
    title: string;
    feedback?: RequestFeedback;
    onDelete?: () => void;
    onSave?: () => void;
    disabled?: boolean;
    disablePadding?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    endAdornment?: React.ReactNode;
}

export const SettingsContainer =
    ({
         title,
         feedback,
         onSave,
         disabled = true,
         loading = false,
         disablePadding = false,
         children,
         endAdornment
     }: SettingsContainerProps) => {
        const classes = useStyles();

        return (
            <Box className={classes.root} component={Paper}>
                <Box className={classes.appBar}>
                    <RequestFeedbackDisplay feedback={feedback}/>
                    <Box display={'flex'} flex={1} alignItems={'center'} justifyContent={'space-between'}>
                        <h3>{title}</h3>
                        <Box>
                            {!disabled && onSave && (
                                <div className={classes.buttonContainer}>
                                    <Button
                                        className={classes.save}
                                        variant="contained"
                                        color="primary"
                                        onClick={onSave}
                                    >
                                        Gem
                                    </Button>
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                                </div>
                            )}
                            {endAdornment}
                        </Box>
                    </Box>
                </Box>
                <Divider/>
                <div className={classes.children} style={{
                    padding: disablePadding ? 0 : undefined,
                }}>
                    {children}
                </div>
            </Box>
        )
    }

export default SettingsContainer;
