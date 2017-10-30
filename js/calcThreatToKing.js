function calcThreatToKing(currentPlayerPieces, threat, king)
{
	const kingRow = king.dataset.row
	const kingCol = king.dataset.column
	const threatRow = parseInt(threat.dataset.row)
	const threatCol = parseInt(threat.dataset.column)
	const threatToKing = [[threatRow, threatCol]]
	let tempRow = threatRow
	let tempCol = threatCol
	let signRow
	let signCol

	if(threatRow > kingRow)
		signRow = -1
	else if (threatRow < kingRow)
		signRow = 1
	else
		signRow = 0

	if(threatCol > kingCol)
		signCol = -1
	else if (threatCol < kingCol)
		signCol = 1
	else
		signCol = 0

	if(threat.id == 'knight')
		threatToKing.push([threatRow, threatCol])
	else
	{
		const limitRow = parseInt(kingRow) + parseInt(-signRow)
		const limitCol = parseInt(kingCol) + parseInt(-signCol)
		tempRow = parseInt(tempRow)
		tempCol = parseInt(tempCol)
		//STOCKAGE DES CASES ENTRE LA MENACE(COMPRIS) ET LE ROI(NON COMPRIS) DANS L'ARRAY threatToKing
		while(tempRow != limitRow || tempCol != limitCol)
		{	
			if(tempRow != limitRow)
				tempRow = parseInt(Number(signRow) + Number(tempRow))
			if(tempCol != limitCol)
				tempCol = parseInt(Number(signCol) + Number(tempCol))
			threatToKing.push([tempRow, tempCol])
		}
	}
		return threatToKing					
}