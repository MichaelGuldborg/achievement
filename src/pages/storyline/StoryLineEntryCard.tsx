import React, {useRef} from "react";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {XYCoord} from "dnd-core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import {StoryLineEntry} from "./StoryLinePage";

export const StoryLineEntryCard: React.FC<{
    id: string;
    text: string;
    color: string;
    index: number;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}> = ({id, index, text, color, onMove}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{handlerId}, drop] = useDrop({
        accept: 'timeline-entry',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: StoryLineEntry, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            onMove(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'timeline-entry',
        item: () => {
            return {id, index}
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const opacity = isDragging ? 0.5 : 1
    drag(drop(ref))
    return (
        <div ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <ListItem>
                <div style={{
                    width: 16,
                    height: 16,
                    backgroundColor: color,
                    marginRight: 16,
                }}/>
                <ListItemText
                    primary={text}
                />
                <IconButton style={{cursor: 'move'}}>
                    <MenuLineIcon/>
                </IconButton>
            </ListItem>
        </div>
    )
}
export default StoryLineEntryCard;