import React from "react";
import Activity, {getMaxCompletedLevel} from "../../models/Activity";


export const ActivityCard: React.FC<{
    onClick: VoidFunction,
    element: Activity
}> = (
    {
        onClick,
        element,
    }
) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'relative',
                padding: 8,
                background: 'white',
                borderRadius: 8,
                boxShadow: '0 5px 25px rgba(0,0,0,.04)',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: 160,
                    background: 'rgba(0,0,0,.05)',
                    borderRadius: 8,
                    // background: 'white',
                    overflow: 'hidden',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    // backgroundImage: `url('${element.imageUrl}')`,
                }}
            >
            </div>

            <div style={{
                paddingTop: 8,
                paddingBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span style={{
                    fontSize: 20,
                    fontWeight: 600,
                }}>
                    {element.name}
                </span>
                <span style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#777',
                    marginRight: 8
                }}>
                    {getMaxCompletedLevel(element)} / {element.levels.length}
                </span>
            </div>
        </div>
    );
}

export default ActivityCard;