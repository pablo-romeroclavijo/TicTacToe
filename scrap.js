let remainingMoves = [1,2,3,4,5,6,7,8,9]

let results = []
for(i=0; i<100; i++){

    const randomChoice = Math.floor(Math.random()*remainingMoves.length);
    results.push(randomChoice)
    }

console.log(results)