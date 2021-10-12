import MenuList, {MenuListProps} from "@material-ui/core/MenuList"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles<Theme, Size>(() => ({
    root: {
        overflowY: "auto",
        width: ({width}) => width,
        height: ({height}) => height,
    }
}))

interface Size {
    width: number;
    height: number;
}

const ScrollMenuList: React.FC<Size & MenuListProps> = ({children, width, height, ...props}) => {
    const classes = useStyles({width, height});

    return (
        <MenuList className={classes.root} {...props}>{children}</MenuList>
    )
}

export default ScrollMenuList;
