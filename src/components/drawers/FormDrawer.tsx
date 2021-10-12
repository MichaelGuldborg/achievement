import React from "react";
import {IconButton} from "@material-ui/core";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {CustomTheme} from "../../constants/theme";
import RequestFeedbackDisplay from "../displays/FeedbackDisplay";
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
        background: "#F1F5F9",
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
    children: {
        flex: 1,
        padding: theme.spacing(2),
        overflowY: 'auto',
        overflowX: 'hidden',
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
}))


export interface FormDrawerProps {
    title: string;
    open: boolean;
    feedback?: RequestFeedback;
    onCancel: () => void;
    onSave?: () => void;
    loading?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    endAdornment?: React.ReactNode;
}


export const FormDrawer =
    ({
         title,
         open,
         feedback,
         onSave,
         onCancel,
         loading = false,
         disabled = false,
         children,
         endAdornment
     }: FormDrawerProps) => {
        const classes = useStyles();
        const paperProps = {style: {width: 500, maxWidth: '100%'}};
        const backDropProps = {style: {opacity: "0.5 !important"}};

        return (
            <Drawer
                anchor="right"
                open={open}
                onClose={onCancel}
                PaperProps={paperProps}
                BackdropProps={backDropProps}
            >
                <Box className={classes.root}>
                    <Box className={classes.appBar}>
                        <RequestFeedbackDisplay feedback={feedback}/>
                        <Box display={'flex'} flex={1} alignItems={'center'}>
                            <IconButton onClick={onCancel} size='small' className={classes.close}>
                                <CloseLineIcon/>
                            </IconButton>
                            <h3>{title}</h3>
                        </Box>
                        {onSave && (
                            <div className={classes.buttonContainer}>
                                <Button
                                    className={classes.save}
                                    variant="contained"
                                    disabled={disabled || loading}
                                    color="primary" onClick={onSave}
                                >
                                    Gem
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        )}
                        {endAdornment}
                    </Box>
                    <Divider/>
                    <Box className={classes.children}>
                        {children}
                    </Box>
                </Box>
            </Drawer>
        )
    }

export default FormDrawer;
