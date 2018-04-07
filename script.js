

// function arrayToObj(arr) {
//     const obj = {};
//     arr.reduce((o, el) => {
//         o[el.name] = el.value;
//         return o;
//     }, obj);
//     return obj;
// }

// const testData = [
//     {name: 'b', value: 11},
//     {name: 'a', value: 10},
//     {name: 'c', value: 12},
//     {name: 'd', value: 13},
//     {name: 'e', value: 'val'},
//     {name: 'g', value: '10'},
//     {name: 'h', value: '1231'},
//     {name: 'z', value: 'adaasd'},
//     {name: 'zf', value: 'adaasd'},
//     {name: 't', value: () => 'test'},
//     {name: 'rasd', value: 10},
//     {name: 'asd', value: 10},
//     {name: 'asd', value: 10},
// ];

// console.log(arrayToObj(testData));


function makeSpiral(dim) {

    const arr = new Array(dim);
    for (let i = 0; i < dim; i++) {
        arr[i] = new Array(dim);
    }



    function printArr(arr) {
        console.log('============')
        return arr.map(a => {
            return a.join(' ');
        }).join('\n');
    }

    function checkCondition(arr) {
        for (let j = 0; j< arr.length; j++) {
            for (let i = 0; i < arr[j].length; i++) {
                if (arr[j][i] === undefined) {
                    return true;
                }
            }
        }
        return false;
    }

    function changeDirection(x,y) {
        let newX;
        let newY;
        switch (x) {
            case 1:
            case -1:
                newX = 0;
                break;
            default:
                newX = y;
        }

        switch (y) {
            case 1:
            case -1:
                newY = 0;
                break;
            default:
                newY = -x;
        }
        return [newX, newY];
    }

    let dx = 0;
    let dy = 1;

    let [x,y] = [0,0];

    let val = 0;
    console.log(checkCondition(arr))
    // for (let i = 0; i < 7; i++) {
    while (checkCondition(arr)) {
        for (; x >= 0 && y >= 0 && x < dim && y < dim; x+=dx, y+=dy) {
            if (arr[x][y] || arr[x][y] === 0) break;
            arr[x][y] = val++;
        }
        x -= dx;
        y -= dy;
        [dx, dy] = changeDirection(dx, dy);
        x += dx;
        y += dy;

    }

    appendTextToBody(printArr(arr));

}

makeSpiral(4);
makeSpiral(5);