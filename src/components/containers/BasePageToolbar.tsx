import React from "react";
import SearchInput from "../inputs/SearchInput";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Fab, IconButton} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import AddLineIcon from "remixicon-react/AddLineIcon";
import AddFillIcon from "remixicon-react/AddFillIcon";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: theme.spacing(1),
        zIndex: 1,
    }
}))

interface ToolbarProps {
    search: string;
    onSearch: (s: string) => void;
    action?: React.ReactNode;
}

const BasePageToolbar: React.FC<ToolbarProps> = ({search, onSearch, action}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <div style={{
                display: "flex",
                alignItems: 'center'
            }}>
                <SearchInput search={search} onChange={onSearch} width={256}/>
            </div>
            <div>
                {action}
            </div>
        </Box>
    )
}

export const CreateButton: React.FC<{ text: string; onClick: VoidFunction }> = ({text, onClick}) => {
    return (
        <>
            <Hidden smDown>
                <Button
                    onClick={onClick}
                    color='secondary'
                    variant='contained'
                    style={{
                        boxShadow: '0 2px 3px rgba(0,0,0,.09)',
                        paddingBottom: 10,
                        paddingTop: 10,
                        textTransform: "none",
                        borderRadius: 8
                    }}
                >
                    <AddLineIcon
                        style={{paddingRight: 8}}
                        size={20}
                    />
                    {text}
                </Button>
            </Hidden>
            <Hidden mdUp>
                <div style={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 100,
                }}>
                    <Fab
                        onClick={onClick}
                        color="primary"
                        aria-label="add"
                    >
                        <AddLineIcon size={20}/>
                    </Fab>
                </div>
            </Hidden>
        </>
    )
}

export default BasePageToolbar;
