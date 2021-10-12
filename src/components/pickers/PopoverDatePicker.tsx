import React from "react";
import Popover from "@material-ui/core/Popover";
import {DatePicker, DatePickerProps} from "@material-ui/pickers";

type PopoverDatePickerProps = DatePickerProps & {
    children: JSX.Element;
}

const PopoverDatePicker: React.FC<PopoverDatePickerProps> = ({children, onChange, ...datePickerProps}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange: DatePickerProps["onChange"] = date => {
        onChange(date);
        handleClose();
    }

    return (
        <React.Fragment>
            {React.cloneElement(children, {onClick: handleClick})}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <DatePicker
                    disableToolbar
                    variant="static"
                    format="dd/MM/yyyy"
                    margin="normal"
                    onChange={handleChange}
                    {...datePickerProps}
                />
            </Popover>
        </React.Fragment>
    )
}

export default PopoverDatePicker
