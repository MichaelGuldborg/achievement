import React from "react";
import {Dialog, Switch} from "@material-ui/core";


export const ChallengeFilter: React.FC<{
    filter: { [k: string]: boolean },
    setFilter: (filter: { [k: string]: boolean }) => void
}> = ({filter, setFilter}) => {


    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div
            style={{
                display: "flex",
                alignItems: 'center',
                cursor: 'pointer'
            }}
        >
            {Object.keys(filter).map((key) => {
                if (!filter[key]) return <div/>
                return (
                    <div style={{
                        color: '#3758FA',
                        fontSize: 14,
                        fontWeight: 600,
                        border: '1px #3758FA solid',
                        borderRadius: 8,
                        padding: '4px 8px',
                    }}>
                        {`${key}=${filter[key]}`}
                    </div>
                )
            })}
            <div
                onClick={(e) => setOpen(true)}
                style={{
                    color: '#3758FA',
                    fontSize: 14,
                    fontWeight: 600,
                    marginLeft: 6,
                    border: '1px #3758FA solid',
                    borderStyle: 'dashed',
                    borderRadius: 8,
                    padding: '4px 8px',
                }}>
                Add filter
            </div>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={{padding: '0px 16px'}}>
                    {Object.keys(filter).map((e) => {
                        return (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{flex: 1}}>
                                    {e}
                                </div>
                                <Switch
                                    checked={filter[e]}
                                    onChange={() => setFilter({...filter, [e]: !filter[e]})}
                                />
                            </div>
                        )
                    })}
                </div>
            </Dialog>
        </div>
    )
}
export default ChallengeFilter;