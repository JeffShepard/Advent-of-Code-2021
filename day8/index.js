const fs = require('fs') 

let raw = fs.readFileSync('input.txt').toString().split('\n')
            .map(n => n.split('|'))
raw = raw.map(n => n.map(n => n.trim().split(' ')))


//Part 1
const part1 = (arr) => {
    let count = 0
    arr.map(n => n[1].map(n => n.length===2 || n.length===3 || n.length===4 || n.length===7? count++: null))
    return (`Part 1 answer for Day 8 is ${count}`)
}

//Part 2

const findNum = (arr) => {
    let zero = ''; one='';let two='';let three=''; let four='';let five=''; let six=''; let seven='';let eight=''; let nine='';
    let c=''; let d=''; let f='';
    let count = 0;
    let temp=[];
    let row = arr.map(n => n.map(n => n.split('').sort().join('')))
    row[0].map(n => n.length===2 ? one=n : null)
    row[0].map(n => n.length===3 ? seven=n: null)
    row[0].map(n => n.length===4 ? four=n : null)
    row[0].map(n => n.length===7 ? eight=n : null)
    row[0].map(n => n.length===6 ?
        n.split('').includes(one.split('')[0]) ? count++: null: null )
    count===2 ? (c=one.split('')[0], f=one.split('')[1]) : (c=one.split('')[1], f=one.split('')[0])
    row[0].map(n => n.length===6 ?
        !n.split('').includes(c) ? six=n : null: null)
    row[0].map(n => n.length===5 ?
        n.split('').includes(c) && n.split('').includes(f) ? three=n :
        n.split('').includes(c) ?  two=n: five=n :null)
    row[0].map(n => n.length===6 ?
        n !== six ? temp.push(n):null:null)
    
    for (let i=0; i<6; i++) {
        count=0
        for (let j=0; j<5; j++) {
            if (!temp[0].includes(three[j])) {
            count++
            }
        }
    }  
    if (count===1) {
        zero=temp[0]
        nine=temp[1]
    }

    else {zero=temp[1]
         nine=temp[0]
        }
let total = [[zero,one,two,three,four,five,six,seven,eight,nine],row[1]]
    return (total)
}

const part2 = (arr) => {
    let total = 0;
    let tempArr=[]
    for (let i=0; i<arr.length; i++) {
        let numArr = findNum(arr[i])
        let numbers = numArr[0];
        let fourDig = numArr[1];
        // console.log(numArr)
            for (let j=0; j<4; j++) {
                for (let k=0; k<10; k++) {
                    if (fourDig[j]===numbers[k]) {
                        tempArr.push(k)
                    }
                }
            }
        tempArr=parseInt(tempArr.join(''))
        total=total+tempArr
        tempArr=[]
    }
return (`Part 2 answer for Day 8 is ${total}`)
}

console.log(part1(raw))
console.log(part2(raw))

