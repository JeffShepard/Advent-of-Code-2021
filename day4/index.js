const fs = require('fs') 

// let rawTest = fs.readFileSync('test.txt').toString().split('\n');
let raw = fs.readFileSync('input1.txt').toString().split('\n\n');

raw = raw.map(n => n.split('\n'))

let balls = raw[0];
raw.shift();
let rawBoard = raw;


balls = balls[0].split(',')
let rowBoard = rawBoard.map(n => n.map(n => n.split(' ').filter( n => n )))

const addBoards = (board) => {
    let colBoards = [];
    for (let i=0; i<board.length; i++) {
        colBoards[i] = transpose(board[i])
    }
return colBoards
}

const transpose = (board) => {
    let transBoard=[];
    
    for (let i=0; i<5; i++) {
        transBoard[i]=[]
    }

    for (let i=0; i<5; i++) {
        for (let j=0; j<5; j++) {
        transBoard[i].push((board[j][i]))
        }   
    }
    return transBoard
}

let colBoard = addBoards(rowBoard)


const calcRowScore = (balls,rowBoard,colBoard) => {
    let winBoard = winningBoard(balls,rowBoard,colBoard)
    let winNum=winBoard[0];
    let boardIndex=winBoard[1]
    let rowIndex = winBoard[2]
    let winBallIndex = winBoard[3]
    let dir = winBoard[4]

    let count=0;
    let ballCount=0;
    //HERE IS WHERE I CHANGE THE BOARD
    board = colBoard
    for(let i=0; i<5; i++) {
        if (i !== rowIndex) {
            for (let j=0; j<=winBallIndex; j++) {
                if (board[boardIndex][i].includes(balls[j])) {
                    ballCount = ballCount + parseInt(balls[j])
                }
            }
            count = count + board[boardIndex][i].reduce((n,k) => parseInt(n)+parseInt(k))
        }
    }
    let score = winNum * (count-ballCount)
    console.log(`winNum ${winNum} boardIndex ${boardIndex} rowIndex ${rowIndex} count ${count-ballCount} winBallIndex ${winBallIndex} dir ${dir}`)
    return score
}

const winningBoard = (balls,rowBoard,colBoard) => {
    let winBallIndex=0
    let boardIndex=0;
    let dir = '';
    best = [];
    for (let k=0; k<rowBoard.length; k++) {
        let bestRow = rowCalc(balls,rowBoard,k);
        let bestCol = colCalc(balls,colBoard,k)
        // testWin(best[0],best[1],k,balls,board)
        bestRow[0]<bestCol[0] ? best=bestRow : best=bestCol
        //THIS IS WHERE I CHANGE THE GREATER THAN SIGN
        if (best[0] > winBallIndex) {
            winBallIndex=best[0]
            rowIndex=best[1]
            boardIndex=k
            dir = best[2]
        }
        // console.log(k)
    }
    let winNum=parseInt(balls[winBallIndex])
    return [winNum, boardIndex, rowIndex,winBallIndex,dir]
}

const rowCalc = (balls, rowBoard, k) => {
    let finalBallIndex = balls.length
    let finalRowIndex = 0
    //each row of the board
    for (let i=0; i< rowBoard[k].length ;i++) {
        let count=0;
        // console.log(`row is ${i}`)
        //for each row, sort thru all the balls
        for (let j=0; j< balls.length; j++) {
            if (rowBoard[k][i].includes(balls[j])) {
            count++
            // console.log(count,i,j)
            rowIndex=i;
            ballIndex=j;
                if (count===5) {
                    // console.log(ballIndex, boardIndex )
                    // console.log(`count${count}`)
                    if(ballIndex<finalBallIndex) {
                        finalBallIndex=ballIndex;
                        finalRowIndex=rowIndex;
                    }
                }
            }
        // console.log(finalBallIndex)
        }
        // console.log(boardIndex)
    }
    return [finalBallIndex, finalRowIndex, 'Row']
}
const colCalc = (balls, colBoard, k) => {
    let finalBallIndex = balls.length
    let finalColIndex = 0
    //each row of the board
    for (let i=0; i< colBoard[k].length ;i++) {
        let count=0;
        // console.log(`row is ${i}`)
        //for each row, sort thru all the balls
        for (let j=0; j< balls.length; j++) {
            if (colBoard[k][i].includes(balls[j])) {
            count++
            // console.log(count,i,j)
            colIndex=i;
            ballIndex=j;
                if (count===5) {
                    // console.log(ballIndex, boardIndex )
                    // console.log(`count${count}`)
                    if(ballIndex<finalBallIndex) {
                        finalBallIndex=ballIndex;
                        finalColIndex=colIndex;
                    }
                }
            }
        // console.log(finalBallIndex)
        }
        // console.log(boardIndex)
    }
    return [finalBallIndex, finalColIndex,'Col']
}
const testWin = (finalBallIndex,finalRowIndex,boardIndex,balls,board) => {
    console.log(finalBallIndex,finalRowIndex,boardIndex)
    let count=0;
    for (let i=0; i<=finalBallIndex; i++) {
        if (board[boardIndex][finalRowIndex].includes(balls[i])) {
            count++
        }
    }
    if (count===5) {
        console.log(true, count)
    }
    else console.log(false, count)
}

    

//CALL MAIN FUNCTION
console.log(`Total Points ${calcRowScore(balls, rowBoard, colBoard)}`)


//part 1 test
// winNum 24 boardIndex 2 rowIndex 0 count 188 winBallIndex 11 
// with initial board 4512
// winNum 13 boardIndex 1 rowIndex 4 count 120 winBallIndex 14 
// with col board 1560

//part 1 answers
// winNum 3 boardIndex 13 rowIndex 4 count 915 winBallIndex 24 
// with initial board 2745
// winNum 13 boardIndex 20 rowIndex 4 count 759 winBallIndex 31 
// with col board 9867

//part 2 test answers
// In the above example, the second board is the last to win,
//  which happens after 13 is eventually called and its middle column is completely marked. 
//  If you were to keep playing until this point, the second board would have a sum of
//   unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.


// console.log(winningBoard(balls, board))
// console.log(rowCalc(balls,board))
// rowCalc(balls,board)


// console.log(balls)
// console.log(rowBoard[0])
// console.log(colBoard)
