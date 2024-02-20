import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';

import { useToastContext } from '../../../contexts/ToastContext.jsx';
import {
	addCharacterSpell,
	removeCharacterSpell
} from '../../../apis/api.jsx';
import deserializeDice from '../../../helpers/diceHelper.jsx';

export default function SpellAccordionItem({
	character,
	spell,
	showAddSpellButton = false,
	showRemoveSpellButton = false,
	showClassBadges = false,
	addLearntSpell,
	removeLearntSpell
}) {
	const showToast = useToastContext();
	const [showDescription, setShowDescription] = React.useState(false);

	async function addSpell() {
		await addCharacterSpell(character.id, spell.id)
			.then(() => {
				addLearntSpell(spell);
				showToast({
					variant: 'success',
					header: `Add spell '${spell.name}' to ${character.name}`,
					message: 'Request successful'
				});
			})
			.catch((error) => {
				showToast({
					variant: 'danger',
					header: `Add spell '${spell.name}' to ${character.name} failed`,
					message: error.message
				});
			});
	}

	async function removeSpell() {
		await removeCharacterSpell(character.id, spell.id)
			.then(() => {
				removeLearntSpell(spell);
				showToast({
					variant: 'success',
					header: `Remove spell '${spell.name}' from ${character.name}`,
					message: 'Request successful'
				});
			})
			.catch((error) =>
				showToast({
					variant: 'danger',
					header: `Remove spell '${spell.name}' from ${character.name} failed`,
					message: error.message
				}));
	}

	function toggleDescription() {
		setShowDescription(!showDescription);
	}

	return (
		<Accordion.Item
			eventKey={`accordion-item-spell-${spell.id}`}
		>
			<Accordion.Header>
				<Stack className="md">
					<strong>{spell.name}</strong>
					{/*<span class="badge rounded-pill text-bg-secondary">*/}
					<small>
						{spell.level > 0 && `Level ${spell.level} `}
						{spell.school}
						{spell.level === 0 && " cantrip"}
					</small>
					{/*</span>*/}
				</Stack>
				<Stack direction="horizontal" gap={1}>
					{showClassBadges && spell.classes.map(characterClass =>
						<span key={`${spell.name}-badge-class-${characterClass}`} className="badge rounded-pill text-bg-secondary">
							{characterClass}
						</span>
					)}
					{spell.ritual &&
						<span key={`badge-ritual`} className="badge rounded-pill text-bg-secondary">Ritual</span>}
				</Stack>
			</Accordion.Header>
			<Accordion.Body>
				<Stack gap={3}>
					<ListGroup horizontal='xl'>
						<ListGroup.Item>Casting Time: {spell.castingTime}</ListGroup.Item>
						<ListGroup.Item>Range: {spell.range}{spell.areaOfEffectSize && `, affecting a ${spell.areaOfEffectSize}-foot ${spell.areaOfEffectType} area`}</ListGroup.Item>
						<ListGroup.Item>Components: {spell.components}</ListGroup.Item>
						<ListGroup.Item>Duration: {spell.concentration && 'Concentration, '} {spell.duration}</ListGroup.Item>
						{spell.attackType && <ListGroup.Item>Attack type: {spell.attackType}</ListGroup.Item>}
						{spell.material && <ListGroup.Item>Materials: {spell.material}</ListGroup.Item>}
					</ListGroup>
					<Form>
						<Form.Switch
							id="show-description-switch"
							label="Show details"
							onClick={toggleDescription}
						/>
					</Form>
					{showDescription &&
						<Tabs
							defaultActiveKey="description"
							id="uncontrolled-tab-example"
							className="mb-3"
						>
							<Tab eventKey="description" title="Description">
								<Row>
									{spell.desc.map((value) =>
										<p>{value}</p>
									)}

									{spell.higherLevel.length > 0 &&
										<p className='spell-higher-level-desc'>Higher level casting: {spell.higherLevel.join(' ')}</p>}
								</Row>
							</Tab>
							{spell.healAtSlotLevel &&
								<Tab eventKey="heal" title="Healing Power">
									<Table>
										<thead>
											<tr>
												<th>Slot Level</th>
												<th>Healing power</th>
											</tr>
										</thead>
										<tbody>
											{deserializeDice(spell.healAtSlotLevel)
												.map((levelDicePair) =>
													<tr>
														<th>{levelDicePair.level}</th>
														<th>{levelDicePair.val}</th>
													</tr>
												)}
										</tbody>
									</Table>
								</Tab>							
							}
							{(spell.damageAtSlotLevel || spell.damageAtCharacterLevel) &&
								<Tab eventKey="damage" title="Damage">
									{spell.damageAtSlotLevel &&
										<Table>
											<thead>
												<tr>
													<th>Slot Level</th>
													<th>Damage ({spell.damageType})</th>
												</tr>
											</thead>
											<tbody>
												{deserializeDice(spell.damageAtSlotLevel)
													.map((levelDicePair) =>
														<tr>
															<th>{levelDicePair.level}</th>
															<th>{levelDicePair.val}</th>
														</tr>
													)}
											</tbody>
										</Table>
									}
									{spell.damageAtCharacterLevel &&
										<Table>
											<thead>
												<tr>
													<th>Character Level</th>
													<th>Damage ({spell.damageType})</th>
												</tr>
											</thead>
											<tbody>
												{deserializeDice(spell.damageAtCharacterLevel)
													.map((levelDicePair) =>
														<tr>
															<th>{levelDicePair.level}</th>
															<th>{levelDicePair.val}</th>
														</tr>
													)}
											</tbody>
										</Table>
									}
								</Tab>
							}
						</Tabs>
					}
					{showAddSpellButton &&
						<Button
							variant="primary"
							onClick={addSpell}
							aria-label="Add Spell"
						>
							Add to Spellbook
						</Button>
					}
					{showRemoveSpellButton &&
						<Button
							variant="primary"
							onClick={removeSpell}
							aria-label="Remove Spell"
						>
							Remove from Spellbook
						</Button>
					}
				</Stack>
			</Accordion.Body>
		</Accordion.Item >
	);
}