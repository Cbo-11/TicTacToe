//module for game board 
const gameBoard = (() => {
    let board = new Array(9);
    let winner = null;
    const winMessage = document.getElementById("winner-display");
     // factory function to create player, set score and sign
    
    const getValue= (i) =>{
        return board[i]
    }
    
     const Player = (sign, turn) => {
            this.sign = sign
            this.score = 0
            this.turn = turn
            return  {sign, score, turn}
        };
    
    // create players for player 1 and 2
    let player1 = Player('X',true)
    let player2 = Player('O',false)
    
    //clear game board
    //todo complete !
    const clearBoard = () => {
        for (let i = 0; i <  board.length; i++) {
            board[i] = undefined;
            document.getElementById(i).innerHTML = "";
        };
        player1.turn = true;
        player2.turn = false;
        winner = null
        document.getElementById('winner-display').innerHTML ="";
    };

    const newGame = () => {
        clearBoard();
        player1.score = 0;
        player2.score = 0 
        updateScore(player1);
        updateScore(player2);
    }

    //set sign of player on board value
    const turnPlay = ( function () {
        const box = document.querySelectorAll('.box');
        box.forEach(box => {
            box.addEventListener('click', e => {
                console.log(e.target.id)
                if (player1.turn == true &&  winner == null && e.target.innerHTML == ''){
                    board[e.target.id] = player1.sign;
                    box.innerHTML =  player1.sign;
                    //reset turns
                    player1.turn = false;
                    player2.turn = true;
                    //check if player won
                    checkWin(player1);
                } else if (player2.turn == true &&  winner == null && e.target.innerHTML == ''){
                    board[e.target.id] = player2.sign;
                    box.innerHTML =  player2.sign;
                    //reset turns
                    player2.turn = false;
                    player1.turn = true;
                    //check if player won
                    checkWin(player2);
                } else { 
                    return;
                };
            });
         });
         return { box }
     })();

    const updateScore = (player) =>{
     
        if(player.sign == 'X') {
            let p1score= document.getElementById('P1Score')
            p1score.textContent = 'X Score: '+ player.score
        } else {
            let p2score = document.getElementById('P2Score')
            p2score.textContent = 'O Score: '+ player.score
            }
    }
    //check if player value is on any of the winning combinations
    const checkWin = (player) => { 
        var result = false;
        
        if(player.sign== gameBoard.getValue(0)&&player.sign== gameBoard.getValue(1)&&player.sign== gameBoard.getValue(2)){
            result = true;
        } else if (player.sign== gameBoard.getValue(3)&&player.sign== gameBoard.getValue(4)&&player.sign== gameBoard.getValue(5)){
            result = true;
        } else if (player.sign==gameBoard.getValue(6)&&player.sign== gameBoard.getValue(7)&&player.sign== gameBoard.getValue(8)){
            result = true;
        } else if (player.sign==gameBoard.getValue(0)&&player.sign== gameBoard.getValue(4)&&player.sign== gameBoard.getValue(8)){
            result = true;
        } else if (player.sign==gameBoard.getValue(2)&&player.sign==gameBoard.getValue(4)&&player.sign==gameBoard.getValue(6)){
            result = true;
        } else if (player.sign==gameBoard.getValue(0)&&player.sign==gameBoard.getValue(3)&&player.sign==gameBoard.getValue(6)){
            result = true;
        } else if (player.sign==gameBoard.getValue(1)&&player.sign==gameBoard.getValue(4)&&player.sign==gameBoard.getValue(7)){
            result = true;
        } else if (player.sign==gameBoard.getValue(2)&&player.sign==gameBoard.getValue(5)&&player.sign==gameBoard.getValue(8)){
            result = true;
        } 
        else { 
            result = false;
        } ;

        if (result == true){
            winMessage.textContent = player.sign + ' is the winner!';
            player.score += 1;
            winner = player.sign
            updateScore(player)
        return true
            
        } else{ checkDraw(board)}
        return false
    };

        //check if no player has won and board array has no undefined values
    const checkDraw = (board) => {
       
        for (let i = 0; i < 9; i++) {
        const field = getValue(i);
        if (field == undefined) {
            return false;
        }
        }
        winMessage.textContent = 'Its a draw';
    }

    const changeSign = (sign) => {
        if (sign == 'X"') {
            player1[sign] = 'X';
            player2[sign]= 'O';
        } else {
            player1[sign] = 'O';
            player2[sign] = 'X';
        };
    }
    //return functions
    return {
        getValue,
        turnPlay,
        newGame,
        clearBoard,
        checkWin,
        checkDraw,
        changeSign};
}
)();


const frontControl = (() => {
   
    const winnerDisplay = document.querySelector('#winner-display');
    const replayBtn = document.querySelector('#replay');
    const resetBtn = document.querySelector('#new');
    replayBtn.addEventListener('click', gameBoard.clearBoard);
    resetBtn.addEventListener('click',gameBoard.newGame)
})();


