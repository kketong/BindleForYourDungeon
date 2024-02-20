import React, { useState, useEffect, useMemo } from "react";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import { getSpells } from "../../../apis/api";
import SpellAccordion from "./SpellAccordion";
import SpellFilters, { filterSpells } from "./SpellFilters";

export default function SearchSpellModal({
	character,
	addLearntSpell,
	removeLearntSpell,
	...props
}) {
	const [spells, setSpells] = useState([]);

	const [classFilter, setClassFilter] = useState('');
	const [subclassFilter, setSubclassFilter] = useState('');
	const [schoolFilter, setSchoolFilter] = useState('');
	const [nameFilter, setNameFilter] = useState('');
	const [maxLevelFilter, setMaxLevelFilter] = useState(0);
	const [minLevelFilter, setMinLevelFilter] = useState(0);

	const filteredSpells = useMemo(() => {
		return filterSpells(spells, nameFilter, classFilter, subclassFilter, schoolFilter, maxLevelFilter, minLevelFilter);
	}, [
		spells,
		classFilter,
		subclassFilter,
		schoolFilter,
		nameFilter,
		maxLevelFilter,
		minLevelFilter,
	]);

	useEffect(() => {
		getSpells().then(setSpells);
	}, []);

	return (
		<Modal {...props}>
			<Modal.Header closeButton>
				<Modal.Title>Spell Search</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<SpellFilters
					setClassFilter={setClassFilter}
					setMaxLevelFilter={setMaxLevelFilter}
					setMinLevelFilter={setMinLevelFilter}
					setNameFilter={setNameFilter}
					setSchoolFilter={setSchoolFilter}
					setSubclassFilter={setSubclassFilter}
				/>
				{spells.length < 1 ? (
					<Spinner className="align-center" animation="border" />
				) : (
					<SpellAccordion
						key={filteredSpells}
						character={character}
						spells={filteredSpells}
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