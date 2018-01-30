function townsToJSON(arr) {
    let result = [];
    for(let i = 1; i < arr.length; i++) {
        let info = arr[i].split('|').filter(a => a !== '').map(a => a.trim());
        let obj = {};
        obj['Town'] = info[0];
        obj['Latitude'] = Number(info[1]);
        obj['Longitude'] = Number(info[2]);
        result.push(JSON.stringify(obj));
    }

    console.log('[' + result.join(',') + ']')
}

function scoreToHTML(input) {
    let arr = JSON.parse(input);
    let result = '<table>';
    result += '\n\t<tr><th>name</th><th>score</th></tr>';
    for (let obj of arr) {
        let name = obj.name;
        let score = obj.score;
        name = name.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;');
        result += `\n\t<tr><td>${name}</td><td>${score}</td></tr>`;
    }
    result += '\n</table>';
    console.log(result);
}

function jsonToHTML(input) {
    let arr = JSON.parse(input);
    let result = '<table>';
    for(let i = 0; i < arr.length; i++) {
        if (i === 0) {
            result += '\n\t<tr>';
            let keys = Object.keys(arr[i]);
            for (let k of keys) {
                result += `<th>${k}</th>`;
            }
            result += '</tr>';
        }
        result += '\n\t<tr>';
        let obj = arr[i];
        for (let k of Object.keys(arr[i])) {
            let value = obj[k].toString();
            value = value.replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&#39;');
            result += `<td>${value}</td>`;
        }
        result += '</tr>';
    }
    result += '\n</table>';
    console.log(result);
}

function sumByTown(arr) {
    let result = {};
    for(let i = 0; i < arr.length - 1; i += 2) {
        let town = arr[i];
        let value = Number(arr[i + 1]);
        if (result.hasOwnProperty(town)) {
            result[town] += value;
        }
        else
            result[town] = value;
    }
    console.log(JSON.stringify(result));
}

function countWordsInText(arr) {
    let text = arr[0];
    let result = {};
    let words = text.split(/\W+/g).filter(a => a !== '');
    for (let w of words) {
        if (result.hasOwnProperty(w)) {
            result[w]++;
        }
        else
            result[w] = 1;
    }
    console.log(JSON.stringify(result))
}

function wordsUsingMaps(arr) {
    let text = arr[0];
    let words = text.split(/\W+/g).filter(a => a !== '').map(a => a.toLowerCase());
    let result = new Map();
    for (let w of words) {
        if (result.has(w)) {
            result.set(w, result.get(w) + 1);
        }
        else
            result.set(w, 1);
    }
    let output = Array.from(result.keys()).sort();
    for (let key of output) {
        console.log(`\'${key}\' -> ${result.get(key)} times`);
    }
}

function populationInTowns(arr) {
    let result = new Map();
    for (let input of arr) {
        let info = input.split(/\s*<->\s*/g).filter(a => a !== '');
        let town = info[0];
        let population = Number(info[1]);
        if (result.has(town)) {
            result.set(town, result.get(town) + population);
        }
        else
            result.set(town, population);
    }

    for (let [key, val] of result) {
        console.log(`${key} : ${val}`);
    }
}

function cityMarkets(arr) {
    let towns = new Map();

    for (let input of arr) {
        let info = input.split(/[->:]+/g).filter(a => a !== '').map(a => a.trim());
        let town = info[0];
        let product = info[1];
        let sales = Number(info[2]);
        let price = Number(info[3]);
        let value = price * sales;

        if (towns.has(town)) {
            let productMap = towns.get(town);
            if (productMap.has(product)) {
                let oldValue = productMap.get(product);
                productMap.set(product, value + oldValue);
            }
            else {
                productMap.set(product, value);
            }
        }
        else {
            towns.set(town, new Map());
            towns.get(town).set(product, value);
        }
    }

    for (let town of towns.keys()) {
        console.log(`Town - ${town}`);
        let productMap = towns.get(town);
        for (let product of productMap.keys()) {
            console.log(`$$$${product} : ${productMap.get(product)}`);
        }
    }
}

function lowestPrices(arr) {
    let products = new Map();
    for (let input of arr) {
        let info = input.split('|').filter(a => a !== '').map(a => a.trim());
        let town = info[0];
        let product = info[1];
        let price = Number(info[2]);

        if (!products.has(product)) {
            products.set(product, new Map());
            products.get(product).set(town, price);
        }
        else {
            let townMap = products.get(product);
            townMap.set(town, price);
        }

    }

    for (let prod of products.keys()) {
        let minPrice = Number.POSITIVE_INFINITY;
        let minTown;
        let townsMap = products.get(prod);
        for (let town of townsMap.keys()) {
            if (townsMap.get(town) < minPrice) {
                minPrice = townsMap.get(town);
                minTown = town;
            }
        }
        console.log(`${prod} -> ${minPrice} (${minTown})`);
    }
}

function extractUniqueWords(arr) {
    let uniqueWords = new Set();

    for (let sentence of arr) {
        let text = sentence.split(/\W+/g).filter(a => a !== '').map(a => a.toLowerCase());
        for (let word of text) {
            uniqueWords.add(word);
        }
    }
    let output = Array.from(uniqueWords);
    console.log(output.join(', '))
}