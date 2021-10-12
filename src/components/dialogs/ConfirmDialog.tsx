import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme} from '@material-ui/core';
import {DialogProps} from "@material-ui/core/Dialog/Dialog";

export interface ConfirmDialogProps {
    title: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    dialogProps?: Omit<DialogProps, "open" | "onClose">;
    disabled?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({title, open, onClose, dialogProps, children, disabled, onConfirm}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            {...dialogProps}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} style={{color: theme.palette.error.main}}>
                    Annuller
                </Button>
                <Button onClick={onConfirm} disabled={disabled} style={{color: theme.palette.success.main}} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;