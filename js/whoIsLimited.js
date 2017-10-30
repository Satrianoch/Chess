function whoIsLimited()
{
	const opposantPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${-this.turn}']`))
	const currentPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${this.turn}']`))
	const currentPlayerKing = this.body.querySelector(`#king[data-player='${this.turn}']`)
	for(let i = 0; i < opposantPlayerPieces.length; i++)
	{
		this.highlight(opposantPlayerPieces[i], -this.turn, false, true, true)
		if(Array.from(currentPlayerKing.classList).includes('highlight') && opposantPlayerPieces[i].id != 'king')
		{
			currentPlayerKing.classList.remove('highlight')
			this.threatToKingCommon = this.calcThreatToKing(currentPlayerPieces, opposantPlayerPieces[i], currentPlayerKing)
			let count = 0
			let tempLimitedPiece
			for(rowAndCol of this.threatToKingCommon)								
				if(Array.from(this.tabJS[rowAndCol[0]][rowAndCol[1]].classList).includes('highlight') && this.tabJS[rowAndCol[0]][rowAndCol[1]].dataset.player == this.turn)
				{
					tempLimitedPiece = this.tabJS[rowAndCol[0]][rowAndCol[1]]
					count++
				}
			if(count == 1)
				this.limitedPiece = tempLimitedPiece
			else
			{
				this.clean()
				break
			}
		}
		this.clean()
	}
}