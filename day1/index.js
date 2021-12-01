const fs = require('fs') 
  
const raw = fs.readFileSync('input.txt').toString();
let arr = raw.split('\n').map(n => Number(n))

// Part 1
const part1 = (arr) => {
    let count=0
    for (let i=0; i<(arr.length); i++) {
      if (arr[i+1]>arr[i]) {
        count++
      }
    }
    return count
    }
    
    console.log(part1(arr))

// Part 2
const part2 = (arr) => {
let count=0
for (let i=0; i<(arr.length-3); i++) {
  if (arr[i+3]>arr[i]) {
    count++
  }
}
return count
}

console.log(part2(arr))