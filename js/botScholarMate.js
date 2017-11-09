function botScholarMate()
{
	let botSelection = null
	if(this.count == 2 && !this.tabJS[2][1].id && this.tabJS[1][3].id && this.tabJS[1][4].id)
	{
		botSelection = this.tabJS[6][3]
		this.scholar++
	}
	else if(this.count == 4 && this.scholar == 1 && !this.tabJS[3][4].id && !this.tabJS[3][6].id && !this.tabJS[2][1].id && this.tabJS[1][3].id && this.tabJS[1][4].id && this.tabJS[3][3].id !== 'knight' && this.tabJS[3][7].id !== 'knight')
	{
		botSelection = this.tabJS[7][2]
		this.scholar++
	}
	else if(this.count == 6 && this.scholar == 2 && !this.tabJS[3][4].id && !this.tabJS[3][6].id && this.tabJS[3][3].id !== 'knight' && this.tabJS[3][7].id !== 'knight' && !this.tabJS[2][1].id && this.tabJS[1][3].id && this.tabJS[1][4].id)
	{
		botSelection = this.tabJS[7][4]
		this.scholar++
	}
	else if(this.count == 6 && this.scholar == 2)
		botSelection = this.tabJS[4][5]
	else if(this.count == 8 && this.scholar == 3 && !this.tabJS[2][1].id && this.tabJS[2][2].id !== 'king' && this.tabJS[2][0].id !== 'knight' && this.tabJS[1][4].id)
	{
		botSelection = this.tabJS[3][0]
		this.scholar++
	}
	else if(this.count == 8 && this.scholar == 3)
		botSelection = this.tabJS[3][0]
	
	return botSelection
}