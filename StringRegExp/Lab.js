function printLetters(input) {
    for(let i = 0; i < input.length; i++) {
        console.log(`str[${i}] -> ${input[i]}`);
    }
}

function concatenateReversed(arr) {
    let words = arr.join('');
    let result = Array.from(words).reverse().join('');
    console.log(result);
}

function countOccurances(target, text) {
    let cnt = 0;
    let index = text.indexOf(target, 0);
    while (index !== -1) {
        cnt++;
        index = text.indexOf(target, index + 1);

    }
    console.log(cnt);
}

function extractText(text) {
    let matches = text.match(/\(.*?\)/g).filter(a => a !== '');
    let result = [];
    matches.forEach(a => result.push(a.slice(1, a.length - 1)));
    console.log(result.join(', '));
}

function aggregateTable(arr) {
    let towns = [];
    let sum = 0;
    for (let item of arr) {
        let element = item.split('|');
        towns.push(element[1].trim());
        sum += Number(element[2].trim());
    }
    console.log(towns.join(', '));
    console.log(sum);
}

function restaurantBill(arr) {
    let products = arr.filter((el, index) => index % 2 === 0);
    let prices = arr.filter((el, index) => index % 2 !== 0).map(Number);
    let outputItems = products.join(', ');
    let sum = prices.reduce((a, b) => a + b);
    console.log(`You purchased ${outputItems} for a total sum of ${sum}`)
}

function usernames(arr) {
    let result = [];
    for (let email of arr) {
        let parts = email.split('@');
        let username = parts[0] + '.';
        let domains = parts[1].split('.');
        domains.forEach(u => username += u[0]);
        result.push(username);
    }
    console.log(result.join(', '))
}

function censorship(text, censorArr) {
    for (let phrase of censorArr) {
        let index = text.indexOf(phrase);
        let replacement = '-'.repeat(phrase.length);
        while (index !== -1) {
            text = text.replace(phrase, replacement);
            index = text.indexOf(phrase, index + 1);
        }
    }
    console.log(text);
}

function escaping(arr) {
    let result = '<ul>';
    for (let str of arr) {
        result += '\n\t<li>';
        str = str.replace(/&/g, '&amp;')
            .replace(/"/, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        result += str;
        result += '</li>';
    }
    result += '\n</ul>';
    return result;
}

function matchAllWords(text) {
    let words = text.match(/\w+/g);
    console.log(words.join('|'));
}

function validateEmails(email) {
    let pattern = /^[a-zA-Z\d+]+@[a-z]+\.[a-z]+$/g;
    pattern.test(email) ? console.log('Valid') : console.log('Invalid');
}

function expressionSplit(expression) {
    let result = expression.split(/[ ;.,()]+/g).filter(a => a !== '');
    console.log(result.join('\n'));
}

function matchTheDates(arr) {
    let pattern = /^\d{1,2}-[A-Z][a-z]{2}-\d{4}$/g;
    let dates = [];

    for (let str of arr) {
        let words = str.split(/[,.| ]+/);
        for (let item of words) {
            item = item.trim();
            if (pattern.test(item)) {
                dates.push(item.match(pattern));
            }
        }
    }

    for (let d of dates) {
        let dateInfo = d.toString().split('-');
        let day = dateInfo[0];
        let month = dateInfo[1];
        let year = dateInfo[2];
        console.log(`${d} (Day: ${day}, Month: ${month}, Year: ${year})`);
    }
}

function employeeData(arr) {
    let pattern = /^([A-Z][A-Za-z]+) - ([1-9][0-9]*) - ([a-zA-Z-\d\- ]+)$/;

    for (let input of arr) {
        let match = pattern.exec(input);
        if (match) {
            console.log(`Name: ${match[1]}\nPosition: ${match[3]}\nSalary: ${match[2]}`);
        }
    }
}

function formFiller(username, email, phone, text) {
    let input = text.join('\n');
    let userPattern = /<![a-zA-Z]+!>/g;
    let emailPattern = /<@[a-zA-Z@.]+@>/g;
    let phonePattern = /<\+[a-zA-Z]+\+>/g;
    input = input.replace(userPattern, username).replace(emailPattern, email).replace(phonePattern, phone);

    console.log(input);
}

function matchMultiplication(text) {
    let pattern = /\s*(\-?\d+)\s*\*\s*(\-?\d+(\.\d+)?)/g;
    let result = [];
    let parts = text.split(';');
    for (let item of parts) {
        let match = item.match(pattern);
        let parts = match.toString().split('*').map(a => a.trim());
        let replacement = ' ' + (Number(parts[0]) * Number(parts[1]));
        item = item.replace(pattern, replacement);
        result.push(item);
    }
    console.log(result.join(';'));
}