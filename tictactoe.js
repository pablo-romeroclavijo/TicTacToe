prompt = require("prompt-sync")()

// const masterGrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
// let gameGrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
// const iPos = {'A': 0,'B': 1,'C': 2,}
// const jPos = {'1':0, '2': 1, '3': 2}

const masterGrid = {1:0 ,2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
let gameGrid = {1:0 ,2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
const restMoves = [1,2,3,4,5,6,7,8,9]
let remainingMoves = [1,2,3,4,5,6,7,8,9]

function difficulty (user){
    difficulties = ['easy', 'medium']
    level = prompt(`Choose game difficulty for Computer ${user.ID} (easy/medium/hard): `)
    while (!(difficulties.includes(level))){
        level = prompt(`Level not coded\nChoose game difficulty for COMPUTER${user.ID} (easy/medium/hard): `)
    }
    return level
}

function computerMove(user){
    let level = user.level

    switch(level){
        case('easy'):
        console.log(remainingMoves.length, remainingMoves)
        const randomIndex = Math.floor(Math.random()*remainingMoves.length);
        return remainingMoves[randomIndex]

        case("medium"):
            if(remainingMoves.length == 9){                 //computer plays first
                const corners = [1, 3, 7, 9]
                const randomCorner = corners[Math.floor(Math.random()*3)]
                return randomCorner
            }else if(remainingMoves.length == 8) {          //computer plays second
                const randomIndex = Math.floor(Math.random()*remainingMoves.length);
                return remainingMoves[randomIndex]
            }else{
                let selfWinningMoves = []                   // find selfWinning movemetns
                for(index in remainingMoves){
                    let movement = remainingMoves[index]
                   // console.log(movement, remainingMoves)
                    let tempGrid = {...gameGrid};
                    tempGrid[movement] = user.ID
                   // console.log('self TempGrid', tempGrid, gameGrid)
                    if(verify(user.ID, tempGrid).length !== 0){
                        //console.log(verify(user.ID, tempGrid))
                        selfWinningMoves.push(movement)
                    }
                }
                //console.log("selfWinningMoves", selfWinningMoves)
                if(selfWinningMoves.length !==0){           //returns any of the movements that grant victotry
                    const randomIndex = Math.floor(Math.random()*selfWinningMoves.length);
                    return selfWinningMoves[randomIndex]}
                else {
                    let oponentWinningMoves = [];
                    let ID = undefined
                    if (user.ID == 1){ID = 2}else{ID = 1} 
                    for(index in remainingMoves){
                        let movement = remainingMoves[index]
                       // console.log(movement, remainingMoves)
                        let tempGrid = {...gameGrid};
                        tempGrid[movement] = ID
                       // console.log('opo TempGrid', tempGrid, gameGrid)
                        if(verify(ID, tempGrid).length !== 0){
                           // console.log(verify(ID, tempGrid))
                            oponentWinningMoves.push(movement)}
                    }
                    //console.log('oponentWinningMoves', oponentWinningMoves)
        
                    if(oponentWinningMoves.length !==0){        //returns any of the movements that grant victory to the oponent
                        const randomIndex = Math.floor(Math.random()*oponentWinningMoves.length);
                        return oponentWinningMoves[randomIndex]}
                    else{
                        const randomChoice = Math.floor(Math.random()*remainingMoves.length);
                        return randomChoice}    
                }
            }

        case(hard):
        pass
    }
}

function move(user){
    const type = user.type
    let choice = null
    switch(type){
        case('Human'):
            choice = Number(prompt(` ${user.symbol}${user.symbol} ${user.type} ${user.ID} ${user.symbol}${user.symbol}  Choose your move: `))
            break;

        case('Computer'):
            choice = computerMove(user);
            break;
    }
   
    if (gameGrid[choice] == 0){
        gameGrid[choice] = user.ID
        let index = remainingMoves.indexOf(choice)
        remainingMoves.splice(index, 1)
    }else if(choice > 10 | choice < 1){console.log('Invalid input'); move(user)}
    else {console.log('Position already used'); move(user)}
    
}

function verify(ID, grid){
    let g = (i) => grid[i]
    let combinations = {
        row1 : [[1,2,3], [g(1),g(2),g(3)]],
        row2 : [[4,5,6], [g(4),g(5),g(6)]],
        row3 : [[7,8,9],[g(7),g(8),g(9)]],

        col1 : [[1,4,7],[g(1),g(4),g(7)]],
        col2 : [[2,5,8],[g(2),g(5),g(8)]],
        col3 : [[3,6,9],[g(3),g(6),g(9)]],


        dig1 : [[1,5,9],[g(1),g(5),g(9)]],
        dig2 : [[3,5,7],[g(3),g(5),g(7)]]}
       

    let winComb = [ID, ID, ID]
    let combvalues = Object.values(combinations).map(elem => elem[1])


    let results = []
    for(comb in combinations){
        if (combinations[comb][1].toString() == winComb.toString()){
            let result = {ID: ID, posiitons:combinations[comb][0], comb: combinations[comb][1]}
            results.push(result)   
        }
    }
    return results   
}


function graphics(){
    const symbols = {
        0: ' ',
        1: user1.symbol,
        2: user2.symbol}
    
        s = symbols
        let g = gameGrid
        console.log('   BOARD             POSITIONS')
        console.log('+---+---+---+      +---+---+---+')
        console.log(`| ${s[g[1]]} | ${s[g[2]]} | ${s[g[3]]} |      | 1 | 2 | 3 |`)
        console.log('+---+---+---+      +---+---+---+')
        console.log(`| ${s[g[4]]} | ${s[g[5]]} | ${s[g[6]]} |      | 4 | 5 | 6 |`)
        console.log('+---+---+---+      +---+---+---+')
        console.log(`| ${s[g[7]]} | ${s[g[8]]} | ${s[g[9]]} |      | 7 | 8 | 9 |`)
        console.log('+---+---+---+      +---+---+---+') 
    }

function game(){
    gameGrid = {...masterGrid}
    remainingMoves = [...restMoves]
    let user =  (number, typ, symbol, dif = null) => {return {ID: number, type: typ, symbol: symbol, level: dif}}

  
    const nPlayers = prompt('Number of players (0, 1 or 2):' )
    switch(nPlayers){
        case("2"):
            user1 = user(1, 'Human', 'X')
            user2 = user(2, 'Human', 'O');
            break;

        case("1"):
            user1 = user(1, 'Human', 'X')
            user2 = user(2, 'Computer', 'O')
            user2.level = difficulty(user2);
            break;

        case('0'):
            user1 = user(1, 'computer', 'X')
            user2 = user(2, 'computer', 'O')
            user1.level = difficulty(user1)
            user2.level = difficulty(user2);
            break;

        default:
            console.log('Error: Invalid number of players')
            remainingMoves = restMoves
            game()
    }

    graphics()
    const randomStart = Math.floor(Math.random()*2+1)
    const firstPlayer = () =>{
        move(user1);
        graphics();
        let result = verify(user1.ID, gameGrid)
        if(result.length !==0){
            console.log(`${user1.symbol}${user1.symbol} ${user1.type} 1 WON!! ${user1.symbol}${user1.symbol}\n\n\n Starting new game`);
            game()  
        }}

    const secondPlayer = () => {
        move(user2); 
        graphics();
        let result = verify(user2.ID, gameGrid)
        if(result.length !==0){
            console.log(`${user2.symbol}${user2.symbol} ${user2.type} 2 WON!! ${user2.symbol}${user2.symbol}\n\n\n Starting new game`)
            game()  
        }}
    if(randomStart == 1){console.log(`${user1.type} ${randomStart} plays first `)}
    else{console.log(`${user2.type} ${randomStart} plays first `)}
    
    
    while(remainingMoves.length > 0){ 
        if(randomStart == 1){
            firstPlayer()
            if(remainingMoves.length == 0){console.log("It's a TIE\n\nStarting new game"); game()}
            else{secondPlayer()}
            }
        else{
            secondPlayer()
            if(remainingMoves.length == 0){console.log("It's a TIE\n\nStarting new game"); game()}
            else{firstPlayer()}
        }
    }
    console.log("It's a TIE\n\nStarting new game"); 
    game()
    }

    game()
