import React from "react";
import Button, {ButtonProps} from "@material-ui/core/Button";


export const BoxButton: React.FC<ButtonProps> = ({children, onClick, ...rest}) => {
    return (
        <Button
            color='secondary'
            variant='contained'
            style={{borderRadius: 0, minHeight: 56}}
            onClick={onClick}
            {...rest}
        >
            {children}
        </Button>
    )
}
export default BoxButton;
