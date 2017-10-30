function check()
{
	const currentPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${this.turn}']`))
	const opposantPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${-this.turn}']`))
	const currentPlayerKing = this.body.querySelector(`#king[data-player='${this.turn}']`)
	const opposantPlayerKing = this.body.querySelector(`#king[data-player='${-this.turn}']`)

	opposantPlayerPieces.map(x => x.classList.remove('freeze'))

	if(this.rowColInCheck != undefined)
	{
		this.tabJS[this.rowColInCheck[0]][this.rowColInCheck[1]].classList.remove('check')
		this.rowColInCheck = undefined
		this.threatToKing = null
	}
	else
	{
		for(let i = 0; i < opposantPlayerPieces.length; i++)
		{
			this.highlight(opposantPlayerPieces[i], -this.turn)
			if(Array.from(currentPlayerKing.classList).includes('highlight'))
			{
				currentPlayerKing.classList.add('check')
				this.rowColInCheck = [currentPlayerKing.dataset.row, currentPlayerKing.dataset.column]
				this.clean()
				this.threatToKing = this.calcThreatToKing(currentPlayerPieces, opposantPlayerPieces[i], currentPlayerKing)
				this.saveTheKing(currentPlayerPieces, opposantPlayerPieces[i], currentPlayerKing)
				this.checkMate(currentPlayerPieces)
			}
		}
	}
}