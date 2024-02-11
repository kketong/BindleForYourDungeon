import { useState } from "react";
import { createPortal } from "react-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import AddFeatsModal from "../feats/AddFeatsModal";

export const FeatsTab = ({
	character,
	characterFeats,
	addFeat
}) => {
	const [showFeatsModal, setShowFeatsModal] = useState(false);
	const [feats, setFeats] = useState(characterFeats);
	const [selectedFeat, setSelectedFeat] = useState(null);
	function toggleShowFeatsModal() {
		setShowFeatsModal(!showFeatsModal);
	}

	function selectFeat(e) {
		e.preventDefault();
		const featId = e.target.value;
		const matchedFeat = feats.find((element) => element.id === featId);

		setSelectedFeat(matchedFeat);
	}

	return (<>
		<Tab.Container id="feats-tabs">
			<Row>
				<Col sm={4}
					className="overflow-y-auto"
					style={{ maxHeight: "200px" }}>
					<ListGroup variant="flush">
						{feats.length > 0 &&
							feats.map((feat) => (
								<ListGroup.Item id={`toggle-show-${feat.id}`} action onClick={selectFeat} value={feat.id}>
									{feat.name}
								</ListGroup.Item>
							))}
						<Button
							id="show-feats-modal"
							onClick={toggleShowFeatsModal}
							variant="primary"
						>
							Add new feat
						</Button>
					</ListGroup>
				</Col>
				<Col sm={8}
					className="overflow-y-auto"
					style={{ maxHeight: "200px" }}>
					<Tab.Content
					>
						{selectedFeat &&
							<>
								<Row>
									<Col>
										{selectedFeat.desc}
										{selectedFeat.effectsDesc &&
											<ul>
												{selectedFeat.effectsDesc.map(effect =>
													<li>{effect}</li>
												)}
											</ul>
										}
									</Col>
								</Row>
								{selectedFeat.prerequisite &&
									<Row>
										<Col>
											Prerequisite: {selectedFeat.prerequisite}
										</Col>
									</Row>
								}
							</>

						}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
		{
			showFeatsModal &&
			<AddFeatsModal
				character={character}
				onHide={toggleShowFeatsModal}
				addFeat={addFeat}
				show={showFeatsModal}
			/>
		}
	</>);
}

export default FeatsTab;