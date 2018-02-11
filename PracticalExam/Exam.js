function bitcoinMining(arr) {
    let input = arr.map(Number);
    let goldSum = 0;
    let bitcoins = 0;
    let firstDay;
    for(let i = 0; i < input.length; i++) {
        let grams = input[i];
        if ((i + 1) % 3 === 0) {
            grams -= 0.3 * grams;
        }
        let money = grams * 67.51;
        goldSum += money;
        while (goldSum >= 11949.16) {
            goldSum -= 11949.16;
            bitcoins++;
            if (firstDay === undefined) {
                firstDay = i + 1;
            }
        }
    }
    console.log(`Bought bitcoins: ${bitcoins}`);
    if (firstDay !== undefined) {
        console.log(`Day of the first purchased bitcoin: ${firstDay}`);
    }
    console.log(`Left money: ${goldSum.toFixed(2)} lv.`);
}

function airPollution(input, forces) {
    let matrix = [];
    let pollutedAreas = [];
    for (let line of input) {
        let row = line.split(' ').map(Number);
        matrix.push(row);
    }

    for (let f of forces) {
        let info = f.split(' ');
        let command = info[0];
        let value = Number(info[1]);
        if (command === 'breeze') {
            for(let i = 0; i < 5; i++) {
                matrix[value][i] -= 15;
                if (matrix[value][i] < 0) {
                    matrix[value][i] = 0;
                }
            }
        }
        else if (command === 'gale') {
            for(let i = 0; i < 5; i++) {
                matrix[i][value] -= 20;
                if (matrix[i][value] < 0) {
                    matrix[i][value] = 0;
                }
            }
        }
        else if (command === 'smog') {
            for(let row = 0; row < matrix.length; row++) {
                for(let col = 0; col < matrix[row].length; col++) {
                    matrix[row][col] += value;
                }
            }
        }
    }

    for(let row = 0; row < matrix.length; row++) {
        for(let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] >= 50) {
                let area = `[${row}-${col}]`;
                pollutedAreas.push(area);
            }
        }
    }
    pollutedAreas.length > 0 ? console.log(`Polluted areas: ${pollutedAreas.join(', ')}`) : console.log('No polluted areas');


}

function gameOfEpicness(kingdoms, battles) {
    let kings = new Map();
    let kingsWins = new Map();
    let kingsLosses = new Map();
    let gensWins = new Map();
    let gensLosses = new Map();


    for (let k of kingdoms) {
        if (kings.has(k.kingdom)) {
            let gens = kings.get(k.kingdom);
            if (gens.has(k.general)) {
                gens.set(k.general, gens.get(k.general) + k.army);
            }
            else {
                gens.set(k.general, k.army);
                if (!gensWins.has(k.general)) {
                    gensWins.set(k.general, 0);
                    gensLosses.set(k.general, 0);
                }
            }
        }
        else {
            kings.set(k.kingdom, new Map());
            kingsWins.set(k.kingdom, 0);
            kingsLosses.set(k.kingdom, 0);
            gensWins.set(k.general, 0);
            gensLosses.set(k.general, 0);
            let gens = kings.get(k.kingdom);
            gens.set(k.general, k.army);
        }
    }

    for (let b of battles) {
        let atKing = b[0];
        let atGen = b[1];
        let defKing = b[2];
        let defGen = b[3];
        if (atKing === defKing) {
            continue;
        }

        let atArmy = kings.get(atKing).get(atGen);
        let defArmy = kings.get(defKing).get(defGen);

        if (atArmy > defArmy) {
            atArmy += 0.1 * atArmy;
            defArmy -= 0.1 * defArmy;
            kingsWins.set(atKing, kingsWins.get(atKing) + 1);
            kingsLosses.set(defKing, kingsLosses.get(defKing) + 1);
            gensWins.set(atGen, gensWins.get(atGen) + 1);
            gensLosses.set(defGen, gensLosses.get(defGen) + 1);
        }
        else if (defArmy > atArmy) {
            defArmy += 0.1 * defArmy;
            atArmy -= 0.1 * atArmy;
            kingsWins.set(defKing, kingsWins.get(defKing) + 1);
            kingsLosses.set(atKing, kingsLosses.get(atKing) + 1);
            gensWins.set(defGen, gensWins.get(defGen) + 1);
            gensLosses.set(atGen, gensLosses.get(atGen) + 1);
        }

        kings.get(atKing).set(atGen, atArmy);
        kings.get(defKing).set(defGen, defArmy);


    }

    let ks = Array.from(kings.keys());
    ks.sort((a, b) => kingsWins.get(b) - kingsWins.get(a) || kingsLosses.get(a) - kingsLosses.get(b) || a > b);


    console.log(`Winner: ${ks[0]}`);
    let gs = Array.from(kings.get(ks[0]).keys());
    let gens = kings.get(ks[0]);
    gs.sort((a, b) => gens.get(b) - gens.get(a));

    for (let g of gs) {
        console.log(`/\\general: ${g}`);
        console.log(`---army: ${Math.floor(gens.get(g))}`);
        console.log(`---wins: ${gensWins.get(g)}`);
        console.log(`---losses: ${gensLosses.get(g)}`);
    }


}

function surveyParser(input) {
    let surveyData = input.match(/<svg>.*?(?=<\/svg>)/g);
    if (surveyData === null) {
        console.log('No survey found');
        return;
    }

    surveyData = surveyData[0].toString().slice(5);

    let cats = surveyData.match(/<cat>.*?(?=<\/cat>)/g);
    if (cats.length !== 2) {
        console.log('Invalid format');
        return;
    }

    let headingLabel = cats[0].toString().slice(5);
    let vals = cats[1].toString().slice(5);

    let check = /<text>.*?\[.*?\](?=<\/text>)/g.test(headingLabel);
    if (check === false) {
        console.log('Invalid format');
        return;
    }

    let label = headingLabel.match(/\[.*?(?=\])/g)[0].toString().slice(1);
    let sumRatings = 0;
    let sumCount = 0;

    let values = vals.match(/<g><val>\d+<\/val>\d+(?=<\/g>)/g);
    for (let v of values) {
        let rating = Number(v.toString().match(/\d+/g)[0].toString());
        let count = Number(v.toString().match(/\d+/g)[1].toString());

        if ((rating < 1 && rating > 10) ||
            (count < 0)) {
            continue;
        }
        sumRatings += count * rating;
        sumCount += count;
    }
    let average = sumRatings / sumCount;

    console.log(`${label}: ${Number(average.toFixed(2))}`);
}