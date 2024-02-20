import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function DeleteCharacterConfirmModal({ characterName, characterId, show, props, handleClose, handleConfirm }) {
	
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
					onClick={handleConfirm}
				>Delete {characterName}</Button>
				<Button variant='secondary' onClick={handleClose}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	)
}