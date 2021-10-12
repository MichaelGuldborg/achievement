import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";


export const PaperContainer: React.FC<{
    title: string;
    action?: React.ReactNode;
    padding?: number;
}> = ({title, action, padding = 2, children}) => {
    return (
        <Paper>
            <Box
                ml={2}
                mr={2}
                display={'flex'}
                flex={1}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <h3>{title}</h3>
                {action}
            </Box>
            <Divider/>
            <Box p={padding} style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                {children}
            </Box>
        </Paper>
    )
}

export default PaperContainer;