import React, {
	useState,
	useEffect
} from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Pagination from '../../Pagination';
import SpellAccordionItem from './SpellAccordionItem';
import {
	characterClasses,
	characterSubclasses,
	magicSchools
} from '../../../Constants';

export const SearchSpellList = ({
	character,
	spells,
	pageSize,
	showAddSpellButton,
	showRemoveSpellButton,
	showClassBadges,
	setSpells
}) => {
	const [filteredSpells, setFilteredSpells] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [classFilter, setClassFilter] = useState('');
	const [subclassFilter, setSubclassFilter] = useState('');
	const [schoolFilter, setSchoolFilter] = useState('');
	const [nameFilter, setNameFilter] = useState('');
	const [maxLevelFilter, setMaxLevelFilter] = useState(0);
	const [minLevelFilter, setMinLevelFilter] = useState(0);

	useEffect(() => {
		setFilteredSpells(spells);
	}, [spells]);

	useEffect(() => {
		let spellsToFilter = spells;
		if (nameFilter.length !== 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.name.toLowerCase().includes(nameFilter));
		}
		if (classFilter.length !== 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.classes.some(characterClass => characterClass === classFilter));
		}
		if (subclassFilter.length !== 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.subclasses.some(subclass => subclass === subclassFilter));
		}
		if (schoolFilter.length !== 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.school === schoolFilter);
		}
		if (maxLevelFilter > 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.level <= maxLevelFilter);
		}
		if (minLevelFilter > 0) {
			spellsToFilter = spellsToFilter.filter(spell => spell.level >= minLevelFilter);
		}
		setFilteredSpells(spellsToFilter);
		setCurrentPage(1);
	}, [
		spells,
		classFilter,
		subclassFilter,
		schoolFilter,
		nameFilter,
		maxLevelFilter,
		minLevelFilter
	])

	function handleSchoolFilterChange(event) {
		setSchoolFilter(event.target.value);
	}
	function handleMaxLevelFilterChange(event) {
		setMaxLevelFilter(event.target.value);
	}
	function handleMinLevelFilterChange(event) {
		setMinLevelFilter(event.target.value);
	}
	function handleClassFilterChange(event) {
		setClassFilter(event.target.value);
	}
	function handleSubclassFilterChange(event) {
		setSubclassFilter(event.target.value);
	}
	function handleNameChange(event) {
		setNameFilter(event.target.value.toLowerCase());
	}

	return (
		<>
			<Form as={Container} >
				{/*<Stack direction="horizontal" gap={3}>*/}
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="search-spell-select-class">
							<FloatingLabel controlId="search-spell-select-class-label" label="Filter by class">
								<Form.Select onChange={handleClassFilterChange}>
									<option value="">None</option>
									{characterClasses.map((characterClass) =>
										<option value={characterClass}>{characterClass}</option>
									)}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="search-spell-select-subclass">
							<FloatingLabel controlId="search-spell-select-subclass-label" label="Filter by subclass">
								<Form.Select onChange={handleSubclassFilterChange}>
									<option value="">None</option>
									{characterSubclasses.map((subclass) =>
										<option value={subclass}>{subclass}</option>
									)}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="search-spell-select-school">
							<FloatingLabel controlId="search-spell-select-school-label" label="Filter by school">
								<Form.Select onChange={handleSchoolFilterChange}>
									<option value="">None</option>
									{magicSchools.map((school) =>
										<option value={school}>{school}</option>
									)}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="search-spell-select-min-level">
							<FloatingLabel controlId="search-spell-select-min-level-label" label="Minimum level">
								<Form.Select onChange={handleMinLevelFilterChange}>
									{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) =>
										<option value={level}>{level}</option>)
									}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="search-spell-select-max-level">
							<FloatingLabel controlId="search-spell-select-max-level-label" label="Maximum level">
								<Form.Select onChange={handleMaxLevelFilterChange}>
									{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) =>
										<option value={level}>{level}</option>)
									}
								</Form.Select>
							</FloatingLabel>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group className="mb-3" controlId="searchSpellForm.SearchField">
					<FloatingLabel
						controlId="searchFloating
						"
						label="Search by spell name, e.g. Acid Arrow"
						className="mb-3"
					>
						<Form.Control
							placeholder='Search by spell name, e.g. Acid Arrow'
							aria-label='Search by spell name'
							onChange={handleNameChange}
						/>
					</FloatingLabel>
				</Form.Group>
			</Form>
			<Accordion>
				{filteredSpells
					.slice(((currentPage - 1) * pageSize), currentPage * pageSize)
					.map((spell) => (
						<SpellAccordionItem
							key={`search-spell-list-spell-${spell.id}`}
							character={character}
							spell={spell}
							showAddSpellButton={showAddSpellButton}
							showRemoveSpellButton={showRemoveSpellButton}
							showClassBadges={showClassBadges}
							setSpells={setSpells}
						/>
					))
				}
			</Accordion>
			<Pagination
				itemsCount={filteredSpells.length}
				itemsPerPage={pageSize}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				alwaysShown={false} />
		</>
	);
}

export default SearchSpellList;