function paving(td, i, j)
{//MISE EN PLACE DE LA COULEUR DES CASES
	if((i+1) % 2 == 0)
	{
		if((j+1) % 2 == 0)
			td.classList.add('white')
		else
			td.classList.add('black')
	}
	else
	{
		if((j+1) % 2 != 0)
			td.classList.add('white')
		else
			td.classList.add('black')		
	}
}