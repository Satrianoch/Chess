function play(selection)
{
	this.sheet.innerHTML = '.highlight {background:#1CE}'
	//SELECTION D'UNE CASE AU PREMIER TOUR SEULEMENT
	if(this.selection == undefined)
		this.selection = selection
	//SELECTION D'UNE CASE SEULEMENT SI ELLE EST OCCUPEE PAR UN ALLIE
	if(selection.id && selection.dataset.player == this.turn)
	{
		this.clean()
		this.selection = selection
		selection.classList.add('select')
		this.highlight(selection, this.turn, false, false)
		if(this.botBool && this.turn == -1)
		{
			this.sheet.innerHTML = ''
			this.bot()
		}
	}
	//SI LA CASE SELECTIONNE EST HIGHLIGHT : SE DEPLACER, CHANGER LE TOUR ET ANALYSER SI ECHEC
	if(Array.from(selection.classList).includes('highlight'))
	{
		this.deplace(this.selection, selection)
		//FIN PROVISOIRE LORSQUE LE ROI EST MORT
		if(this.body.querySelectorAll('#king').length < 2)
		{
			this.clean()
			this.panel((this.turn == 1 ? 'Whites' : 'Blacks') + ' win', true)
			return
		}
		if(this.body.querySelectorAll('[id]').length <= 2)
		{
			this.clean()
			this.panel('Drawn', true)
			return
		}
		this.turn = (this.turn == 1) ? -1 : 1
		this.check()
		this.clean()
		this.limitedPiece = undefined
		if(this.rowColInCheck == null)
			this.checkPat()
		this.whoIsLimited()
		if(this.botBool && this.turn == -1)
			setTimeout(function(){this.bot()}, this.delay)
	}
	//SI LA CASE EST VIDE ENLEVE LA SELECTION ACTUELLE
	if(!selection.id)
		this.clean()
}