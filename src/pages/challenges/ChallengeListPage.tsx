import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import BasePageToolbar, {CreateButton} from "../../components/containers/BasePageToolbar";
import {useCrudListQuery} from "../../hooks/useCrudListQuery";
import {challenges} from "../../data/challenges";
import {Challenge} from "../../models/Activity";
import {CheckIcon} from "../AgendaPage";
import {Switch} from "@material-ui/core";
import CrudDialog from "../../components/dialogs/CrudDialog";
import ChallengeForm from "./ChallengeForm";
import {firestoreCrudService} from "../../services/firestoreCrudService";
import {activityLevelMap, activityTypesMap} from "../../data/activities";
import popConfetti from "../../lib/popConfetti";
import ExternalLinkLineIcon from "remixicon-react/ExternalLinkLineIcon";
import history from "../../history";
import Routes from "../../constants/Routes";


export const ChallengeListPage = () => {

    const {elements, selected, setSelected, submitButtonRef, onCreate, onUpdate, onDelete} = useCrudListQuery<Challenge>(firestoreCrudService('challenges', (a, b) => {
        // sort non-checked first
        if (a.checked && !b.checked) {
            return 1;
        }
        if (b.checked && !a.checked) {
            return -1;
        }
        // sort with level first
        if (a.level && !b.level) {
            return -1;
        }
        if (b.level && !a.level) {
            return 1;
        }
        // sort by level index
        if (a.level && b.level) {
            const levelIndexA = activityLevelMap[a.level].index;
            const levelIndexB = activityLevelMap[b.level].index;
            if (levelIndexA > levelIndexB) return 1;
            if (levelIndexA < levelIndexB) return -1;
        }
        // sort alphabetically by name
        return a.name.localeCompare(b.name);
    }));

    const [search, setSearch] = useState<string>('');
    const [showCompleted, setShowCompleted] = useState(true);
    const [showHidden, setShowHidden] = useState(false);

    const filteredElements = elements.filter((e) => {
        if (!showCompleted && e.checked) return false;
        if (!showHidden && e.hidden) return false;
        if (search.trim().length !== 0) {
            return e.name.includes(search)
                || e.activity?.includes(search)
                || e.level?.includes(search);
        }
        return true;
    })

    const onCheckClick = (challenge: Challenge) => (e: any) => {
        if (!challenge.checked) setTimeout(() => {
            // const audio = new Audio("/assets/audio/pop.mp3");
            // audio.play();
            popConfetti(e);
        }, 200);
        onUpdate({
            ...challenge,
            checked: !challenge.checked
        })
    }

    return (
        <div style={{backgroundColor: 'white', width: '100vw'}}>
            <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>

            <CrudDialog
                submitButtonRef={submitButtonRef}
                element={selected}
                onCancel={() => setSelected(undefined)}
                onDelete={async (e) => {
                    await onDelete(e)
                    setSelected(undefined);
                }}
            >
                <ChallengeForm
                    submitButtonRef={submitButtonRef}
                    initial={selected}
                    onSubmit={async (e) => {
                        e.id !== undefined && e.id.length !== 0 ? await onUpdate(e) : await onCreate(e)
                        setSelected(undefined);
                    }}/>
            </CrudDialog>


            <div style={{padding: 16, paddingBottom: 8}}>
                <BasePageToolbar
                    search={search}
                    onSearch={setSearch}
                    action={<CreateButton text={'New challenge'} onClick={() => {
                        setSelected({
                            id: '',
                            name: '',
                        })
                    }}/>}
                />
                <div>
                    Show completed
                    <Switch
                        value={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                    />
                </div>
                <div>
                    Show hidden
                    <Switch
                        value={showHidden}
                        onChange={() => setShowHidden(!showHidden)}
                    />
                </div>
            </div>
            <div style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 64}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    fontSize: 16,
                    color: '#aaa',
                    marginBottom: 12,
                }}>
                    {`${filteredElements.filter(e => e.checked).length} / ${filteredElements.length}`}
                </div>
                {filteredElements.map((challenge, index) => {
                    return (
                        <Paper
                            key={`challenge-${index}`}
                            style={{
                                marginBottom: 16,
                                position: 'relative',
                            }}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div
                                    onClick={() => {
                                        history.push(Routes.challenge.replace(':challengeId', challenge.id))
                                        // setSelected(challenge);
                                    }}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: 16,
                                    }}
                                >

                                    {challenge.level && activityLevelMap[challenge.level] &&
                                    <div style={{
                                        position: 'absolute',
                                        top: -20,
                                        left: -20,
                                        width: 40,
                                        height: 40,
                                        transform: 'rotate(45deg)',
                                        backgroundColor: activityLevelMap[challenge.level].color,
                                    }}/>}
                                    {challenge.activity && activityTypesMap[challenge.activity] &&
                                    <div style={{marginRight: 12}}>
                                        <img
                                            src={activityTypesMap[challenge.activity].icon}
                                            alt={challenge.activity}
                                            style={{
                                                width: 24,
                                                height: 24,
                                            }}
                                        />
                                    </div>}
                                    <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>
                                        {challenge.name}
                                    </h3>
                                </div>
                                {challenge.name.toLowerCase().includes('nofap') && <div
                                    style={{paddingRight: 16}}
                                    onClick={() => history.push(Routes.challenges30Day.replace(':challengeId', challenge.id))}
                                >
                                    <ExternalLinkLineIcon/>
                                </div>
                                }
                                <div style={{paddingRight: 16}} onClick={onCheckClick(challenge)}>
                                    <CheckIcon checked={challenge.checked}/>
                                </div>
                            </div>
                            {/*<div>*/}
                            {/*    {challenge.description}*/}
                            {/*</div>*/}
                        </Paper>
                    )
                })}
            </div>
        </div>
    )
}


export default ChallengeListPage;
