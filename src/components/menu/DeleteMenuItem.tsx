import React, {useState} from "react";
import {ListItemIcon, MenuItem, Typography} from "@material-ui/core";
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon";
import ConfirmDialog from "../dialogs/ConfirmDialog";

interface DeleteMenuItemProps {
    title: string;
    message: string;
    onConfirm: () => void;
}

const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({title, message, onConfirm}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        onConfirm();
        handleClose();
    }

    return (
        <React.Fragment>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <DeleteBin7LineIcon size={20}/>
                </ListItemIcon>
                <Typography variant="inherit">{title}</Typography>
            </MenuItem>
            <ConfirmDialog title={title} open={open} onClose={handleClose} onConfirm={handleConfirm}>
                {message}
            </ConfirmDialog>
        </React.Fragment>
    )
}

export default DeleteMenuItem;
