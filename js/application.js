var gameManager;
var auto_move_flag = false;
var auto_move_wait = 1; //ms
var displayMode = true;
var hideMode = false;
var moves = 0;
var startTime = 0;
const TIME_TEST = 10;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  gameManager = new GameManager(8, KeyboardInputManager, HTMLActuator, LocalStorageManager, StatisticsManager);
});

function startAutoMove(){
	auto_move_flag = true;
	moves=0;
	startTime = performance.now();
	autoMove();
};

function stopAutoMove(){
	auto_move_flag = false;
	hideMode = false;
};

//Move Random automatic tiles on the grid in the specified direction
function autoMove() {	
	if (auto_move_flag !== false) {
		gameManager.move(Math.floor(Math.random()*4));
		setTimeout("autoMove()", auto_move_wait);
		moves++;
	}
//	var timeTotal = ((performance.now() - startTime)/1000);
//	if (auto_move_flag !== false && timeTotal<TIME_TEST) {
//		gameManager.move(Math.floor(Math.random()*4));
//		setTimeout("autoMove()", auto_move_wait);
//		moves++;
//	}
//	else {
//		alert("Moves = "+moves+"\nTime = "+timeTotal+"\nMoves/s = "+(moves/timeTotal));
//	}
};

function switchDisplayMode() {
	displayMode = !displayMode;
	gameManager.actuate();
};

function switchHideMode() {
	hideMode = !hideMode;
	gameManager.actuate();
};