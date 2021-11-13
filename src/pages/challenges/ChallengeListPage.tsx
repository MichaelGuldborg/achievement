import React, {MouseEventHandler, useState} from "react";
import BasePageToolbar, {CreateButton} from "../../components/containers/BasePageToolbar";
import {useCrudListQuery} from "../../hooks/useCrudListQuery";
import {challenges} from "../../data/challenges";
import {Challenge} from "../../models/Activity";
import {CheckIcon} from "../AgendaPage";
import CrudDialog from "../../components/dialogs/CrudDialog";
import ChallengeForm from "./ChallengeForm";
import {firestoreCrudService} from "../../services/firestoreCrudService";
import {activityLevelMap, activityTypesMap} from "../../data/activities";
import popConfetti from "../../lib/popConfetti";
import history from "../../history";
import Routes from "../../constants/Routes";
import ChallengeFilter from "./ChallengeFilter";
import capitalize from "@material-ui/core/utils/capitalize";

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
    const [filter, setFilter] = useState<{ [key: string]: any }>({
        showChecked: true,
        showHidden: false,
    })


    const filteredElements = elements.filter((e) => {
        if (!filter.showChecked && e.checked) return false;
        if (!filter.showHidden && e.hidden) return false;
        if (search.trim().length !== 0) {
            return e.name.includes(search)
                || e.activity?.includes(search)
                || e.level?.includes(search);
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

    const [mouseDownIndex, setMouseDownIndex] = useState<number | undefined>(undefined);


    return (
        <div style={{backgroundColor: 'white', width: '100vw'}}>
            <div style={{height: 56, backgroundColor: '#F7F7F7'}}/>

            <CrudDialog
                submitButtonRef={submitButtonRef}
                element={selected}
                onCancel={() => {
                    setSelected(undefined);
                    setMouseDownIndex(undefined)
                }}
                onDelete={async (e) => {
                    await onDelete(e)
                    setSelected(undefined);
                    setMouseDownIndex(undefined)
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
                        <div
                            key={`challenge-${index}`}
                            style={{
                                marginBottom: 16,
                                position: 'relative',
                                transition: 'all 150ms cubic-bezier(0.694, 0.0482, 0.335, 1)',
                                boxShadow: mouseDownIndex === index
                                    ? '2px 2px 4px -1px rgb(152 162 179 / 15%), 0 2px 2px -1px rgb(152 162 179 / 30%)'
                                    : '4px 4px 8px 3px rgb(152 162 179 / 15%), 0 2px 2px -1px rgb(152 162 179 / 30%)',
                                overflow: 'hidden',
                                borderRadius: 4,
                            }}>
                            {challenge.level && activityLevelMap[challenge.level] &&
                            <Banner
                                size={24}
                                color={activityLevelMap[challenge.level].color}
                            />}
                            <div style={{display: 'flex', alignItems: 'center'}}>

                                <GestureDetector
                                    onMouseDown={() => setMouseDownIndex(index)}
                                    onMouseUp={() => setMouseDownIndex(-1)}
                                    onClick={() => history.push(Routes.challenge.replace(':challengeId', challenge.id))}
                                    onLongClick={() => setSelected(challenge)}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: 16,
                                    }}
                                >
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
                                    <div>
                                        <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>
                                            {challenge.name}
                                        </h3>
                                        <div style={{fontSize: 14, color: '#888'}}>
                                            {subtitleFromChallenge(challenge)}
                                        </div>
                                    </div>
                                </GestureDetector>
                                <div style={{paddingRight: 16}} onClick={onCheckClick(challenge)}>
                                    <CheckIcon checked={challenge.checked}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

let mouseDown = 0;
let mouseUp = 0;
export const GestureDetector: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    // onDouble: MouseEventHandler<HTMLDivElement>;
    onLongClick?: MouseEventHandler<HTMLDivElement>;
    delay?: number;
}> = (
    {
        children,
        delay = 500,
        onClick,
        // onDouble,
        onLongClick,
        onMouseDown,
        onMouseUp,
        ...props
    }
) => {

    return (
        <div
            onMouseDown={(e) => {
                onMouseDown?.(e)
                mouseDown = new Date().getTime();
                setTimeout((e) => {
                    if (mouseUp < mouseDown) {
                        onLongClick?.(e)
                    }
                }, delay)
            }}
            onMouseUp={(e) => {
                onMouseUp?.(e)
                mouseUp = new Date().getTime();
                onClick?.(e)
            }}
            {...props}
        >
            {children}
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

export const Banner: React.FC<{ size: number; color: string }> = ({size, color, children}) => {
    return (
        <div style={{
            position: 'absolute',
            top: -size,
            left: -size,
            width: size * 2,
            height: size * 2,
            transform: 'rotate(45deg)',
            backgroundColor: color,
        }}>
            {children}
        </div>
    )
}


export default ChallengeListPage;
