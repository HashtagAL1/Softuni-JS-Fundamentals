function pyramidOfDjoser(base, inc) {
    let pyramid = {stone: 0, gold: 0, lapis: 0, height: 0, marble: 0};
    let cnt = 1;

    for(let i = base; i > 2; i -= 2, cnt++) {
        let stoneBlocks = Math.pow(i - 2, 2);
        stoneBlocks *= inc;
        pyramid['stone'] += stoneBlocks;

        let outerLayer = (4 * i) - 4;
        outerLayer *= inc;

        if (cnt % 5 === 0) {
            pyramid['lapis'] += outerLayer;
        }
        else
            pyramid['marble'] += outerLayer;
    }
    let gold = 0;
    if (base % 2 === 0) {
        gold = 4 * inc;
    }
    else
        gold = 1 * inc;
    pyramid['gold'] = Math.ceil(gold);
    pyramid['stone'] = Math.ceil(pyramid.stone);
    pyramid['marble'] = Math.ceil(pyramid.marble);
    pyramid['lapis'] = Math.ceil(pyramid.lapis);
    pyramid['height'] = parseInt(inc * cnt);

    console.log(`Stone required: ${pyramid.stone}`);
    console.log(`Marble required: ${pyramid.marble}`);
    console.log(`Lapis Lazuli required: ${pyramid.lapis}`);
    console.log(`Gold required: ${pyramid.gold}`);
    console.log(`Final pyramid height: ${pyramid.height}`);
}

function jansNoration(arr) {

    let calc = function (opIndex, num1Index, num2Index) {
        let op = arr[opIndex];
        let num1 = arr[num1Index];
        let num2 = arr[num2Index];
        let result;
        switch (op) {
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
        }
        let min = Math.min(num1Index, num2Index);
        let max = Math.max(num1Index, num2Index);
        arr[min] = result;
        arr.splice(max, 2);
        return min;
    };

    for(let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'string') {
            if (i - 1 < 0 || i - 2 < 0) {
                console.log('Error: not enough operands!');
                return;
            }
             i = calc(i, i - 2, i - 1) - 1;
        }
    }

    if (arr.length > 1) {
        console.log('Error: too many operands!')
    }
    else
        console.log(arr[0]);
}

function galacticElections(arr) {
    let systems = new Map();

    for (let obj of arr) {
        let system = obj.system;
        let votes = obj.votes;
        let candidate = obj.candidate;

        if (!systems.has(system)) {
            systems.set(system, new Map());
            let candMap = systems.get(system);
            candMap.set(candidate, votes);
        }
        else {
            let candMap = systems.get(system);
            if (!candMap.has(candidate)) {
                candMap.set(candidate, votes);
            }
            else {
                candMap.set(candidate, candMap.get(candidate) + votes);
            }
        }
    }
    let allVotes = 0;
    let topCands = new Map();

    for (let sys of systems.keys()) {
        let candMap = systems.get(sys);
        let cands = Array.from(candMap.keys());
        cands.sort((a, b) => candMap.get(a) < candMap.get(b));
        let votesArr = [];
        for (let c of cands) {
            votesArr.push(candMap.get(c));
            allVotes += candMap.get(c);
        }
        candMap.set(cands[0], votesArr.reduce((a, b) => a + b));
        topCands.set(cands[0], candMap.get(cands[0]));
    }

    let tops = Array.from(topCands.keys());
    tops.sort((a, b) => topCands.get(a) < topCands.get(b));
    let runnerUp = tops[1];

    if (runnerUp === undefined) {
        console.log(`${tops[0]} wins with ${allVotes} votes`);
        console.log(`${tops[0]} wins unopposed!`);

    }

    else if (topCands.get(tops[0]) > (allVotes / 2)) {

        console.log(`${tops[0]} wins with ${topCands.get(tops[0])} votes`);
        console.log(`Runner up: ${runnerUp}`);
        let runnerUpMap = new Map();

        for (let sys of systems.keys()) {
            let candMap = systems.get(sys);
            let cands = Array.from(candMap.keys());
            cands.sort((a, b) => candMap.get(a) < candMap.get(b));
            if (cands[0] === tops[1]) {
                runnerUpMap.set(sys, candMap.get(cands[0]));
            }
        }

        let runnerSystems = Array.from(runnerUpMap.keys());
        runnerSystems.sort((a, b) => runnerUpMap.get(a) < runnerUpMap.get(b));
        for (let system of runnerSystems) {
            console.log(`${system}: ${runnerUpMap.get(system)}`);
        }

    }
    else {
        let cand1 = tops[0];
        let cand2 = tops[1];
        let perc1 = parseInt((topCands.get(cand1) / allVotes) * 100);
        let perc2 = parseInt((topCands.get(cand2) / allVotes) * 100);
        console.log(`Runoff between ${cand1} with ${perc1}% and ${cand2} with ${perc2}%`)
    }


}

function xmlMessenger(input) {
    let validFirstBatchPat = /^<message.*(?=\/message>$)/g;
    if (!validFirstBatchPat.test(input)) {
        console.log('Invalid message format');
        return;
    }

    let m = input.match(validFirstBatchPat)[0].toString();
    m = m.replace('<message', '');
    let msg = m.match(/>.*(?=<)/g)[0].toString();
    msg = msg.slice(1);
    let msgParts = msg.split('\n').filter(a => a !== '');
    let message = '';
    for (let m of msgParts) {
        message += `\n\t\t<p>${m}</p>`
    }
    let keyValMatch = m.match(/[a-z]+=".*?"/g);
    let keyVals = [];
    for (let kv of keyValMatch) {
        let temp = kv.toString();
        keyVals.push(temp);
    }
    let valPat = /[a-zA-Z0-9.\s]+/g;
    let sender;
    let recipient;
    for (let kv of keyVals) {
        let info = kv.split(/[="]+/g).filter(a => a !== '');
        let key = info[0];
        let value = info[1];
        let check = value.match(valPat);
        if (check === null) {
            console.log('Incorrect message format')
            return;
        }

        if (key === 'to') {
            recipient = value;
        }
        if (key === 'from') {
            sender = value;
        }

    }

    if (sender === undefined || recipient === undefined) {
        console.log('Missing attributes');
        return;
    }

    let result = `<article>\n\t<div>From: <span class="sender">${sender}</span></div>\n\t<div>To: <span class="recipient">${recipient}</span></div>\n\t<div>${message}\n\t</div>\n</article>`
    console.log(result);


}