import React from "react";
import {colors} from "@material-ui/core";


export const ColorDot: React.FC = () => {
    return (
        <div style={{
            width: 8,
            height: 8,
            marginRight: 4,
            borderRadius: '100%',
            backgroundColor: colors.red.A400,
            display: 'block',
        }}/>
    )
}

export default ColorDot;