import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CreateCharacterModal({ requiresRefresh }) {
    const [show, setShow] = useState(false);
    const [character, setCharacter] = useState({
        Name: '',
        Description: '',
        Level: -1,
        CharacterClass: []
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        
        const rawResponse = await fetch('character', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character)
        });
        const content = await rawResponse.json();

        console.log(content);
        //let result = await PostCharacter(newCharacterData);
        //if (result) {

        //}
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create new character
            </Button>
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
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
     );    
}

export default CreateCharacterModal;
