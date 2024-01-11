import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateCharacterModal = (props) => {
    const [show, setShow] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [newCharacterData, setNewCharacterData] = useState({
        name: "",
        description: "",
        level: 0,
        characterClass: []
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    function handleChange(event) {
        const { name, value } = event.target;
        setNewCharacterData((prevState) => ({ ...prevState, [name]: value }));
        console.log(`eventTarget: ${event.target.id} name: ${name}, value: ${value}`);
    };

    function handleClassChange(event) {
        const { id, value } = event.target;
        if (value === 'on') {
            newCharacterData.characterClass.push(id);
        } else {
            newCharacterData.characterClass.pop(id);
        }
        newCharacterData.characterClass.forEach((val) => console.log(val));
    }

    function onSubmit(event) {
        setSubmit(true);
        handleClose();
        event.preventDefault();
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
                    <Form onSubmit={onSubmit}>
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
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
        );    
}

export default CreateCharacterModal;
