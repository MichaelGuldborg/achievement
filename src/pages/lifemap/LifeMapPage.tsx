import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import LifeMapGrid from "./LifeMapGrid";
import CrudDialog from "../../components/dialogs/CrudDialog";
import useSubmitButtonRef from "../../hooks/useSubmitButtonRef";
import {Field, Form, Formik} from "formik";
import {randomId} from "../../lib/math/randomId";
import theme, {prettyColors} from "../../constants/theme";


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
    const [storyLine, setStoryLine] = useState<LifeMap>({
        id: randomId(),
        name: '',
        entries: [],
    })

    const [selectedWeek, setSelectedWeek] = useState<number | undefined>();
    const nextColor = prettyColors[storyLine.entries.length % prettyColors.length];


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
        <div style={{
            width: '100vw',
            position: 'relative',
            backgroundColor: 'white',
        }}>
            <div style={{width: '100%', height: 56, backgroundColor: '#F7F7F7'}}/>
            <div style={{height: 16}}/>

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
                }}>{({values, setFieldValue}) => (
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
                            <Grid item xs={12}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{
                                        marginTop: 4,
                                        marginRight: 16,
                                        fontSize: 18,
                                        fontWeight: 400,
                                        color: theme.colors.black,
                                    }}>
                                        Color
                                    </div>
                                    {prettyColors.map((e) =>
                                        <div
                                            onClick={() => setFieldValue('color', e)}
                                            style={{
                                                marginRight: 16,
                                                width: 32,
                                                height: 32,
                                                position: 'relative',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <div style={{
                                                position: 'absolute',
                                                width: 36,
                                                height: 36,
                                                borderRadius: 100,
                                                backgroundColor: e,
                                                opacity: values.color === e ? 0.3 : 0.0,
                                            }}/>
                                            <div style={{
                                                position: 'absolute',
                                                width: 26,
                                                height: 26,
                                                borderRadius: 100,
                                                backgroundColor: e
                                            }}/>
                                        </div>
                                    )}
                                </div>
                            </Grid>
                            {/*<Grid item xs={6}>*/}
                            {/*    <Field*/}
                            {/*        as={TextField}*/}
                            {/*        fullWidth*/}
                            {/*        name="start"*/}
                            {/*        label="Start week"*/}
                            {/*        type="number"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={6}>*/}
                            {/*    <Field*/}
                            {/*        as={TextField}*/}
                            {/*        fullWidth*/}
                            {/*        name="end"*/}
                            {/*        label="End week"*/}
                            {/*        type="number"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={6}>*/}
                            {/*    <Field*/}
                            {/*        as={ColorPicker}*/}
                            {/*        name={'color'}*/}
                            {/*        onChange={(e: any) => setFieldValue('color', '#' + e.hex)}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Form>
                )}
                </Formik>
            </CrudDialog>


            <div>

                <LifeMapGrid
                    birthDate={birthDate}
                    entries={storyLine.entries}
                    onClick={onBlockClick}
                    selectedWeek={selectedWeek}
                    hoverColor={nextColor}
                />


                {/*<Grid container>*/}
                {/*    <Grid item xl={3} lg={12}>*/}

                {/*        <Paper style={{padding: 16}}>*/}
                {/*            <Grid container spacing={2}>*/}
                {/*                <Grid item xs={12}>*/}
                {/*                    <DatePicker*/}
                {/*                        label="Birth date"*/}
                {/*                        value={birthDate}*/}
                {/*                        fullWidth*/}
                {/*                        onChange={(newValue) => {*/}
                {/*                            if (newValue === null) return;*/}
                {/*                            setBirthDate(new Date(newValue.getTime()));*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                </Grid>*/}
                {/*                <Grid item xs={6}>*/}
                {/*                    <TextField*/}
                {/*                        label={'Skip years'}*/}
                {/*                        value={skip}*/}
                {/*                        type={'number'}*/}
                {/*                        onChange={(e) => setSkip(Math.max(0, parseInt(e.target.value)))}*/}
                {/*                    />*/}
                {/*                </Grid>*/}
                {/*                <Grid item xs={6}>*/}
                {/*                    <TextField*/}
                {/*                        label={'Take years'}*/}
                {/*                        value={take}*/}
                {/*                        type={'number'}*/}
                {/*                        onChange={(e) => setTake(Math.max(0, parseInt(e.target.value)))}*/}
                {/*                    />*/}
                {/*                </Grid>*/}
                {/*                <Grid item xs={12}>*/}
                {/*                    <LifeMapPresetButton*/}
                {/*                        onSelect={(e) => setStoryLine(e)}*/}
                {/*                    />*/}
                {/*                </Grid>*/}
                {/*                <Grid item xs={12}>*/}
                {/*                    <Button*/}
                {/*                        variant={"outlined"}*/}
                {/*                        fullWidth*/}
                {/*                        onClick={() => setStoryLine({*/}
                {/*                            ...storyLine,*/}
                {/*                            entries: [],*/}
                {/*                        })}*/}
                {/*                    >*/}
                {/*                        Reset*/}
                {/*                    </Button>*/}

                {/*                </Grid>*/}
                {/*            </Grid>*/}

                {/*        </Paper>*/}

                {/*        <List>*/}
                {/*            {storyLine.entries.map((e) => {*/}
                {/*                return <LifeMapEntryCard*/}
                {/*                    entry={e}*/}
                {/*                    onClick={() => setEditElement(e)}*/}
                {/*                />*/}
                {/*            })}*/}
                {/*        </List>*/}

                {/*    </Grid>*/}
                {/*</Grid>*/}


            </div>
        </div>

    )
}


export default LifeMapPage;
