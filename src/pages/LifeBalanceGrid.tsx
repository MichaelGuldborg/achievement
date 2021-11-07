import {Grid} from "@material-ui/core";
import {balances} from "../data/balances";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import {DoughnutNumber} from "../components/DoughnutNumber";
import React from "react";
import habits from "../data/habits";


export const LifeBalanceGrid = () => {
    return (
        <Grid container spacing={3}>
            {balances.map((element, index) => {
                const value = habits.filter(e => e.type === element.id || e.secondaryTypes?.includes(element.id)).length;

                return (
                    <Grid key={element.id} item md={2}>
                        <Paper style={{padding: 16}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Tooltip title={<span>{element.description}</span>}>
                                    <div style={{fontSize: 18, fontWeight: 600}}>
                                        {element.name}
                                    </div>
                                </Tooltip>
                                {element.icon && <element.icon/>}
                            </div>
                            <DoughnutNumber value={value} max={10}/>
                        </Paper>

                    </Grid>
                );
            })}
        </Grid>
    )
}

export default LifeBalanceGrid;