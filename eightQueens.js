class Field {
    // 0 - free
    // 1 - beat
    // 2 - queen
    constructor(dim) {
        this.dim = dim;
        this.cells = new Map();
        this.keys = {}
        this.queens = [];

        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                const key = [i, j];
                this.keys[key] = key;
                this.cells.set(key, 0);
            }
        }
    }

    set(key, val) {
        if (this.keys[key] && this.get(key) < val) {
            this.cells.set(this.keys[key], val);
        }
    }
    get(key) {
        return this.cells.get(this.keys[key]);
    }

    freeColumn(col) {
        return Array.from(this.cells.entries())
            .filter(([[i,j], v]) => col === j && !v)
            .map(([key, v]) => key);
    }

    put([i, j]) {
        this.set([i, j], 2);
        this.queens.push(this.keys[[i, j]])
        for (let k = 0; k < this.dim; k++) {
            this.set([i, k], 1);
            this.set([k, j], 1);
            this.set([i+k, j+k], 1);
            this.set([i+k, j-k], 1);
            this.set([i-k, j+k], 1);
            this.set([i-k, j-k], 1);
        }
    }

    show() {
        let str = '';
        for (let i = 0; i < this.dim; i++) {
            for (let j = 0; j < this.dim; j++) {
                const val = this.get([i,j]);
                let visual;
                if (val === 2) {
                    visual = '⚜️';
                } else if (val === 1) {
                    visual = 'x';
                } else if ((i + j)%2 === 0) {
                    visual = '□';
                } else {
                    visual = '■';
                }
                
                str += `|${visual}`;
            }
            str += '|' + '\n';
        }
        console.log(str);
    }
    copy() {
        const copyField = new Field(this.dim);
        // this.show();
        for (const queen of this.queens) {
            copyField.put(queen);
        }
        return copyField;
    }
}


let solutionCounter = 0;

// будем двигаться слева направо по столбцам
function processColumn(j, dim, field) {
    const freeCells = field.freeColumn(j);
    if (j === dim - 1 && freeCells.length === 1) {
        field.put(freeCells[0]);
        console.log(`решение ${++solutionCounter} найдено`);
        field.show();
        return;
    }
    for (cell of freeCells) {
        const cpField = field.copy();
        cpField.put(cell);
        processColumn(j + 1, dim, cpField);
    }
}

const DIM = 8;

const field = new Field(DIM);

processColumn(0, DIM, field);
