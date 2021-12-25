const fs = require('fs') 

// let rawTest = fs.readFileSync('test.txt').toString().split('\n');
let raw = fs.readFileSync('input.txt').toString().split('\n');
raw = raw
    .map(n => n.split(' '))
    .map( n => [n[0],n[2]])
    .map(n => n.map(n => n.split(',')
    .map(n => parseInt(n))))
    
    let raw2=raw
    raw = raw.filter(n => n[0][0]===n[1][0] || n[0][1] === n[1][1])



// const makePoints = (raw) => {
//     let points = [];
//     for (let i=0; i<raw.length; i++) {
//         // get each line
//         let line = raw[i]
//         // get lines where x changes
//         if (line[0][0] !== line[1][0]) {
//             let diff = Math.abs(line[1][0]-line[0][0])
//             for (let j=0; j<=diff; j++) {
//                 if (line[1][0]>line[0][0]) {
//                     points.push([line[0][0]+j,line[0][1]])                 
//                 }
//                 else if (line[1][0]<line[0][0]) {
//                     points.push([line[0][0]-j,line[0][1]]) 
//                 }  
//             }
//         }
//         // get lines where y changes
//         if (line[0][1] !== line[1][1]) {
//             let diff = Math.abs(line[1][1]-line[0][1])
//             for (let j=0; j<=diff; j++) {
//                 if (line[1][1]>line[0][1]) {
//                     points.push([line[0][0],line[0][1]+j])                 
//                 }
//                 else if (line[1][1]<line[0][1]) {
//                     points.push([line[0][0],line[0][1]-j]) 
//                 }  
//             }
//         }
//    }
// return points
// }

// const part1 = (raw) => {
//     // get the map of points
//     let points = makePoints(raw)
//     let length = points.length
//     let count = [[-1,-1]];
//     let counter=0;
//     let x = false;
//     //count each time a maps point is duplicated
//     for (let i=0; i<length; i++) {
//         let point = points[0]
//         points.shift()
//         points.map (n => {
//             if (n[0]===point[0] && n[1]===point[1]) {
//                 count.map(p => {
//                    if (p[0] === point[0] && p[1] === point[1]) {
//                         x=true;
//                     }
//                 })
//             if (x) {counter--}
//             x=false
//             count.push(n)
//             counter++
//             }
//         })
//     }
//     return counter
// }

const makePoints2 = (raw) => {
    let points = [];
    for (let i=0; i<raw.length; i++) {
        // get each line
        let line = raw[i]
        // get lines where only x changes
        if (line[0][1] === line[1][1]) {
            let diff = Math.abs(line[1][0]-line[0][0])
            for (let j=0; j<=diff; j++) {
                if (line[1][0]>line[0][0]) {
                    points.push([line[0][0]+j,line[0][1]])                 
                }
                else if (line[1][0]<line[0][0]) {
                    points.push([line[0][0]-j,line[0][1]]) 
                }  
            }
        }
        // get lines where only y changes
        if (line[0][0] === line[1][0]) {
            let diff = Math.abs(line[1][1]-line[0][1])
            for (let j=0; j<=diff; j++) {
                if (line[1][1]>line[0][1]) {
                    points.push([line[0][0],line[0][1]+j])                 
                }
                else if (line[1][1]<line[0][1]) {
                    points.push([line[0][0],line[0][1]-j]) 
                }  
            }
        }
        // get diagonal lines
        if (line[0][0] !== line[1][0] && line[0][1] !== line[1][1]) {
            let diff = Math.abs(line[1][1]-line[0][1])
            if (line[1][0]>line[0][0] & line[1][1]>line[0][1]) {
                for (let j=0; j<=diff; j++) {
                    points.push([line[0][0]+j,line[0][1]+j])
                }
            }
            if (line[1][0]<line[0][0] && line[1][1]<line[0][1]) {
                for (let j=0; j<=diff; j++) {
                    points.push([line[0][0]-j,line[0][1]-j])
                }
            }
            if (line[1][0]>line[0][0] & line[1][1]<line[0][1]) {
                for (let j=0; j<=diff; j++) {
                    points.push([line[0][0]+j,line[0][1]-j])
                }
            }
            if (line[1][0]<line[0][0] & line[1][1]>line[0][1]) {
                for (let j=0; j<=diff; j++) {
                    points.push([line[0][0]-j,line[0][1]+j])
                }
            }
        }
   }
return points
}

const part2 = (raw) => {
    // get the map of points
    let points = makePoints2(raw)
    let length = points.length
    let count = [[-1,-1]];
    let counter=0;
    let x = false;
    //count each time a maps point is duplicated
    for (let i=0; i<length; i++) {
        let point = points[0]
        points.shift()
        points.map (n => {
            if (n[0]===point[0] && n[1]===point[1]) {
                count.map(p => {
                   if (p[0] === point[0] && p[1] === point[1]) {
                        x=true;
                    }
                })
            if (x) {counter--}
            x=false
            count.push(n)
            counter++
            }
        })
    }
    return counter
}



// console.log(overlap(raw))
console.log(part2(raw2))
// console.log(raw.length)
// console.log(makePoints2(raw2))
// console.log(raw2)

