import {Button, withStyles} from "@material-ui/core";

const DragDropButton = withStyles((theme) => ({
    root: {
        textAlign: 'left',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '8px 16px',
        color: theme.palette.primary.main,
        border: '1px dashed ' + theme.palette.primary.main
    },
}))(Button);

export default DragDropButton;