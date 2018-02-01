function heroicInv(arr) {
    let result = [];
    for (let input of arr) {
        let info = input.split(' / ').filter(a => a !== '');


        let name = info[0];
        let level = Number(info[1]);
        let items = [];
        let obj = {};
        obj['name'] = name;
        obj['level'] = level;
        if (info.length > 2) {
            items = info[2].split(', ');
        }
        obj['items'] = items;
        result.push(JSON.stringify(obj));
    }
    console.log('[' + result.join(',') + ']')
}

function jsonTable(arr) {
    let result = '<table>';
    for (let input of arr) {
        let obj = JSON.parse(input);
        result += '\n\t<tr>';
        let name = obj['name'];
        name = name.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;');
        let position = obj['position'];
        position = position.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;');
        let salary = obj['salary'];
        result += `\n\t\t<td>${name}</td>`;
        result += `\n\t\t<td>${position}</td>`;
        result += `\n\t\t<td>${salary}</td>`;
        result += '\n\t<tr>';
    }
    result += '\n</table>';
    console.log(result);
}

function cappyJuice(arr) {
    let result = new Map();
    let output = new Map();
    for (let input of arr) {
        let info = input.split(' => ');
        let fruit = info[0];
        let quantity = Number(info[1]);

        if (result.has(fruit)) {
            result.set(fruit, result.get(fruit) + quantity);
        }
        else
            result.set(fruit, quantity);

        if (result.get(fruit) >= 1000) {
            output.set(fruit, result.get(fruit));
        }
    }
    for (let key of output.keys()) {
        let bottles = parseInt(output.get(key) / 1000);
        if (bottles > 0) {
            console.log(`${key} => ${bottles}`);
        }
    }
}

function storeCatalogue(arr) {
    let sorted = arr.sort();
    let result = new Map();
    for (let input of sorted) {
        let letter = input[0];
        let info = input.split(' : ');
        let product = info[0];
        let price = Number(info[1]);
        if (!result.has(letter)) {
            result.set(letter, new Map());
        }

        result.get(letter).set(product, price);
    }

    for (let letter of result.keys()) {
        console.log(letter);
        let productMap = result.get(letter);
        for (let key of productMap.keys()) {
            console.log(`  ${key}: ${productMap.get(key)}`);
        }
    }
}

function autoengCompany(arr) {
    let result = new Map();
    for (let input of arr) {
        let info = input.split(' | ');
        let brand = info[0];
        let model = info[1];
        let numOfCars = Number(info[2]);
        if (result.has(brand)) {
            let modelMap = result.get(brand);
            if (modelMap.has(model)) {
                modelMap.set(model, modelMap.get(model) + numOfCars);
            }
            else {
                modelMap.set(model, numOfCars);
            }
        }
        else {
            result.set(brand, new Map());
            let modelMap = result.get(brand);
            modelMap.set(model, numOfCars);
        }
    }
    for (let key of result.keys()) {
        console.log(key);
        let modelMap = result.get(key);
        for (let model of modelMap.keys()) {
            console.log(`###${model} -> ${modelMap.get(model)}`);
        }
    }
}

function systemComponents(arr) {
    let result = new Map();
    for (let input of arr) {
        let info = input.split(' | ');
        let system = info[0];
        let component = info[1];
        let subcomponent = info[2];

        if (!result.has(system)) {
            result.set(system, new Map());
            let systemMap = result.get(system);
            let subs = [];
            subs.push(subcomponent);
            systemMap.set(component, subs);
        }
        else {
            let systemMap = result.get(system);
            if (systemMap.has(component)) {
                let subs = systemMap.get(component);
                subs.push(subcomponent);
                systemMap.set(component, subs);
            }
            else {
                let subs = [];
                subs.push(subcomponent);
                systemMap.set(component, subs);
            }
        }
    }

    let systems = Array.from(result.keys());
    systems.sort((a, b) => Array.from(result.get(b)).length - Array.from(result.get(a)).length ||
    a > b);

    for (let key of systems) {
        console.log(key);
        let systemMap = result.get(key);
        let comps = Array.from(systemMap.keys());
        comps.sort((a, b) => Array.from(systemMap.get(b)).length - Array.from(systemMap.get(a)).length);
        for (let comp of comps) {
            console.log(`|||${comp}`);
            let subs = systemMap.get(comp);
            for (let s of subs) {
                console.log(`||||||${s}`);
            }
        }
    }
}

function usernames(arr) {
    let sorted = arr.sort((a, b) => a.length - b.length || a > b);
    let result = new Set(sorted);

    for (let user of result) {
        console.log(user);
    }
}

function uniqueSequences(arr) {
    let uniques = new Set();
    for (let input of arr) {
        let temp = input.split(/[\[\], ]+/g).filter(a => a !== '').map(Number);
        temp.sort((a, b) => a < b);
        uniques.add(temp.toString());
    }

    let sorted = Array.from(uniques).sort((a, b) => a.length > b.length);
    for (let item of sorted) {
        let a = item.split(',');
        console.log('[' + a.join(', ') + ']')
    }
}