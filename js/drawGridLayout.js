var tilePositions = [];

function drawGrid(size) {
	var wrapper;
	var inner; 
	
	var gameSize 		 = size ? size : gameSizeDefault;
	var precision 		 = 0.5;
	var containerSizePx  = 621;
	var marginSizeFactor = 0.15; //marginSize % respect to cell size
	var fontSizeFactor	 = 0.5; //fontSize % respect to cell size
	
	var rowHeight		 = 0;
	var rowSpacing		 = 0;
	var cellSize		 = 0;
	var fontSize		 = 0;
	var marginCellSize	 = 0;
	var gridPadding		 = 0;
	
	var remainder 		 = 1; //init default > 0 to enable 1st process
	
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

	var styleGridRow  = "height: "+rowHeight+"px;";
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
			tileXpx = gridPadding + marginCellSize + rowHeight*ii;
			tileYpx = gridPadding + marginCellSize + rowHeight*kk;
			styleTile = "width: "+cellSize+"px; height: "+cellSize+"px; line-height: "+rowHeight+"px; "+
						"font-size: "+Math.round(fontSize)+"px; "+
						"position: absolute; left: "+ tileXpx +"px; top: "+ tileYpx +"px; ";
			tilePositions[ii][kk] = styleTile;
		}
		document.querySelector(".grid-container").appendChild(wrapper);
	}
};

function clearGrid() {
	var container = document.querySelector(".grid-container");
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};