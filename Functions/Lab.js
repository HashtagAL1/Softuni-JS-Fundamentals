function triangleStars(count) {
    for(let i = 1; i <= count; i++) {
        console.log('*'.repeat(i));
    }
    for(let i = count - 1; i > 0; i--) {
        console.log('*'.repeat(i));
    }
}

function squareOfStars(count) {
    function printStars(n = 5) {
        console.log('*' + ' *'.repeat(n - 1));
    }

    for(let i = 1; i <= count; i++) {
        printStars(count);
    }
}

function isPalindrome(word) {
    for(let i = 0; i < word.length; i++) {
        if (word[i] !== word[word.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

function dayOfWeek(day) {
    switch (day) {
        case 'Monday':
            return 1;
            break;
        case 'Tuesday':
            return 2;
            break;
        case 'Wednesday':
            return 3;
            break;
        case 'Thursday':
            return 4;
            break;
        case 'Friday':
            return 5;
            break;
        case 'Saturday':
            return 6;
            break;
        case 'Sunday':
            return 7;
            break;
        default:
            return 'error';
            break;
    }
}

function calculate(a, b, op) {
    let calc = function (num1, num2, operator) {
        switch (operator) {
            case '+':
                return add(num1, num2);
            case '-':
                return sub(num1, num2);
            case '*':
                return mul(num1, num2);
            case '/':
                return div(num1, num2);
        }
    };

    let mul = function (num1, num2) {
        return num1 * num2;
    };
    let add = function (num1, num2) {
        return num1 + num2;
    };
    let sub = function (num1, num2) {
        return num1 - num2;
    };
    let div = function (num1, num2) {
        return num1 / num2;
    };

    console.log(calc(a, b, op));
}

function aggregateElements(input) {
    function agg(arr, init, f) {
        let val = init;
        for(let i = 0; i < arr.length; i++) {
            val = f(val, arr[i]);
        }
        console.log(val);
    }

    agg(input, 0, (a, b) => a + b);
    agg(input, 0, (a, b) => a + (1 / b));
    agg(input, '', (a, b) => a + b.toString());
}

function wordsUppercase(input) {

    input = input.toUpperCase();

    let words = (function (str) {
        return str.split(/\W+/).filter(w => w !== '');
    })(input);

    let result = words.join(', ');
    console.log(result);
}