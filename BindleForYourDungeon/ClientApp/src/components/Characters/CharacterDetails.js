import React, { useState } from 'react';
import {
	Button,
	Card,
	ListGroup,
	ListGroupItem,
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

export default function CharacterDetails() {
	const { character } = useLoaderData();

	const [openBackground, setOpen] = useState('1');
	const [showSearchSpellModal, setShowSearchSpellModal] = useState(false);
	const toggle = (id) => {
		if (openBackground === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

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
						<Accordion.Header >Character Background</Accordion.Header>
						<Accordion.Body tag='Form' >
							<Form.Group className="mb-3" controlId="description">
								<Form.Control type="text" placeholder="Character description" />
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header >Spells</Accordion.Header>
						<Accordion.Body>
							<Button onClick={() => setShowSearchSpellModal(true)}>Add a spell</Button>
							{showSearchSpellModal && <SearchSpellModal show={showSearchSpellModal} />}
							
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