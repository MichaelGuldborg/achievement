import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Tooltip from "@material-ui/core/Tooltip";

export interface ButtonConfirmProps {
    title: string;
    message?: string;
    onConfirm: () => void;
}

const ButtonConfirm: React.FC<ButtonConfirmProps> = ({children, title, message, onConfirm}) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const handleClick = () => setShowDialog(true);
    const handleClose = () => setShowDialog(false);
    const handleConfirm = () => {
        setShowDialog(false);
        onConfirm();
    };

    return (
        <React.Fragment>
            <Tooltip title={title}>
                <Button onClick={handleClick}>
                    {children}
                </Button>
            </Tooltip>
            <ConfirmDialog title={title} open={showDialog} onClose={handleClose} onConfirm={handleConfirm}>
                {message}
            </ConfirmDialog>
        </React.Fragment>
    )
}

export default ButtonConfirm;