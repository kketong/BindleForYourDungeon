import { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import FeatsTab from "../feats/FeatsTab";
import FormTextInput from "../../FormTextInput";

export function CharacterDetails({
	character,
	addFeat,
	characterFeats,
	setCharacter,
}) {
	const [changes, setChanges] = useState([]);

	function handleChanged(e) {
		const propertyName = e.target.id;
		const value = e.target.value;
		const indexOf = changes.findIndex(
			(change) => change.propertyName === propertyName
		);
		if (indexOf >= 0) {
			changes[indexOf] = { propertyName: propertyName, value: value };
			setChanges(changes);
		} else {
			setChanges((prev) => [...prev, { propertyName: propertyName, value: value }]);
		}
	}

	return (
		<>
			<Container as="form" id="character-details-form">
				<Row>
					<Col>
						<FormTextInput
							propertyName="Name"
							placeholderVal={character.name}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col sm={3}>
						<InputGroup>
							<InputGroup.Text>Hit Points</InputGroup.Text>
							<Form.Control
								type="text"
								className="wd-1"
								placeholder={character.hitPoints}
								id="hitPoints"
								onChange={handleChanged}
							/>
							<InputGroup.Text>Max</InputGroup.Text>
							<Form.Control
								type="text"
								placeholder={character.maxHitPoints}
								id="maxHitPoints"
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col sm={2}>
						<FormTextInput
							propertyName="Race"
							placeholderVal={character.race}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col sm={2}>
						<FormTextInput
							propertyName="Level"
							placeholderVal={character.level}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col sm={2}>
						<FormTextInput
							propertyName="Exp"
							placeholderVal={character.experience}
							handleChanged={handleChanged}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Label>Description</Form.Label>
						<Form.Control
							id="description"
							as="textarea"
							placeholder={character.description}
							rows={5}
							onChange={handleChanged}
						/>
					</Col>
					<Col>
						<Form.Label>Feats</Form.Label>
						<FeatsTab
							character={character}
							addFeat={addFeat}
							characterFeats={characterFeats}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Strength</InputGroup.Text>
							<Form.Control
								type="text"
								id="strength"
								placeholder={character.abilityScore.strength}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Dexterity</InputGroup.Text>
							<Form.Control
								type="text"
								id="dexterity"
								placeholder={character.abilityScore.dexterity}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Constitution</InputGroup.Text>
							<Form.Control
								type="text"
								id="constitution"
								placeholder={character.abilityScore.constitution}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Wisdom</InputGroup.Text>
							<Form.Control
								type="text"
								id="wisdom"
								placeholder={character.abilityScore.wisdom}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Intelligence</InputGroup.Text>
							<Form.Control
								type="text"
								id="intelligence"
								placeholder={character.abilityScore.intelligence}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup id="input-group-ability-score-strength">
							<InputGroup.Text>Charisma</InputGroup.Text>
							<Form.Control
								type="text"
								id="charisma"
								placeholder={character.abilityScore.charisma}
								onChange={handleChanged}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col sm={1}>
						<Form.Check
							id="inspired"
							type="switch"
							label="Inspired"
							onChange={handleChanged}
						/>
					</Col>

				</Row>
				<Button disabled>Save changes</Button>
			</Container>
		</>
	);
}
