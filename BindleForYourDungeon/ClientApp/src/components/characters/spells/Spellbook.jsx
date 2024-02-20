import {
	useState,
	useMemo
} from 'react';

import Button from 'react-bootstrap/Button';

import SearchSpellModal from './SearchSpellModal';
import SpellAccordion from './SpellAccordion';
import SpellFilters, { filterSpells } from './SpellFilters';

export function Spellbook({
	character,
	spells,
	addLearntSpell,
	removeLearntSpell
}) {
	const [showSearchSpellModal, setShowSearchSpellModal] = useState(false);
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

	function toggleSpellSearchModal() {
		setShowSearchSpellModal(!showSearchSpellModal);
	}

	return (
		<>
			<Button onClick={toggleSpellSearchModal}>Add Spells</Button>
			<SpellFilters
				setClassFilter={setClassFilter}
				setMaxLevelFilter={setMaxLevelFilter}
				setMinLevelFilter={setMinLevelFilter}
				setNameFilter={setNameFilter}
				setSchoolFilter={setSchoolFilter}
				setSubclassFilter={setSubclassFilter}
			/>
			<SpellAccordion
				key={filteredSpells}
				character={character}
				spells={filteredSpells}
				pageSize={7}
				showRemoveSpellButton={true}
				showClassBadges={false}
				removeLearntSpell={removeLearntSpell}
			/>
			{showSearchSpellModal &&
				<SearchSpellModal
					character={character}
					show={showSearchSpellModal}
					onHide={toggleSpellSearchModal}
					size='lg'
					addLearntSpell={addLearntSpell}
				/>
			}
		</>
	)
}