import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Box, Divider} from "@material-ui/core";
import Indicator from "./visual/Indicator";
import SearchInput from "./inputs/SearchInput";
import Badge from "@material-ui/core/Badge";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {toLocalDateTimeString} from "../lib/date/toLocalISO";
import SearchListElement from "../models/SearchListElement";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MailLineIcon from "remixicon-react/MailLineIcon";
import MailOpenLineIcon from "remixicon-react/MailOpenLineIcon";
import toInitials from "../lib/string/toInitials";

const useStyles = makeStyles(() => ({
    listWrapper: {
        display: "flex",
        flex: 1,
        width: "100%",
        overflowY: 'auto'
    },
    list: {listStyleType: 'none', width: '100%'},
    text: {
        paddingRight: 24,
        '& span, p': {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        }
    }
}))

export interface SearchListViewProps<T extends SearchListElement> {
    selectedId?: string,
    elements: T[],
    searchFilter: (search: string) => ({name, updatedAt}: T) => boolean;
    onElementClick?: (element: T) => void;
    onElementReadClick?: (element: T) => void;
    renderSubtitle?: (element: T) => string;
}

const SearchListView = <T extends SearchListElement, >(
    {
        selectedId,
        elements,
        searchFilter,
        onElementClick,
        onElementReadClick,
        renderSubtitle,
    }: SearchListViewProps<T>) => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const filteredElements = elements.filter(searchFilter(search));

    const handleElementClick = (element: T) => () => onElementClick && onElementClick(element)
    const handleElementReadClick = (element: T) => (e: React.MouseEvent) => {
        onElementReadClick && onElementReadClick(element);
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Box width='100%' display='flex' height='100%' flexDirection='column'>
            <Box>
                <Box pl={2} pr={2}>
                    <SearchInput
                        search={search}
                        onChange={setSearch}
                        box
                    />
                </Box>
                <Divider/>
            </Box>
            <Box className={classes.listWrapper}>
                <List disablePadding className={classes.list}>
                    {filteredElements?.map((element) => {
                        const selected = selectedId === element.id;
                        const read = element.read;
                        const subtitle = (renderSubtitle && renderSubtitle(element)) || toLocalDateTimeString(element.updatedAt);
                        return (
                            <React.Fragment key={element.id}>
                                <ListItem
                                    button={(Boolean(onElementClick) as true)}
                                    selected={selected}
                                    onClick={handleElementClick(element)}>
                                    {selected && <Indicator/>}
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor: element?.color}}>
                                            {toInitials(element.name)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        className={classes.text}
                                        primary={element.name}
                                        secondary={subtitle}
                                    />
                                    {onElementReadClick && <ListItemSecondaryAction>
                                        <Tooltip title={read ? "Marker som_old ulæst" : "Marker som_old læst"}>
                                            <IconButton size='small' onClick={handleElementReadClick(element)}>
                                                <Badge variant={"dot"} badgeContent={read ? 0 : 1} color={"error"}>
                                                    {read ? <MailOpenLineIcon/> : <MailLineIcon/>}
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>}
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
}

export default SearchListView;
