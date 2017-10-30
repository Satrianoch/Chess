function clean()
{
	this.selection.classList.remove('select')
	for(let i = 0; i < this.row; i++)
		for(let j = 0; j < this.col; j++)
			this.tabJS[i][j].classList.remove('highlight')
}