import React from "react";
import {Box} from "@material-ui/core";

const FullCenterPage: React.FC = ({children}) => {
    return (
        <Box display='flex' alignItems='center' justifyContent='center' width='100wv' minHeight='100vh'>
            {children}
        </Box>
    );
}

export default FullCenterPage