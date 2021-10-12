export const splitName = (name?: string): { firstName: string, lastName: string } => {
    if (name === undefined || !name?.length) {
        return {firstName: '', lastName: ''};
    }
    const split = name.split(' ');
    if (split.length <= 1) {
        return {firstName: name, lastName: ''}
    }
    return {firstName: split[0], lastName: split.slice(1).join(' ')}
}
export default splitName;