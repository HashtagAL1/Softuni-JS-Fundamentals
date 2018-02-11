function hungryProgrammer(portions, commands) {
    let eatenMeals = [];
    for (let com of commands) {
        let info = com.split(' ');
        let action = info[0];
        if (portions.length === 0 && action !== 'Add') {
            continue;
        }
        if (action === 'Serve') {
            if (info.length > 1) {
                continue;
            }
            let meal = portions[portions.length - 1];
            portions.splice(portions.length - 1, 1);
            console.log(`${meal} served!`)
        }
        else if (action === 'Add') {
            if (info.length !== 2) {
                continue;
            }
            let meal = info[1];
            portions.unshift(meal);
        }
        else if (action === 'Consume') {
            if (info.length !== 3) {
                continue;
            }
            let startIndex = Number(info[1]);
            let endIndex = Number(info[2]);
            if (startIndex < 0 || endIndex >= portions.length) {
                continue;
            }
            for(let i = startIndex; i <= endIndex; i++) {
                eatenMeals.push(portions[i]);
            }
            portions.splice(startIndex, (endIndex - startIndex) + 1);
            console.log(`Burp!`);
        }
        else if (action === 'Eat') {
            if (info.length > 1) {
                continue;
            }
            let meal = portions[0];
            eatenMeals.push(meal);
            portions.splice(0, 1);
            console.log(`${meal} eaten`);
        }
        else if (action === 'Shift') {
            if (info.length !== 3) {
                continue;
            }
            let fIndex = Number(info[1]);
            let sIndex = Number(info[2]);
            if (fIndex < 0 || sIndex >= portions.length) {
                continue;
            }
            let temp = portions[sIndex];
            portions[sIndex] = portions[fIndex];
            portions[fIndex] = temp;
        }
        else if (action === 'End') {
            break;
        }
    }

    if (portions.length === 0) {
        console.log(`The food is gone`)
    }
    else {
        console.log(`Meals left: ${portions.join(', ')}`);
    }
    console.log(`Meals eaten: ${eatenMeals.length}`);
}

function expedition(primary, secondary, overlayCoord, startCoord) {
    for (let coord of overlayCoord) {
        let x = coord[0];
        let y = coord[1];
        for(let row = x, sr = 0; row < primary.length && sr < secondary.length; row++, sr++) {
            for(let col = y, sc = 0; col < y + primary[row].length && sc < secondary[sr].length; col++, sc++) {
                if (secondary[sr][sc] === 1) {
                    if (primary[row][col] === 0) {
                        primary[row][col] = 1;
                    }
                    else
                        primary[row][col] = 0;
                }
            }
        }
    }
    let startX = startCoord[0];
    let startY = startCoord[1];
    let cnt = 1;
    while (startX < primary.length && startY < primary[0].length) {

        if (primary[startX + 1][startY] === 0) {
            primary[startX][startY] = 2;
            startX += 1;
            cnt++;
        }
        else if (primary[startX - 1][startY] === 0) {
            primary[startX][startY] = 2;
            startX -= 1;
            cnt++;
        }
        else if (primary[startX][startY + 1] === 0) {
            primary[startX][startY] = 2;
            startY += 1;
            cnt++;
        }
        else if (primary[startX][startY - 1] === 0) {
            primary[startX][startY] = 2;
            startY -= 1;
            cnt++;
        }
        else {
            let quadrant;
            if (startX + 1 <= primary.length / 2 && startY + 1 <= primary[0].length / 2) {
                quadrant = 2;
            }
            else if (startX + 1 <= primary.length / 2 && startY + 1 > primary[0].length / 2) {
                quadrant = 1;
            }
            else if (startX + 1 > primary.length / 2 && startY + 1 <= primary[0].length / 2) {
                quadrant = 3;
            }
            else
                quadrant = 4;
            console.log(cnt);
            console.log(`Dead end ${quadrant}`);
            break;
        }
        if (startX + 1 >= primary.length) {
            console.log(cnt);
            console.log('Bottom');
            break;
        }
        if (startY + 1 >= primary[0].length) {
            console.log(cnt);
            console.log('Right');
            break;
        }
        if (startX - 1 < 0) {
            console.log(cnt);
            console.log('Top');
            break;
        }
        if (startY - 1 < 0) {
            console.log(cnt);
            console.log('Left');
            break;
        }


    }
}

function restHouse(rooms, guests) {
    let teaHouse = [];
    for (let r of rooms) {
        r['people'] = [];
        if (r.type === 'double-bedded') {
            r['beds'] = 2;
        }
        else
            r['beds'] = 3;
    }

    for (let couple of guests) {
        couple.first['placed'] = false;
        couple.second['placed'] = false;
    }

    for (let couple of guests) {
        let first = couple.first;
        let second = couple.second;
        if (first.gender !== second.gender) {
            for (let r of rooms) {
                if (r.type === 'double-bedded' && r.beds === 2) {
                    r.beds = 0;
                    second.placed = true;
                    first.placed = true;
                    r.people.push(first);
                    r.people.push(second);
                    break;
                }
            }
        }
        else {
            for (let r of rooms) {
                if (r.type === 'triple' && r.beds === 3) {
                    r.beds -= 2;
                    first.placed = true;
                    second.placed = true;
                    r.people.push(first);
                    r.people.push(second);
                    break;
                }
                if (r.type === 'triple' && r.beds > 0) {
                    if (first.gender === r.people[0].gender && first.placed === false) {
                        r.beds -= 1;
                        first.placed = true;
                        r.people.push(first);
                    }
                    if (second.gender === r.people[0].gender && r.beds > 0 && second.placed === false) {
                        r.beds -= 1;
                        second.placed = true;
                        r.people.push(second);
                    }
                    if (first.placed && second.placed) {
                        break;
                    }
                }
            }
        }
    }

    for (let couple of guests) {
        if (couple.first.placed === false) {
            teaHouse.push(couple.first);
        }
        if (couple.second.placed === false) {
            teaHouse.push(couple.second);
        }
    }
    rooms.sort((a, b) => a.number > b.number);
    for (let r of rooms) {
        console.log(`Room number: ${r.number}`);
        r.people.sort((a, b) => a.name > b.name);
        for (let person of r.people) {
            console.log(`--Guest Name: ${person.name}`);
            console.log(`--Guest Age: ${person.age}`);
        }
        console.log(`Empty beds in the room: ${r.beds}`);
    }

    console.log(`Guests moved to the tea house: ${teaHouse.length}`)
}

function lost(keyword, text) {
    let msgPattern = new RegExp(keyword + ".*" + keyword, "g");
    let msg = text.match(msgPattern)[0].toString();
    msg = msg.substring(keyword.length, msg.length - keyword.length);

    let eastPattern = new RegExp("east.*?\\d{2}.*?,.*?\\d{6}", "gi");
    let eastMatches = text.match(eastPattern);
    let eMatch = eastMatches[0].toString().split(/[^0-9,]/g).filter(a => a !== '').join('').split(',');
    let fPart = eMatch[0].slice(0, 2) + '.';
    let sPart = eMatch[eMatch.length - 1].slice(0, 7);
    let eC = fPart + sPart;


    let northPattern = new RegExp("north.*?\\d{2}.*?,.*?\\d{6}", "gi");
    let northMatches = text.match(northPattern);
    let nMatch = northMatches[northMatches.length - 1].toString().split(/[^0-9,]/g).filter(a => a !== '').join('').split(',');
    fPart = nMatch[0].slice(0, 2) + '.';
    sPart = nMatch[nMatch.length - 1].slice(0, 7);
    let nC = fPart + sPart;
    console.log(nC + ' N');
    console.log(eC + ' E');
    console.log(`Message: ${msg}`);


}

