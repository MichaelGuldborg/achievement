import React, {useState} from "react";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import Box from "@material-ui/core/Box";
import {TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";

const useStyles = makeStyles(() => ({
   box: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       cursor: 'pointer',
       '& span': {
           marginRight: 8,
       }
   },
}))

export interface EditTextProps {
    name?: string;
    text?: string;
    onSubmit?: (text: string) => void;
}

export const EditText: React.FC<EditTextProps> = ({name = "", text, onSubmit}) => {
    const classes = useStyles();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>(text);

    const handleClick = () => setShowDialog(true);
    const handleClose = () => setShowDialog(false);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setValue(e.target.value);
    const handleConfirm = () => {
        setShowDialog(false);
        value && onSubmit && onSubmit(value);
    };

    return (
        <React.Fragment>
            <div className={classes.box}  onClick={handleClick}>
                <span>{text}</span>
                <Edit2LineIcon color="primary"/>
            </div>
            <ConfirmDialog
                title={"Rediger " + name?.toLowerCase()}
                open={showDialog}
                onClose={handleClose}
                onConfirm={handleConfirm}
            >
                <Box p={2}>
                    <TextField
                        defaultValue={text}
                        label={name}
                        value={value}
                        onChange={handleChange}
                    />
                </Box>
            </ConfirmDialog>
        </React.Fragment>
    )
}
export default EditText;