import {fade, InputBase, withStyles} from "@material-ui/core";

const RoundTextField = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
        borderRadius: 26,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid ' + theme.palette.info.main,
        fontSize: 14,
        padding: '4px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus-within': {
            boxShadow: `${fade(theme.palette.primary.dark, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.dark,
        },
        '& .remixicon-icon ': {
            color: theme.palette.grey.A200
        }
    },
}))(InputBase);

export default RoundTextField;