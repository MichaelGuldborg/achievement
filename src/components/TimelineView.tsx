import React from "react";
import {Box} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    circle: {
        marginLeft: 8,
        marginRight: 8,
        borderRadius: '50%',
        padding: 4,
        border: 2,
        borderStyle: 'solid',
        borderColor: 'white'

    },
    separator: {
        height: 2,
        width: 40,
        backgroundColor: '#bdbdbd',
        alignSelf: 'center'
    }
}))

const TimelineView: React.FC<{ length: number, index: (number|undefined) }> = ({length, index}) => {
    const classes = useStyles();
    const indexList = Array.from(Array(length).keys());
    const realIndex = index ? index : 0;
    return (
        <Box display={'flex'} p={2}>
            {indexList.map((i) => {
                return (
                    <Box display={'flex'} key={i}>
                        {realIndex >= i ? (
                            <div className={classes.circle} style={{backgroundColor: 'white'}}/>

                        ) : (
                            <div className={classes.circle}/>
                        )}
                        {(i < (length - 1)) && <div className={classes.separator}/>}
                    </Box>
                );
            })}
        </Box>
    );
};

export default TimelineView;
