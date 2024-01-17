import React, { useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';

function CreateCharacterModal() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [character, setCharacter] = useState({
        Name: '',
        Description: '',
        Level: -1,
        CharacterClass: []
    });

    const handleClose = () => setShow(false);

    function handleChange(event) {
        const { id, value } = event.target;
        setCharacter(prevState => ({ ...prevState, [id]: value }));
        console.log(`id: ${id}, value: ${value}`);
        console.log(JSON.stringify(character));
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
        await fetch('character', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then(() => {
            setLoading(false);            
        })
        .catch((error) => {
            setLoading(false);
            setRequestFailed(true);
        });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='mb-3'>
                <Modal.Header closeButton>
                    <Modal.Title>Create new character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name" >
                            <Form.Control type="text" placeholder="Character name" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Control type="text" placeholder="Character description" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="level">
                            <Form.Control type="number" placeholder="Character level" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="characterClass">
                            <Form.Label className="mb-3">Character Classes</Form.Label>
                            <div>
                                {['None', 'Barbarian', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin',
                                    'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
                                    .map((className) => (
                                            <Form.Check
                                            inline 
                                                type='checkbox'
                                                id={`${className}`}
                                                label={className} onChange={handleClassChange}
                                            />
                                    ))}
                            </div>
                        </Form.Group>
                        {loading ?
                            <Button color="primary" disabled>
                                <Spinner size="sm"/>
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

export default CreateCharacterModal;
