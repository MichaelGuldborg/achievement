import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import List from "@material-ui/core/List";
import LifeMapEntryCard from "./LifeMapEntryCard";
import Paper from "@material-ui/core/Paper";
import {DatePicker} from "@material-ui/pickers";
import LifeMapPresetButton from "./LifeMapPresetButton";
import lifeMaps from "../../data/lifeMaps";
import LifeMapGrid from "./LifeMapGrid";
import Button from "@material-ui/core/Button";
import CrudDialog from "../../components/dialogs/CrudDialog";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {Field, Form, Formik} from "formik";
import {randomId} from "../../lib/math/randomId";
import {ColorPicker} from "material-ui-color";
import BasePage from "../../components/containers/BasePage";

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

export interface LifeMap {
    id: string;
    name: string;
    entries: LifeMapEntry[];
}

export interface LifeMapEntry {
    id: string;
    name: string;
    color: string;
    start: number;
    end: number;


    // todo remove
    index?: number,
    weeks?: number,
}


export const LifeMapPage = () => {


    const [birthDate, setBirthDate] = useState(new Date(1996, 3, 7))
    const [skip, setSkip] = useState(0)
    const [take, setTake] = useState(0)
    const [storyLine, setStoryLine] = useState<LifeMap>(lifeMaps[0])

    const [selectedWeek, setSelectedWeek] = useState<number | undefined>();
    const nextColor = defaultColors[storyLine.entries.length % defaultColors.length];


    const [submitButtonRef] = useSubmitButtonRef();
    const [editElement, setEditElement] = useState<LifeMapEntry | undefined>(undefined)
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
    const onSubmit = (values: LifeMapEntry) => {
        if (values === undefined) return;
        const newElements = [...storyLine.entries];
        const elementIndex = newElements.findIndex((e) => e.id === values.id);
        elementIndex === -1 ? newElements.push(values) : (newElements[elementIndex] = values);
        setStoryLine({...storyLine, entries: newElements})
        setEditElement(undefined)
    }

    const onDelete = (entry: LifeMapEntry) => {
        setStoryLine({...storyLine, entries: storyLine.entries.filter(e => e.id !== entry.id)})
        setEditElement(undefined)
    }

    return (
        <BasePage>

            <div style={{
                position: 'relative',
                width: '100%',
            }}>

                <CrudDialog<LifeMapEntry>
                    title={'Edit event'}
                    element={editElement}
                    onCancel={() => setEditElement(undefined)}
                    onDelete={onDelete}
                    submitButtonRef={submitButtonRef}
                >
                    <Formik<LifeMapEntry> onSubmit={onSubmit} initialValues={editElement ?? {
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
                                        <LifeMapPresetButton
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
                                    return <LifeMapEntryCard
                                        entry={e}
                                        onClick={() => setEditElement(e)}
                                    />
                                })}
                            </List>

                        </Grid>

                        <Grid item xl={9} lg={12}>
                            <LifeMapGrid
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
        </BasePage>

    )
}


export default LifeMapPage;
