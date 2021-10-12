import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";


export const LargeTooltip = withStyles({
    tooltip: {
        color: '#fff',
        padding: '8px 16px',
        fontSize: 15,
        maxWidth: 300,
        lineHeight: '1.4em',
        borderRadius: 4,
    }
})(Tooltip);

export default LargeTooltip;