import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import PopoverDatePicker from "../../components/pickers/PopoverDatePicker";
import {toLocalDateMothYearString} from "../../lib/date/toLocalISO";


export const Challenge30DayPage = () => {


    const [selectedIndex, setSelectedIndex] = useState(0);
    const [date, setDate] = useState(new Date());

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            // background: 'white',
            // overflow: 'hidden',
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover',
            // backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0)), url('${activity.backgroundUrl}')`,
        }}>

            <Container style={{marginTop: 32}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h1>30 Day challenge</h1>
                </div>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Paper style={{display: 'flex', flexDirection: 'column', padding: 16,}}>
                            {Array.from({length: 3}).map((_, i) => {
                                return <div style={{display: 'flex'}}>
                                    {Array.from({length: 10}).map((_, j) => {
                                        const index = i * 10 + j + 1;
                                        const checked = selectedIndex >= index;
                                        return <div
                                            style={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}>
                                            <Checkbox
                                                size={"medium"}
                                                checked={checked}
                                                onChange={() => {
                                                    const nextIndex = checked ? index - 1 : index;
                                                    setSelectedIndex(nextIndex);
                                                }}
                                            />
                                            <span style={{fontSize: 18, fontWeight: 600}}>
                                                {index}
                                            </span>
                                        </div>
                                    })}
                                </div>
                            })}

                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <div style={{display: 'flex', flexDirection: 'column', padding: 16}}>
                                <div style={{
                                    padding: 8,
                                    marginBottom: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>Use date</span>
                                    <Switch/>
                                </div>

                                <PopoverDatePicker value={date} onChange={(d) => {
                                    if (!d) return;
                                    setDate(new Date(d.getTime()));
                                }}>
                                    <Button variant={"outlined"} style={{marginBottom: 16, padding: 8}}>
                                        {toLocalDateMothYearString(date)}
                                    </Button>
                                </PopoverDatePicker>

                                <Button variant={"outlined"} style={{marginBottom: 16, padding: 8}}>
                                    Reset
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

export default Challenge30DayPage;
