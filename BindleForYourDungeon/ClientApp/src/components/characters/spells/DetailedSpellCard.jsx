import {
	Modal,
	Row,
	Col
} from 'react-bootstrap';
export default function DetailedSpellCard({ spell, props }) {

	return (
		<Modal {...props}>
			<Modal.Header closeButton>
				<Modal.Title>{spell.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{spell.level > 0 && `Level ${spell.level} `}
				{spell.school.name}
				{spell.level === 0 && " cantrip"}
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
				{ }
			</Modal.Body>
		</Modal>
	);
}