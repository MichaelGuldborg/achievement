import React from "react";
import SearchInput from "../inputs/SearchInput";
import ColoredIconButton from "../buttons/ColoredIconButton";
import AddLineIcon from "remixicon-react/AddLineIcon";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        zIndex: 1,
    }
}))

interface ToolbarProps {
    search: string;
    onSearch: (s: string) => void;
    showCreateButton: boolean;
    onCreateClick?: () => void;
}

const BasePageToolbar: React.FC<ToolbarProps> = ({search, onSearch, showCreateButton, onCreateClick}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <SearchInput search={search} onChange={onSearch} width={256}/>
            {showCreateButton && <ColoredIconButton onClick={onCreateClick}>
                <AddLineIcon color="white"/>
            </ColoredIconButton>}
        </Box>
    )
}

export default BasePageToolbar;
