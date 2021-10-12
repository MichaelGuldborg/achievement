import {colors} from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import round from "../../lib/math/round";
import {randomFloat, randomInt} from "../../lib/math/rand";
import {changes} from "../../data/changes";
import {RemixiconReactIconComponentType} from "remixicon-react";
import theme from "../../constants/theme";

const styles = {
    number: {
        // flex: 1,
        display: 'flex',
        justifyContent: 'center',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 12,
    },
    text: {
        // flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: colors.grey["700"],
    }
} as any


export const EffectPercent: React.FC<{
    percent?: number;
    text?: string;
    Icon?: RemixiconReactIconComponentType;
}> = (
    {
        percent,
        text,
        Icon
    }
) => {
    percent = percent || randomFloat(0.5, 0.9);
    const temp = changes[randomInt(changes.length - 1)]
    text = text || temp.text
    Icon = Icon || temp.icon
    return (

        <Paper style={{height: "100%", width: '100%', display: "flex"}}>
            <Box padding={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                 width={'100%'}>
                <div>
                    <Icon size={64} style={{color: theme.palette.primary.main}}/>
                </div>
                <div style={styles.number}>
                    {(round(percent * 100, 1) + "").replace(".", ",")} %
                </div>
                <div style={styles.text}>
                    {text}
                </div>
            </Box>
        </Paper>

    )
}

export default EffectPercent;