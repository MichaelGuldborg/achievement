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
                            <div style={{display: 'flex', alignItems: 'start', textAlign: 'center'}}>
                                <DeleteBin7LineIcon size={18} style={{marginRight: '6px'}}/>
                                Delete
                            </div>
                        </Button>
                    )}
                    <Box flex={1}/>
                    {element?.id && onCopyClick && (
                        <Button onClick={() => {
                            onCopyClick(element)
                            onCancel()
                        }}>
                            <div style={{display: 'flex', alignItems: 'start', textAlign: 'center'}}>
                                <CopyIcon size={20} style={{marginRight: '4px'}}/>
                                Kopier
                            </div>
                        </Button>
                    )}
                    <Button onClick={onCancel}>
                        <div style={{display: 'flex', alignItems: 'start', textAlign: 'center'}}>
                            <CloseLineIcon size={20} style={{marginRight: '4px', color: theme.palette.error.main}}/>
                            Cancel
                        </div>
                    </Button>
                    <Button onClick={handleSaveClick}>
                        <div style={{display: 'flex', alignItems: 'start', textAlign: 'center'}}>
                            <CheckLineIcon size={20} style={{marginRight: '4px', color: theme.palette.success.main}}/>
                            Save
                        </div>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAlertDialog}
                onClose={handleClickClose}
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this element?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleClickAccept} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CrudDialog;
