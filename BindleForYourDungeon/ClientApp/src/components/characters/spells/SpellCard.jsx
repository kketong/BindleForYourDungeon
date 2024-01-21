import { useState } from 'react';
import {
	Button,
	ButtonGroup,
	Card,
	Collapse,
	Row,
	Col
} from 'react-bootstrap';
import PropTypes from "prop-types";

export const SpellCard = ({
	spell,
	showSpellDetailsClicked
}) => {
	const [open, setOpen] = useState(false);
	function toggleCollapse() {
		setOpen(!open);
	}

	function addSpell() {

	}

	return (
		<>
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
					<Card.Text>
						<Collapse in={open}>
							<div>
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
								<ButtonGroup>
									<Button
										variant="primary"
										onClick={addSpell}
										aria-label="addSpell">Add Spell</Button>
									<Button
										variant="secondary"
										onClick={showSpellDetailsClicked}
										aria-label="Detailed view">Detailed view</Button>
								</ButtonGroup>
							</div>
						</Collapse>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

SpellCard.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	setCurrentPage: PropTypes.func.isRequired,
	alwaysShown: PropTypes.bool
};

export default SpellCard;