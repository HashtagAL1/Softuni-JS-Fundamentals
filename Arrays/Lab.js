function sumFirstLast(arr) {
    let num1 = Number(arr[0]);
    let num2 = Number(arr[arr.length - 1]);
    return num1 + num2;
}

function evenPositions(arr) {
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            result.push(arr[i]);
        }
    }

    return result.join(' ');
}

function negativePositiveNumbers(arr) {
    let res = [];
    for (let num of arr) {
        if (num < 0) {
            res.unshift(num);
        }
        else
            res.push(num);
    }

    console.log(res.join('\n'));
}

function firstLastElements(arr) {
    let amount = arr[0];
    let firstEls = (function (array, num) {
        let result = [];
        for(let i = 1; i <= num && i < array.length; i++) {
            result.push(array[i])
        }
        return result;
    })(arr, amount);

    let lastEls = (function (array, num) {
        let result = [];
        for(let i = array.length - 1, j = 0; i > 0 && j < num; i--, j++) {
            result.push(array[i]);
        }
        return result;
    })(arr, amount);

    console.log(firstEls.join(' '));
    console.log(lastEls.reverse().join(' '));
}

function lastKNumbersSeq(a, b) {
    let result = [];
    result[0] = 1;
    for(let i = 1; i < a; i++) {
        result[i] = (function (index, arr) {
            let sum = 0;
            let startIndex = index - b;
            if (startIndex < 0) {
                startIndex = 0;
            }
            for(let i = startIndex; i < index; i++) {
                sum += arr[i];
            }
            return sum;
        })(i, result);
    }
    console.log(result.join(' '));
}

function processOddNumbers(arr) {
    let result = arr.filter((num, i) => i % 2 === 1).map(x => 2 * x).reverse();
    return result;
}

function smallest2Numbers(arr) {
    console.log(arr.sort((a, b) => a - b).slice(0, 2).join(' '));
}

function biggestElementMatrix(arr) {
    let max = Number.NEGATIVE_INFINITY;

    arr.forEach(
        a => a.forEach(
            element => max = Math.max(max, element)));
    return max;
}

function diagonalSums(matrix) {
    let mainSum = 0;
    let secondarySum = 0;
    for(let row = 0; row < matrix.length; row++) {
        mainSum += matrix[row][row];
        secondarySum += matrix[row][matrix.length - row - 1];
    }
    console.log(`${mainSum} ${secondarySum}`);
}

function equalNeighbours(matrix) {
    let cnt = 0;
    for(let row = 0; row < matrix.length - 1; row++) {
        for(let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === matrix[row + 1][col]) {
                cnt++;
            }
        }
    }

    for(let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix[row].length - 1; col++) {
            if (matrix[row][col] === matrix[row][col + 1]) {
                cnt++;
            }
        }
    }
    return cnt;
}