import {
	Row,
	Col,
} from 'react-bootstrap';
import SpellCard from '../spells/SpellCard';
export function Spellbook({ spells }) {
	if (spells !== null)
	return (
		<>
			{spells.map((_, index) => {
				if (index % 3 === 0)
					return (
						<Row>
							<Col>
								<SpellCard spell={spells[index]} />
							</Col>
							<Col>
								<SpellCard spell={spells[index+1]} />
							</Col>
							<Col>
								<SpellCard spell={spells[index+2]} />
							</Col>
						</Row>
					)
			})}
		</>
	)
}