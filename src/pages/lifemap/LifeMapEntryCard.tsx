import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {LifeMapEntry} from "./LifeMapPage";
import EditLineIcon from "remixicon-react/EditLineIcon";


export const LifeMapEntryCard: React.FC<{
    entry: LifeMapEntry;
    onClick?: VoidFunction;
}> = ({entry, onClick}) => {

    return (
        <ListItem>
            <div style={{
                width: 16,
                height: 16,
                backgroundColor: entry.color,
                marginRight: 16,
            }}/>
            <ListItemText
                primary={entry.name}
            />
            <IconButton onClick={onClick}>
                <EditLineIcon/>
            </IconButton>
        </ListItem>
    )
}

export default LifeMapEntryCard;