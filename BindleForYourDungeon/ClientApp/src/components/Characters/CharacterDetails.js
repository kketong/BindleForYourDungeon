import React, { useState } from 'react';
import {
	Card,
	ListGroup,
	ListGroupItem,
	Accordion,
	Form
} from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
	const characterId = params.characterId;
	const response = await fetch(`character/${characterId}`);
	const character = await response.json();

	return { character };
}

export default function CharacterDetails() {
	const { character } = useLoaderData();

	const [openBackground, setOpen] = useState('1');
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
				<Accordion open={openBackground} toggle={toggle}>
					<Accordion.Item>
						<Accordion.Header targetId="1">Character Background</Accordion.Header>
						<Accordion.Body tag='Form' accordionId="1">
							<Form.Group className="mb-3" controlId="description">
								<Form.Control type="text" placeholder="Character description" />
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header targetId="2">Spells</Accordion.Header>
						<Accordion.Body accordionId="2">
							<strong>This is the second item&#39;s accordion body.</strong>
							You can modify any of this with custom CSS or overriding our default
							variables. It&#39;s also worth noting that just about any HTML can
							go within the <code>.accordion-body</code>, though the transition
							does limit overflow.
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header targetId="3">Inventory</Accordion.Header>
						<Accordion.Body accordionId="3">
							<strong>This is the third item&#39;s accordion body.</strong>
							You can modify any of this with custom CSS or overriding our default
							variables. It&#39;s also worth noting that just about any HTML can
							go within the <code>.accordion-body</code>, though the transition
							does limit overflow.
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Card.Body>
			<ListGroup flush>
				<ListGroupItem>
					An item
				</ListGroupItem>
				<ListGroupItem>
					A second item
				</ListGroupItem>
				<ListGroupItem>
					And a third item
				</ListGroupItem>
			</ListGroup>
			<Card.Body>
				<Card.Link href="#">
					Card Link
				</Card.Link>
				<Card.Link href="#">
					Another Card Link
				</Card.Link>
			</Card.Body>
		</Card>
	</>;
};