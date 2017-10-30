function checkPat()
{
	let count = 0
	const currentPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${this.turn}']`))
	for(let i = 0; i < currentPlayerPieces.length; i++)
	{
		 this.highlight(currentPlayerPieces[i])
		 count += this.body.querySelectorAll('.highlight').length
	}
	if(count == 0)
	{
		this.panel('Pat !', true)
		this.botBool = false
	}
	this.clean()			
}