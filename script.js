


function sort(arr) {
    let portion = 1;
    while (portion <= arr.length) {

        for (let i = 0; i <= arr.length; i += portion * 2) {
            const left = arr.slice(i, i + portion);
            const right = arr.slice(i + portion, i + 2 * portion);
            let res = []

            let leftEl = left.shift();
            let rightEl = right.shift();

            while (leftEl || rightEl) {
                if (leftEl === undefined) {
                    res.push(rightEl);
                    res = res.concat(right);
                    break;
                }
                if (rightEl === undefined) {
                    res.push(leftEl);
                    res = res.concat(left);
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
            arr = [...arr.slice(0, i), ...res, ...arr.slice(i+portion * 2, arr.length)];
        }   


        portion *= 2;
    }
    return arr;
}

problem = [1,2,3,5324,532,1,41,312,313,456,4,245,3,12,31,1231,3, 123, 675, 345, 8234, 123,54,87,12];
console.log(problem)

console.log(sort(problem))