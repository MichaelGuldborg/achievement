import React, {useEffect, useState} from "react";
import {InputBase} from "@material-ui/core";
import {randomId} from "../lib/math/randomId";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CheckIcon from "./challenges/CheckIcon";


export interface CheckList {
    id: string;
    name: string;
    items: CheckListItem[];
}

export interface CheckListItem {
    id: string;
    type: 'check' | 'text',
    name: string;
    description?: string;
    color?: string;
    checked?: boolean;
}

let focused = true;
let focusIndex = 0;
const setNextFocus = (index: number) => {
    focused = false;
    focusIndex = index;
}
const setFocus = (index: number) => {
    document.getElementById(`field-${index}`)?.focus()
}

const reorder = <T, >(list: T[], startIndex?: number, endIndex?: number): T[] => {
    if (startIndex === undefined || endIndex === undefined) return list;
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const AgendaPage: React.FC = () => {

    // const currentUser = useCurrentUser();
    // const collection = `users/${currentUser?.id}/habits`;
    //
    // const {elements, onUpdate, onDelete} = useCrudListQuery<Habit>(crudService(collection));
    // elements.sort((a, b) => {
    //     if (!a.startTime || !b.startTime) return 0;
    //     return a.startTime.localeCompare(b.startTime);
    // })
    // const [todoList, setTodoList] = useState(elements.filter(e => e.dayOfWeek === nowDayName || e.isDaily).map((e) => ({
    //     id: e.id,
    //     text: e.name,
    //     checked: false,
    // })));


    // TODO
    //


    const [checkList, setCheckList] = useState<CheckList>({
        id: randomId(),
        name: 'Todo',
        items: [{
            id: randomId(),
            type: 'check',
            name: 'Make the bed',
            description: 'Place the blanket evenly spread out onto the bed and place the pillows at the top',
            checked: false,
        }, {
            id: randomId(),
            type: 'check',
            name: 'Bouldering',
            description: 'Climb different boulders at an indoor bouldering gym for at least 1 hour',
            checked: false,
        }, {
            id: randomId(),
            type: 'check',
            name: 'Brush your teeth',
            description: 'Brush your teeth for 2 minutes',
            checked: false,
        }, {
            id: randomId(),
            type: 'text',
            name: 'This is just a general checklist',
            checked: false,
        }],
    });

    useEffect(() => {
        if (focused) return;
        focused = true;
        setFocus(focusIndex);
    }, [checkList])

    const checkItem = (index: number) => {
        return updateItem(index, (item) => ({
            ...item,
            checked: !item.checked
        }))
    }

    const resetItemType = (index: number) => {
        setNextFocus(index);
        return updateItem(index, (item) => ({
            ...item,
            type: 'text',
        }))
    }


    const updateItem = (index: number, update: (item: CheckListItem) => CheckListItem) => {
        setCheckList((prev) => {
            return {
                id: prev.id,
                name: prev.name,
                items: prev.items.map((e, i) => {
                    if (index === i) return update(e);
                    return {...e};
                })
            }
        })
    }

    const removeItem = (index: number) => {
        setNextFocus(index - 1)
        setCheckList((prev) => {
            return {
                id: prev.id,
                name: prev.name,
                items: prev.items.filter((e, i) => i !== index),
            }
        })
    }

    const addItem = (index: number, type: 'check' | 'text') => {
        setNextFocus(index + 1);
        setCheckList((prev) => {
            const items = [...prev.items];
            items.splice(index + 1, 0, {
                id: randomId(),
                type: type,
                name: '',
                checked: false,
                description: '',
                color: '',
            })
            return {
                id: prev.id,
                name: prev.name,
                items: items,
            }
        })

        // const evt: any = document.createEvent("KeyboardEvent");
        // (evt.initKeyEvent || evt.initKeyboardEvent)("keypress", true, true, window,
        //     0, 0, 0, 0,
        //     0, '\t'.charCodeAt(0))
        // document.body.dispatchEvent(evt);
    }


    const renderItem = (item: CheckListItem, index: number) => {
        // const isFocused = document.activeElement?.id === `field-${index}`;
        // const isFocused = focusIndex === index;

        if (item.type === 'check') {
            return (
                <div key={item.id} style={{
                    display: 'flex',
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 4,
                    paddingBottom: 4,
                }}>
                    {/*{isFocused ? <MenuLineIcon color={'#ccc'} style={{*/}
                    {/*    width: 24,*/}
                    {/*}}/> : <span style={{*/}
                    {/*    width: 24,*/}
                    {/*}}/>}*/}
                    <CheckIcon
                        checked={item.checked}
                        onClick={() => checkItem(index)}
                    />
                    <InputBase
                        id={`field-${index}`}
                        defaultValue={item.name}
                        fullWidth
                        multiline
                        style={{
                            padding: 0,
                            fontSize: 16,
                            fontWeight: 400,
                            color: item.checked ? '#888' : '#000',
                            textDecoration: item.checked ? 'line-through' : undefined,
                        }}
                        inputProps={{
                            style: {padding: 0},
                            onKeyDown: (e) => {
                                const value = e.currentTarget.value;
                                const isEnter = e.key.toLowerCase() === 'enter';
                                const isBackspace = e.key.toLowerCase() === 'backspace';
                                const isEmpty = value.trim().length === 0;

                                if (isBackspace) {
                                    if (isEmpty) {
                                        resetItemType(index)
                                        e.preventDefault();
                                    }
                                    if (e.currentTarget.selectionStart === 0) {
                                        resetItemType(index)
                                        e.preventDefault();
                                    }
                                }
                                if (isEnter && isEmpty) {
                                    resetItemType(index)
                                    e.preventDefault();
                                }
                                if (isEnter && !isEmpty) {
                                    addItem(index, 'check')
                                    e.preventDefault();
                                }

                                // arrows
                                if (e.key.toLowerCase() === 'arrowup') {
                                    setFocus(index - 1);
                                    e.preventDefault();
                                }
                                if (e.key.toLowerCase() === 'arrowleft') {
                                    if (e.currentTarget.selectionStart === 0) {
                                        setFocus(index - 1);
                                        e.preventDefault();
                                    }
                                }
                                if (e.key.toLowerCase() === 'arrowdown') {
                                    setFocus(index + 1);
                                    e.preventDefault();
                                }
                                if (e.key.toLowerCase() === 'arrowright') {
                                    if (e.currentTarget.selectionStart === value.length) {
                                        setFocus(index + 1);
                                        e.preventDefault();
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )
        }

        return (
            <div style={{
                display: 'flex',
                paddingLeft: 24,
                paddingRight: 24,
            }}>
                <InputBase
                    id={`field-${index}`}
                    defaultValue={item.name}
                    fullWidth
                    multiline
                    inputProps={{
                        style: {padding: 0},
                        onKeyDown: (e) => {
                            const value = e.currentTarget.value;
                            if (e.key.toLowerCase() === 'backspace') {
                                if (value.trim().length === 0) {
                                    removeItem(index)
                                    e.preventDefault();
                                }
                            }
                            if (e.key.toLowerCase() === 'enter') {
                                const lines = value.split('\n');
                                if (lines[lines.length - 1].trim().length === 0) {
                                    addItem(index, 'text')
                                    e.preventDefault();
                                }
                            }
                            if (e.key.toLowerCase() === 'arrowup') {
                                if (e.currentTarget.selectionStart === 0) {
                                    setFocus(index - 1);
                                    e.preventDefault();
                                }
                            }
                            if (e.key.toLowerCase() === 'arrowleft') {
                                if (e.currentTarget.selectionStart === 0) {
                                    setFocus(index - 1);
                                    e.preventDefault();
                                }
                            }
                            if (e.key.toLowerCase() === 'arrowdown') {
                                if (e.currentTarget.selectionStart === value.length) {
                                    setFocus(index + 1);
                                    e.preventDefault();
                                }
                            }
                            if (e.key.toLowerCase() === 'arrowright') {
                                if (e.currentTarget.selectionStart === value.length) {
                                    setFocus(index + 1);
                                    e.preventDefault();
                                }
                            }
                        },
                    }}
                    style={{
                        fontSize: 16,
                        fontWeight: 400,
                    }}
                />
            </div>
        )

    }


    return (
        <div style={{backgroundColor: 'white', width: '100vw', paddingTop: 56}}>

            <DragDropContext
                onDragEnd={(result) => {
                    // dropped outside the list
                    if (result.destination === undefined) {
                        return;
                    }
                    setCheckList((prev) => ({
                        id: prev.id,
                        name: prev.name,
                        items: reorder(
                            prev.items,
                            result.source.index,
                            result.destination?.index
                        ),
                    }))
                }}
            >
                <div>
                    <div
                        style={{
                            marginLeft: 16,
                            marginBottom: 16,
                        }}>
                        <InputBase
                            defaultValue={checkList.name}
                            style={{
                                fontSize: 26,
                                fontWeight: 700,
                            }}
                        />
                    </div>

                    <Droppable droppableId="droppable">
                        {(provided) => (

                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    padding: 'grid',
                                    width: '100vw',
                                }}
                            >
                                {checkList.items.map((item, index) => {
                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    {renderItem(item, index)}
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}


export default AgendaPage;
