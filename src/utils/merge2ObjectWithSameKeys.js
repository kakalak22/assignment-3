const merge2ObjectWithSameKeys = (bigObject, smallObject) => {
    // get keys of 2 object to compare
    const smallObjectKeys = Object.keys(smallObject);
    const bigObjectKeys = Object.keys(bigObject);
    //merge 2 object with same keys => return new merged obj
    for (let i = 0; i < bigObjectKeys.length; i++) {
        for (let j = 0; j < smallObjectKeys.length; j++) {
            if (bigObjectKeys[i] === smallObjectKeys[j]) {
                const currentKey = bigObjectKeys[i];
                bigObject[currentKey] = smallObject[currentKey];
            } else {
                const currentKey = bigObjectKeys[j];
                if (currentKey) {

                    bigObject[currentKey] = smallObject[currentKey];
                }
            }
        }
    }
    return bigObject
}

export default merge2ObjectWithSameKeys;