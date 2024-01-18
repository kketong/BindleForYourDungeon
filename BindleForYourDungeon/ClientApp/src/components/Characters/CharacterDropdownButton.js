import React, { useState } from 'react';
import {
    Link
} from "react-router-dom";
import {
    Dropdown,
    DropdownItem,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function CharacterDropdownButton({ direction, character, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <Dropdown className='float: right' isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <Dropdown.Toggle caret>Edit</Dropdown.Toggle>
            <Dropdown.Menu {...args}>
                <DropdownItem header></DropdownItem>
                <DropdownItem>Edit Inventory</DropdownItem>
                <DropdownItem disabled>Edit Spells</DropdownItem>
                <DropdownItem divider />
                <Dropdown.Item as={Link} to={`${character.characterId}`}>Edit Character</Dropdown.Item>
                <Dropdown.Item as={Link} to={`${character.characterId}`}>Delete Character</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

CharacterDropdownButton.propTypes = {
    direction: PropTypes.string,
    character: PropTypes.object,
};

export default CharacterDropdownButton;