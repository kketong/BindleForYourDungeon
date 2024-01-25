export async function postCharacter(character) {
	await fetch('characters', {
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

export async function getCharacters() {
	const response = await fetch('characters');
	return await response.json();
}

export async function getCharacter(characterId) {
	const response = await fetch(`characters/${characterId}`);
	return await response.json();
}

export async function deleteCharacter(characterId) {
	const response = await fetch(`characters/${characterId}`, {
		method: 'DELETE',
		body: JSON.stringify(characterId)
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response;
		});
	return response;
}

export async function postDnd5eSpell(spell) {
	await fetch('spells', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(spell)
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response.json();
		});
}