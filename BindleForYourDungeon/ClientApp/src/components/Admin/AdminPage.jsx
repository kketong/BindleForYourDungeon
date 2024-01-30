import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { getAllSpells } from '../../apis/dnd5eapi';
import { postDnD5eSpells } from '../../apis/api';

export default function AdminPage() {	
	async function updateSpells() {
		const spells = await getAllSpells();
		postDnD5eSpells(spells);
	}

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Button onClick={updateSpells}>Update spells</Button>
					</Col>
				</Row>
			</Container>
		</>
	)
}
