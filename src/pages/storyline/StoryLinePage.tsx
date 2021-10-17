import React, {useCallback, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import update from 'immutability-helper'
import StoryLineEntryCard from "./StoryLineEntryCard";
import Paper from "@material-ui/core/Paper";
import {DatePicker} from "@material-ui/pickers";
import StoryLinePresetButton from "./StoryLinePresetButton";
import storyLines from "../../data/storyLines";
import StoryLineGrid from "./StoryLineGrid";

export interface StoryLineEntry {
    id: string;
    index: number;
    name: string;
    color: string;
    weeks: number;
}

const michael = new Date(1996, 2, 7)

export const StoryLinePage = () => {


    const [birthDate, setBirthDate] = useState(new Date())
    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(0)
    const [entries, setEntries] = useState(storyLines[0].entries)


    const onMove = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const entry = entries[dragIndex]
            setEntries(
                update(entries, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, entry],
                    ],
                }),
            )
        },
        [entries],
    )

    return (
        <div style={{
            position: 'relative',
            width: '100%',
        }}>

            <div style={{padding: 32}}>

                <Grid container>
                    <Grid item xl={3} lg={12}>

                        <Paper style={{padding: 16}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DatePicker
                                        label="Birth date"
                                        value={birthDate}
                                        fullWidth
                                        onChange={(newValue) => {
                                            if (newValue === null) return;
                                            setBirthDate(new Date(newValue.getTime()));
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label={'Skip years'}
                                        value={skip}
                                        type={'number'}
                                        onChange={(e) => setSkip(Math.max(0, parseInt(e.target.value)))}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label={'Take years'}
                                        value={take}
                                        type={'number'}
                                        onChange={(e) => setTake(Math.max(0, parseInt(e.target.value)))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StoryLinePresetButton
                                        onSelect={(e) => setEntries(e.entries)}
                                    />
                                </Grid>
                            </Grid>

                        </Paper>

                        <List>
                            {entries.map((e, i) => {
                                return <StoryLineEntryCard
                                    id={e.id}
                                    text={e.name}
                                    color={e.color}
                                    index={i}
                                    onMove={onMove}
                                />
                            })}

                        </List>

                    </Grid>

                    <Grid item xl={9} lg={12}>
                        <StoryLineGrid
                            birthDate={birthDate}
                            skip={skip}
                            take={take}
                            entries={entries}
                        />
                    </Grid>

                </Grid>
            </div>

        </div>
    )
}


export default StoryLinePage;
