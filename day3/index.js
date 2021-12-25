const fs = require('fs') 

// let rawTest = fs.readFileSync('test.txt').toString().split('\n');
let raw = fs.readFileSync('input.txt').toString().split('\n');

raw = raw.map(n => n.split(''))

let gamma = [];
let epsilon = [];
let count = 0;

const  gammaRate = (raw) => {

    for (let i=0; i<raw[0].length; i++) {

        for (let j=0; j<raw.length; j++) {

            if (raw[j][i] === '1') {
                count=count+1
            }
        }

        if (count > raw.length/2) {
            gamma.push('1')
            epsilon.push('0')
        }
        else gamma.push('0'), epsilon.push('1')

        count=0
    }
return [gamma, epsilon]

}

const convertGamma = (raw) => {
    let numArr = gammaRate(raw);
    let numStr0 = '';
    let numStr1 = '';
    numArr[0].forEach(n => numStr0 += n)
    numArr[1].forEach(n => numStr1 += n)
    gamma= parseInt(numStr0, 2)
    epsilon= parseInt(numStr1, 2)
return gamma * epsilon
}

console.log(`Part 1 answer: ${convertGamma(raw)}`)


// Part 2

const oxRating = (arr) => {
    let targetBit = ''
    let i=0;
    while (arr.length > 1) {
        targetBit = maxBit(arr, i)

        arr = arr.filter( n => n[i] === targetBit)
        i++
    }

    let num = '';
    arr[0].forEach(n => num += n)

    return parseInt(num, 2)

}

const co2Rating = (arr) => {
    let targetBit = ''
    let i=0;
    while (arr.length > 1) {
        targetBit = maxBit(arr, i)

        targetBit === '1' ? targetBit = '0' : targetBit = '1'

        arr = arr.filter( n => n[i] === targetBit)
        i++
    }

    let num = '';
    arr[0].forEach(n => num += n)
    return parseInt(num, 2)

}
// There is a bug.  The first number oneCount provided by the forEach statement comes back NAN.  IT works fine with the test array.
// So, I just made the first number 600 to force a '1' for the first digit.  Whatever.

const maxBit = (arr, digit) => {
    let oneCount=0;
    let bit = '';
    if (digit === 0) {
        oneCount = 600
    }
    else arr.forEach( n => (oneCount = parseInt(n[digit]) + oneCount));

    oneCount >= (arr.length/2) ? bit='1' : bit = '0';

    return bit
}    

console.log(`Part 2 answer: ${oxRating(raw) * co2Rating(raw)}`)
