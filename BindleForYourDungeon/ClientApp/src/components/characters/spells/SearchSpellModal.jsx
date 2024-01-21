import React, {
	useState,
	useEffect,
} from 'react';
import {
	Button,
	ButtonGroup, 
	Container,
	Modal,
	Spinner
} from 'react-bootstrap';
import { getAllSpells } from '../../../api';
import SearchSpellList from './SearchSpellList';
import DetailedSpellCard from './DetailedSpellCard';

export default function SearchSpellModal(props) {
	const [spells, setSpells] = useState([]);
	const [showDetailedView, setShowDetailedView] = useState(false)
	
	useEffect(() => {
		getAllSpells()
			.then(setSpells);
	}, []);

	function handleShowDetails() {
		setShowDetailedView(true);
	}
	
	
	return (
		<Modal {...props}>
			<Modal.Header>
				<Modal.Title>Spell Search</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					{spells.length < 1 ?
						<Spinner className='align-center' animation='border' /> :
						showDetailedView ? 
							<DetailedSpellCard /> :
							<>
								<SearchSpellList
									spells={spells}
									handleShowDetails={handleShowDetails}
								/>
							</>
					}
				</Container>
			</Modal.Body>
			<Modal.Footer >
				<ButtonGroup >
					<Button variant="secondary" aria-label="Back">Back</Button>
				</ButtonGroup>
			</Modal.Footer>
		</Modal>
	);
}