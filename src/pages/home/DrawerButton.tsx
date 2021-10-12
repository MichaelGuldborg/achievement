import Box from "@material-ui/core/Box";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import {matchPath} from 'react-router';
import Indicator from "../../components/visual/Indicator";
import {fade, Theme} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {RemixiconReactIconComponentType} from "remixicon-react";
import history from "../../history";

interface DrawerButtonStyleProps {
    selected: boolean;
    iconColor?: string;
    textColor?: string;
}

const useStyles = makeStyles<Theme, DrawerButtonStyleProps>((theme) => ({
    text: {
        height: "44px",
        lineHeight: "44px",
        flex: 1,
        marginLeft: 4,
        marginRight: 12,
        fontSize: 15,
        fontWeight: 600,
        color: ({textColor}) => textColor ? textColor : theme.palette.text.primary,
    },
    icon: {
        display: 'flex',
        marginLeft: 0,
        marginRight: theme.spacing(2),
        color: ({selected, iconColor}) => selected ? theme.palette.primary.main :
            iconColor ? iconColor : fade(theme.palette.primary.main, 0.6)
    },
}));


export interface DrawerButtonProps {
    item: {
        name: string;
        icon: RemixiconReactIconComponentType;
        path: string;
        external?: boolean;
        showRedDot?: boolean;
    };
    onClick?: VoidFunction;
    onToggle?: VoidFunction;
    textColor?: string;
    iconColor?: string;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({item, onClick, onToggle, textColor, iconColor}) => {

    const handleItemClick = () => {
        if (item.external) {
            window.open(
                item.path, "_blank");
            return;
        }
        history.push(item.path)
        onToggle && onToggle();
    }

    const selected = !!item.path && !!matchPath(window.location.pathname, {
        path: item.path,
    });

    const classes = useStyles({selected, iconColor, textColor});

    return (
        <ListItem button onClick={onClick || handleItemClick} selected={selected}>
            {selected && <Indicator/>}
            <Box>
                <item.icon className={classes.icon} size={21}/>
            </Box>
            <span className={classes.text}>
                {item.name}
            </span>
            {item.showRedDot && <Badge variant={"dot"} badgeContent={1} color={"error"}/>}
        </ListItem>
    );
}


export default DrawerButton;