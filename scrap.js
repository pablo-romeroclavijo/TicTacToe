
let gameGrid = {1:0 ,2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
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

    console.log(combinations)
    for(comb in combinations){console.log(combinations[comb][1])}