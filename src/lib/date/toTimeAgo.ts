import {toLocalDateTimeString} from "./toLocalISO";

const secondMillis = 1000;
const minuteMillis = 60000;
const hourMillis = 3600000;
const dayMillis = 86400000;

export const toTimeAgo = (input: Date | string): string => {
    if (!input) return "";
    const date = new Date(input);


    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / secondMillis);
    const minutes = Math.floor(diff / minuteMillis);
    const hours = Math.floor(diff / hourMillis);
    const days = Math.floor(diff / dayMillis);
    if (seconds < 10) {
        return "lige nu";
    } else if (seconds < 60) {
        return `${seconds} sekunder siden`;
    } else if (minutes < 2) {
        return `${minutes} minut siden`;
    } else if (minutes < 60) {
        return `${minutes} minutter siden`;
    } else if (hours < 2) {
        return `${hours} time siden`;
    } else if (hours < 24) {
        return `${hours} timer siden`;
    } else if (days < 2) {
        return '1 dag siden';
    } else if (days < 8) {
        return `${days} dage siden`;
    } else {
        return toLocalDateTimeString(date)
    }
}

export default toTimeAgo;