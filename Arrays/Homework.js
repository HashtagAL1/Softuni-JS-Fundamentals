function printDelimiter(arr) {
    let delimiter = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    console.log(arr.join(delimiter));
}

function printNthElement(arr) {
    let n = Number(arr[arr.length - 1]);
    arr.splice(arr.length - 1, 1);
    for(let i = 0; i < arr.length; i += n) {
        console.log(arr[i]);
    }
}

function addRemove(arr) {
    let cnt = 1;
    let result = [];
    for (let command of arr) {
        if(command === 'add') {
            result.push(cnt);
        }
        else if(command === 'remove') {
            result.splice(result.length - 1, 1)
        }
        cnt++;
    }

    if(result.length === 0) {
        console.log('Empty')
    }
    else
        console.log(result.join('\n'));
}

function rotateArray(arr) {
    let n = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    let limit = n % arr.length;
    for(let i = 0; i < limit; i++) {
        let num = arr[arr.length - 1];
        arr.splice(arr.length - 1, 1);
        arr.unshift(num);
    }
    console.log(arr.join(' '));
}

function nonDecreasingSeq(arr) {
    let result = [];
    let max = arr[0];
    for (let num of arr) {
        if (num >= max) {
            result.push(num);
            max = num;
        }
    }

    console.log(result.join('\n'));
}

function sortArray(arr) {
    arr.sort((x, y) => x.length - y.length || x.toLowerCase() > y.toLowerCase());
    console.log(arr.join('\n'));
}

function magicMatrixes(arr) {
    let sum = 0;
    for(let row = 0; row < arr.length; row++) {
        let rowSum = 0;
        let colSum = 0;
        for(let col = 0; col < arr[row].length; col++) {
            rowSum += arr[row][col];
            colSum += arr[col][row];
        }
        if (row === 0) {
            sum = rowSum;
        }
        if (sum !== colSum || sum !== rowSum) {
            return false;
        }

    }
    return true;
}//TODO: Fix needed (80 / 100)

function diagonalAttack(arr) {
    let mainSum = 0;
    let secondarySum = 0;

    let matrix = (function (input) {
        let result = [];
        for(let i = 0; i < input.length; i++) {
            result[i] = input[i].split(' ');
        }
        return result;
    })(arr);

    for(let i = 0, j = matrix.length - 1; i < matrix.length && j >= 0; i++, j--) {
        mainSum += Number(matrix[i][i]);
        secondarySum += Number(matrix[i][j]);
    }

    if (mainSum === secondarySum) {
        for(let row = 0, sec = matrix[row].length - 1; row < matrix.length; row++, sec--) {
            for(let col = 0; col < matrix[row].length; col++) {
                if (row !== col && col !== sec) {
                    matrix[row][col] = mainSum;
                }
            }
        }
    }
    matrix.forEach(a => console.log(a.join(' ')));
}

function orbit(arr) {
    let cols = arr[0];
    let rows = arr[1];
    let rowCoord = arr[2];
    let colCoord = arr[3];
    let result = [];
    let value = 2;

    for(let i = 0; i < rows; i++) {
        result[i] = [];
    }

    result[rowCoord][colCoord] = 1;

    for(let cnt = 0; cnt < rows; cnt++, value++) {
        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {

                if (r - 1 - cnt === rowCoord  || r + 1 + cnt === rowCoord
                    || c + 1 + cnt === colCoord || c - 1 - cnt === colCoord) {
                    result[r][c] = value;
                }
            }
        }
    }
    result.forEach(a => console.log(a.join(' ')));
}

function spiralMatrix(rows, cols) {
    let result = [];
    for(let i = 0; i < rows; i++) {
        result[i] = [];
    }
    let rMid = parseInt(rows / 2);
    let cMid = parseInt(cols / 2);

    result[rMid][cMid] = rows * cols;

    let dirRight = function (row, col, value, cEnd, matrix) {
        for(let c = col; c <= cEnd; c++) {
            matrix[row][c] = value++;
        }
        return matrix;
    };

    let dirDown = function (row, rEnd, value, col, matrix) {
        value++;
        for(let r = row + 1; r <= rEnd; r++) {
            matrix[r][col] = value++;
        }
        return matrix;
    };

    let dirLeft = function (row, col, cEnd, value, matrix) {
        for(let c = col; c >= cEnd; c--) {
            matrix[row][c] = value++;
        }
        return matrix;
    };

    let dirUp = function (row, rEnd, col, value, matrix) {
        for(let r = row; r > rEnd; r--) {
            matrix[r][col] = value++;
        }
        return matrix;
    };

    let value = 1;
    let r = 0;
    let c = 0;
    let i = 1;

    while (value < rows * cols) {

        result = dirRight(r, c, value, cols - c - 1, result);
        value += (rows - r - i);
        result = dirDown(r, rows - r - 1, value, cols - c - 1, result);
        value += (rows - r - i);
        result = dirLeft(rows - r - 1, cols - c - 1, c, value, result);
        value += (rows - r - i);
        result = dirUp(rows - r - 1, r, c, value, result);
        value += (rows - r - i);
        r++;
        c++;
        i++;
    }
    result.forEach(a => console.log(a.join(' ')));
}