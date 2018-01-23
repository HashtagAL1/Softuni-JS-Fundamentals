function insideVolume(arr) {
    let xV1 = 10;
    let xV2 = 50;
    let yV1 = 20;
    let yV2 = 80;
    let zV1 = 15;
    let zV2 = 50;

    let isInside = function (x, y, z) {
        if ((x >= xV1 && x <= xV2) &&
            (y >= yV1 && y <= yV2) &&
            (z >= zV1 && z <= zV2)) {
            return 'inside';
        }
        return 'outside';
    };

    for(let i = 0; i < arr.length - 2; i += 3) {
        let x = arr[i];
        let y = arr[i + 1];
        let z = arr[i + 2];
        console.log(isInside(x, y, z));
    }
}

function roadRadar(arr) {
    let limits = {city: 50, interstate: 90, motorway: 130, residentialArea: 20};
    let speed = arr[0];
    let area = arr[1];

    let penalty = function (limit, speed) {
        let diff = speed - limit;
        if (diff > 0 && diff <= 20) {
            return 'speeding';
        }
        else if (diff > 20 && diff <= 40) {
            return 'excessive speeding';
        }
        else if (diff > 40) {
            return 'reckless driving';
        }
        else
            return '';
    };

    switch (area) {
        case 'city':
            console.log(penalty(limits.city, speed));
            break;
        case 'motorway':
            console.log(penalty(limits.motorway, speed));
            break;
        case 'interstate':
            console.log(penalty(limits.interstate, speed));
            break;
        case 'residential':
            console.log(penalty(limits.residentialArea, speed));
            break;
    }
}

function templateFormat(arr) {
    let result = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<quiz>\n';
    for(let i = 0; i < arr.length - 1; i += 2) {
        let question = arr[i];
        let answer = arr[i + 1];
        result += `\t<question>\n\t\t${question}\n\t</question>\n`;
        result += `\t<answer>\n\t\t${answer}\n\t</answer>\n`;
    }
    result += '</quiz>';
    console.log(result);
}

function cookingByNumbers(arr) {
    let num = arr[0];
    let operation = function (number, str) {
        switch (str) {
            case 'chop':
                return number / 2;
            case 'dice':
                return Math.sqrt(number);
            case 'spice':
                return ++number;
            case 'bake':
                return number * 3;
            case 'fillet':
                return number - (0.2 * number);
        }
    };
    for(let i = 1; i < arr.length; i++) {
        let op = arr[i];
        num = operation(num, op);
        console.log(num);
    }


}

function modifyAverage(num) {
    let average = function (number) {
        let result = 0;
        let length = number.toString().length;
        while (parseInt(number) > 0) {
            result += parseInt(number) % 10;
            number /= 10;
        }
        return result / length;
    };

    while (average(num) <= 5) {
        num *= 10;
        num += 9;
    }

    console.log(num);
}

function validDistances(arr) {
    let point1 = {x: arr[0], y: arr[1]};
    let point2 = {x: arr[2], y: arr[3]};
    let point0 = {x: 0, y: 0};

    let isValid = function (point1, point2) {
        let dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        return Number.isInteger(dist);
    };

    if (isValid(point1, point0)) {
        console.log(`{${point1.x}, ${point1.y}} to {0, 0} is valid`);
    }
    else
        console.log(`{${point1.x}, ${point1.y}} to {0, 0} is invalid`);

    if (isValid(point2, point0)) {
        console.log(`{${point2.x}, ${point2.y}} to {0, 0} is valid`);
    }
    else
        console.log(`{${point2.x}, ${point2.y}} to {0, 0} is invalid`);

    if (isValid(point1, point2)) {
        console.log(`{${point1.x}, ${point1.y}} to {${point2.x}, ${point2.y}} is valid`);
    }
    else
        console.log(`{${point1.x}, ${point1.y}} to {${point2.x}, ${point2.y}} is invalid`);
}

function treasureLocator(arr) {

    let islands = [{x1: 1, x2: 3, y1: 1, y2: 3, name: 'Tuvalu'},
                    {x1: 8, x2: 9, y1: 0, y2: 1, name: 'Tokelau'},
                    {x1: 5, x2: 7, y1: 3, y2: 6, name: 'Samoa'},
                    {x1: 0, x2: 2, y1: 6, y2: 8, name: 'Tonga'},
                    {x1: 4, x2: 9, y1: 7, y2: 8, name: 'Cook'}];

    let check = function (islands, point) {
        for (let island of islands) {
            if ((point.x >= island.x1 && point.x <= island.x2) &&
                (point.y >= island.y1 && point.y <= island.y2)) {
                return island.name;
            }
        }
        return 'On the bottom of the ocean';
    };

    for(let i = 0; i < arr.length - 1; i += 2) {
        let point = {};
        point['x'] = arr[i];
        point['y'] = arr[i + 1];
        console.log(check(islands, point));

    }
}

function tripLength(arr) {
    let points = [];
    for(let i = 0; i < arr.length - 1; i += 2) {
        let point = {};
        point['x'] = arr[i];
        point['y'] = arr[i + 1];
        points.push(point);
    }

    let findDistance = function (point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    };

    let distance13 = findDistance(points[0], points[2]);
    let distance12 = findDistance(points[0], points[1]);
    let distance23 = findDistance(points[1], points[2]);
    let result = 0;

    if (distance12 <= distance13 && distance13 <= distance23) {
        result = distance12 + distance13;
        console.log(`2->1->3: ${result}`);
    }
    else if (distance12 <= distance13 && distance13 >= distance23) {
        result = distance23 + distance12;
        console.log(`1->2->3: ${result}`);
    }
    else {
        result = distance13 + distance23;
        console.log(`1->3->2: ${result}`);
    }
}

