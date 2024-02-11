import React from 'react'
import Accordion from 'react-bootstrap/esm/Accordion'
import Button from 'react-bootstrap/esm/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { addCharacterFeat } from '../../../apis/api'
import { useToastContext } from '../../../contexts/ToastContext'

export function FeatAccordionItem({ character, feat, addFeat, ...props }) {
	const showToast = useToastContext();
	async function handleAddFeat() {
		await addCharacterFeat(character.id, feat.id)
			.then(() => {
				addFeat(feat);
				showToast({
					variant: 'success',
					header: `Add feat '${feat.name}' to ${character.name}`,
					message: 'Request successful'
				});
			})
			.catch((error) => {
				showToast({
					variant: 'danger',
					header: `Add feat '${feat.name}' to ${character.name} failed`,
					message: error.message
				});
			});
	}


	return (
		<Accordion.Item
			eventKey={`accordion-item-feat-${feat.id}`}
			{...props}
		>
			<Accordion.Header>{feat.name}</Accordion.Header>
			<Accordion.Body>
				{feat.prerequisite &&
					<Row>
						<Col>
							Prerequisite: {feat.prerequisite}
						</Col>
					</Row>
				}
				<Row>
					<Col>
						Description <br />
						{feat.desc}
						{feat.effectsDesc &&
							<ul>
								{feat.effectsDesc.map(effect =>
									<li>{effect}</li>
								)}
							</ul>
						}
					</Col>
				</Row>
				<Button
					onClick={handleAddFeat}
				>Add feat</Button>
			</Accordion.Body>
		</Accordion.Item>
	)
}

export default FeatAccordionItem
