const fs = require('fs') 

let raw = fs.readFileSync('input.txt').toString().split(',').map(n => parseInt(n));

const part1 =(arr) => {
    let diffArr = [];
    let addIt = 0;
    for (let i=0; i<arr.length; i++) {
        for (let j=0; j<arr.length; j++) {
            addIt+=Math.abs(arr[i]-arr[j]);
        }
        diffArr.push(addIt)
        addIt=0
    }
    let total = Math.min(...diffArr)
    return total
}

const part2 =(arr) => {
    let diffArr = [];
    let addIt = 0;
    let temp = 0;
    let min = Math.min(...arr)
    let max = Math.max(...arr)
    for (let i=min; i<max; i++) {
        for (let j=0; j<arr.length; j++) {
            temp=Math.abs(i-arr[j]);
            for (let k=1; k<=temp; k++) {
                addIt=addIt+k
            }
        }
        diffArr.push(addIt)
        addIt=0
    }
    let total = Math.min(...diffArr)
    return total
}


console.log(`Part1 answer is:`,part1(raw))
console.log(`Part2 answer is:`,part2(raw))