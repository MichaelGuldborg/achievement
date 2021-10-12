import React from 'react';
import {NavItem} from '../../constants/NavigationList';
import IconButton from "@material-ui/core/IconButton";

interface MobileNavButtonProps {
    item: NavItem;
}

const MobileNavButton: React.FC<MobileNavButtonProps> = ({item}) => {

    const handleClick = () => {
        // dispatch(push(item.path))
    };



    const Icon = item.icon
    return (
        <IconButton onClick={handleClick}>
            <Icon/>
        </IconButton>
    );
};

export default MobileNavButton;
