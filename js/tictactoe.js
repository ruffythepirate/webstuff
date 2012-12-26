/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    
    var TicTacToe = function(divElement, width, height) {
        
        divElement.empty();
        
        var currentPlayer = 1;
        var gameIsRunning = true;
        var ticTacToeClass = "TicTacToe";
        var playerOneClass = "Player1";
        var playerTwoClass = "Player2";
        
        var playField = [];
        
        var table = $(document.createElement("table")).addClass(ticTacToeClass);
        for(i = 0; i < height; i++){
            var currentRow = [];
            playField.push(currentRow)
            var tableRow = $(document.createElement("tr"));
            table.append(tableRow);
            for(j = 0; j < width; j++) {
                var tableCell = $(document.createElement("td")); 
                var playPosition = new PlayPosition(tableCell, j, i);
                tableCell.data("brick", playPosition);
                tableRow.append(tableCell);
                currentRow.push(playPosition);
            }
        }        
        divElement.append(table);
                 
        $(".TicTacToe td").click(function() {
            
            if(gameIsRunning) {
                var currentClass = (currentPlayer == 1 ? playerOneClass : playerTwoClass);
                var thisObject = $(this);
                var playPosition = thisObject.data("brick");
                if(playPosition.player == 0)
                {
                    thisObject.removeClass();
                    thisObject.addClass(currentClass);
                    playPosition.player = currentPlayer;
                
                    var hasWon = checkWin(playPosition);
                    if(hasWon)
                    {
                        divElement.append("<h1>Player "+currentPlayer+" has won!</h1>");
                        gameIsRunning = false;
                    }
                    else{
                        currentPlayer = 3 - currentPlayer;
                    }
                }
            }
        });   
        
    var checkWin = function(placedElement) {
        var hasWon = false;
        hasWon = hasWon || checkWinDirection(placedElement.player,
            placedElement.x - 4, placedElement.y, 1, 0);
        hasWon = hasWon || checkWinDirection(placedElement.player,
            placedElement.x - 4, placedElement.y - 4, 1, 1);
        hasWon = hasWon || checkWinDirection(placedElement.player,
            placedElement.x, placedElement.y - 4, 0, 1);
        hasWon = hasWon || checkWinDirection(placedElement.player,
            placedElement.x + 4, placedElement.y - 4, -1, 1);
        return hasWon;
    }
        
    var checkWinDirection = function(player, startX, startY, dx, dy){
        var blocksInRow = 0;
        for(i = 0;i < 10; i++){
            var currentX = startX + i*dx;
            var currentY = startY + i*dy;
            if(currentX >= 0 
                && currentY >= 0 
                && currentY < playField.length
                && currentX < playField[currentY].length
                && playField[currentY][currentX].player == player)
                {
                blocksInRow++;
                if(blocksInRow >= 5) {
                    break;
                }
            }
            else {
                blocksInRow = 0;
            }
        }
        if(blocksInRow >= 5)
        {
            return true;
        }
        return false;
    }
}
   
    
    
function PlayPosition(element, x, y) {
    this.x = x;
    this.y = y;
    this.element = element;
    this.player = 0;
}
    
    
$.TicTacToe = TicTacToe;
})(jQuery);
