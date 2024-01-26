import { useState } from 'react';
import {
	Button,
	Card,
	Collapse,
	Row,
	Col
} from 'react-bootstrap';

import {
	useCharacter,
	useCharacterDispatch
} from '../../../contexts/CharacterContext.jsx';

import { addSpellToCharacter } from '../../../apis/api.jsx';
import ToastContext from '../../../contexts/ToastContext.jsx';

export const SpellCard = ({
	spell,
	showAddSpellButton
}) => {
	const [open, setOpen] = useState(false);
	const characterDispatch = useCharacterDispatch();
	const toastContext = ToastContext;
	const character = useCharacter();

	function toggleCollapse() {
		setOpen(!open);
	}

	async function addSpell() {
		const response = await addSpellToCharacter(character.id, spell.id);
		if (response.ok) {
			characterDispatch({
				type: 'addSpell',
				id: spell.id
			});
			toastContext({
				variant: 'success',
				header: 'Add spell to character',
				message: 'Success!'
			})
		}
		else {
			toastContext({
				variant: 'danger',
				header: 'Add spell to character',
				message: `${response.statusCode} ${response.statusText}: ${response.body}`
			})
		}
	}

	return (
		<Card
			className='mb-1'
			onClick={toggleCollapse}
		>
			<Card.Body>
				<Card.Title>{spell.name}</Card.Title>
				<Card.Subtitle>
					{spell.level > 0 && `Level ${spell.level} `}
					{spell.school}
					{spell.level === 0 && " cantrip"}
				</Card.Subtitle>
				<Collapse in={open}>
					<Card.Body>
						<Row>
							<Col>Casting Time</Col>
							<Col>{spell.casting_time}</Col>
						</Row>
						<Row>
							<Col>Range</Col>
							<Col>{spell.range}</Col>
						</Row>
						<Row>
							<Col>Components</Col>
							<Col>{spell.components}</Col>
						</Row>
						<Row>
							<Col>Duration</Col>
							<Col>{spell.duration}</Col>
						</Row>
						{
							showAddSpellButton &&
							<Button
								variant="primary"
								onClick={addSpell}
								aria-label="addSpell"
							>Add to Spellbook</Button>
						}
					</Card.Body>
				</Collapse>
			</Card.Body>
		</Card>
	);
}

SpellCard.propTypes = {
	//todo
};

export default SpellCard;