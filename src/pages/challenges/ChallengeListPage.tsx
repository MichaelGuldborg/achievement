import React, {useState} from "react";
import BasePageToolbar, {CreateButton} from "../../components/containers/BasePageToolbar";
import {useCrudListQuery} from "../../hooks/useCrudListQuery";
import {challenges} from "../../data/challenges";
import {Challenge} from "../../models/Activity";
import CrudDialog from "../../components/dialogs/CrudDialog";
import ChallengeForm from "./ChallengeForm";
import {firestoreCrudService} from "../../services/firestoreCrudService";
import popConfetti from "../../lib/popConfetti";
import ChallengeFilter from "./ChallengeFilter";
import capitalize from "@material-ui/core/utils/capitalize";
import {ChallengeListItem} from "./ChallengeListItem";
import history from "../../history";
import Routes from "../../constants/Routes";
import {compareChallenges} from "./compareChallenges";

export const ChallengeListPage = () => {

    const {elements, selected, setSelected, submitButtonRef, onCreate, onUpdate, onDelete,} = useCrudListQuery<Challenge>(firestoreCrudService('challenges', compareChallenges));

    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<{ [key: string]: any }>({
        showChecked: true,
        showHidden: false,
    })


    const filteredElements = elements.filter((e) => {
        if (!filter.showChecked && e.checked) return false;
        if (!filter.showHidden && e.hidden) return false;
        const searchLower = search.trim().toLowerCase();
        if (searchLower.length !== 0) {
            return e.name.toLowerCase().includes(searchLower)
                || e.activity?.toLowerCase()?.includes(searchLower)
                || e.level?.toLowerCase()?.includes(searchLower);
        }
        return true;
    })

    const onCheckClick = (challenge: Challenge) => (e: any) => {
        if (!challenge.checked) setTimeout(() => {
            popConfetti(e);
        }, 100);
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
                onCancel={() => {
                    setSelected(undefined);
                }}
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
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1}}>
                        <ChallengeFilter
                            filter={filter}
                            setFilter={(e) => setFilter(e)}
                        />
                    </div>
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

                </div>

            </div>
            <div style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 64}}>
                {filteredElements.map((challenge, index) => {
                    return (
                        <ChallengeListItem
                            challenge={challenge}
                            index={index}
                            onClick={() => history.push(Routes.challenge.replace(':challengeId', challenge.id))}
                            onCheckClick={onCheckClick(challenge)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export const subtitleFromChallenge = (e: Challenge): string => {
    const activity = capitalize(e.activity?.replace('-', ' ') ?? '');
    const level = capitalize(e.level?.replace('-', ' ') ?? '');
    if (!e.activity && !e.level) {
        return '';
    }
    if (e.activity && !e.level) {
        return activity;
    }
    if (e.level && !e.activity) {
        return level;
    }
    return `${activity} - ${level}`;
}


export default ChallengeListPage;
