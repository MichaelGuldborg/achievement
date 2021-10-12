import React, {useState} from 'react';
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon";

export interface DeleteButtonProps {
    title?: string;
    message?: string;
    onConfirm: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({title = "Slet", message, onConfirm}) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const handleClick = () => setShowDialog(true);
    const handleClose = () => setShowDialog(false);
    const handleConfirm = () => {
        setShowDialog(false);
        onConfirm && onConfirm();
    };

    return (
        <React.Fragment>
            <Tooltip title={title}>
                <IconButton color='primary' onClick={handleClick}>
                    <DeleteBin7LineIcon />
                </IconButton>
            </Tooltip>
            <ConfirmDialog title={title} open={showDialog} onClose={handleClose} onConfirm={handleConfirm}>
                {message}
            </ConfirmDialog>
        </React.Fragment>
    )
}

export default DeleteButton;