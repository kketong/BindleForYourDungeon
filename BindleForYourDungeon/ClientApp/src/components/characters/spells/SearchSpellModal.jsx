import React, {
	useState,
	useEffect
} from 'react';
import {
	Container,
	Modal,
	Spinner
} from 'react-bootstrap';
import { getAllSpells } from '../../../apis/dnd5eapi';
import SearchSpellList from './SearchSpellList';

export default function SearchSpellModal(props) {
	const [spells, setSpells] = useState([]);

	useEffect(() => {
		getAllSpells()
			.then(setSpells);
	}, []);
	
	return (
		<Modal {...props} >
			<Modal.Header closeButton>
				<Modal.Title>Spell Search</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					{spells.length < 1 ?
						<Spinner className='align-center' animation='border' /> :
							<>
								<SearchSpellList
									spells={spells}
								/>
							</>
					}
				</Container>
			</Modal.Body>
		</Modal>
	);
}