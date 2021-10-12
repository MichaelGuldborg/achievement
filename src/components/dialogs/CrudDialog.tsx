import React, {useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import Dialog, {DialogProps} from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import {Backdrop, DialogContentText} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import RequestFeedbackDisplay from "../displays/FeedbackDisplay";
import CopyIcon from 'remixicon-react/FileCopyLineIcon'
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import Identifiable from "../../models/Identifyable";
import RequestFeedback from "../../models/ResponseFeedback";

export interface CrudDialogProps<T extends Partial<Identifiable>> {
    title?: string;
    element?: T;
    open?: boolean;
    loading?: boolean;
    feedback?: RequestFeedback;
    onSave?: () => void;
    submitButtonRef?: React.RefObject<HTMLButtonElement>;
    onCancel: () => void;
    onCopyClick?: (element: T) => void;
    onDelete?: (element: T) => void;
    children: React.ReactNode;
    hideBackdrop?: boolean;
    contentPadding?: string | number;
    maxWidth?: DialogProps['maxWidth'];
}

export const CrudDialog = <T extends Partial<Identifiable>, >({children, title, element, open, loading = false, feedback, hideBackdrop = false, maxWidth = 'sm', contentPadding = 16, onSave, onCancel, onDelete, submitButtonRef, onCopyClick}: CrudDialogProps<T>) => {
    const theme = useTheme();

    const handleSaveClick = () => {
        if (onSave) return onSave();
        submitButtonRef?.current?.click && submitButtonRef.current.click()
    };

    const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
    const [deleteElement, setDeleteElement] = useState<T>();

    const handleClickOpen = () => {
        setOpenAlertDialog(true);
    };

    const handleClickClose = () => {
        setDeleteElement(undefined);
        setOpenAlertDialog(false);
    };

    const handleClickAccept = () => {
        if (onDelete && deleteElement) {
            onDelete(deleteElement);
            setDeleteElement(undefined);
        }
        setOpenAlertDialog(false);
    };

    return (
        <>
            <Dialog
                open={open || Boolean(element)}
                onClose={onCancel}
                maxWidth={maxWidth}
                fullWidth={true}
                hideBackdrop={hideBackdrop}
                fullScreen={false} // TODO
                style={{overflow: "inherit"}}
            >
                <Backdrop style={{zIndex: 10, color: 'white'}} open={loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {title && <DialogTitle>{title}</DialogTitle>}
                <DialogContent style={{padding: contentPadding}}>
                    {children}
                    <RequestFeedbackDisplay feedback={feedback}/>
                </DialogContent>
                <DialogActions>
                    {element?.id && onDelete && (
                        <Button onClick={() => {
                            setDeleteElement(element);
                            handleClickOpen();
                        }}>
                            <DeleteBin7LineIcon style={{marginRight: '4px', color: theme.palette.error.main}}/>
                            SLET
                        </Button>
                    )}
                    <Box flex={1}/>
                    {element?.id && onCopyClick && (
                        <Button onClick={() => {
                            onCopyClick(element)
                            onCancel()
                        }}>
                            <CopyIcon style={{marginRight: '4px'}}/>
                            Kopier
                        </Button>
                    )}
                    <Button onClick={onCancel}>
                        <CloseLineIcon style={{marginRight: '4px', color: theme.palette.error.main}}/>
                        ANNULLER
                    </Button>
                    <Button onClick={handleSaveClick}>
                        <CheckLineIcon style={{marginRight: '4px', color: theme.palette.success.main}}/>
                        GEM
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAlertDialog}
                onClose={handleClickClose}
            >
                <DialogContent>
                    <DialogContentText>
                        Du er ved at slette dette element. Er du sikker på at dette er den ønskede handling?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color="primary">
                        Nej
                    </Button>
                    <Button onClick={handleClickAccept} color="primary" autoFocus>
                        Ja
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CrudDialog;
