function checkMate(currentPlayerPieces)
{
	for(let i = 0; i < currentPlayerPieces.length; i++)
		if(!Array.from(currentPlayerPieces[i].classList).includes('freeze'))
			return
	this.panel('Checkmate !', true)
	this.botBool = false
}