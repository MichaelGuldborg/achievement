import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {LifeMap} from "./LifeMapPage";
import lifeMaps from "../../data/lifeMaps";

export const LifeMapPresetButton: React.FC<{
    onSelect: (preset: LifeMap) => void;
}> = ({onSelect}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant={"outlined"}
                fullWidth
                onClick={handleClick}
            >
                Load preset
            </Button>
            <Menu
                id="story-line-template-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {lifeMaps.map((e) => {
                    return (
                        <MenuItem
                            style={{minWidth: 160}}
                            onClick={() => {
                                onSelect(e)
                                handleClose()
                            }}>
                            {e.name}
                        </MenuItem>
                    )
                })}
            </Menu>
        </div>
    );
}

export default LifeMapPresetButton;