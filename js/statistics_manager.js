function StatisticsManager(previousState) {
	if (previousState) {
		var previosStats = this.fromState(previousState); 
		this.maxTile = previosStats.maxTile;
		this.tiles = previosStats.tiles;
	}
	else {
		this.maxTile = 0;
		this.tiles = [];
	}
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
};
	
StatisticsManager.prototype.removeTile = function (tile) {
	var ii = Math.log(tile.value) / Math.LN2 - 1; 
	this.tiles[ii].quantity.value -= 2;	
};
	
StatisticsManager.prototype.mergeTiles = function (tile) {
	this.removeTile(tile);	
	var newTile = new Tile({x:tile.x, y:tile.y}, tile.value*2);
	this.addTile(newTile);	
};

StatisticsManager.prototype.serialize = function () {
	var tiles = [];
	
	for(var ii = 0; ii < this.tiles.length; ii++) {
		tiles.push(this.tiles[ii].serialize());
	}
	
	return {
  		tiles:       tiles,
  		maxTile:     this.maxTile
  	};
};

StatisticsManager.prototype.fromState = function (state) {
	var tiles = [];
	for(var ii = 0; ii < state.tiles.length; ii++) {
//		alert("position = "+state.tiles[ii].position.toString());
		tiles[ii] = new Stats(state.tiles[ii].position, state.tiles[ii].value, state.tiles[ii].quantity);
	}
	
	return {
		tiles:		tiles,
		maxTile: 	state.maxTile
	};
};



function Stats(position, value, quantity) {
	var newPosition = position;
	this.tile = new Tile(position, value);
	newPosition.x +=1;
	this.quantity = new Tile(newPosition, quantity ? quantity : 1, true);
}

Stats.prototype.serialize = function () {
	return {
		position:    { x: this.tile.x, y: this.tile.y } ,
  		value:       this.tile.value,
  		quantity:    this.quantity.value
  	};	
};


Object.prototype.toString = function () {
	var text="";
	for(var propt in this){
		text += propt+": "+this[propt]+"\n";
		for(var propt2 in this[propt]){
			text += propt+"-"+propt2 + ': ' + this[propt][propt2]+"\n";
		}
	}
	return text;
};




//function StatisticsManager(previousState) {
//	if (previousState) {
//		this.maxTile = this.fromState(previousState).maxTile;
//		this.tiles = this.fromState(previousState).tiles;
////		this.tilesArray = this.fromState(previousState).tilesArray;
//	}
//	else {
//		this.maxTile = 0;
//		this.tiles = [];
////		this.tilesArray = [];
//	}
//}
//	
//StatisticsManager.prototype.addTile = function (tile) {
//	var ii = Math.log(tile.value) / Math.LN2 - 1; 
//
//	for (var kk = 0; kk < this.tiles.length; kk++) {
//		alert("stats addTile ii="+ii+"  kk="+kk);
//		this.tiles[kk].tile.savePosition();
//		this.tiles[kk].quantity.savePosition();
//	}
//	
//	if (this.tiles[ii]==null) {
//		if (this.tiles.length > 0) {
//			for(var ii = 0; ii < this.tiles.length; ii++) {
//				if (this.tiles[ii].tile.y < 7) {
//					this.tiles[ii].tile.y += 1;
//					this.tiles[ii].quantity.y += 1;
//				}
//				else {
//					this.tiles[ii].tile.x += 2;
//					this.tiles[ii].tile.y = 0;
//					this.tiles[ii].quantity.x += 2;
//					this.tiles[ii].quantity.y = 0;
//				}
//			}
//		}		
//		this.tiles[ii] = new Stats({x:0,y:0}, tile.value);	
//	}
//	else {
//		this.tiles[ii].quantity.value += 1;
//	}
//		
//	if (tile.value > this.maxTile) {
//		this.maxTile = tile.value;
//	}
////	alert("X="+this.tiles[ii].tile.x+"  Y="+this.tiles[ii].tile.y+"\nX="+this.tiles[ii].quantity.x+"  Y="+this.tiles[ii].quantity.y);
//};
//	
//StatisticsManager.prototype.removeTile = function (tile) {
////	var ii = Math.log(tile.value) / Math.LN2 - 1; 
////	this.tiles[ii] -= 2;	
//	var ii = Math.log(tile.value) / Math.LN2 - 1; 
//	this.tiles[ii].quantity.value -= 2;	
//};
//	
//StatisticsManager.prototype.mergeTiles = function (tile) {
//	this.removeTile(tile);	
//	var newTile = new Tile({x:tile.x, y:tile.y}, tile.value*2);
//	this.addTile(newTile);	
//};
//
//StatisticsManager.prototype.serialize = function () {
//	alert("stats serialize tilesLength="+this.tiles.length);
//	return {
//  		tiles:       this.tiles,
////  		tilesArray:  this.tilesArray,
//    	maxTile:     this.maxTile
//  	};
//};
//
//StatisticsManager.prototype.fromState = function (state) {
//	alert("stats restore tilesLength="+state.tiles.length);
//	return {
//		tiles:		state.tiles,
////		tilesArray:	state.tilesArray,
//		maxTile: 	state.maxTile
//	};
//};
//
//
//
//function Stats(position, value) {
//	var newPosition = position;
//	this.tile = new Tile(position, value);
//	newPosition.x +=1;
//	this.quantity = new Tile(newPosition, 1, true);
//}
