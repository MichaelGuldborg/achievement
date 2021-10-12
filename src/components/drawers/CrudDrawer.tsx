import React from "react";
import {IconButton, ListItemIcon, MenuItem, Typography} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import DeleteMenuItem from "../menu/DeleteMenuItem";
import More2FillIcon from "remixicon-react/More2FillIcon";
import FormDrawer from "./FormDrawer";
import {IconButtonProps} from "@material-ui/core/IconButton";
import Identifiable from "../../models/Identifyable";
import RequestFeedback from "../../models/ResponseFeedback";
import {RemixiconReactIconComponentType} from "remixicon-react";

export interface CrudDrawerProps<T extends Partial<Identifiable>> {
    elementName: string;
    element: T | undefined;
    open?: boolean;
    loading?: boolean;
    feedback?: RequestFeedback;
    onCancel: () => void;
    onSave: () => void;
    onDelete?: (element: T) => void;
    onCopyClick?: (element: T) => void;
    children: React.ReactNode;
    menuActions?: {
        icon: RemixiconReactIconComponentType;
        title: string;
        message?: string;
        onClick: (event: T | undefined) => void;
    }[];
}


export const CrudDrawer = <T extends Partial<Identifiable>, >
({
     elementName,
     element,
     open,
     feedback,
     onSave,
     onCancel,
     onDelete,
     children,
     menuActions,
 }: CrudDrawerProps<T>) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isEdit = Boolean(element?.id);
    const title = isEdit ? 'Rediger ' + elementName.toLowerCase() : 'Opret ' + elementName.toLowerCase();

    const handleDeleteConfirm = () => {
        onDelete && element?.id && onDelete(element);
        setAnchorEl(null);
        onCancel && onCancel();
    };


    const handleMenuClose = () => setAnchorEl(null);
    const handleMenuOpen: IconButtonProps["onClick"] = (e) => setAnchorEl(e.currentTarget);
    const showEndAdornment = isEdit && (onDelete || menuActions);

    const endAdornment = !showEndAdornment ? undefined : (
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
            >
                <More2FillIcon/>
            </IconButton>
            <Menu
                id="crud-drawer-more"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {isEdit && onDelete && (
                    <DeleteMenuItem
                        title={'Slet ' + elementName.toLowerCase()}
                        message="Er du sikker på, at du vil slette dette element?"
                        onConfirm={handleDeleteConfirm}
                    />
                )}
                {menuActions?.map(action => (
                    <MenuItem onClick={() => {
                        action.onClick?.(element);
                        setAnchorEl(null);
                    }}>
                        <ListItemIcon>
                            <action.icon size={20}/>
                        </ListItemIcon>
                        <Typography variant="inherit">
                            {action.title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )

    return (
        <FormDrawer
            title={title}
            open={open === undefined ? Boolean(element) : open}
            onCancel={onCancel}
            onSave={onSave}
            feedback={feedback}
            endAdornment={endAdornment}
        >
            {children}
        </FormDrawer>
    )
}

export default CrudDrawer;
