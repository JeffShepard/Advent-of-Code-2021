const fs = require('fs') 
  
const raw = fs.readFileSync('input.txt').toString();
let arr = raw.split('\n').map(n => n.split(' ')).map(n => [n[0], Number(n[1])])

// Part 1

const part1 = (arr) => {
    let forward = 0;
    let depth = 0;
    for (let i=0; i<arr.length; i++ ) {
        if (arr[i][0] === 'forward') {
            forward = forward + arr[i][1]
        }
        else if (arr[i][0] === 'down') {
            depth = depth + arr[i][1]
        }
        else if (arr[i][0] === 'up') {
            depth = depth - arr[i][1]
        }
    }

    return [forward * depth] 
}

// Part2 

const part2 = (arr) => {
    let forward = 0;
    let aim = 0;
    let depth = 0;
    for (let i=0; i<arr.length; i++ ) {
        if (arr[i][0] === 'forward') {
            forward = forward + arr[i][1]
            depth = depth + arr[i][1] * aim
        }
        else if (arr[i][0] === 'down') {
            aim = aim + arr[i][1]
        }
        else if (arr[i][0] === 'up') {
            aim = aim - arr[i][1]
        }
    }

    return [forward * depth] 
}

console.log(part1(arr))
console.log(part2(arr))




