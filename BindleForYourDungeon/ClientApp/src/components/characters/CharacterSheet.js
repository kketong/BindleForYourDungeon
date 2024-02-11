import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import { useLoaderData } from "react-router-dom";
import { Spellbook } from "./spells/Spellbook";
import { getCharacter, getSpell, getFeat } from "../../apis/api";
import { CharacterDetails } from "./details/CharacterDetails";

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

	function addLearntSpell(spell) {
		setLearntSpells(prev => [...prev, spell]);
	}

	function removeLearntSpell(spell) {
		setLearntSpells(prev => prev.filter(s => s.id !== spell.id));
	}

	function addFeat(feat) {
		setFeats(prev => [...prev, feat]);
	}

	return (
		<>
			<h1>
				{character.name} - Level {character.level} {character.characterClass}
			</h1>
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
