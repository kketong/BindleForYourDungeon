import { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import AddFeatsModal from "../feats/AddFeatsModal";

function FeatsTab({ character, characterFeats, addFeat }) {
  const [showFeatsModal, setShowFeatsModal] = useState(false);
  const [selectedFeat, setSelectedFeat] = useState(null);
  function toggleShowFeatsModal() {
    setShowFeatsModal(!showFeatsModal);
  }

  function selectFeat(e) {
    e.preventDefault();
    const featId = e.target.value;
    const matchedFeat = characterFeats.find((element) => element.id === featId);

    setSelectedFeat(matchedFeat);
  }

  return (
    <>
      <Tab.Container id="feats-tabs">
        <Row>
          <Col
            sm={4}
            className="overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            <ListGroup variant="flush">
              {characterFeats.length > 0 &&
                characterFeats.map((feat) => (
                  <ListGroup.Item
				  	key={feat.id}
                    id={`toggle-show-${feat.id}`}
                    action
                    onClick={selectFeat}
                    value={feat.id}
                  >
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
          <Col
            sm={8}
            className="overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            <Tab.Content>
              {selectedFeat && (
                <>
                  <Row>
                    <Col>
                      {selectedFeat.desc}
                      {selectedFeat.effectsDesc && (
                        <ul>
                          {selectedFeat.effectsDesc.map((effect) => (
                            <li>{effect}</li>
                          ))}
                        </ul>
                      )}
                    </Col>
                  </Row>
                  {selectedFeat.prerequisite && (
                    <Row>
                      <Col>Prerequisite: {selectedFeat.prerequisite}</Col>
                    </Row>
                  )}
                </>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      {showFeatsModal && (
        <AddFeatsModal
          character={character}
          onHide={toggleShowFeatsModal}
          addFeat={addFeat}
          show={showFeatsModal}
        />
      )}
    </>
  );
}

export default FeatsTab;
