import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import StoryLineEntryCard from "./StoryLineEntryCard";
import Paper from "@material-ui/core/Paper";
import {DatePicker} from "@material-ui/pickers";
import StoryLinePresetButton from "./StoryLinePresetButton";
import storyLines from "../../data/storyLines";
import StoryLineGrid from "./StoryLineGrid";
import Button from "@material-ui/core/Button";
import CrudDialog from "../../components/dialogs/CrudDialog";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {Field, Form, Formik} from "formik";
import {randomId} from "../../lib/math/randomId";
import {ColorPicker} from "material-ui-color";

const defaultColors = [
    '#29b6f6',
    '#7e57c2',
    '#fdd835',
    '#66bb6a',
    '#ffa726',
    '#f4511e',
    '#2196f3',
    '#f06292',
    '#2196f3',
    '#009688',
]

export interface StoryLine {
    id: string;
    name: string;
    entries: StoryLineEntry[];
}

export interface StoryLineEntry {
    id: string;
    name: string;
    color: string;
    start: number;
    end: number;


    // todo remove
    index?: number,
    weeks?: number,
}

const michael = new Date(1996, 2, 7)

export const StoryLinePage = () => {


    const [birthDate, setBirthDate] = useState(new Date(1996, 3, 7))
    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(0)
    const [storyLine, setStoryLine] = useState<StoryLine>(storyLines[0])

    const [selectedWeek, setSelectedWeek] = useState<number | undefined>();
    const nextColor = defaultColors[storyLine.entries.length % defaultColors.length];


    const [submitButtonRef] = useSubmitButtonRef();
    const [editElement, setEditElement] = useState<StoryLineEntry | undefined>(undefined)
    const onBlockClick = (index: number) => {
        if (!selectedWeek) {
            setSelectedWeek(index);
            return;
        }

        setSelectedWeek(undefined);
        setEditElement({
            id: randomId(),
            name: '',
            color: nextColor,
            start: selectedWeek,
            end: index + 1,
        })

    }
    const onSubmit = (values: StoryLineEntry) => {
        if (values === undefined) return;
        const newElements = [...storyLine.entries];
        const elementIndex = newElements.findIndex((e) => e.id === values.id);
        elementIndex === -1 ? newElements.push(values) : (newElements[elementIndex] = values);
        setStoryLine({...storyLine, entries: newElements})
        setEditElement(undefined)
    }

    const onDelete = (entry: StoryLineEntry) => {
        setStoryLine({...storyLine, entries: storyLine.entries.filter(e => e.id !== entry.id)})
        setEditElement(undefined)
    }

    return (
        <div style={{
            position: 'relative',
            width: '100%',
        }}>

            <CrudDialog<StoryLineEntry>
                title={'Edit event'}
                element={editElement}
                onCancel={() => setEditElement(undefined)}
                onDelete={onDelete}
                submitButtonRef={submitButtonRef}
            >
                <Formik<StoryLineEntry> onSubmit={onSubmit} initialValues={editElement ?? {
                    id: randomId(),
                    name: '',
                    color: '#000000',
                    start: 0,
                    end: 1,
                    weeks: 1,
                }}>{({setFieldValue}) => (
                    <Form>
                        <button aria-label="submit" type="submit" style={{display: 'none'}} ref={submitButtonRef}/>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    required
                                    name="name"
                                    label="Name"
                                    type="name"
                                    autoFocus
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="start"
                                    label="Start week"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="end"
                                    label="End week"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={ColorPicker}
                                    name={'color'}
                                    onChange={(e: any) => setFieldValue('color', '#' + e.hex)}
                                />
                            </Grid>
                        </Grid>
                    </Form>
                )}
                </Formik>
            </CrudDialog>

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
                            {storyLine.entries.map((e) => {
                                return <StoryLineEntryCard
                                    entry={e}
                                    onClick={() => setEditElement(e)}
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
                            onClick={onBlockClick}
                            selectedWeek={selectedWeek}
                            hoverColor={nextColor}
                        />
                    </Grid>

                </Grid>
            </div>

        </div>
    )
}


export default StoryLinePage;
