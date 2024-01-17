import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function CharacterDropdownButton({ direction, character, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();
    return (
        <Dropdown className='float: right' isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle caret>Edit</DropdownToggle>
            <DropdownMenu {...args}>
                <DropdownItem header></DropdownItem>
                <DropdownItem>Edit Inventory</DropdownItem>
                <DropdownItem disabled>Edit Spells</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => navigate(`details/${character.characterId}`)}>Edit Character</DropdownItem>
                <DropdownItem>Delete Character</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

CharacterDropdownButton.propTypes = {
    direction: PropTypes.string,
    character: PropTypes.object,
};

export default CharacterDropdownButton;