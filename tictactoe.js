prompt = requie("prompt-sync")

const masterGrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let gameGrid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
const iPos = {'A': 0,'B': 1,'C': 2,}
const jPos = {'1':0, '2': 1, '3': 2}

function difficulty (user){
    difficulties = ['easy', 'medium', 'hard']
    level = prompt(`Choose game difficulty for COMPUTER${user.ID} (easy/medium/hard): `)
    while (!(difficulty in difficulties)){
        level = prompt(`INVALID INPUT\nChoose game difficulty for COMPUTER${user.ID} (easy/medium/hard): `)
    }
    return level
}

function computerMove(level){
    switch(level){
        case('easy'):
        pass;

        case(medium):
        pass;

        case(hard):
        pass
    }
}

function move(user){
    const type = user.type
    switch(type){
        case('human'):
            choice = prompt(`User${ID}: Choose your move: `).split('')
            i, j = choice[0].toUpperCase(), Number(choice[1]);

        case('computer'):
            choice = computerMove(user.level)
            i, j = choice[0], choice[1];
    }

    if (gameGrid[i][j] == 0){
        gameGrid[i][j] = user.ID
    }else {console.log('Position already used'); move(user)}
    
}

function verify(user){
    let pos = (i, j) => gameGrid[i][j]
    let combinations = {
        col1: [pos(0, 0), pos(1, 0), pos(2, 0)],
        col2: [pos(0, 1), pos(1, 1), pos(2, 1)],
        col3: [pos(0, 2), pos(1, 2), pos(2, 2)],
        row1: [pos(0, 0), pos(0, 1), pos(0, 2)],
        row2: [pos(1, 0), pos(1, 1), pos(1, 2)],
        row3: [pos(2, 0), pos(2, 1), pos(2, 2)],
        dig1: [pos(0, 0), pos(1, 1), pos(2, 2)],
        dig2: [pos(0, 2), pos(1, 1), pos(2, 0)],
    }
    winComb = [user.ID, user.ID, user.ID]

    for(let comb in combinations){
        if (combinations[comb] == winComb){
            graphics(comb)
            console.log(`User ${user.ID} WON!!`)
            console.log('\n\nNEW GAME\n\n');
            game()
        }else {return false}
    }   
}


function graphics(winComb){
    const symbols = {
        0: ' ',
        1: 'O',
        2: 'X'}

    
    
}

function game(){
    let user =  (number, typ, dif = null) = {ID: number, type: typ , level: dif,}
  
    const nPlayers = prompt('Number of players (0, 1 or 2):' )
    switch(nPlayers){
        case("2"):
            user1 = user(1, 'human')
            user2 = user(2, 'human');

        case("1"):
            user1 = user(1, 'Human')
            user2 = user(2, 'Computer')
            user2.level = difficulty(user2);
        case('0'):
            user1 = user(1, 'Computer')
            user2 = user(2, 'Computer')
            user1.level = difficulty(user1)
            user2.level = difficulty(user2);
        default:
            console.log('Error: Invalid number of players')
            game()
    }

    while (true){
        move(user1)
        verify(user1)

        move(user2)
        verify(user2)


}}
