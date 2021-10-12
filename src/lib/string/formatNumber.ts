export const formatNumber = (num: number | string, delimiter = '.') => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + delimiter)
}
export default formatNumber;