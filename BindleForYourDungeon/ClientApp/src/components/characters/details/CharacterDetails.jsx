import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

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
					<Col sm={2}>
						<InputGroupForm
							propertyName="Race"
							placeholderVal={character.race}
							handleChanged={handleChanged}
						/>
					</Col>
					<Col sm={3}>
						<InputGroup>
							<InputGroup.Text>HP</InputGroup.Text>
							<Form.Control
								className="wd-1"
								placeholder={character.currentHitPoints}
								id="currentHitPoints"
								onChange={handleChanged}
								type="number"
							/>
							<InputGroup.Text>Max</InputGroup.Text>
							<Form.Control
								placeholder={character.maxHitPoints}
								id="maxHitPoints"
								onChange={handleChanged}
								type="number"
							/>
						</InputGroup>
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
					<Stack style={{ maxWidth: "140px" }}>
						<InputGroupForm
							propertyName="Strength"
							label="Str"
							placeholderVal={character.abilityScore.strength}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>					
						<InputGroupForm
							propertyName="Dexterity"
							label="Dex"
							placeholderVal={character.abilityScore.dexterity}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
						<InputGroupForm
							propertyName="Constitution"
							label="Con"
							placeholderVal={character.abilityScore.constitution}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
						<InputGroupForm
							propertyName="Wisdom"
							label="Wis"
							placeholderVal={character.abilityScore.wisdom}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
						<InputGroupForm
							propertyName="Intelligence"
							label="Int"
							placeholderVal={character.abilityScore.intelligence}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
						<InputGroupForm
							propertyName="Charisma"
							label="Cha"
							placeholderVal={character.abilityScore.charisma}
							handleChanged={handleAbilityScoreChanged}
							type="number"
						/>
					</Stack>
					<Col sm={5}>
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
							key={characterFeats}
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
