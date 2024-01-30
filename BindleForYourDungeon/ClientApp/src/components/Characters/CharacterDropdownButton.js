import React from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

export default function CharacterDropdownButton({ direction, character, deleteCharacterClicked, ...args }) {

	function onDeleteCharacter() {
		deleteCharacterClicked(character);
	}

	return (
		<Dropdown className='float: right' direction={direction}>
			<Dropdown.Toggle>Edit</Dropdown.Toggle>
			<Dropdown.Menu {...args}>
				<Dropdown.Item disabled>Edit Inventory</Dropdown.Item>
				<Dropdown.Item disabled>Edit Spells</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item as={Link} to={`${character.id}`}>Edit Character</Dropdown.Item>
				<Dropdown.Item onClick={onDeleteCharacter}>Delete Character</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}