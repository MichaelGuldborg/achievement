export const getDates = (startDate: Date, stopDate: Date) => {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
};
export default getDates;