export async function postCharacter(character) {
	await fetch('character', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(character)
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response.json();
		});
}

export async function addSpell(character, spellIndex) {
	//await fetch(`character/${character.id}/addSpell,`, {
	//	method: 'POST',
	//	headers: {
	//		'Accept': 'application/json',
	//		'Content-Type': 'application/json'
	//	},
	//	body: JSON.stringify(spellIndex)
	//})
	//	.then((response) => {
	//		if (!response.ok) throw new Error(response.status);
	//		else return response.json();
	//	});
}
