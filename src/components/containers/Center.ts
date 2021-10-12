import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

const Center = withStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))(Box);


export default Center;