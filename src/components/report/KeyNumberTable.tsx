import Paper from "@material-ui/core/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import sumByIndex from "../../lib/math/sumByIndex";
import round from "../../lib/math/round";
import formatNumber from "../../lib/string/formatNumber";


export const KeyNumberTable: React.FC<{ investment?: number, discountRate?: number }> = (
    {
        investment = 5000000,
        discountRate = 0.04
    }
) => {

    // {name: 'Akkumuleret omkostning', valeus: [5133, 5133, 5133, 5133]},
    // {name: 'Akkumuleret social værdi', values: [8799895, 17261332, 25213079, 32690685, 39726951, 46352156]},
    // {name: 'Nettoværdi', values: [3666561, 12127998, 20079746, 27557352, 34593618, 41218823]},
    // {name: 'Social benefit-cost ratio', values: ['1,7', '3,4', '4,9', '6,4', '7.7', '9.0']},
    // {name:'SROI', values: ['75%', '87%', '74%', '63%', '55%', '48%']},

    const cost: number[] = Array.from({length: 6}).map(e => investment);
    // const presentValue = getAllChangeValueByYear(theory.effects); // TODO FIX
    // const presentValueAcc = accValues(presentValue);
    const presentValue = [8799895, 8461437, 7951747, 7477606, 7036266, 6625205];
    const presentValueAcc = [8799895, 17261332, 25213079, 32690685, 39726951, 46352156];
    const netPresentValue = sumByIndex([presentValue, cost.map(e => e * -1)])
    const ratio = presentValueAcc.map((v, i) => round(v / cost[i], 1));
    const sroi = ratio.map((r, i) => Math.round((Math.pow(r, 1 / (i + 1)) - (1 + discountRate)) * 100) + "%");

    const rows = [
        {name: 'Akkumuleret omkostning', values: cost},
        {name: 'Akkumuleret social værdi', values: presentValueAcc},
        {name: 'NettoVærdi', values: netPresentValue},
        {name: 'Social cost-benefit ratio', values: ratio},
        {name: 'SROI', values: sroi},
    ]

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>NØGLETAL (KR.)</TableCell>
                        {Array.from({length: 6}).map((e, i) => (
                            <TableCell key={'key-number-' + i} align="right">ÅR {i}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {row.values.map(v => <TableCell key={v} align="right">
                                {formatNumber(v)}
                            </TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}
export default KeyNumberTable;