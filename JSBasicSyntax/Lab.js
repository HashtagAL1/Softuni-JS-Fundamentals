function sum3Numbers(a,b,c) {
    console.log(a + b + c);
}

function sumAndVat(input) {
    let sum = 0;
    for(let i = 0; i < input.length; i++) {
        sum += input[i];
    }
    let vat = 0.2 * sum;
    let total = sum + vat;
    console.log('sum = ' + sum);
    console.log('VAT = ' + vat);
    console.log('total = ' + total);
}

function letterOccurences(word, target) {
    let cnt = 0;
    for(let i = 0; i < word.length; i++) {
        if (target === word[i]) {
            cnt++;
        }
    }
    console.log(cnt);
}

function filterByAge(min, fPerson, fAge, sPerson, sAge) {

    if (min <= fAge) {
        let fp = {name: fPerson, age: fAge};
        console.log(fp);
    }

    if (min <= sAge) {
        let sp = {name: sPerson, age: sAge};
        console.log(sp);
    }

}

function stringNumbers(input) {
    let target = Number(input);
    let result = '';
    for(let i = 1; i <= target; i++) {
        result += i.toString();
    }

    console.log(result);
}

function figureArea(w, h, W, H) {
    console.log(firstFigure + secondFigure - out);
    let firstFigure = w * h;
    let secondFigure = W * H;
    let out = Math.min(w, W) * Math.min(H, h);
}

function nextDay(year, month, day) {
    if(year === 1) {
        year = 1901;
    }
    let input = year.toString() + '-' + month.toString() + '-' + day.toString();
    let date = new Date(input);
    date.setDate(date.getDate() + 1);
    console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
}

function distanceBetweenPoints(x1,y1,x2,y2) {
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2));
    console.log(distance);
}
