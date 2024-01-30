import {
	useState
} from 'react';
import Button from 'react-bootstrap/Button';
import SearchSpellModal from '../spells/SearchSpellModal';
import SearchSpellList from '../spells/SearchSpellList';

export function Spellbook({
	character,
	spells,
	setSpells
}) {
	const [showSearchSpellModal, setShowSearchSpellModal] = useState(false);
	function toggleSpellSearchModal() {
		setShowSearchSpellModal(!showSearchSpellModal);
	}

	return (
		<>
			<Button onClick={toggleSpellSearchModal}>Add Spells</Button>
			<SearchSpellList
				character={character}
				spells={spells}
				pageSize={7}
				showAddSpellButton={false}
				showRemoveSpellButton={true}
				showClassBadges={false}
				setSpells={setSpells}
			/>
			{showSearchSpellModal &&
				<SearchSpellModal
					character={character}
					show={showSearchSpellModal}
					onHide={toggleSpellSearchModal}
					size='lg'
					setSpells={setSpells}
				/>
			}
		</>
	)
}