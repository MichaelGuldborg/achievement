import Author, {emptyAuthor} from "./Author";
import {toLocalDateTimeString} from "../lib/date/toLocalISO";
import searchFilter from "../lib/list/searchFilter";

export interface ChatThread {
    id: string;
    // userId: string;
    // projectId: string;
    name: string;
    color: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    messages: ChatMessage[];
}

export const emptyChatThread: ChatThread = {
    id: '',
    name: '',
    color: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    read: false,
    messages: [],
}

export interface ChatMessage {
    id: string;
    threadId?: string;
    content: string;
    author: Author;
    createdAt: Date;
    type?: "video";
}

export const emptyChatMessage: ChatMessage = {
    id: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a ipsum cursus, efficitur ante vel, suscipit nisl. Nulla mattis turpis in mattis efficitur.',
    author: emptyAuthor,
    createdAt: new Date(),
}


export const chatThreadSearchFilter = (search: string) => ({name, updatedAt}: ChatThread) => searchFilter({
    name: name,
    updatedAt: toLocalDateTimeString(updatedAt)
}, search);


export default ChatThread;