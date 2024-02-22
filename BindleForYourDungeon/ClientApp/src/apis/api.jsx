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
export async function patchCharacter(character) {
    await fetch("characters", {
        method: "PATCH",
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

export async function addCharacterFeat(characterId, featId) {
    const response = await fetch(`characters/${characterId}/addFeat`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(featId),
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
export async function PostDnD5ESpell(spell) {
  const response = await fetch("spells/dnd5e", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spell),
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
//#region Feats

export async function postFeat(feat) {
  const response = await fetch("feats", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feat),
  });
  if (!response.ok) throw new Error(response.status);

  return response.json();
}

export async function getFeats() {
  const response = await fetch("feats");

  return await response.json();
}

export async function getFeat(featId) {
  const response = await fetch(`feats/${featId}`);

  return await response.json();
}
//#endregion

//#region Items


export async function postWeapon(weapon) {
    const response = await fetch("items", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(weapon),
    });
    if (!response.ok) throw new Error(response.status);

    return response.json();
}
//#endregion