import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useLoaderData } from "react-router-dom";
import { Spellbook } from "./spells/Spellbook";
import { getCharacter, getSpell, getFeat, patchCharacter } from "../../apis/api";
import { CharacterDetails } from "./details/CharacterDetails";
import { useToastContext } from "../../contexts/ToastContext";

export async function loader({ params }) {
	const spellsData = [];
	const featsData = [];
	let characterData = {};

	await getCharacter(params.characterId).then(async (characterPayload) => {
		characterData = characterPayload;
		for (const spellId of await characterPayload.learntSpells) {
			await getSpell(spellId).then((spellPayload) => {
				spellsData.push(spellPayload);
			});
		}
		for (const featId of await characterPayload.feats) {
			await getFeat(featId).then((featPayload) => {
				featsData.push(featPayload);
			});
		}
	});

	return { characterData, spellsData, featsData };
}

export default function CharacterSheet() {
	const { characterData, spellsData, featsData } = useLoaderData();
	const [character, setCharacter] = React.useState(characterData);
	const [learntSpells, setLearntSpells] = React.useState(spellsData);
	const [feats, setFeats] = React.useState(featsData);
	const showToast = useToastContext();
	
	function addLearntSpell(spell) {
		setLearntSpells(prev => [...prev, spell]);
	}

	function removeLearntSpell(spell) {
		setLearntSpells(prev => prev.filter(s => s.id !== spell.id));
	}

	function addFeat(feat) {
		setFeats(prev => [...prev, feat]);
	}

	async function saveCharacter() {
		const header = `Update ${character.name}`;
		await patchCharacter(character)
			.then(showToast({
				variant: 'success',
				header: header,
				message: 'Request successful'
			}))
			.catch((error) => {
				showToast({
					variant: 'danger',
					header: header + " failed",
					message: error.message
				});
			});;
	}

	return (
		<>
			<h1>
				{character.name} - Level {character.level} {character.characterClass}
			</h1>
			<Button disabled={characterData === character} onClick={saveCharacter}>Save changes</Button>
			<Accordion defaultActiveKey="character-info">
				<Accordion.Item eventKey="character-info">
					<Accordion.Header>Character Info</Accordion.Header>
					<Accordion.Body>
						<CharacterDetails
							character={character}
							setCharacter={setCharacter}
							characterFeats={feats}
							addFeat={addFeat}
						/>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="spellbook">
					<Accordion.Header>Spellbook</Accordion.Header>
					<Accordion.Body>
						<Spellbook
							character={character}
							spells={learntSpells}
							addLearntSpell={addLearntSpell}
							removeLearntSpell={removeLearntSpell}
						/>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="inventory">
					<Accordion.Header>Inventory</Accordion.Header>
					<Accordion.Body></Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}
