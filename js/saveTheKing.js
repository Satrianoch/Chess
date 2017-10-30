function saveTheKing(currentPlayerPieces, threat, king)
{
	for(let j = 0; j < currentPlayerPieces.length; j++)
	{
		this.highlight(currentPlayerPieces[j], this.turn, false)
		if(currentPlayerPieces[j].id != 'king')
		{
			for(let k = 0; k < this.threatToKing.length; k++)
			{
				if(Array.from(this.tabJS[this.threatToKing[k][0]][this.threatToKing[k][1]].classList).includes('highlight'))
				{
					currentPlayerPieces[j].classList.remove('freeze')
					break
				}
				else
					currentPlayerPieces[j].classList.add('freeze')
			}
		this.clean()
		}
		else
		{
			currentPlayerPieces[j].classList.add('freeze')
			for(let a = 0; a < this.row; a++)
				for(let b = 0; b < this.col; b++)
					if(Array.from(this.tabJS[a][b].classList).includes('highlight'))
					{
						currentPlayerPieces[j].classList.remove('freeze')
						a = this.row
						b = this.col
					}
			this.clean()
		}
	}	
}