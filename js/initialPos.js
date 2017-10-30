function initialPos(td, i, j)
{//POSITIONNEMENT INITIAL DES PIECES
	if(i == 1)
	{
		td.id = this.pieces[0]
		td.dataset.player = 1
	}		
	if(i == this.row - 2)
	{
		td.id = this.pieces[0]
		td.dataset.player = -1
	}
	if(i == 0)
	{
		td.id = this.pieces[j+1]
		td.dataset.player = 1
	}
	if(i == this.row - 1)
	{
		td.id = this.pieces[j+1]
		td.dataset.player = -1
	}
}