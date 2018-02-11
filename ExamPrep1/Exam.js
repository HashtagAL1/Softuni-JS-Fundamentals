function spiceMustFlow(arr) {
    let start = Number(arr[0]);
    let sum = 0;
    let days = 0;

    while (start >= 100) {
        sum += (start - 26);
        start -= 10;
        days++;
    }
    if (sum !== 0) {
        sum -= 26;
    }

    console.log(days);
    console.log(sum);
}

function buildWall(arr) {
    let input = arr.map(Number);
    let concreteUsage = [];
    let sum = 0;

    while (true) {
        let action = false;
        let concrete = 0;
        for(let i = 0; i < input.length; i++) {
            if (input[i] < 30) {
                input[i]++;
                concrete += 195;
                action = true;
            }
        }
        sum += (concrete * 1900);

        if (concrete !== 0) {
            concreteUsage.push(concrete);
        }
        if (!action) {
            break;
        }
    }

    console.log(concreteUsage.join(', '));
    console.log(`${sum} pesos`);

}

function formatHelper(arr) {
    let text = arr[0];
    text = text.replace(/"\s+/g, '\"')
        .replace(/\s+(?=")/g, '')
        .replace(/\.\s+(?=\d)/g, '.')
        .replace(/\s+(?=[.,;:!?])/g, '')
        .replace(/\.(?=[^\d.?! ])/g, '. ')
        .replace(/,(?=[^\d.! ])/g, ', ')
        .replace(/!(?=[^\d.!? ])/g, '! ')
        .replace(/\?(?=[^\d.!? ])/g, '? ')
        .replace(/:(?=[^\d.! ])/g, ': ')
        .replace(/;(?=[^\d.! ])/g, '; ')
        .replace(/\s+/g, ' ');


    console.log(text);
}

function airport(arr) {

    let isExistingTown = function (cities, t) {
        for(let i = 0; i < cities.length; i++) {
            if (cities[i].name === t) {
                return i;
            }
        }
        return -1;
    };

    let isExistingPlane = function (planes, id) {
        for(let i = 0; i < planes.length; i++) {
            if (planes[i] === id) {
                return i;
            }
        }
        return -1;
    };

    let landed = [];
    let towns = [];
    for (let flight of arr) {
        let info = flight.split(' ');
        let id = info[0];
        let town = info[1];
        let passangers = Number(info[2]);
        let action = info[3];

        let index = landed.indexOf(id);

        if ((index !== -1 && action === 'land') ||
            (index === -1 && action === 'depart')) {
            continue;
        }

        let townIndex = isExistingTown(towns, town);

        if (action === 'land') {
            landed.push(id);
            if (townIndex !== -1) {
                towns[townIndex].arrivals += passangers;
                let planeIndex = isExistingPlane(towns[townIndex].planes, id);
                if (planeIndex === -1) {
                    towns[townIndex].planes.push(id);
                }
            }
            else {
                let obj = {};
                obj.name = town;
                obj.arrivals = passangers;
                obj.departures = 0;
                obj.planes = [];
                obj.planes.push(id);
                towns.push(obj);
            }
        }
        if (action === 'depart') {
            landed.splice(index, 1);
            if (townIndex !== -1) {
                towns[townIndex].departures += passangers;
                let planeIndex = isExistingPlane(towns[townIndex].planes, id);
                if (planeIndex === -1) {
                    towns[townIndex].planes.push(id);
                }
            }
            else {
                let obj = {};
                obj.name = town;
                obj.arrivals = 0;
                obj.departures = passangers;
                obj.planes = [];
                obj.planes.push(id);
                towns.push(obj);
            }
        }



    }
    landed.sort((a, b) => a.toLowerCase() > b.toLowerCase());
    towns.sort((a, b) => b.arrivals - a.arrivals || a.name.toLowerCase() > b.name.toLowerCase());

    console.log('Planes left:');
    for (let p of landed) {
        console.log(`- ${p}`);
    }

    for (let t of towns) {
        console.log(t.name);
        console.log(`Arrivals: ${t.arrivals}`);
        console.log(`Departures: ${t.departures}`);
        console.log('Planes:');
        t.planes.sort((a, b) => a.toLowerCase() > b.toLowerCase());
        for (let plane of t.planes) {
            console.log(`-- ${plane}`);
        }
    }
}