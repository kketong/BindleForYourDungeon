import { useState } from 'react';
import {
	Button,
	Card,
	Collapse,
	Row,
	Col
} from 'react-bootstrap';

export const SpellCard = ({
	spell,
	showAddSpellButton
}) => {
	const [open, setOpen] = useState(false);
	function toggleCollapse() {
		setOpen(!open);
	}

	function addSpell() {
		
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
					{spell.school.name}
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
								disabled
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