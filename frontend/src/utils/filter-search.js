export const filterDataByKeyword=(dataArray, keyword)=> {
    const lowerCaseKeyword = keyword.toLowerCase();

    return dataArray.filter(obj => {
        for (const key in obj) {
            if (obj[key] && obj[key].toString().toLowerCase().includes(lowerCaseKeyword)) {
                return true;
            }
        }
        return false;
    });
}