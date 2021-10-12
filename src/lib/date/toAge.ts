export const toAge = (birthDate: Date | string | null | undefined): number | undefined => {
    if (!birthDate) return undefined;
    const bd = new Date(birthDate);
    var ageDifMs = Date.now() - bd.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default toAge;