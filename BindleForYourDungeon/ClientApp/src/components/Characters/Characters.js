import React, { useState } from 'react';
import {
	Button,
	Table
} from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import CreateCharacterModal from './CreateCharacterModal';
import CharacterDropdownButton from './CharacterDropdownButton';

export async function loader() {
	const response = await fetch('character');
	const data = await response.json();

	return { characters: data };
}

export default function Characters() {
	const { characters } = useLoaderData();
	const [showCreateCharacter, setShowCreateCharacter] = useState(false);

	function handleClick() {
		setShowCreateCharacter(true);
	}
	return (
		<div>
			<Button variant="primary" onClick={handleClick}>
				Create new character
			</Button>
			{showCreateCharacter &&
				<CreateCharacterModal
					show={showCreateCharacter}
					onHide={() => setShowCreateCharacter(false)} />
			}

			<h1 id="tableLabel">Characters</h1>
			<Table className="table table-striped" aria-labelledby="tableLabel">
				<thead>
					<tr>
						<th>Name</th>
						<th>Class</th>
						<th>Level</th>
						<th>Description</th>
						<th>Inventory weight</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{characters.map(character =>
						<tr key={character.characterId}>
							<td>{character.name}</td>
							<td>{character.characterClass}</td>
							<td>{character.level}</td>
							<td>{character.description}</td>
							{character.inventory !== null ?
								<td>{character.inventory}</td> :
								<td>TODO</td>
							}
							<td>
								<CharacterDropdownButton
									direction="down"
									character={character}
								/>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
}
