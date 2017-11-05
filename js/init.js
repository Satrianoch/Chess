function init(row, col, bot)
{	
	this.row = row
	this.col = col
	this.body = document.body
	this.tabHTML = document.createElement('table')
	this.tabJS = []
	this.selection
	this.turn = 1
	this.pieces = ['pawn','rook','knight','bishop','king','queen','bishop','knight','rook']
	this.rowColInCheck = null
	this.threatToKing = null
	this.threatToKingCommon = null
	this.limitedPiece = null
	this.botBool = bot
	this.delay = 600
	this.sheet = document.createElement('style')
	this.count = 1
	this.scholar = 0

	for(let i = this.row-1; i >= 0; i--)
	{
		const tr = document.createElement('tr')
		this.tabJS[i] = []
		for(let j = 0; j < this.col; j++)
		{
			const td = document.createElement('td')
			td.dataset.row = i
			td.dataset.column = j

			this.paving(td, i, j)
			this.initialPos(td, i, j)
			td.addEventListener('click', clickOnTd)

			this.tabJS[i][j] = td
			tr.appendChild(td)
		}
		this.tabHTML.appendChild(tr)
	}
	this.body.appendChild(this.tabHTML)
	this.body.appendChild(this.sheet)
}