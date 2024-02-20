import React, {
	useState,
	useCallback,
} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import {
	useLoaderData,
} from 'react-router-dom';

import CreateCharacterModal from './CreateCharacterModal';
import CharacterDropdownButton from './CharacterDropdownButton';
import { deleteCharacter, getCharacters } from '../../apis/api'
import { DeleteCharacterConfirmModal } from './DeleteCharacterConfirmModal';
import { useToastContext } from '../../contexts/ToastContext';

export async function loader() {
	const data = await getCharacters();
	return { loaderData: data };
}

export default function Characters() {
	const { loaderData } = useLoaderData();
	const [characters, setCharacters] = useState(loaderData);
	const [showCreateCharacter, setShowCreateCharacter] = useState(false);
	const [characterToDelete, setCharacterToDelete] = useState('');
	const [showDeleteCharacterModal, setShowDeleteCharacterModal] = useState(false);
	const showToast = useToastContext();

	function handleCreateCharacterClicked() {
		setShowCreateCharacter(true);
	}

	const handleDeleteCharacter = useCallback((character) => {
		setCharacterToDelete(character);
		setShowDeleteCharacterModal(true);
	}, [setCharacterToDelete, setShowDeleteCharacterModal])

	function closeDeleteCharacterConfirmModal() {
		setShowDeleteCharacterModal(false);
	}

	function handleCloseCreateCharacterModal() {
		setShowCreateCharacter(false);
	}

	async function handleConfirmDelete() {
		const header = "Delete character";
		closeDeleteCharacterConfirmModal();
		await deleteCharacter(characterToDelete.id)
			.then(() => {
				setCharacters(characters.filter(c => c.id !== characterToDelete.id));
				showToast({
					variant: 'success',
					header: header,
					message: 'Request successful'
				});
			})
			.catch((error) => {
				showToast({
					variant: 'danger',
					header: header,
					message: `Request failed: ${error.message}`
				});
			})
	}

	return (
		<>
			<Button variant="primary" onClick={handleCreateCharacterClicked}>
				Create new character
			</Button>
			{showCreateCharacter &&
				<CreateCharacterModal
				show={showCreateCharacter}
				handleClose={handleCloseCreateCharacterModal}
				/>
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
				characterId={characterToDelete.id}
				show={showDeleteCharacterModal}
				handleClose={closeDeleteCharacterConfirmModal}
				handleConfirm={handleConfirmDelete}
			/>
		</>
	);
}
