//#region Characters
export async function getCharacters() {
  const response = await fetch("characters");

  return await response.json();
}
export async function postCharacter(character) {
  await fetch("characters", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(character),
  }).then(function (response) {
    if (!response.ok) throw new Error(response.status);
    else return response.json();
  });
}

export async function getCharacter(characterId) {
  const response = await fetch(`characters/${characterId}`);

  return response.json();
}

export async function deleteCharacter(characterId) {
  const response = await fetch(`characters/${characterId}`, {
    method: "DELETE",
  }).then(function (response) {
	  if (!response.ok)
		  throw new Error(response.status);
	  else
		  return response;
  });

  return response;
}

export async function addCharacterSpell(characterId, spellId) {
  const response = await fetch(`characters/${characterId}/addspell`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spellId),
  }).then(async function (response) {
	  if (!response.ok) {
		  const body = await response.text();
		  throw new Error(`${response.status}: ${body}`);
	  } else
		  return response;
  });

  return await response.json();
}

export async function removeCharacterSpell(characterId, spellId) {
  const response = await fetch(`characters/${characterId}/removespell`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spellId),
  }).then(async (response) => {
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`${response.status}: ${body}`);
    } else return response;
  });

  return await response.json();
}

//#endregion

//#region Spells
export async function postDnD5eSpells(spells) {
  const response = await fetch("spells/dnd5e", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spells),
  });
  if (!response.ok) throw new Error(response.status);

  return response.json();
}

export async function getSpells() {
  const response = await fetch("spells");

  return await response.json();
}

export async function getSpell(spellId) {
  const response = await fetch(`spells/${spellId}`);

  return await response.json();
}

//#endregion
