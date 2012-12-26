/* 
 * This creates a simple crystals generating program.
 */


function CrystalGame(divElement, width, height) {
        
    this.dropRadius = 0;
    this.outMostDrop = 0;
   
    this.width = width;
    this.height = height;
    this.playField = [];
        
    divElement.empty();
        
    var gameIsRunning = true;
        
        
    var table = $(document.createElement("table")).addClass('crystalTable');
    for(i = 0; i < height; i++){
        var currentRow = [];
        this.playField.push(currentRow)
        var tableRow = $(document.createElement("tr"));
        table.append(tableRow);
        for(j = 0; j < width; j++) {
            var tableCell = $(document.createElement("td")).addClass('brickEmpty'); 
            var playPosition = new Brick(tableCell, j, i);
            tableRow.append(tableCell);
            currentRow.push(playPosition);
        }
    }        
    divElement.append(table);
}
    
CrystalGame.prototype.generatStartPoint = function()
{
    var angle = 2*Math.PI*Math.random();
        
    var x = this.width / 2 + Math.cos(angle) * this.dropRadius;
    var y = this.height / 2 + Math.sin(angle) * this.dropRadius;
    return new Point(Math.floor(x), Math.floor(y));
}
    
CrystalGame.prototype.pointIsOutOfBounds = function(point)
{
    return !(point.x > 0 && point.y > 0 
        && point.x <= this.width && point.y <= this.height);
}
        
CrystalGame.prototype.getNewPoint = function(point) {
    var x = point.x;
    var y = point.y;
    var randomNumber = Math.random();
    if(randomNumber < 0.25){
        x -= 1;
    } else if(randomNumber < 0.5) {
        y -= 1;
    } else if(randomNumber < 0.75) {
        x += 1;
    } else {
        y += 1;
    }
    return new Point(x, y);  
}    
    
CrystalGame.prototype.start = function(interval) {
    this.outMostDrop = 0;
    this.dropRadius = 4;
    
    //We place the initial crystal in the middle.
    this.placeCrystal(Math.floor(this.width/2), Math.floor(this.height/2));
    var latestCoordinate = new Point(Math.floor(this.width/2), Math.floor(this.height/2));
    while(latestCoordinate.x > 0 && latestCoordinate.x < this.width-1
         && latestCoordinate.y > 0 && latestCoordinate.y < this.height - 1)
    {
        latestCoordinate = this.executeOneCrystal();
        var newestRadius = this.getRadiusDistance(latestCoordinate);
        if(newestRadius > this.outMostDrop){
            this.outMostDrop = newestRadius;
            this.dropRadius = this.outMostDrop +5;
            if(this.dropRadius > this.width / 2){
                this.dropRadius = this.width / 2;
            }
        }
    }
        
        
}

CrystalGame.prototype.getRadiusDistance = function(point)
{
    x = point.x - this.width/2;
    y = point.y - this.height/2;
    var number = Math.sqrt(x * x + y * y);
    return number;
}
    
CrystalGame.prototype.executeOneCrystal = function(){
    var currentCoordinate = this.generatStartPoint();
    while(!this.shouldCrystalize(currentCoordinate.x, currentCoordinate.y) )
    {
        currentCoordinate = this.getNewPoint(currentCoordinate);
        if(this.pointIsOutOfBounds(currentCoordinate)){
            currentCoordinate = this.generatStartPoint();
        }
    }
    //We have found a point where it should crystalize, add a crystal to the coordinate.
    this.placeCrystal(currentCoordinate.x, currentCoordinate.y);
    return currentCoordinate;
}

CrystalGame.prototype.shouldCrystalize = function(x, y) {
    var shouldCrystalize = this.isCrystal(x-1, y);        
    shouldCrystalize = shouldCrystalize || this.isCrystal(x, y - 1 );
    shouldCrystalize = shouldCrystalize || this.isCrystal(x + 1, y);
    shouldCrystalize = shouldCrystalize || this.isCrystal(x, y + 1);
    return shouldCrystalize;

}
    
    
    
CrystalGame.prototype.isCrystal = function(x, y){
    if(x >= 0 && x < this.width
        && y >= 0 && y < this.height)
        {
        return this.playField[x][y].currentStatus == 1;
    }
}
    
CrystalGame.prototype.placeCrystal = function(x, y) {
    this.playField[x][y].currentStatus = 1;
    this.playField[x][y].element.removeClass().addClass('brickCrystal')
        
}
        
        
function Point(x, y){
    this.x = x;
    this.y = y;
}    
      
    
function Brick(element, x, y) {
    this.x = x;
    this.y = y;
    this.element = element;
    this.currentStatus = 0;
}
