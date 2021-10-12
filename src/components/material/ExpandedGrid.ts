import {Grid, withStyles} from "@material-ui/core";

const ExpandedGrid = withStyles(() => ({
    root: {
        position: 'relative',
        height: '100%'
    },
}))(Grid);

export default ExpandedGrid;