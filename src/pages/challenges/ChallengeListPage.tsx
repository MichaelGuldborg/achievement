import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import BasePageToolbar, {CreateButton} from "../../components/containers/BasePageToolbar";
import {useListQuery} from "../../hooks/useListQuery";
import localCrudService from "../../services/localCrudService";
import {challenges} from "../../data/challenges";
import {Challenge} from "../../models/Activity";
import {CheckIcon} from "../AgendaPage";
import ClimbingIcon from "../../assets/icons/climbing.png";
import WeightLiftingIcon from "../../assets/icons/weightlifting.png";
import GymnasticsIcon from "../../assets/icons/gymnastics.png";
import CalisthenicsIcon from "../../assets/icons/calisthenics.png";
import FlexibilityIcon from "../../assets/icons/flexibility.png";
import BusinessIcon from "../../assets/icons/business.png"
import {Switch} from "@material-ui/core";
import CrudDialog from "../../components/dialogs/CrudDialog";
import ChallengeForm from "./ChallengeForm";


const service = localCrudService<Challenge>('challenges');
export const ChallengeListPage = () => {

    const {elements, selected, setSelected, submitButtonRef, onCreate, onUpdate, onDelete} = useListQuery<Challenge>({
        ...service,
        readAll: async () => {
            const response = await service.readAll();
            if (!response.success) return response;
            response.value.sort((a, b) => {
                if (a.checked && b.checked) {
                    if (a.activity && b.activity) {
                        return a.activity.localeCompare(b.activity);
                    }
                    return a.name.localeCompare(b.name);
                }
                if (a.checked) {
                    return 1;
                }
                if (b.checked) {
                    return -1;
                }
                return 0;
            })
            return response;
        }
    });

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

    return (
        <div style={{backgroundColor: 'white', paddingTop: 56, width: '100vw'}}>

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
                                padding: 16,
                            }}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div
                                    style={{display: 'flex', alignItems: 'center'}}
                                    onClick={() => setSelected(challenge)}
                                >
                                    {challenge.activity && activityIcons[challenge.activity] && <img
                                        src={activityIcons[challenge.activity]}
                                        alt={challenge.activity}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            marginRight: 12,
                                        }}
                                    />}
                                    <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>
                                        {challenge.name}
                                    </h3>
                                </div>
                                <div style={{flex: 1}}/>
                                <div>
                                    <CheckIcon
                                        checked={challenge.checked}
                                        onClick={() => {
                                            onUpdate({
                                                ...challenge,
                                                checked: !challenge.checked
                                            })
                                        }}
                                    />
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

export const activityIcons: { [key: string]: any } = {
    'climbing': ClimbingIcon,
    'weightlifting': WeightLiftingIcon,
    'gymnastics': GymnasticsIcon,
    'calisthenics': CalisthenicsIcon,
    'flexibility': FlexibilityIcon,
    'business': BusinessIcon,
}


export default ChallengeListPage;
