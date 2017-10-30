function deplace(oldPos, newPos)
{
	this.body.querySelector('audio').play()
	newPos.setAttribute('data-player', oldPos.getAttribute('data-player'))
	oldPos.removeAttribute('data-player')
	newPos.id = oldPos.id
	oldPos.removeAttribute('id')
}