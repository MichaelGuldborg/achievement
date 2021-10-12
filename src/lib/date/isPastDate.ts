export const isPastDate = (timeStamp: string | undefined): boolean => {
    try {
        const parsedTime = Date.parse(timeStamp as string);
        const now = Date.now();
        return parsedTime <= now;
    } catch (e) {
        return false;
    }
};
export default isPastDate;
