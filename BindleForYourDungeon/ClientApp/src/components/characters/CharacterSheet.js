import React, { useState } from 'react';
import {
	Button,
	Card,
	Accordion,
	Form
} from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import SearchSpellModal from './spells/SearchSpellModal';
export async function loader({ params }) {
	const characterId = params.characterId;
	const response = await fetch(`character/${characterId}`);
	const character = await response.json();

	return { character };
}

export default function CharacterSheet() {
	const { character } = useLoaderData();

	const [showSearchSpellModal, setShowSearchSpellModal] = useState(false);

	return <>
		<Card>
			<img
				alt="Card"
				src="https://picsum.photos/300/200"
			/>
			<Card.Body>
				<Card.Title tag="h5">
					{character.name}
				</Card.Title>
				<Accordion>
					<Accordion.Item>
						<Accordion.Header >Character Info</Accordion.Header>
						<Accordion.Body tag='Form' >
							<Form.Group className="mb-3" controlId="description">
							<Form.Label>Description</Form.Label>
								<Form.Control type="text" placeholder={character.description}></Form.Control>
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header >Spellbook</Accordion.Header>
						<Accordion.Body>
							<Button onClick={() => setShowSearchSpellModal(true)}>Add Spells</Button>
							{showSearchSpellModal &&
								<SearchSpellModal
									show={showSearchSpellModal}
									onHide={() => setShowSearchSpellModal(false)} />}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Inventory</Accordion.Header>
						<Accordion.Body>

						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Card.Body>
		</Card>
	</>;
};