/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const game = document.querySelector('#game');

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = [
	// [ null, null, null, null, null, null, null ],
	// [ null, null, null, null, null, null, null ],
	// [ null, null, null, null, null, null, null ],
	// [ null, null, null, null, null, null, null ],
	// [ null, null, null, null, null, null, null ],
	// [ null, null, null, null, null, null, null ]
];
// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {
		board[y] = [];
		for (let x = 0; x < WIDTH; x++) {
			board[y][x] = null;
		}
	}
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');
	// TODO: add comment for this code
	let top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// TODO: add comment for this code
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}
const player = document.createElement('p');
game.append(player);
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	// return 0;
	for (y = HEIGHT - 1; y >= 0; y--) {
		let check = document.getElementById(`${y}-${x}`);
		if (check.childElementCount !== 1) {
			return y;
		}
	}
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	const chip = document.createElement('div');
	chip.setAttribute('class', `piece p${currPlayer}`);
	const cell = document.getElementById(`${y}-${x}`);
	// console.log(cell, y + HEIGHT);
	cell.append(chip);
	board[y][x] = currPlayer;
	// TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	setTimeout(function() {
		alert(msg), location.reload();
	}, 50);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
	// get x from ID of clicked cell
	var x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	var y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (checkForFilled()) {
		return endGame('Draw. Game Over');
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
	currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
	player.innerText = `Player ${currPlayer}'s turn`;
	if (currPlayer === 1) {
		player.setAttribute('class', 'blue');
	}
	else player.setAttribute('class', 'red');
}

function checkForFilled() {
	let test = [];
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			if (board[0].every((v) => v !== null)) {
				return true;
			}
		}
	}
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (var y = 0; y < HEIGHT; y++) {
		for (var x = 0; x < WIDTH; x++) {
			var horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			var vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			var diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			var diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
