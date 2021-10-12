import splitName from "./splitName";

export const toInitials = (name?: string): string => {
    const names = splitName(name);
    const firstLetter = names.firstName[0]?.toUpperCase() ?? '';
    const secondLetter = names.lastName[0]?.toUpperCase() ?? '';
    return '' + firstLetter + secondLetter;
}

export default toInitials;