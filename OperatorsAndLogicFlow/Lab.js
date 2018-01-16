function multiplyNumbers(a, b) {
    return a * b;
}

function boxesAndBottles(bottles, capacity) {
    console.log(Math.ceil(bottles / capacity));
}

function leapYear(year) {
    year = Number(year);
    if((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        console.log('yes')
    }
    else
        console.log('no');
}

function circleArea(radius) {
    let area = Math.PI * radius * radius;
    console.log(area);
    console.log(area.toFixed(2));
}

function triangleArea(a, b, c) {
    let semi = (a + b + c) / 2;
    let area = Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c));
    console.log(area);
}

function cone(radius, height) {
    let b = Math.PI * radius * radius;
    let volume = (b * height) / 3;
    let l = Math.sqrt(radius * radius + height * height);
    let area = b + Math.PI * radius * l;
    console.log(volume);
    console.log(area);
}

function oddEven(num) {
    let pattern = /\./;
    let numStr = num.toString();
    if (pattern.exec(numStr)) {
        console.log('invalid');
    }
    else {
        if (num % 2 === 0) {
            console.log('even');
        }
        else
            console.log('odd');
    }
}

function fruitOrVegie(input) {
    let fruits = ['banana', 'apple', 'kiwi', 'cherry', 'lemon', 'grapes', 'peach'];
    let vegies = ['tomato', 'cucumber', 'pepper', 'onion', 'garlic', 'parsley'];
    for (let str of fruits) {
        if (str === input) {
            console.log('fruit');
            return;
        }
    }
    for (let str of vegies) {
        if (str === input) {
            console.log('vegetable');
            return;
        }
    }
    console.log('unknown');
}

function colorfulNumbers(num) {
    let result = '<ul>';
    for(let i = 1; i <= num; i++) {
        if(i % 2 === 0) {
            result += '<li><span style="color:blue">' + i + '</span></li>';
        }
        else
            result += '<li><span style="color:green">' + i + '</span></li>';
    }
    result += '</ul>';
    return result;
}

function chessboard(input) {
    let result = '<div class="chessboard">\n';
    let color = 'black';
    for(let i = 1; i <= input; i++) {
        result += '\t<div>\n';
        for(let j = 1; j <= input; j++) {
            if (i % 2 !== 0 && j % 2 !== 0) {
                color = 'black';
            }
            else if (i % 2 === 0 && j % 2 !== 0) {
                color = 'white';
            }
            else if (i % 2 === 0 && j % 2 === 0) {
                color = 'black';
            }
            else
                color = 'white';
            result += '\t\t<span class=\"' + color + '\"></span>\n';
        }

        result += '\t</div>\n';
    }
    result += '</div>';
    return result;
}

function binaryLogarithm(input) {
    for (let num of input) {
        console.log(Math.log2(num));
    }
}

function primeNumberChecker(input) {
    let maxDiv = parseInt(Math.sqrt(input));
    if (input <= 1) {
        return false;
    }
    for(let i = 2; i <= maxDiv; i++) {
        if (input % i === 0) {
            return false;
        }
    }
    return true;
}