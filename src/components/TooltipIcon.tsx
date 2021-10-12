import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import QuestionLineIcon from "remixicon-react/QuestionLineIcon";


export const TooltipIcon: React.FC<{ title: string }> = ({title}) => {
    return (
        <Tooltip title={title}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <QuestionLineIcon/>
            </div>
        </Tooltip>
    )
}
export default TooltipIcon;