//<div class="grid-row">
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//<div class="grid-cell"></div>
//</div>
var tilePositions = [];

function drawGrid() {
//  var wrapper   = document.createElement("div");
//  var inner     = document.createElement("div");
	var wrapper;
	var inner; 
	
	var precision = 0.5;
	var containerSizePx = 621;
	var marginSizeFactor = 0.15; //marginSize % respect to cell size
	var fontSizeFactor = 0.5; //fontSize % respect to cell size
	
	var rowHeight;
	var rowSpacing;
	var cellSize;
	var fontSize;
	var marginCellSize;
	var gridPadding;
	
	var remainder = 1;
	
	while (remainder > 0) {
		if (!rowHeight) {
			rowHeight = Math.round((containerSizePx - 4) / (gameSize + marginSizeFactor) / precision) * precision; //rounding to PRECISION
		}
		else {
			rowHeight -= Math.max(precision, Math.round((remainder / gameSize) / precision) * precision);
		}
		rowSpacing = Math.round(rowHeight * marginSizeFactor / precision) * precision; //calculating marginSize rounding to PRECISION
		cellSize = rowHeight - rowSpacing; //adding the margin
		fontSize = cellSize * fontSizeFactor; //calculating fontSize
		marginCellSize = rowSpacing / 2;
		gridPadding = marginCellSize + 2;
		remainder = (rowHeight*gameSize + gridPadding*2) - containerSizePx;
	}

//	var styleGridRow  = "height: "+cellSize+"px; margin-bottom: "+marginSize+"px; padding: "+gridPadding+"px;";
//	var styleGridRow  = "height: "+cellSize+"px; padding: "+gridPadding+"px;";
	var styleGridRow  = "height: "+rowHeight+"px;";
//	var styleGridCell = "width: "+cellSize+"px; height: "+cellSize+"px; margin-right: "+marginSize+
//						"px; float: left; border-radius: 3px; background: rgba(238, 228, 218, 0.35);";
	var styleGridCell = "width: "+cellSize+"px; height: "+cellSize+"px; margin: "+marginCellSize+
						"px; float: left; border-radius: 3px; background: rgba(238, 228, 218, 0.35);";
	var styleTile;
	var tileXpx;
	var tileYpx;

	document.querySelector(".grid-container").setAttribute("style", "padding:"+gridPadding+"px;");
	for (var ii=0; ii < gameSize; ii++){
		tilePositions[ii] = [];
		wrapper = document.createElement("div");
	  	wrapper.setAttribute("style", styleGridRow);
	  	
		for (var kk=0; kk < gameSize; kk++){
			inner = document.createElement("div");
			inner.setAttribute("style", styleGridCell);
			wrapper.appendChild(inner);
//			if (ii==1 && kk==0) alert("position: absolute; left: "+ rowHeight*ii +"px; \ntop: "+ rowHeight*kk +"px; ");
			tileXpx = gridPadding + marginCellSize + rowHeight*ii;
			tileYpx = gridPadding + marginCellSize + rowHeight*kk;
			styleTile = "width: "+cellSize+"px; height: "+cellSize+"px; line-height: "+rowHeight+"px; "+
						"font-size: "+Math.round(fontSize)+"px; "+
						"position: absolute; left: "+ tileXpx +"px; top: "+ tileYpx +"px; ";
			tilePositions[ii][kk] = styleTile;
		}
		document.querySelector(".grid-container").appendChild(wrapper);
	}

	// Put the tile on the board
};

function clearGrid() {
	var container = document.querySelector(".grid-container");
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};