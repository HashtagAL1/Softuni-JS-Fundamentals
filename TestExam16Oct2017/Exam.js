function arithmefile(arr) {
    let input = arr.map(Number);
    let result = [];

    let calculate = function (start, numbers) {
        let maxIndex;
        let result = 1;
        if (start + numbers[start] >= numbers.length) {
            maxIndex = numbers.length - 1;
        }
        else
            maxIndex = start + numbers[start];
        for(let i = start + 1; i <= maxIndex; i++) {
            result *= numbers[i];
        }
        return result;
    };

    for(let i = 0; i < input.length; i++) {
        if (input[i] >= 0 && input[i] < 10) {
            let mult = calculate(i, input);
            result.push(mult);
        }
    }

    result.sort((a, b) => b - a);
    console.log(result[0]);
}

function rosettaStone(arr) {

    let getMsg = function (matrix) {
        let result = '';
        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 0) {
                    result += ' ';
                }
                else
                    result += String.fromCharCode(matrix[i][j] + 64)
            }
        }
        return result;
    };

    let tempLength = Number(arr[0]);
    let template = [];
    let msg = [];
    for(let i = 1; i <= tempLength; i++) {
        let line = arr[i].split(' ').map(Number);
        template.push(line);
    }
    for(let i = tempLength + 1; i < arr.length; i++) {
        let line = arr[i].split(' ').map(Number);
        msg.push(line);
    }

    for(let i = 0; i < template.length; i++) {
        for(let j = 0; j < template[i].length; j++) {
            let num = template[i][j];
            let rLen = template.length;
            let cLen = template[i].length;

            msg = (function (startR, startC, rowLength, colLength, num, matrix) {
                for(let r = startR; r < matrix.length; r += rowLength) {
                    for(let c = startC; c < matrix[r].length; c += colLength) {
                        matrix[r][c] += num;
                        while (matrix[r][c] - 27 >= 0) {
                            matrix[r][c] -= 27;
                        }
                    }
                }
                return matrix;
            })(i, j, rLen, cLen, num, msg);

        }
    }
    console.log(getMsg(msg))

}

function radicalMarketting(arr) {
    let result = new Map();
    for (let input of arr) {
        let info = input.split('-');
        if (info.length === 1) {
            if (result.has(info[0])) {
                continue;
            }
            else {
                let subs = [];
                result.set(info[0], subs);
            }
        }
        else {
            let name = info[0];
            let subTo = info[1];
            if (!result.has(name) || !result.has(subTo)) {
                continue;
            }
            else {
                let subs = result.get(subTo);
                subs.push(name);
                result.set(subTo, subs);
            }
        }

    }

    let subs = Array.from(result.keys());
    subs.sort((a, b) => result.get(b) - result.get(a));
    let best = subs[0];
    let finalArr = result.get(best);
    let cnt = 1;
    console.log(best)
    for (let obj of finalArr) {
        console.log(`${cnt++}. ${obj}`);
    }
}

function spyMaster(arr) {
    let specialKey = arr[0];
    arr.splice(0, 1);
    let text = arr.join('\n');
    let specRegex = new RegExp(specialKey, "gi");
    let specs = text.match(specRegex);

    for (let s of specs) {
        let fullPattern = new RegExp(s + "\\s+[!#%$A-Z]{8,}(?=[.\\s,]|$)", "g");
        let match = fullPattern.exec(text);
        if (match !== null) {
            let m = match.toString();
            let index = m.lastIndexOf(' ');
            let fIndex = m.indexOf(' ');
            let first = m.substring(0, fIndex);
            let mid = m.substring(fIndex, index) + " ";

            let sub = m.substring(index + 1);
            sub = sub.toLowerCase()
                .replace(/!/g, '1')
                .replace(/%/g, '2')
                .replace(/#/g, '3')
                .replace(/\$/g, '4');
            let replace = first + mid + sub;
            text = text.replace(m, replace);
        }
    }
    console.log(text);

}