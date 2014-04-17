function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.maxTileContainer = document.querySelector(".max-tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.sharingContainer = document.querySelector(".score-sharing");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);
    
    if (!hideMode) {
	    if (displayMode) {
		    grid.cells.forEach(function (column) {
		      column.forEach(function (cell) {
		        if (cell) {
		          self.addTile(cell);
		        }
		      });
		    });
	    }
	    else {
	    	metadata.tiles.forEach(function (tile) {
	    		self.addTile(tile.tile);
	    		self.addTile(tile.quantity, true);
	    	});
		}
    }
    

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);
    self.updateMaxTile(metadata.maxTile);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
}
;

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "restart");
  }

  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile, isStats) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
//  var positionClass = this.positionClass(position);
  var positionClass = tilePositions[position.x][position.y];

  // We can't use classlist because it somehow glitches when replacing classes
//  var classes = ["tile", "tile-" + tile.value, positionClass];
  var classes;
  if (!isStats) {
//	  classes = ["tile", "tile-" + tile.value, positionClass];
	  classes = ["tile", "tile-" + tile.value];
  }
  else {
	  classes = ["tile", "tile-stats", positionClass];	  
  }
	  
//  if (tile.value > 2048) classes.push("tile-super");
  if (tile.value > 1073741824) classes.push("tile-" + 1073741824);

  this.applyClasses(wrapper, classes);
  wrapper.setAttribute("style", positionClass); //update position

  inner.classList.add("tile-inner");
  if (!isStats) {
	  inner.textContent = tile.value;
  }
  else {
	  inner.textContent = "x"+tile.value; 
  }

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
//      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
//      self.applyClasses(wrapper, classes); // Update the position
	  wrapper.setAttribute("style", tilePositions[tile.x][tile.y]); //update position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.updateMaxTile = function (maxTile) {
  this.maxTileContainer.textContent = maxTile;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  if (typeof ga !== "undefined") {
    ga("send", "event", "game", "end", type, this.score);
  }

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;

  this.clearContainer(this.sharingContainer);
  this.sharingContainer.appendChild(this.scoreTweetButton());
  twttr.widgets.load();
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

HTMLActuator.prototype.scoreTweetButton = function () {
  var tweet = document.createElement("a");
  tweet.classList.add("twitter-share-button");
  tweet.setAttribute("href", "https://twitter.com/share");
  tweet.setAttribute("data-via", "gabrielecirulli");
  tweet.setAttribute("data-url", "http://git.io/2048");
  tweet.setAttribute("data-counturl", "http://gabrielecirulli.github.io/2048/");
  tweet.textContent = "Tweet";

  var text = "I scored " + this.score + " points at 2048, a game where you " +
             "join numbers to score high! #2048game";
  tweet.setAttribute("data-text", text);

  return tweet;
};