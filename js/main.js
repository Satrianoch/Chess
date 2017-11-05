function clickOnBtn()
{
	body.removeChild(document.querySelector('table'))
	sheet.innerHTML = ''
	selection = undefined
	init(row, col, startBot)
}

function clickOnTd()
{
	play(this)
}

const row = 8
const col = 8
const startBot = true
init(row, col, startBot)