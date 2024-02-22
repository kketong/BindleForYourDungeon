const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllSpells() {
  const spellIndexes = await fetch(BASE_URL + "/api/spells").then((response) =>
    response.json()
  );
  return Promise.all(
    spellIndexes.results.map((index) =>
      fetch(BASE_URL + index.url).then((response) => response.json())
    )
  );
}

export async function getAllEquipmentCategories() {
  const equipmentIndexes = await fetch(BASE_URL + "/api/equipment-categories").then((response) =>
    response.json()
  );
  return equipmentIndexes.results;
}

export async function getAllEquipment(urlExtension) {
  const equipmentIndexes = await fetch(BASE_URL + urlExtension).then((response) =>
    response.json()
  );
  return Promise.all(
    equipmentIndexes.equipment.map((index) =>
      fetch(BASE_URL + index.url).then((response) => response.json())
    )
  );
}