const BASE_URL = "https://api.open5e.com";

export async function getAllFeats() {    
   // Limited to 200, as of 01/02/2024 count is 74, should be fine.
  const feats = await fetch(BASE_URL + "/v1/feats?limit=200").then((response) =>
    response.json()
  );

  return feats;
}
