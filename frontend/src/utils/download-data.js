import XLSX, { utils, write } from 'xlsx';

export const handleDownload = async (dataArray, text) => {
    // Chunk size for pagination
    const chunkSize = 1000; // Adjust this value based on your dataset and memory constraints

    // List of keys to skip
    const keysToSkip = ['_id', '__v', 'updatedAt', 'createdAt'];

    // Calculate number of chunks
    const numChunks = Math.ceil(dataArray.length / chunkSize);

    // Create a new workbook
    const wb = utils.book_new();

    // Process data in chunks
    for (let i = 0; i < numChunks; i++) {
        // Slice the array to get a chunk
        const chunk = dataArray.slice(i * chunkSize, (i + 1) * chunkSize);

        // Convert array of objects to a worksheet
        const filteredChunk = chunk.map(obj =>
            Object.fromEntries(
                Object.entries(obj).filter(([key]) => !keysToSkip.includes(key))
            )
        );

        const ws = utils.json_to_sheet(filteredChunk);

        // Append the worksheet to the workbook
        utils.book_append_sheet(wb, ws, `Sheet${i + 1}`);
    }

    console.log('Number of sheets in workbook:', wb.SheetNames.length);

    // Convert the workbook to a binary Excel file
    const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });

    // Trigger a download
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const fileName = `${text}-data.xlsx`;

    if (navigator.msSaveBlob) {
        // For IE 10+
        navigator.msSaveBlob(blob, fileName);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            // For modern browsers
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};
