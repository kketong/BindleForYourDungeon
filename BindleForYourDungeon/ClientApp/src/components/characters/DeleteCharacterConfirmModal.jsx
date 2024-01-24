import {
	Button,
	Modal,
} from 'react-bootstrap';

export function DeleteCharacterConfirmModal({ characterName, show, props, handleDeleteCharacter, handleClose }) {
	
	return (
		<Modal show={show} {...props} >
			<Modal.Header>
				<Modal.Title>
					Delete {characterName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you wish to delete this character?
			</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={handleDeleteCharacter}>Delete {characterName}</Button>
				<Button variant='secondary' onClick={handleClose}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	)
}