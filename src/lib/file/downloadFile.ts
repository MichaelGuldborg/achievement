export const downloadCSVFile = (content: string, fileName: string) => {
    return downloadFile(content, fileName, 'text/csv;charset=utf-8;');
}

export const downloadFile = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], {type: type})
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, fileName)
    } else {
        const link = document.createElement('a')
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', fileName)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }
}
export default downloadFile