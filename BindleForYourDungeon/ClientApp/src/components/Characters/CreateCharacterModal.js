import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { redirect } from 'react-router-dom';
import { characterClasses } from '../../Constants';
import { postCharacter } from '../../apis/api';

export default function CreateCharacterModal({ show, handleClose, props }) {
	const [loading, setLoading] = useState(false);
	const [requestFailed, setRequestFailed] = useState(false);
	const [character, setCharacter] = useState({
		Name: '',
		Description: '',
		Level: -1,
		CharacterClass: []
	});

	function handleChange(event) {
		const { id, value } = event.target;
		setCharacter(prevState => ({ ...prevState, [id]: value }));
	};

	function handleClassChange(event) {
		const { id, checked } = event.target;
		if (checked === true) {
			character.CharacterClass.push(id);
		} else {
			const indexToRemove = character.CharacterClass.indexOf(id);
			if (indexToRemove !== -1) {
				character.CharacterClass.splice(indexToRemove, 1);
			}
		}
	}

	async function handleSubmit() {
		setLoading(true);
		setRequestFailed(false);
		const response = postCharacter(character)
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setRequestFailed(true);
				console.log(error);
			});
		return redirect('/Characters', response);
	}

	return (
		<>
			<Modal show={show} onHide={handleClose} {...props} className='mb-3'>
				<Modal.Header closeButton>
					<Modal.Title>Create new character</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="name">
							<Form.Control type="text" placeholder="Character name" onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="description">
							<Form.Control type="text" placeholder="Character description" onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="level">
							<Form.Control type="number" placeholder="Character level" onChange={handleChange} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="classes">
							<Form.Label className="mb-3">Character Classes</Form.Label>
							{characterClasses.map((_, index) => {
								if (index % 3 === 0)
									return (
										<Row>
											<Col>
												<Form.Check
													type='checkbox'
													id={`${characterClasses[index]}`}
													label={characterClasses[index]} onChange={handleClassChange}
												/>
											</Col>
											<Col>
												<Form.Check
													type='checkbox'
													id={`${characterClasses[index + 1]}`}
													label={characterClasses[index + 1]} onChange={handleClassChange}
												/>
											</Col>
											<Col>
												<Form.Check
													type='checkbox'
													id={`${characterClasses[index + 2]}`}
													label={characterClasses[index + 2]} onChange={handleClassChange}
												/>
											</Col>
										</Row>
									);
							})}
						</Form.Group>
						{loading ?
							<Button color="primary" disabled>
								<Spinner size="sm" />
								<span>
									{`  `}Saving
								</span>
							</Button> :
							<Button onClick={handleSubmit}>Submit</Button>
						}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{requestFailed &&
						<Alert color="warning">
							Submission failed. Please try again later.
						</Alert>
					}
				</Modal.Footer>
			</Modal>
		</>
	);
}
