import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import { getAllSpells } from "../../apis/dnd5eapi";
import { putDnd5eSpells, putFeat } from "../../apis/api";
import { getAllFeats } from "../../apis/open5eapi";

export default function AdminPage() {
  async function updateSpells() {
    const spells = await getAllSpells();
    putDnd5eSpells(spells);
  }

  async function updateFeats() {
    const response = await getAllFeats();
    for (const feat of response.results) {
      try {
        putFeat(feat);
      } catch (error) {
		console.log(error);
	  }
    }
  }

  return (
    <>
      <Stack>
        <Button onClick={updateSpells}>Update spells from dnd5e</Button>
        <Button onClick={updateFeats}>Update feats from open5e</Button>
      </Stack>
    </>
  );
}
