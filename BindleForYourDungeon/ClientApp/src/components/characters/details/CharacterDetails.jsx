import React from "react";
import { createPortal } from "react-dom";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";

import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

export function CharacterDetails({ character }) {
  const [changes, setChanges] = React.useState([]);
  const [showFeatsModal, setShowFeatsModal] = React.useState(false);

	React.useEffect(() => {
		createPortal()
	}, [showFeatsModal]);

  function saveCharacter() {}

  function toggleFeatsModal(e) {
    e.preventDefault();
    setShowFeatsModal(!showFeatsModal);
  }

  return (
    <>
      <Container as="Form" id="character-details-form">
        <Row>
          <Col>
            <InputGroup id="input-group-name">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                id="name"
                placeholder={character.name}
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup id="input-group-race">
              <InputGroup.Text>Race</InputGroup.Text>
              <Form.Control
                type="text"
                id="race"
                placeholder={character.race}
              />
            </InputGroup>
          </Col>
          <Col sm={2}>
            <InputGroup id="input-group-level">
              <InputGroup.Text>Level</InputGroup.Text>
              <Form.Control
                type="text"
                id="level"
                placeholder={character.level}
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup id="input-group-experience">
              <InputGroup.Text>Exp</InputGroup.Text>
              <Form.Control
                id="experience"
                type="text"
                placeholder={character.experience}
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Check id="inspired" type="switch" label="Inspired" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              placeholder={character.description}
              rows={3}
            />
          </Col>
          <Col>
            <Form.Label>Feats</Form.Label>
            <Tab.Container id="feats-tabs">
              <Row>
                <Col sm={4}>
                  <ListGroup>
                    {character.feats &&
                      character.feats.map((feat) => (
                        <ListGroup.Item
                          id={`toggle-show-${feat}`}
                          action
                          href={feat}
                        >
                          {feat}
                        </ListGroup.Item>
                      ))}
                    <Button
                      id="show-feats-modal"
                      action
                      onClick={toggleFeatsModal}
                      variant="primary"
                    >
                      Add feat
                    </Button>
                  </ListGroup>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    {character.feats &&
                      character.feats.map((feat) => (
                        <Tab.Pane eventKey={feat}>
                          {" "}
                          {feat.description}{" "}
                        </Tab.Pane>
                      ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <InputGroup>
              <InputGroup.Text>Hit Points</InputGroup.Text>
              <Form.Control
                type="text"
                className="wd-1"
                placeholder={character.hitPoints}
              />
              <InputGroup.Text>Max</InputGroup.Text>
              <Form.Control type="text" placeholder={character.maxHitPoints} />
            </InputGroup>
          </Col>
        </Row>
        <Button onClick={saveCharacter}>Save changes</Button>
      </Container>
    </>
  );
}
