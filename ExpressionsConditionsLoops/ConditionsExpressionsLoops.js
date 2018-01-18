function greeting(name) {
    console.log(`Hello, ${name}, I am JavaScript!`);
}

function rectangleArea(a, b) {
    let perimeter = 2 * a + 2 * b;
    let area = a * b;
    console.log(area);
    console.log(perimeter);
}

function distanceOverTime(input) {
    let v1 = input[0];
    let v2 = input[1];
    let time = input[2] / 3600;
    let distance = Math.abs((v1 * time - v2 * time) * 1000);
    console.log(distance);
}

function distance3D(input) {
    let result = 0;
    for(let i = 0; i < input.length / 2; i++) {
        result += Math.pow(Math.abs(input[i] - input[i + 3]), 2);
    }
    console.log(Math.sqrt(result));
}

function gradsToDegrees(num) {
    while (num > 400) {
        num -= 400;
    }
    while (num < -400) {
        num += 400;
    }
    let div = 400 / num;
    let diff = 360 / div;
    let result = 0;
    if (num < 0) {
        result = 360 - Math.abs(diff);
    }
    else
        result = diff;

    console.log(result);

}

function compoundInterest(input) {
    let pSum = input[0];
    let intRate = input[1];
    let compFreq = 12 / input[2];
    let time = input[3];
    let result = pSum * Math.pow((1 + (intRate / (compFreq * 100))), compFreq * time);
    console.log(result)
}

function rounding(input) {
    let num = input[0];
    let precision = input[1];
    if (precision > 15) {
        precision = 15;
    }
    let str = num.toString().split('.');
    if (precision > str[1].length) {
        precision = str[1].length;
    }

    console.log(num.toFixed(precision));
}

function imperialUnits(input) {
    let inches = parseInt(input / 12);
    let feet = input % 12;
    console.log(`${inches}\'-${feet}\"`);
}

function nowPlaying(input) {
    console.log(`Now Playing: ${input[1]} - ${input[0]} [${input[2]}]`);
}

function composeTag(input) {
    console.log(`<img src="${input[0]}" alt="${input[1]}">`);
}

function binaryToDecimal(input) {
    let result = 0;
    for(let i = input.length - 1, j = 0; i >= 0; i--, j++) {
        if (input[i] === '1') {
            result += Math.pow(2, j);
        }
    }
    console.log(result);
}

function assignProperties(input) {
    let obj = {};
    for(let i = 0; i < input.length; i += 2) {
        obj[input[i]] = input[i + 1];
    }
    return obj;
}

function lastMonth(input) {
    let date = new Date();
    date.setFullYear(input[2], input[1] - 1, 0);
    console.log(date.getDate());

}

function biggestOf3Numbers(input) {
    console.log(Math.max(Math.max(input[0], input[1]), input[2]));
}

function pointRectangle(input) {
    let x = input[0];
    let y = input[1];
    let xMin = input[2];
    let xMax = input[3];
    let yMin = input[4];
    let yMax = input[5];
    if ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) {
        console.log('inside');
    }
    else
        console.log('outside');
}

function oddNumbers(num) {
    for(let i = 1; i <= num; i++) {
        if(i % 2 !== 0) {
            console.log(i);
        }
    }
}

function triangleOfDollars(num) {
    for(let row = 1; row <= num; row++) {
        let print = '';
        for(let col = 1; col <= row; col++) {
            print += '$';
        }
        console.log(print);
    }
}

function moviePrices(input) {
    let godfather = {monday: '12', tuesday: '10', wednesday: '15', thursday: '12.5', friday: '15', saturday: '25', sunday: '30'};
    let schindler = {monday: '8.50', tuesday: '8.50', wednesday: '8.50', thursday: '8.50', friday: '8.50', saturday: '15', sunday: '15'};
    let casablanca = {monday: '8', tuesday: '8', wednesday: '8', thursday: '8', friday: '8', saturday: '10', sunday: '10'};
    let wizard = {monday: '10', tuesday: '10', wednesday: '10', thursday: '10', friday: '10', saturday: '15', sunday: '15'};

    let day = input[1];

    let isValidDay = (function () {
        day = day.toLowerCase();
        if(day === 'monday' || day === 'tuesday' || day === 'wednesday' || day === 'thursday' ||
        day === 'friday' || day === 'saturday' || day === 'sunday') {
            return true;
        }
        return false;
    }());

    if(isValidDay) {
        switch (input[0].toLowerCase()) {
            case 'the godfather':
                console.log(godfather[day]);
                break;
            case 'casablanca':
                console.log(casablanca[day]);
                break;
            case 'the wizard of oz':
                console.log(wizard[day]);
                break;
            case 'schindler\'s list':
                console.log(schindler[day]);
                break;
            default:
                console.log('error');
        }
    }
    else
        console.log('error');

}

function quadraticEquation(a, b, c) {
    let d = b * b - 4 * a * c;
    if(d < 0) {
        console.log('No');
    }
    else if( d === 0) {
        let x = (-b + Math.sqrt(d)) / (2 * a);
        console.log(x);
    }
    else {
        let x1 = (-b + Math.sqrt(d)) / (2 * a);
        let x2 = (-b - Math.sqrt(d)) / (2 * a);
        console.log(Math.min(x1, x2));
        console.log(Math.max(x1, x2));
    }
}

function multiplicationTable(num) {
    let result = '<table border="1">';
    for(let i = 0; i <= num; i++) {
        result += '<tr>';
        for(let j = 0; j <= num; j++) {
            if (i === 0 && j === 0) {
                result += '<th>x</th>';
            }
            else if (i === 0) {
                result += `<th>${j}</th>`;
            }
            else if (j === 0) {
                result += `<th>${i}</th>`;
            }
            else {
                result += `<td>${i * j}</td>`;
            }
        }
        result += '</tr>';
    }
    result += '</table>';
    console.log(result);
}

function figure4Squares(num) {
    let slashes = Math.round(num / 3);
    if(num <= 4) {
        slashes = 0;
    }
    if (num % 2 === 0) {
        for(let i = 0; i < num - 1; i++) {
            let line = '';
            if (i === 0 || i === num - 2 || i === parseInt((num - 1) / 2)) {
                line += '+';
                for(let j = 0; j < num - 2; j++) {
                    line += '-';
                }
                line += '+';
                for(let j = 0; j < num - 2; j++) {
                    line += '-';
                }
                line += '+';
            }
            else {
                line += '|';
                for(let j = 0; j < num - 2; j++) {
                    line += ' ';
                }
                line += '|';
                for(let j = 0; j < num - 2; j++) {
                    line += ' ';
                }
                line += '|';
            }
            console.log(line);
        }
    }
    else {
        for(let i = 1; i <= num; i++) {
            let line = '';
            if (i === 1 || i === Math.round(num / 2) || i === num) {
                line += '+';
                for(let j = 0; j < num - 2; j++) {
                    line += '-';
                }
                line += '+';
                for(let j = 0; j < num - 2; j++) {
                    line += '-';
                }
                line += '+';
            }
            else {
                line += '|';
                for(let j = 0; j < num - 2; j++) {
                    line += ' ';
                }
                line += '|';
                for(let j = 0; j < num - 2; j++) {
                    line += ' ';
                }
                line += '|';
            }
            console.log(line);
        }
    }
}

