function highlight(selected, turnArg = this.turn, inception = false, analyse = true, inception_2 = false)
{
	const selectedRow = Number(selected.getAttribute('data-row'))
	const selectedCol = Number(selected.getAttribute('data-column'))
	const selectedPlayer = selected.getAttribute('data-player')
	const opposantPlayerPieces = Array.from(this.body.querySelectorAll(`[data-player='${-this.turn}']`))
	const turn = turnArg
	//SI LA PIECE SELECTIONNEE N'EST PAS FREEZE
	if(!Array.from(selected.classList).includes('freeze'))
	{
		switch(selected.id)
		{
			case 'pawn':
			{
				if(!inception_2 && (selectedRow < this.row-1 && selectedRow > 0))
				{
					//HIGHLIGHT DE LA CASE DEVANT LE PION (SI LA CASE EXISTE ET SI ELLE EST VIDE) ET QUE LA FONCTION N'EST PAS APPELEE PAR LE ROI
					if(((selectedRow+turn >= 0 || selectedRow+turn <= this.row) && !this.tabJS[selectedRow+turn][selectedCol].id) && !inception)
						this.tabJS[selectedRow+turn][selectedCol].classList.add('highlight')
				//HIGHLIGHT DE LA DEUXIEME CASE DEVANT LE PION (S'IL EST A L'EMPLACEMENT INITIAL ET QU'AUCUNE PIECE BLOQUE LE CHEMIN) ET QUE LA FONCTION N'EST PAS APPELEE PAR LE ROI
					if(((turn == 1 && selectedRow == 1 || turn == -1 && selectedRow == this.row - 2) && !this.tabJS[selectedRow+turn][selectedCol].id && !this.tabJS[selectedRow+(turn*2)][selectedCol].id) && !inception)
						this.tabJS[selectedRow+(turn*2)][selectedCol].classList.add('highlight')
				//HIGHLIGHT DE LA CASE EN DIAGONAL SI ELLE EXISTE ET (EST PRISE PAR UNE PIECE ADVERSE OU QUE LA FONCTION EST APPELEE PAR LE ROI)
					if((selectedRow+turn >= 0 || selectedRow+turn <= this.row) && (selectedCol+1 < this.col))
						if(inception || this.tabJS[selectedRow+turn][selectedCol+1].dataset.player == -turn)
							this.tabJS[selectedRow+turn][selectedCol+1].classList.add('highlight')
				//HIGHLIGHT DE LA CASE EN ANTIDIAGONAL SI ELLE EXISTE ET (EST PRISE PAR UNE PIECE ADVERSE OU QUE LA FONCTION EST APPELEE PAR LE ROI)
					if((selectedRow+turn >= 0 || selectedRow+turn <= this.row) && (selectedCol-1 >= 0))
						if(inception || this.tabJS[selectedRow+turn][selectedCol-1].dataset.player == -turn)
							this.tabJS[selectedRow+turn][selectedCol-1].classList.add('highlight')
				//SI APPELEE PAR LA METHODE saveToKing SUPPRIME LES HIGHLIGHTS QUI NE SONT PAS COMPRIS ENTRE LE ROI ET LA MENACE
				}
				if(!analyse && (selectedRow == 0 || selectedRow == this.row-1))
					this.promotion(selected)
				break;
			}
			case 'king':
			{
				if(!inception_2)
				{
				//TABLEAU CONTENANT LES DEPLACEMENTS D'UNE CASE DANS TOUTES LES DIRECTIONS
					const checkHighlight = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]
					let toHighlight = []
					let checkRow
					let checkCol
					for(let j = 0; j < opposantPlayerPieces.length; j++)
					{
						//AJOUT DU HIGHLIGHT DE TOUS LES ENNEMIS (PAS LE ROI SI LA FONCTION EST APPELEE PAR LE ROI ADVERSE ET QU'ON EST SUR LE ROI)
						if(opposantPlayerPieces[j].id != 'king' || (opposantPlayerPieces[j].id == 'king' && !inception))
							this.highlight(opposantPlayerPieces[j], -this.turn, true)
						if((opposantPlayerPieces[j].id == 'queen' || opposantPlayerPieces[j].id == 'rook' || opposantPlayerPieces[j].id == 'bishop'))
							this.highlight(opposantPlayerPieces[j], -this.turn, false, true, true)
					}
					for(let i = 0; i < checkHighlight.length; i++)
					{
						checkRow = selectedRow+checkHighlight[i][0]
						checkCol = selectedCol+checkHighlight[i][1]
						//STOCKAGE DES CASES QUI NE DEBORDENT PAS DU PLATEAU, NE SONT PAS ALLIE ET NE SONT PAS DANS LE CHAMPS D'ATTAQUE D'UN ENNEMI
						if((checkRow <= this.row-1 && checkRow >= 0 && checkCol <= this.col-1 && checkCol >= 0) && this.tabJS[checkRow][checkCol].dataset.player != turn && !Array.from(this.tabJS[checkRow][checkCol].classList).includes('highlight'))
							toHighlight.push(this.tabJS[checkRow][checkCol])
							//CLEAN DU HIGHLIGHT DE TOUS LES HIGHLIGHTS SI LA FONCTION N'EST PAS APPELEE PAR LE ROI ADVERSE ET AJOUT DU CELUI DU ROI
					}
					if(!inception)
						this.clean()
					if(!analyse)
						selection.classList.add('select')
					toHighlight.map(x => x.classList.add('highlight'))
					return
				}
				break
			}
			case 'knight':
			{
				if(!inception_2)
				{
				//TABLEAU CONTENANT LES DEPLACEMENTS POSSIBLE DU CAVALIER
					const checkHighlight = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]
					let checkRow
					let checkCol
					for(let i = 0; i < checkHighlight.length; i++)
					{
						checkRow = selectedRow+checkHighlight[i][0]
						checkCol = selectedCol+checkHighlight[i][1]
						//HIGHLIGHT DE LA CASE SI ELLE NE DEBORDE PAS DU PLATEAU ET (N'EST PAS ALLIE OU QUE LA FONCTION EST APPELEE PAR LE ROI)
						if((checkRow <= this.row-1 && checkRow >= 0 && checkCol <= this.col-1 && checkCol >= 0) && (this.tabJS[checkRow][checkCol].dataset.player != turn || inception))
							this.tabJS[checkRow][checkCol].classList.add('highlight')
					}
				}
				break;
			}
			case 'queen':
			case 'rook':
			case 'bishop':
			{
				let checkHighlight
				if(selected.id == 'queen')
				//TABLEAU CONTENANT LES DEPLACEMENTS D'UNE CASE DANS TOUTES LES DIRECTIONS
					checkHighlight = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]
				else if(selected.id == 'rook')
				//TABLEAU CONTENANT LES DEPLACEMENTS D'UNE CASE EN HORIZONTAL ET VERTICAL
					checkHighlight = [[1,0],[-1,0],[0,1],[0,-1]]
				else if(selected.id == 'bishop')
				//TABLEAU CONTENANT LES DEPLACEMENTS D'UNE CASE EN DIAGONAL
					checkHighlight = [[1,1],[-1,1],[1,-1],[-1,-1]]
				let checkRow
				let checkCol
				//POUR CHAQUE DIRECTIONS DU TABLEAU
				for(let i = 0; i < checkHighlight.length; i++)
				//PROGRESSE CASE PAR CASE TANT QU'ELLE NE DEBORDE PAR DU PLATEAU. SI UNE PIECE SE TROUVE SUR LA CASE, ARRETE LA BOUCLE
					for(let j = 1; selectedRow+(checkHighlight[i][0]*j) <= this.row-1 && selectedRow+(checkHighlight[i][0]*j) >= 0 && selectedCol+(checkHighlight[i][1]*j) <= this.col-1 && selectedCol+(checkHighlight[i][1]*j) >= 0; j++)
						{
							checkRow = selectedRow+(checkHighlight[i][0]*j)
							checkCol = selectedCol+(checkHighlight[i][1]*j)
						//HIGHLIGHT DE LA CASE SI ELLE NE DEBORDE PAS DU PLATEAU ET (N'EST PAS ALLIE OU QUE LA FONCTION EST APPELEE PAR LE ROI)
							if((checkRow <= this.row-1 && checkRow >= 0 && checkCol <= this.col-1 && checkCol >= 0) && (this.tabJS[checkRow][checkCol].dataset.player != turn || inception))
								this.tabJS[checkRow][checkCol].classList.add('highlight')
						//ARRETE LA BOUCLE SI UNE PIECE EST SUR CETTE CASE 
							if((this.tabJS[checkRow][checkCol].id && !inception_2)  || (this.tabJS[checkRow][checkCol].dataset.player == turn))
								break
							else if(inception_2 && this.tabJS[checkRow][checkCol].id && this.tabJS[checkRow][checkCol].id != 'king' && (Array.from(this.body.querySelector(`#king[data-player='${this.turn}']`).classList).includes('select') || this.rowColInCheck != null))
								break
						}
			}
		}
		if(this.threatToKing && !analyse && selected.id != 'king')
		{
			const allHighlight = this.body.querySelectorAll('.highlight')
			for(let i = 0; i < allHighlight.length; i++)
			{
				allHighlight[i].classList.remove('highlight')
				let highlightRow = parseInt(allHighlight[i].dataset.row)
				let highlightCol = parseInt(allHighlight[i].dataset.column)
				for(let j = 0; j < this.threatToKing.length; j++)
					if(this.threatToKing[j][0] == highlightRow && this.threatToKing[j][1] == highlightCol)
						allHighlight[i].classList.add('highlight')
			}
		}

		if(!analyse && selected == this.limitedPiece)
		{
			for(let a = 0; a < this.row; a++)
				for(let b = 0; b < this.col; b++)
				{
					let count = 0
					for(let c = 0; c < this.threatToKingCommon.length; c++)
					{
						if((this.threatToKingCommon[c][0] == a && this.threatToKingCommon[c][1] == b) && (this.tabJS[this.limitedPiece.dataset.row][this.limitedPiece.dataset.column] != this.tabJS[this.threatToKingCommon[c][0]][this.threatToKingCommon[c][1]]) && Array.from(this.tabJS[a][b].classList).includes('highlight'))
							break
						else
							count++
						if(count == this.threatToKingCommon.length)
							this.tabJS[a][b].classList.remove('highlight')
					}	
				}
		}
	}
	return false
}