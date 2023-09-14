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
    difficulties = ['easy']
    level = prompt(`Choose game difficulty for COMPUTER${user.ID} (easy/medium/hard): `)
    console.log(level, difficulties.includes(level))
    while (!(difficulties.includes(level))){
        level = prompt(`Level not coded\nChoose game difficulty for COMPUTER${user.ID} (easy/medium/hard): `)
    }
    return level
}

function computerMove(level){
    switch(level){
        case('easy'):
        console.log(remainingMoves.length)
        const randomChoice = Math.floor(Math.random()*remainingMoves.length);
        return randomChoice

        case(medium):
        pass;

        case(hard):
        pass
    }
}

function move(user){
    const type = user.type
    let choice = null
    switch(type){
        case('human'):
            choice = Number(prompt(`User${user.ID} Choose your move: `))
            break;

        case('computer'):
            choice = computerMove(user.level, remainingMoves);
            break;
    }
   
    if (gameGrid[choice] == 0){
        gameGrid[choice] = user.ID
    }else if(choice > 10 | choice < 1){console.log('Invalid input'); move(user)}
    else {console.log('Position already used'); move(user)}
    
}

function verify(user){
    let g = (i) => gameGrid[i]
    let combinations = {
        row1 : [[1,2,3], [g(1),g(2),g(3)]],
        row2 : [[4,5,6], [g(4),g(5),g(6)]],
        row3 : [[7,8,9],[g(7),g(8),g(9)]],

        col1 : [[1,4,7],[g(1),g(4),g(7)]],
        col2 : [[2,5,8],[g(2),g(5),g(8)]],
        col3 : [[3,6,9],[g(3),g(6),g(9)]],


        dig1 : [[1,5,9],[g(1),g(5),g(9)]],
        dig2 : [[3,5,7],[g(3),g(5),g(7)]]}
        // col1: [pos(0, 0), pos(1, 0), pos(2, 0)],
        // col2: [pos(0, 1), pos(1, 1), pos(2, 1)],
        // col3: [pos(0, 2), pos(1, 2), pos(2, 2)],
        // row1: [pos(0, 0), pos(0, 1), pos(0, 2)],
        // row2: [pos(1, 0), pos(1, 1), pos(1, 2)],
        // row3: [pos(2, 0), pos(2, 1), pos(2, 2)],
        // dig1: [pos(0, 0), pos(1, 1), pos(2, 2)],
        // dig2: [pos(0, 2), pos(1, 1), pos(2, 0)],

    let winComb = [user.ID, user.ID, user.ID]
    let combvalues = Object.values(combinations).map(elem => elem[1])



    for(comb in combinations){
        if (combinations[comb][1].toString() == winComb.toString()){
            graphics()
            console.log(`User ${user.ID} WON!!`)
            console.log('\n\nNEW GAME\n\n')
            remainingMoves = restMoves
            game()
        }
    }return false   
}


function graphics(){
    const symbols = {
        0: ' ',
        1: 'O',
        2: 'X'}
    
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
    
    let user =  (number, typ, dif = null) => {return {ID: number, type: typ, level: dif}}
    let remainingMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
    const nPlayers = prompt('Number of players (0, 1 or 2):' )
    switch(nPlayers){
        case("2"):
            user1 = user(1, 'human')
            user2 = user(2, 'human');
            break;

        case("1"):
            user1 = user(1, 'human')
            user2 = user(2, 'computer')
            user2.level = difficulty(user2);
            break;

        case('0'):
            user1 = user(1, 'computer')
            user2 = user(2, 'computer')
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
    const firstPlayer = () =>{move(user1); verify(user1); graphics()}
    const secondPlayer = () => {move(user2); verify(user2); graphics()}


    while (remainingMoves){
        if(randomStart == 1){
            console.log('USER 1 plays first')
            firstPlayer()
            secondPlayer()}
        else{
            console.log('USER 2 plays first')
            secondPlayer()
            firstPlayer()}
        }
        
    console.log("It's a TIE\nStarting new game")
    remainingMoves = restMoves
    game()
}

game()
