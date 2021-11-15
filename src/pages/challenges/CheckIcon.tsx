import React from "react";
import CheckLineIcon from "remixicon-react/CheckLineIcon";


export const CheckIcon: React.FC<{ checked?: boolean; onClick?: VoidFunction }> = ({onClick, checked}) => {
    return (
        <div
            onClick={onClick}
            style={{
                width: 20,
                height: 20,
                marginRight: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: checked ? '1px #ccc solid' : '1px #aaa solid',
                borderRadius: 4,
                cursor: 'pointer',
            }}>
            {checked ? <CheckLineIcon
                style={{width: 20}}
                color={'#00B276'}
            /> : <span/>}
        </div>
    )
}

export default CheckIcon;