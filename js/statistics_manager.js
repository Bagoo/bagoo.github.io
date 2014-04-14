function StatisticsManager(previousState) {
	if (previousState) {
		this.maxTile = this.fromState(previousState).maxTile;
		this.tiles = this.fromState(previousState).tiles;
//		this.tilesArray = this.fromState(previousState).tilesArray;
	}
	else {
		this.maxTile = 0;
		this.tiles = [];
//		this.tilesArray = [];
	}
}

function Stats(position, value){
	var newPosition = position;
	this.tile = new Tile(position, value);
	newPosition.x +=1;
	this.quantity = new Tile(newPosition, 1, true);
}
	
StatisticsManager.prototype.addTile = function (tile) {
	var ii = Math.log(tile.value) / Math.LN2 - 1; 

	for (var kk = 0; kk < this.tiles.length; kk++) {
		this.tiles[kk].tile.savePosition();
		this.tiles[kk].quantity.savePosition();
	}
	
	if (this.tiles[ii]==null) {
		if (this.tiles.length > 0) {
			for(var ii = 0; ii < this.tiles.length; ii++) {
				if (this.tiles[ii].tile.y < 7) {
					this.tiles[ii].tile.y += 1;
					this.tiles[ii].quantity.y += 1;
				}
				else {
					this.tiles[ii].tile.x += 2;
					this.tiles[ii].tile.y = 0;
					this.tiles[ii].quantity.x += 2;
					this.tiles[ii].quantity.y = 0;
				}
			}
		}		
		this.tiles[ii] = new Stats({x:0,y:0}, tile.value);	
	}
	else {
		this.tiles[ii].quantity.value += 1;
	}
		
	if (tile.value > this.maxTile) {
		this.maxTile = tile.value;
	}
//	alert("X="+this.tiles[ii].tile.x+"  Y="+this.tiles[ii].tile.y+"\nX="+this.tiles[ii].quantity.x+"  Y="+this.tiles[ii].quantity.y);
};
	
StatisticsManager.prototype.removeTile = function (tile) {
//	var ii = Math.log(tile.value) / Math.LN2 - 1; 
//	this.tiles[ii] -= 2;	
	var ii = Math.log(tile.value) / Math.LN2 - 1; 
	this.tiles[ii].quantity.value -= 2;	
};
	
StatisticsManager.prototype.mergeTiles = function (tile) {
	this.removeTile(tile);	
	var newTile = new Tile({x:tile.x, y:tile.y}, tile.value*2);
	this.addTile(newTile);	
};

StatisticsManager.prototype.serialize = function () {
	return {
  		tiles:       this.tiles,
//  		tilesArray:  this.tilesArray,
    	maxTile:     this.maxTile
  	};
};

StatisticsManager.prototype.fromState = function (state) {
	return {
		tiles:		state.tiles,
//		tilesArray:	state.tilesArray,
		maxTile: 	state.maxTile
	};
};

//Object.prototype.size = function() {
//	var size = 0;
//	for (var key in this) {
//		if (this.hasOwnProperty(key)) {
//			size++;
//		}
//	}
//	return size; 
//};
//	