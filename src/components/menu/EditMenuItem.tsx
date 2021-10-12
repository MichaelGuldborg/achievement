import React, {useState} from "react";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";
import Box from "@material-ui/core/Box";
import {InputProps} from "@material-ui/core/Input/Input";
import {ListItemIcon, MenuItem, TextField} from "@material-ui/core";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Typography from "@material-ui/core/Typography";

interface EditMenuItem {
    title: string;
    text: string;
    onConfirm: (v: string) => void;
}

const EditMenuItem: React.FC<EditMenuItem> = ({title, text, onConfirm}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>(text);

    const handleChange: InputProps["onChange"] = e => setValue(e.target.value);
    const handleClick = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        onConfirm(value);
        handleClose();
    }

    return (
        <React.Fragment>
            <MenuItem onClick={handleClick}>
                <ListItemIcon>
                    <Edit2LineIcon size={20}/>
                </ListItemIcon>
                <Typography variant="inherit">{title}</Typography>
            </MenuItem>
            <ConfirmDialog
                title={title}
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirm}
            >
                <Box p={2}>
                    <TextField
                        defaultValue={text}
                        value={value}
                        onChange={handleChange}
                    />
                </Box>
            </ConfirmDialog>
        </React.Fragment>
    )
}

export default EditMenuItem;
