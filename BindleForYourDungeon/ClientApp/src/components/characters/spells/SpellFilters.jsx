import React from 'react';

import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {
	characterClasses,
	characterSubclasses,
	magicSchools
} from '../../../Constants';

export function filterSpells(spells, nameFilter, classFilter, subclassFilter, schoolFilter, maxLevelFilter, minLevelFilter) {
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
	return spellsToFilter;
}

export function SpellFilters({
	setClassFilter,
	setSubclassFilter,
	setNameFilter,
	setSchoolFilter,
	setMinLevelFilter,
	setMaxLevelFilter
}) {
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
		<Form as={Container}>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="search-spell-select-class">
						<FloatingLabel controlId="search-spell-select-class-label" label="Filter by class">
							<Form.Select onChange={handleClassFilterChange}>
								<option key='class-filter-option-none' value="">None</option>
								{characterClasses.map((characterClass) =>
									<option key={`characterClass-filter-option-${characterClass}`} value={characterClass}>{characterClass}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="search-spell-select-subclass">
						<FloatingLabel controlId="search-spell-select-subclass-label" label="Filter by subclass">
							<Form.Select onChange={handleSubclassFilterChange}>
								<option key='subclass-filter-option-none' value="">None</option>
								{characterSubclasses.map((subclass) =>
									<option key={`subclass-filter-option-${subclass}`} value={subclass}>{subclass}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="search-spell-select-school">
						<FloatingLabel controlId="search-spell-select-school-label" label="Filter by school">
							<Form.Select onChange={handleSchoolFilterChange}>
								<option key='school-filter-option-none' value="">None</option>
								{magicSchools.map((school) =>
									<option key={`school-filter-option-${school}`} value={school}>{school}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="search-spell-select-min-level">
						<FloatingLabel controlId="search-spell-select-min-level-label" label="Minimum level">
							<Form.Select onChange={handleMinLevelFilterChange}>
								<option key='min-level-filter-option-none' value={0}>None</option>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) =>
									<option key={`min-level-filter-option-${level}`} value={level}>{level}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3" controlId="search-spell-select-max-level">
						<FloatingLabel controlId="search-spell-select-max-level-label" label="Maximum level">
							<Form.Select onChange={handleMaxLevelFilterChange}>
								<option key='max-level-filter-option-none' value={0}>None</option>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) =>
									<option key={`max-level-filter-option-${level}`} value={level}>{level}</option>
								)}
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group className="mb-3" controlId="searchSpellForm.SearchField">
				<FloatingLabel
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
	)
}

export default SpellFilters