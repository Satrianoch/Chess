function promotion(selected)
{
	if(this.turn == -1 && this.botBool)
		selected.id = 'queen'
	else
	{
		let side = this.turn == 1 ? 'W' : 'B' 
		this.panel(`<img id='1' height='36' width='36' src='img/queen${side}.png'><img id='2' height='36' width='36' src='img/knight${side}.png'><img id='3' height='36' width='36' src='img/rook${side}.png'>`, false)
		document.getElementById('1').addEventListener('click', function()
		{
			selected.id = 'queen'
			document.querySelector('div').remove()
		})
		document.getElementById('2').addEventListener('click', function()
		{
			selected.id = 'knight' 
			document.querySelector('div').remove()
		})
		document.getElementById('3').addEventListener('click', function()
		{
			selected.id = 'rook'
			document.querySelector('div').remove()
		})
		this.clean()
	}
}