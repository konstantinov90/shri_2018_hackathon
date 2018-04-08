WIDTH = 800;
HEIGHT = 500;

function solveProblem({ rect, lineSegment }) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const [[rectPoint1x, rectPoint1y], [rectPoint2x, rectPoint2y]] = rect;
    const [ rectMinX, rectMaxX, rectMinY, rectMaxY ] = [
        Math.min(rectPoint1x, rectPoint2x),
        Math.max(rectPoint1x, rectPoint2x),
        Math.min(rectPoint1y, rectPoint2y),
        Math.max(rectPoint1y, rectPoint2y),
    ];
    
    const [[linePoint1x, linePoint1y], [linePoint2x, linePoint2y]] = lineSegment;
    const [ lineMinX, lineMaxX, lineMinY, lineMaxY ] = [
        Math.min(linePoint1x, linePoint2x),
        Math.max(linePoint1x, linePoint2x),
        Math.min(linePoint1y, linePoint2y),
        Math.max(linePoint1y, linePoint2y),
    ];

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // найдем минимальные и максимальные координаты, чтобы отмасштабироваться
    const [ minX, maxX, minY, maxY ] = [
        Math.min(rectMinX, lineMinX),
        Math.max(rectMaxX, lineMaxX),
        Math.min(rectMinY, lineMinY),
        Math.max(rectMaxY, lineMaxY),
    ];

    // найдем координатные ширину и высоту
    const [ width, height ] = [ maxX - minX, maxY - minY ];

    const [ wRatio, hRatio ] = [ width / WIDTH, height / HEIGHT ];

    // решаем уравнение прямой для отрезка ax + b = y
    let a, b, vertical, horizontal;
    if (linePoint1x === linePoint2x) {
        vertical = true;
        [a, b] = [0, 0];
    } else if (linePoint1y === linePoint2y) {
        horizontal = true;
    } else {
        a = (linePoint2y - linePoint1y) / (linePoint2x - linePoint1x);
        b = linePoint1y - a * linePoint1x;
    }

    console.log(`${a}x + ${b}`)

    let x, y;
    const pointsOfIntersection = [];
    // Данная прямая может пересечь каждую из граней прямоугольника
    // левая грань
    // [rectMinX, rectMinY] [rectMinX, rectMaxY]
    if (horizontal) {
        [x, y] = [rectMinX, linePoint1y];
    } else {
        [x, y] = [rectMinX, a * rectMinX + b];
    }
    if (y < rectMaxY && y > rectMinY && !vertical) {
        if (y > lineMaxY) {
            if (linePoint1y === lineMaxY) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else if (y < lineMinY) {
            if (linePoint1y === lineMinY) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else {
            pointsOfIntersection.push([x,y]);
        }
    }
    // правая грань
    // [rectMaxX, rectMinY] [rectMaxX, rectMaxY]
    if (horizontal) {
        [x, y] = [rectMaxX, linePoint1y];
    } else {
        [x, y] = [rectMaxX, a * rectMaxX + b];
    }
    if (y < rectMaxY && y > rectMinY && !vertical) {
        if (y > lineMaxY) {
            if (linePoint1y === lineMaxY) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else if (y < lineMinY) {
            if (linePoint1y === lineMinY) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else {
            pointsOfIntersection.push([x,y]);
        }
    }
    // верхняя грань
    // [rectMinX, rectMinY] [rectMaxX, rectMinY]
    if (vertical) {
        [x, y] = [linePoint1x, rectMinY];
    } else {
        [x, y] = [(rectMinY - b) / a, rectMinY];
    }
    if (x < rectMaxX && x > rectMinX && !horizontal) {
        if (x > lineMaxX) {
            if (linePoint1x === lineMaxX) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else if (x < lineMinX) {
            if (linePoint1x === lineMinX) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else {
            pointsOfIntersection.push([x,y]);
        }
    }
    // нижняя грань
    // [rectMinX, rectMaxY] [rectMaxX, rectMaxY]
    if (vertical) {
        [x, y] = [linePoint1x, rectMaxY];
    } else {
        [x, y] = [(rectMaxY - b) / a, rectMaxY];
    }
    if (x < rectMaxX && x > rectMinX && !horizontal) {
        if (x > lineMaxX) {
            if (linePoint1x === lineMaxX) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else if (x < lineMinX) {
            if (linePoint1x === lineMinX) {
                pointsOfIntersection.push([linePoint1x, linePoint1y]);
            } else {
                pointsOfIntersection.push([linePoint2x, linePoint2y]);
            }
        } else {
            pointsOfIntersection.push([x,y]);
        }
    }

    console.log(pointsOfIntersection)


    console.log(width, height, wRatio, hRatio)
    console.log((rectMaxX - rectMinX) / wRatio,
    (rectMaxY - rectMinY) / hRatio, rectMinY / hRatio)

    // чертим прямоугольник
    ctx.rect(
        (rectMinX - minX) / wRatio,
        (rectMinY - minY) / hRatio,
        (rectMaxX - rectMinX) / wRatio,
        (rectMaxY - rectMinY) / hRatio
    );
    ctx.stroke();

    ctx.strokeStyle = '#bababa';

    ctx.beginPath();
    ctx.moveTo(
        (linePoint1x - minX) / wRatio,
        (linePoint1y - minY) / hRatio
    );
    ctx.lineTo(
        (linePoint2x - minX) / wRatio,
        (linePoint2y - minY) / hRatio
    );
    ctx.closePath();
    ctx.stroke();

    // рисуем входящую в прямоугольник зону
    if (pointsOfIntersection.length) {
        ctx.strokeStyle = 'red';
        
        ctx.beginPath();
        ctx.moveTo(
            (pointsOfIntersection[0][0] - minX) / wRatio,
            (pointsOfIntersection[0][1] - minY) / hRatio
        );
        ctx.lineTo(
            (pointsOfIntersection[1][0] - minX) / wRatio,
            (pointsOfIntersection[1][1] - minY) / hRatio
        );
        ctx.closePath();
        ctx.stroke();
    }
    
    // подпись координат
    // прямоугольник
    ctx.font = '10px Georgia';
    ctx.fillText(
        `x=${rectMinX}, y=${rectMinY}`,
        (rectMinX - minX) / wRatio,
        (rectMinY - minY) / hRatio + 8
    );
    ctx.textAlign = 'end'; 
    ctx.fillText(
        `x=${rectMaxX}, y=${rectMaxY}`,
        (rectMaxX - minX) / wRatio,
        (rectMaxY - minY) / hRatio - 1
    );
    // отрезок
    ctx.textAlign = 'start'
    ctx.fillText(
        `x=${linePoint1x}, y=${linePoint1y}`,
        (linePoint1x - minX) / wRatio,
        (linePoint1y - minY) / hRatio + 8
    );
    ctx.textAlign = 'end'; 
    ctx.fillText(
        `x=${linePoint2x}, y=${linePoint2y}`,
        (linePoint2x - minX) / wRatio,
        (linePoint2y - minY) / hRatio
    );
}

solveProblem({
    rect: [ [ 100, 100 ], [ 250, 380 ] ],
    lineSegment: [ [ 0, 300 ], [ 141, 250 ] ],
});
