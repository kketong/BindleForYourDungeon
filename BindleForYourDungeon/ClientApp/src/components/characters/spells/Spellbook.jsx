import {
	useState
} from 'react';
import Button from 'react-bootstrap/Button';
import SearchSpellModal from './SearchSpellModal';
import SearchSpellList from './SearchSpellList';

export function Spellbook({
	character,
	spells,
	addLearntSpell,
	removeLearntSpell
}) {
	const [showSearchSpellModal, setShowSearchSpellModal] = useState(false);
	function toggleSpellSearchModal() {
		setShowSearchSpellModal(!showSearchSpellModal);
	}

	return (
		<>
			<Button onClick={toggleSpellSearchModal}>Add Spells</Button>
			<SearchSpellList
				key='spellbook-learnt-spells'
				character={character}
				spells={spells}
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