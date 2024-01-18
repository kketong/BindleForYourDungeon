import React from 'react';
import { Link, } from "react-router-dom";
import { Dropdown, } from 'react-bootstrap';

export default function CharacterDropdownButton({ direction, character, ...args }) {
	return (
		<Dropdown className='float: right' direction={direction}>
			<Dropdown.Toggle>Edit</Dropdown.Toggle>
			<Dropdown.Menu {...args}>
				<Dropdown.Item header></Dropdown.Item>
				<Dropdown.Item>Edit Inventory</Dropdown.Item>
				<Dropdown.Item disabled>Edit Spells</Dropdown.Item>
				<Dropdown.Item divider />
				<Dropdown.Item as={Link} to={`${character.characterId}`}>Edit Character</Dropdown.Item>
				<Dropdown.Item as={Link} to={`${character.characterId}`}>Delete Character</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}