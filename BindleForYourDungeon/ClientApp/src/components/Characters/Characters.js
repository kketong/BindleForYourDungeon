import React, {
	useState,
	useCallback,
} from 'react';
import {
	Button,
	Table
} from 'react-bootstrap';
import {
	useLoaderData,
	redirect
} from 'react-router-dom';

import CreateCharacterModal from './CreateCharacterModal';
import CharacterDropdownButton from './CharacterDropdownButton';
import { getCharacters, deleteCharacter } from '../../apis/api'
import { DeleteCharacterConfirmModal } from './DeleteCharacterConfirmModal';

export async function loader() {
	const data = await getCharacters();
	return { characters: data };
}

export default function Characters() {
	const { characters } = useLoaderData();
	const [showCreateCharacter, setShowCreateCharacter] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState('');
	const [showDeleteCharacterModal, setShowDeleteCharacterModal] = useState(false);

	function handleClick() {
		setShowCreateCharacter(true);
	}

	const handleDeleteCharacter = useCallback((character) => {
		setCharacterToDelete(character);
		setShowDeleteCharacterModal(true);
	}, [setCharacterToDelete, setShowDeleteCharacterModal])

	function closeDeleteCharacterConfirmModal() {
		setShowDeleteCharacterModal(false);
		setCharacterToDelete(null);
	}

	async function handleDeleteCharacterConfirm() {
		await deleteCharacter(characterToDelete.id);

		setShowDeleteCharacterModal(false);
	}

	return (
		<>
			<Button variant="primary" onClick={handleClick}>
				Create new character
			</Button>
			{showCreateCharacter &&
				<CreateCharacterModal
					show={showCreateCharacter}
					onHide={() => setShowCreateCharacter(false)} />
			}
			<h1 id="tableLabel">Characters</h1>
			<Table className="table table-striped" aria-labelledby="tableLabel">
				<thead>
					<tr>
						<th>Name</th>
						<th>Class</th>
						<th>Level</th>
						<th>Description</th>
						<th>Party</th>
						<th>Inventory weight</th>
					</tr>
				</thead>
				<tbody>
					{characters.map(character =>
						<tr key={character.id}>
							<td>{character.name}</td>
							<td>{character.characterClass}</td>
							<td>{character.level}</td>
							<td>{character.description}</td>
							<td>todo</td>
							{character.inventory !== null ?
								<td>{character.inventory}</td> :
								<td>TODO</td>
							}
							<td>
								<CharacterDropdownButton
									direction="down"
									character={character}
									deleteCharacterClicked={handleDeleteCharacter}
								/>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			<DeleteCharacterConfirmModal characterName={characterToDelete.name}
				show={showDeleteCharacterModal}
				handleDeleteCharacter={handleDeleteCharacterConfirm}
				handleClose={closeDeleteCharacterConfirmModal}
				/>
		</>
	);
}
