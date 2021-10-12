import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const MultiLineButton = withStyles(() => ({
    root: {
        '& span': {
            display: 'flex',
            flexDirection: 'column',
        },
    },
}))(Button);

export default MultiLineButton;