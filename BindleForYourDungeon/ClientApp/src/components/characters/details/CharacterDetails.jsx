import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import FeatsTab from "../feats/FeatsTab";
import InputGroupForm from "../../common/InputGroupForm";

export function CharacterDetails({
	character,
	addFeat,
	characterFeats,
	setCharacter,
}) {

	function handleChanged(e) {
		const propertyName = e.target.id;
		setCharacter({ ...character, [propertyName]: e.target.value });
	}

	function handleInspiredChanged(e) {
		const value = e.target.checked;
		setCharacter({ ...character, inspired: value });
	}

	function handleAbilityScoreChanged(e) {
		const propertyName = e.target.id;
		setCharacter({
			...character,
			abilityScore: {
				...character.abilityScore,
				[propertyName]: e.target.value
			}
		});
	}

	return (
		<>
			<Container as="form" fluid id="character-details-form">
				<Row>
					<Col>
						<InputGroupForm
							propertyName="Name"
							placeholderVal={character.name}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col>
						Multiclass???
						<Form.Select>
						</Form.Select>						
					</Col>
					<Col sm={3}>
						<InputGroup>
							<InputGroup.Text>Hit Points</InputGroup.Text>
							<Form.Control
								type="text"
								className="wd-1"
								placeholder={character.currentHitPoints}
								id="currentHitPoints"
								onChange={handleChanged}
								type="number"
							/>
							<InputGroup.Text>Max</InputGroup.Text>
							<Form.Control
								type="text"
								placeholder={character.maxHitPoints}
								id="maxHitPoints"
								onChange={handleChanged}
								type="number"
							/>
						</InputGroup>
					</Col>
					<Col sm={2}>
						<InputGroupForm
							propertyName="Race"
							placeholderVal={character.race}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col sm={2}>
						<InputGroupForm
							propertyName="Level"
							placeholderVal={character.level}
							handleChanged={handleChanged}
							type="number"
						/>
					</Col>
					<Col sm={2}>
						<InputGroupForm
							propertyName="Experience"
							label="Exp"
							placeholderVal={character.experience}
							handleChanged={handleChanged}
							type="number"
						/>
					</Col>
				</Row>
				Ability Score
				<Row>
					<Col>
						<InputGroupForm
							propertyName="Strength"
							placeholderVal={character.abilityScore.strength}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
					<Col>
						<InputGroupForm
							propertyName="Dexterity"
							placeholderVal={character.abilityScore.dexterity}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
					<Col>
						<InputGroupForm
							propertyName="Constitution"
							placeholderVal={character.abilityScore.constitution}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
					<Col>
						<InputGroupForm
							propertyName="Wisdom"
							placeholderVal={character.abilityScore.wisdom}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
					<Col>
						<InputGroupForm
							propertyName="Intelligence"
							placeholderVal={character.abilityScore.intelligence}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
					<Col>
						<InputGroupForm
							propertyName="Charisma"
							placeholderVal={character.abilityScore.charisma}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Label>Description</Form.Label>
						<Form.Control
							id="description"
							as="textarea"
							rows={5}
							onChange={handleChanged}
							value={character.description}
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
					<Col sm={1}>
						<Form.Switch
							id="inspired"
							label="Inspired"
							onChange={handleInspiredChanged}
						/>
					</Col>

				</Row>
			</Container>
		</>
	);
}
