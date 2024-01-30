import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useLoaderData } from 'react-router-dom';
import { Spellbook } from './spellbook/Spellbook';
import {
	getCharacter,
	getSpell
} from '../../apis/api';
import {
	characterClasses,
	characterSubclasses
} from '../../Constants';




export async function loader({ params }) {
	const spellsData = [];
	let characterData = {};

	await getCharacter(params.characterId)
		.then(async (characterPayload) => {
			characterData = characterPayload;
			for (const spellId of await characterPayload.learntSpells) {
				await getSpell(spellId)
					.then((spellPayload) => {
						spellsData.push(spellPayload);
					});
			}
		});

	return { characterData, spellsData };
}

export default function CharacterSheet() {
	const { characterData, spellsData } = useLoaderData();
	const [character, setCharacter] = React.useState(characterData);
	const [spells, setSpells] = React.useState(spellsData);

	return <>
		<h1>{character.name} - Level {character.level} {character.characterClass}</h1>
		<Accordion defaultActiveKey='character-info'>
			<Accordion.Item eventKey='character-info'>
				<Accordion.Header >Character Info</Accordion.Header>
				<Accordion.Body tag='Form' >
					<Form.Group className="mb-3" controlId="character-sheet-form-name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder={character.name}></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="character-sheet-form-description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder={character.description}></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3" controlId="search-spell-select-class">
					</Form.Group>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='spellbook'>
				<Accordion.Header>Spellbook</Accordion.Header>
				<Accordion.Body>
					<Spellbook
						character={character}
						spells={spells}
						setSpells={setSpells}
					/>
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey='inventory'>
				<Accordion.Header>Inventory</Accordion.Header>
				<Accordion.Body>

				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	</>;
};