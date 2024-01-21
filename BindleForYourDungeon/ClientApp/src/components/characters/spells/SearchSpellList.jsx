import React, {
	useState,
	useEffect
} from 'react';
import {
	Col,
	FloatingLabel,
	Form,
	Row,
} from 'react-bootstrap';
import SpellCard from './SpellCard';
import Pagination from '../../Pagination';
import {
	magicSchools,
	characterClasses
} from '../../../Constants';

export const SearchSpellList = ({ spells, handleShowDetails, onToggleAddSpell }) => {
	const [filteredSpells, setFilteredSpells] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [classFilter, setClassFilter] = useState('');
	const [schoolFilter, setSchoolFilter] = useState('');
	const [nameFilter, setNameFilter] = useState('');
	const pageSize = 10;

	useEffect(() => {
		setFilteredSpells(spells);
	}, [spells]);

	useEffect(() => {
		let spellArray = spells;
		spellArray = nameFilter.length !== 0 ?
			spellArray.filter(spell => spell.name.includes(nameFilter)) :
			spellArray;
		spellArray = classFilter.length !== 0 ?
			spellArray.filter(spell => spell.classes.some((classObj) => classObj.name === classFilter)) :
			spellArray;
		spellArray = schoolFilter.length !== 0 ?
			spellArray.filter(spell => spell.school.name === schoolFilter) :
			spellArray;

		setFilteredSpells(spellArray);
		console.log("filter hit");
		setCurrentPage(1);
	}, [
		spells,
		classFilter,
		schoolFilter,
		nameFilter,
	])

	function handleSchoolFilterChange(event) {
		setSchoolFilter(event.target.value);
	}

	function handleClassFilterChange(event) {
		setClassFilter(event.target.value);
	}

	function handleNameChange(event) {
		setNameFilter(event.target.value);
	}

	return (
		<>
			<Form>
				<Row>
					<Col>
						<Form.Group className="mb-3" controlId="searchSpellForm.ClassFilterSelect">
							<Form.Label>Filter by Character Class</Form.Label>
							<Form.Select onChange={handleClassFilterChange}>
								<option value="">None</option>
								{characterClasses.map((characterClass) =>
									<option value={characterClass}>{characterClass}</option>
								)}
							</Form.Select>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="searchSpellForm.ClassFilterSelect">
							<Form.Label>Filter by Magic School</Form.Label>
							<Form.Select onChange={handleSchoolFilterChange}>
								<option value="">None</option>
								{magicSchools.map((school) =>
									<option value={school}>{school}</option>
								)}
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group className="mb-3" controlId="searchSpellForm.SearchField">
					<FloatingLabel
						controlId="searchFloatingInput"
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
			{filteredSpells
					.slice(((currentPage - 1) * pageSize), currentPage * pageSize)
					.map((spell) => (
						<SpellCard
							key={spell.index}
							spell={spell}
							showSpellDetailsClicked={handleShowDetails}
						/>
					))
			}
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