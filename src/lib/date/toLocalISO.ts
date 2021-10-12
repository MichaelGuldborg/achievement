export const twoDigit = (s: string | number): string => `${s}`.padStart(2, "0");
export const toLocalISODate = (input: Date | string) => {
    const date = new Date(input);
    return [date.getFullYear(), twoDigit(date.getMonth() + 1), twoDigit(date.getDate())].join("-");
};

export const toWeekNumber = (input?: Date | string) => {
    const date = input ? new Date(input) : new Date();
    const firstThursday = new Date(date.getFullYear(), 0, 4);
    return Math.ceil((((date.getTime() - firstThursday.getTime()) / 86400000) + firstThursday.getDay() + 1) / 7);
}

export const toLocalISOTime = (input: Date | string) => {
    const date = new Date(input);
    return [twoDigit(date.getHours()), twoDigit(date.getMinutes())].join(":")
};


export const toLocalDayDateString = (input: Date | string) => {
    const date = new Date(input);
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    return `${dayName} ${date.getDate()}. ${monthName}`;
    // return toLocalISOTime(date) + " " + [twoDigit(date.getDate()), twoDigit(date.getMonth() + 1), date.getFullYear()].join("/")
};

export const toLocalDayDateYearString = (input: Date | string) => {
    const date = new Date(input);
    const dayName = dayNames[date.getDay()].substring(0, 3);
    const monthName = monthNames[date.getMonth()];
    return `${dayName} ${date.getDate()}. ${monthName} ${date.getFullYear()}`;
    // return toLocalISOTime(date) + " " + [twoDigit(date.getDate()), twoDigit(date.getMonth() + 1), date.getFullYear()].join("/")
};
export const toLocalMonth = (input: Date | string) => {
    const date = new Date(input);
    const monthName = monthNames[date.getMonth()];
    return `${monthName}`;
};
export const toLocalMonthYear = (input: Date | string) => {
    const date = new Date(input);
    const monthName = monthNames[date.getMonth()];
    return `${monthName} ${date.getFullYear()}`;
};
export const toLocalDateMothYearString = (input: Date | string) => {
    const date = new Date(input);
    const monthName = monthNames[date.getMonth()];
    return `${date.getDate()}. ${monthName} ${date.getFullYear()}`;
    // return toLocalISOTime(date) + " " + [twoDigit(date.getDate()), twoDigit(date.getMonth() + 1), date.getFullYear()].join("/")
};

export const toLocalDateMothString = (input: Date | string) => {
    const date = new Date(input);
    const monthName = monthNames[date.getMonth()];
    return `${date.getDate()}. ${monthName}`;
    // return toLocalISOTime(date) + " " + [twoDigit(date.getDate()), twoDigit(date.getMonth() + 1), date.getFullYear()].join("/")
};


export const toLocalDateTimeString = (input?: Date | string | null): string => {
    if (input === undefined || input === null) return '';
    const date = new Date(input);
    const monthName = monthNames[date.getMonth()];
    return `${date.getDate()}. ${monthName} ${toLocalISOTime(date)}`;
};

export const toLocalEventTime = (a?: Date | string | null, b?: Date | string | null): string => {
    if (a === undefined || a === null) return '';
    if (b === undefined || b === null) return '';
    const start = new Date(a);
    const end = new Date(b);
    // const monthName = monthNames[start.getMonth()];
    // return `${start.getDate()}. ${monthName}, ${toLocalISOTime(start)}-${toLocalISOTime(end)}`;
    return `${toLocalISOTime(start)}-${toLocalISOTime(end)}`;
};

export const dayNames = [
    'Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'
];

export const monthNames = [
    'Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'
];

