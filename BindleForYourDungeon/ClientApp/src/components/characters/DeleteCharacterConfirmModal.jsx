import {
	Button,
	Modal,
} from 'react-bootstrap';
import {
	Link
} from 'react-router-dom';

export function DeleteCharacterConfirmModal({ characterName, characterId, show, props, handleClose }) {
	
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
				<Button
					variant='primary'
					as={Link}
					to={`${characterId}/destroy`}
					onClick={handleClose}
				>Delete {characterName}</Button>
				<Button variant='secondary' onClick={handleClose}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	)
}