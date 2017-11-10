function bot(selection)
{
	let random
	let highlightCheck = false
	let botSelection = null
	let highlighted = Array.from(this.body.querySelectorAll('.highlight'))
	if(highlighted.length > 0)
		highlightCheck = true
	if(highlightCheck)
	{
		if(this.count == 4 && this.scholar == 2)
			botSelection = this.tabJS[4][5]
		else if(this.count == 6 && this.scholar == 2)
			botSelection = this.tabJS[7][2]
		else if(this.count == 6 && this.scholar == 3)
			botSelection = this.tabJS[3][0]
		else if(this.count == 8 && this.scholar == 3)
			botSelection = this.tabJS[7][4]
		else if(this.count == 8 && this.scholar == 4)
			botSelection = this.tabJS[1][2]
		else
		{
			random = Math.floor(Math.random() * highlighted.length)
			botSelection = highlighted[random]
			for(let i = 0; i < highlighted.length; i++)
			{
				if(highlighted[i].id)
					botSelection = highlighted[i]
			}	
		}
		setTimeout(function(){play(botSelection)}, this.delay)
	}
	else
	{
		if(this.count <= 8)
			botSelection = botScholarMate()
		if(botSelection == null)
		{
			const currentPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${this.turn}']`))
			const opposantPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${-this.turn}']`))
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
						this.clean()
						for(let k = 0; k < opposantPlayerPieces.length; k++)
							this.highlight(opposantPlayerPieces[k], -this.turn, true)

						if((!Array.from(highlighted[j].classList).includes('highlight') || currentPlayerPieces[i].id == 'pawn') && currentPlayerPieces[i] != this.limitedPiece)
						{
							botSelection = currentPlayerPieces[i]
							j = highlighted.length
							i = currentPlayerPieces.length
						}
					}
				this.clean()
			}
		}
		this.play(botSelection)
	}	
}