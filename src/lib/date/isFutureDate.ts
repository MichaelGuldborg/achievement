import isPastDate from "./isPastDate";

export const isFutureDate = (timeStamp: string): boolean => {
    return !isPastDate(timeStamp);
};

export default isFutureDate;