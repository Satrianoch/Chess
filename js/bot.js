function bot(selection)
{
	let random
	let highlightCheck = false
	let botSelection
	let highlighted = Array.from(this.body.querySelectorAll('.highlight'))
	if(highlighted.length > 0)
		highlightCheck = true
	if(highlightCheck)
	{
		random = Math.floor(Math.random() * highlighted.length)
		botSelection = highlighted[random]
		for(let i = 0; i < highlighted.length; i++)
		{
			if(highlighted[i].id)
				botSelection = highlighted[i]
		}
		setTimeout(function(){play(botSelection)}, 750)
	}
	else
	{
		const currentPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${this.turn}']`))
		do
		{
			random = Math.floor(Math.random() * currentPlayerPieces.length)
			botSelection = currentPlayerPieces[random]
		}
		while(this.selection == botSelection)
		for(let i = 0; i < currentPlayerPieces.length; i++)
			{
				this.highlight(currentPlayerPieces[i])
				highlighted = Array.from(this.body.querySelectorAll('.highlight'))
				for(let j = 0; j < highlighted.length; j++)
					if(highlighted[j].id)
					{
						botSelection = currentPlayerPieces[i]
						break
					}
				this.clean()
			}
		this.play(botSelection)
	}	
}