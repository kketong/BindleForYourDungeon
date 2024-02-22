const BASE_URL = "https://api.open5e.com/v1";

export async function getOpen5eFeats() {    
   // Limited to 200, as of 01/02/2024 count is 74, should be fine.
  const feats = await fetch(BASE_URL + "/feats?limit=200").then((response) =>
    response.json()
  );

  return feats;
}


export async function getOpen5eWeapons() {    
   // Limited to 200, as of 01/02/2024 count is 74, should be fine.
  const weapons = await fetch(BASE_URL + "/weapons?limit=200").then((response) =>
    response.json()
  );

  return weapons;
}
