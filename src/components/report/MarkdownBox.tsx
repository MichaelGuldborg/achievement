import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";


export const MarkdownBox: React.FC<{ text?: string }> = (
    {
        text = 'Dette er en placeholder tekst'
    }
) => {

    return (
        <Paper style={{height: "100%", width: '100%', display: "flex"}}>
            <Box padding={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                 width={'100%'}>
                {text}
            </Box>
        </Paper>
    )
}

export default MarkdownBox;