function splitString(string, delimiter) {
    let result = string.split(delimiter);
    console.log(result.join('\n'));
}

function repeatString(string, times) {
    console.log(string.repeat(times));
}

function isStartingWith(string, target) {
    let index = string.indexOf(target);
    index > -1 ? console.log(true) : console.log(false);
}

function isEndingWith(string, target) {
    let index = string.lastIndexOf(target);
    index > -1 ? console.log(true) : console.log(false);
}

function capitalizeWords(string) {
    let words = string.split(' ').map(a => a.toLowerCase());
    let res = [];
    for (let w of words) {
        w = w[0].toUpperCase() + w.slice(1);
        res.push(w);
    }
    console.log(res.join(' '));
}

function captureAllNums(arr) {
    let result = [];
    let pattern = /\d+/g;
    for (let str of arr) {
        let match = str.match(pattern);
        if (match) {
            for(let i = 0; i < match.length; i++) {
                result.push(match[i]);
            }
        }
    }
    console.log(result.join(' '));
}

function findVarNames(string) {
    let result = [];
    let pattern = /[a-zA-Z\d]+/g;
    let words = string.split(' ');
    for (let w of words) {
        if (w[0] === '_') {
            let match = w.match(pattern);
            result.push(match[0]);
        }
    }
    console.log(result.join(','));
}

function wordOccur(text, target) {
    text = text.toLowerCase();
    let cnt = 0;
    let words = text.split(/[\s.,;()\[\]?!*/]+/);
    for (let w of words) {
        if (w === target.toLowerCase()) {
            cnt++;
        }
    }
    console.log(cnt);
}

function extractLinks(arr) {
    let result = [];
    let pattern = /(www)\.([a-zA-Z\d\-]+)(\.([a-zA-Z]+))+/g;
    for (let sentence of arr) {
        let match = sentence.match(pattern);
        if (match) {
            result.push(match[0]);
        }
    }
    console.log(result.join('\n'));

}

function secretData(arr) {
    let userPattern = /\*[A-Z][A-Za-z]*(?=\s+|$)/g;
    let phonePattern = /\+[\d-]{10}(?=\s+|$)/g;
    let idPattern = /![a-zA-Z\d]+(?=\s+|$)/g;
    let secretBPattern = /_[a-zA-Z\d]+(?=\s+|$)/g;

    for (let sentence of arr) {
        console.log(sentence.replace(userPattern, m => '|'.repeat(m.length))
            .replace(phonePattern, m => '|'.repeat(m.length))
            .replace(idPattern, m => '|'.repeat(m.length))
            .replace(secretBPattern, m => '|'.repeat(m.length)));
    }

}