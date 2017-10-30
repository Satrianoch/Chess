function panel(text, restart)
{
	const panel = document.createElement('div')
	panel.innerHTML = text
	if(restart)
	{
		const btn = document.createElement('button')
		btn.textContent = 'Restart'
		btn.addEventListener('click', clickOnBtn)
		panel.appendChild(btn)
	}
	this.body.querySelector('table').appendChild(panel) 
}