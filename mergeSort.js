


function mergeSort(arr) {
    for (let portion = 1; portion <= arr.length; portion *= 2) {
        for (let i = 0; i <= arr.length; i += portion * 2) {
            const left = arr.slice(i, i + portion);
            const right = arr.slice(i + portion, i + 2 * portion);
            
            let leftEl = left.shift();
            let rightEl = right.shift();
            
            let res = [];
            while (leftEl || rightEl) {
                if (leftEl === undefined) {
                    res = [...res, rightEl, ...right];
                    break;
                }
                if (rightEl === undefined) {
                    res = [...res, leftEl, ...left];
                    break;
                }
                if (leftEl < rightEl) {
                    res.push(leftEl);
                    leftEl = left.shift();
                } else {
                    res.push(rightEl)
                    rightEl = right.shift();
                }
            }
            arr = [...arr.slice(0, i), ...res, ...arr.slice(i + 2 * portion, arr.length)];
        }   
    }
    return arr;
}

problem = [1,2,3,5324,532,1,41,312,313,456,4,245,3,12,31,1231,3, 123, 675, 345, 8234, 123,54,87,12];
console.log(problem)

console.log(mergeSort(problem))
