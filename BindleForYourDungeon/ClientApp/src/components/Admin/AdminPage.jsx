import {
	Container,
	Button,
	Row,
	Col
} from 'react-bootstrap';
import { getAllSpells } from '../../apis/dnd5eapi';
import { postDnd5eSpell } from '../../apis/api';

export default function AdminPage() {	
	async function updateSpells() {
		const spells = await getAllSpells();
		spells.forEach((spell) => {
			postDnd5eSpell(spell);
		})
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
