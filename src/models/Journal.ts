import Tag from "./Tag";
import Author, {emptyAuthor} from "./Author";
import {toLocalDateTimeString} from "../lib/date/toLocalISO";
import searchFilter from "../lib/list/searchFilter";

export interface Journal {
    id: string;
    name: string;
    description: string;
    author: Author;
    youthId: string
    entries: JournalEntry[];
    updatedAt: Date;
    createdAt: Date;
}

export const emptyJournal: Journal = {
    id: '',
    name: '',
    description: '',
    author: emptyAuthor,
    youthId: '',
    entries: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};


export interface JournalEntry {
    id: string;
    name: string;
    occurrenceDate: Date;
    tags: Tag[];
    content: string;
    author: Author;
    updatedAt: Date;
    createdAt: Date;
}

export const emptyJournalEntry: JournalEntry = {
    id: '',
    name: '',
    occurrenceDate: new Date(),
    content: '',
    tags: [],
    author: {
        id: '',
        name: ''
    },
    createdAt: new Date(),
    updatedAt: new Date(),
};


export const journalSearchFilter = (search: string) => ({name, updatedAt}: Journal) => searchFilter({
    name: name,
    updatedAt: toLocalDateTimeString(updatedAt)
}, search);

export const entrySearchFilter = (search: string) => ({name, content, createdAt}: JournalEntry) => searchFilter({
    name: name,
    content: content,
    createdAt: toLocalDateTimeString(createdAt)
}, search);

export default Journal;