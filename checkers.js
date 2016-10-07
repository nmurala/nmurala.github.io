var w; //The Game grid window.

var user;

var grid = [
	/* Initial red checker positions */
	{x:1, y:0, occupied:"checker-red", king:false},
	{x:3, y:0, occupied:"checker-red", king:false},
	{x:5, y:0, occupied:"checker-red", king:false},
	{x:7, y:0, occupied:"checker-red", king:false},
	{x:0, y:1, occupied:"checker-red", king:false},
	{x:2, y:1, occupied:"checker-red", king:false},
	{x:4, y:1, occupied:"checker-red", king:false},
	{x:6, y:1, occupied:"checker-red", king:false},
	{x:1, y:2, occupied:"checker-red", king:false},
	{x:3, y:2, occupied:"checker-red", king:false},
	{x:5, y:2, occupied:"checker-red", king:false},
	{x:7, y:2, occupied:"checker-red", king:false},

	/* Initial empty positions */
	{x:0, y:3, occupied:"", king:false},
	{x:2, y:3, occupied:"", king:false},
	{x:4, y:3, occupied:"", king:false},
	{x:6, y:3, occupied:"", king:false},
	{x:1, y:4, occupied:"", king:false},
	{x:3, y:4, occupied:"", king:false},
	{x:5, y:4, occupied:"", king:false},
	{x:7, y:4, occupied:"", king:false},

	/* Initial green checker positions */
	{x:0, y:5, occupied:"checker-green", king:false},
	{x:2, y:5, occupied:"checker-green", king:false},
	{x:4, y:5, occupied:"checker-green", king:false},
	{x:6, y:5, occupied:"checker-green", king:false},
	{x:1, y:6, occupied:"checker-green", king:false},
	{x:3, y:6, occupied:"checker-green", king:false},
	{x:5, y:6, occupied:"checker-green", king:false},
	{x:7, y:6, occupied:"checker-green", king:false},
	{x:0, y:7, occupied:"checker-green", king:false},
	{x:2, y:7, occupied:"checker-green", king:false},
	{x:4, y:7, occupied:"checker-green", king:false},
	{x:6, y:7, occupied:"checker-green", king:false}
];

var selected = {occupied:"", x:0, y:0, king:false};
var turn = 'red';
var red;
var green;

function initGrid()
{
	makeGrid();
	selection();
	//checkerslbl = document.getElementById('checkerslbl');
	//checkerslbl.style.position = "relative";
}

function makeGrid()
{
	var board = document.getElementById('gridgame');
	var html = "<table class='grid'>";

	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == 0 || grid[i].x == 1)
		{
			html += "<tr>";
		}
		if (grid[i].x%2 == 1)
		{
			html += "<td class='lightcell'></td>";
		}

		html += "<td class='darkcell'><div id=" + grid[i].occupied + "></div></td>";

		if (grid[i].x%2 == 0 && grid[i].x != 7)
		{
			html += "<td class='lightcell'></td>";
		}
		if (grid[i].x == 6)
		{
			html += "</tr>";
		}
		if (grid[i].x == 7)
		{
			html += "</tr>";
		}
	}

	html += "</table>";
	board.innerHTML = html;
}
function gameCompleted()
{
	var red_exists = false;
	var green_exists = false;
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].occupied == 'checker-red' || grid[i].occupied == 'king-red')
		{
			red_exists = true;
		}
		else if (grid[i].occupied == 'checker-green' || grid[i].occupied == 'king-green')
		{
			green_exists = true;
		}
	}

	if (!red_exists)
	{
		alert('Player Green Wins!');
		location.reload(true);
	}
	else if (!green_exists)
	{
		alert('Plsyer Red Wins!');
		location.reload(true);
	}

	return false;
}

function moveCoin()
{
	cell = this;
	x = cell.cellIndex;
	y = cell.parentNode.rowIndex;
	gridCoin = getgridCoin(x, y);
	var location = document.getElementById('location');
	//location.innerHTML = 'x: ' + x + ', y: ' + y;

	if (selected.occupied == "" && gridCoin && gridCoin.occupied.indexOf(turn) != -1)
	{
		selected.occupied = gridCoin.occupied;
		selected.king = gridCoin.king;
		selected.x = x;
		selected.y = y;
		gridCoin.occupied = "";

		cell.innerHTML = "<div id=''></div>";
		cell.onclick = moveCoin;
	}
	else if (selected.occupied.indexOf('red') != -1)
	{
		if (y == 7)
		{
			selected.king = true;
			selected.occupied = 'king-red';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridCoin.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = moveCoin;
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'green';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y+2) && (getgridCoin(x, y).occupied == ""))
		{
			jumped = getgridCoin(x+1, y-1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'green';
				gameCompleted();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridCoin.occupied == ""))
		{
			jumped = getgridCoin(x-1, y-1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'green';
				gameCompleted();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;

			cell.innerHTML = "<div id=" + gridCoin.occupied + "></div>";
			cell.onclick = moveCoin;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridCoin.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = moveCoin;
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'green';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y-2) && (getgridCoin(x, y).occupied == "") && selected.king)
		{
			jumped = getgridCoin(x+1, y+1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'green';
				gameCompleted();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridCoin.occupied == "") && selected.king)
		{
			jumped = getgridCoin(x-1, y+1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'green';
				gameCompleted();
			}
		}
	}
	else if (selected.occupied.indexOf('green') != -1)
	{
		if (y == 0)
		{
			selected.king = true;
			selected.occupied = 'king-green';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridCoin.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = moveCoin;
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'red';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y-2) && (getgridCoin(x, y).occupied == ""))
		{
			jumped = getgridCoin(x+1, y+1);
			if (jumped.occupied.indexOf('green') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameCompleted();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridCoin.occupied == ""))
		{
			jumped = getgridCoin(x-1, y+1);
			if (jumped.occupied.indexOf('green') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameCompleted();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;

			cell.innerHTML = "<div id=" + gridCoin.occupied + "></div>";
			cell.onclick = moveCoin;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridCoin.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = moveCoin;
			gridCoin.occupied = selected.occupied;
			gridCoin.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'red';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y+2) && (getgridCoin(x, y).occupied == "") && selected.king)
		{
			jumped = getgridCoin(x+1, y-1);
			if (jumped.occupied.indexOf('green') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameCompleted();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridCoin.occupied == "") && selected.king)
		{
			jumped = getgridCoin(x-1, y-1);
			if (jumped.occupied.indexOf('green') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = moveCoin;
				gridCoin.occupied = selected.occupied;
				gridCoin.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = moveCoin;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameCompleted();
			}
		}
	}
}
function selection()
{
	var gridDiv = document.getElementById('gridgame');
	var tds = gridDiv.getElementsByTagName('td');

	for (var i = 0; i < tds.length; i++)
	{
		tds[i].onclick = moveCoin;
	}
}
function getgridCoin(x, y)
{
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == x && grid[i].y == y)
		{
			return grid[i];
		}
	}
}


function getGridCell(x, y)
{
	var board = document.getElementById('gridgame');
	var gridTable = board.getElementsByTagName('table');
	return gridTable[0].rows[y].cells[x];
}
