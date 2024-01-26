
//#region Characters
export async function getCharacters() {
	const response = await fetch('characters');

	return await response.json();
}
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

export async function getCharacter(characterId) {
	const response = await fetch(`characters/${characterId}`);

	return await response.json();
}

export async function deleteCharacter(characterId) {
	const response = await fetch(`characters/${characterId}`, {
		method: 'DELETE'
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response;
		});

	return response;
}

export async function addSpellToCharacter(characterId, spellId) {
	const response = await fetch(`characters/${characterId}/addspell`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(spellId)
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response;
		});

	return await response.json();
}


//#endregion

//#region Spells
export async function postDnD5eSpells(spells) {
	await fetch('spells/dnd5e', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(spells)
	})
		.then((response) => {
			if (!response.ok) throw new Error(response.status);
			else return response.json();
		});
}

export async function getSpells() {
	const response = await fetch('spells');

	return await response.json();
}

export async function getSpell(spellId) {
	const response = await fetch(`spells/${spellId}`);

	return await response.json();
}

//#endregion