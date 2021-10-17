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
import Button from "@material-ui/core/Button";

export interface StoryLine {
    id: string;
    name: string;
    entries: StoryLineEntry[];
}

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
    const [storyLine, setStoryLine] = useState(storyLines[0])


    const onMove = useCallback((dragIndex: number, hoverIndex: number) => {
        const entry = storyLine.entries[dragIndex]
        setStoryLine({
            ...storyLine,
            entries: update(storyLine.entries, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, entry],
                ],
            })
        })
    }, [storyLine])

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
                                        onSelect={(e) => setStoryLine(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant={"outlined"}
                                        fullWidth
                                        onClick={() => setStoryLine({
                                            ...storyLine,
                                            entries: [],
                                        })}
                                    >
                                        Reset
                                    </Button>

                                </Grid>
                            </Grid>

                        </Paper>

                        <List>
                            {storyLine.entries.map((e, i) => {
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
                            entries={storyLine.entries}
                        />
                    </Grid>

                </Grid>
            </div>

        </div>
    )
}


export default StoryLinePage;
