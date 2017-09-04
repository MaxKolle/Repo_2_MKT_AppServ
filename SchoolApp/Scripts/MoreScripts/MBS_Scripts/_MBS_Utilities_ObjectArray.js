
// Function used to order the object data array
function Utilities__OrderObjectData(objectArr, orderBy, ascending) {
    orderBy = (orderBy === undefined || orderBy === null || orderBy === "") ? Intern_TableFieldIDs[0] : orderBy;
    ascending = (ascending === undefined || ascending === null || ascending === "" || ascending === true) ? true : false;

    var valueIndex;
    var tempVal;
    for (var i = 0; i < objectArr.length; i++) {
        valueIndex = i;
        for (var j = i + 1; j < objectArr.length; j++) {
            if (ascending) {
                if (objectArr[valueIndex][orderBy] > objectArr[j][orderBy]) {
                    valueIndex = j;
                }
            }
            else {
                if (objectArr[valueIndex][orderBy] < objectArr[j][orderBy]) {
                    valueIndex = j;
                }
            }
        }
        tempVal = objectArr[i];
        objectArr[i] = objectArr[valueIndex];
        objectArr[valueIndex] = tempVal;
    }
    return objectArr;
}