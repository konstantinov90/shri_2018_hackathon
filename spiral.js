function formatNumber(num, base) {
    let str = `${num}`;
    for (let radix = 10 ** (base.toString().length - 1); radix > 1; radix /= 10) {
        if (num < radix) {
            str = `0${str}`;
        }
    }
    const clrVal = Math.floor(275 * (base - num) / base) - 20;
    return `<span style="font-family: courier, monospace; color: rgb(${clrVal}, ${clrVal}, ${clrVal})">${str}</span>`;
}

function showSpiral(arr, dim) {

    return arr.map(a => {
        return '|' + a.map(a => {
            return formatNumber(a, dim ** 2);
        }).join('|');
    }).join('|</br>') + '|';
}

function checkCondition(arr) {
    for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < arr[j].length; i++) {
            if (arr[j][i] === undefined) {
                return true;
            }
        }
    }
    return false;
}

function changeDirection(dx, dy) {
    let newDx;
    let newDy;
    switch (dx) {
        case 1:
        case -1:
            newDx = 0;
            break;
        case 0:
            newDx = dy;
            break;
        default:
            console.error('недопустимое значение!');
    }

    switch (dy) {
        case 1:
        case -1:
            newDy = 0;
            break;
        case 0:
            newDy = -dx;
            break;
        default:
            console.error('недопустимое значение!');
    }
    return [newDx, newDy];
}

function makeSpiral(dim) {
    // инициализируем пустой массив
    const arr = new Array(dim);
    for (let i = 0; i < dim; i++) {
        arr[i] = new Array(dim);
    }

    let [dx, dy] = [0, 1];
    let [x,y] = [0,0];

    let val = 0;
    while (checkCondition(arr)) {
        for (; x >= 0 && y >= 0 && x < dim && y < dim; x += dx, y += dy) {
            if (arr[x][y] || arr[x][y] === 0) {
                break;
            }
            arr[x][y] = ++val;
        }
        x -= dx;
        y -= dy;
        [dx, dy] = changeDirection(dx, dy);
        x += dx;
        y += dy;
    }
    appendHTMLToBody(showSpiral(arr, dim));
}

makeSpiral(4);
makeSpiral(5);
makeSpiral(10);
