import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { getSpells } from "../../../apis/api";
import SearchSpellList from "./SearchSpellList";

export default function SearchSpellModal({
  character,
  addLearntSpell,
  removeLearntSpell,
  ...props
}) {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    getSpells().then(setSpells);
  }, []);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Spell Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {spells.length < 1 ? (
          <Spinner className="align-center" animation="border" />
        ) : (
          <SearchSpellList
            character={character}
            spells={spells}
            pageSize={7}
            showAddSpellButton={true}
            showClassBadges={true}
			addLearntSpell={addLearntSpell}
			removeLearntSpell={removeLearntSpell}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}
