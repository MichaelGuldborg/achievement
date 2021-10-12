import React, {useState} from "react";
import {InputProps} from "@material-ui/core/Input/Input";
import {TextField} from "@material-ui/core";
import ConfirmDialog from "./ConfirmDialog";
import Box from "@material-ui/core/Box";


export interface TextInputDialogProps {
    open: boolean;
    title: string;
    placeholder: string;
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

export const TextInputDialog: React.FC<TextInputDialogProps> = (
    {
        open,
        title,
        placeholder,
        onCancel,
        onConfirm,
    }) => {
    const [value, setValue] = useState<string>("");
    const handleChange: InputProps["onChange"] = e => setValue(e.target.value);

    return (
        <ConfirmDialog
            title={title}
            open={open}
            onClose={onCancel}
            onConfirm={() => onConfirm(value)}
            dialogProps={{
                fullWidth: true,
                maxWidth: "xs"
            }}
        >
            <Box p={2}>
                <TextField
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    multiline
                    fullWidth
                />
            </Box>
        </ConfirmDialog>
    )
}
export default TextInputDialog;