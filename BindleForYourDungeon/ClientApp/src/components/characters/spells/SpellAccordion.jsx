import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import Pagination from '../../Pagination';
import SpellAccordionItem from './SpellAccordionItem';

function SpellAccordion({
	character,
	spells,
	pageSize,
	showAddSpellButton = false,
	showRemoveSpellButton = false,
	showClassBadges = false,
	addLearntSpell,
	removeLearntSpell,
	props
}) {
	const [currentPage, setCurrentPage] = useState(1);

	return (
		<>
			<Accordion {...props}>
				{spells
					.slice((currentPage - 1) * pageSize, currentPage * pageSize)
					.map(spell =>
						<SpellAccordionItem
							key={`search-spell-list-spell-${spell.id}`}
							character={character}
							spell={spell}
							showAddSpellButton={showAddSpellButton}
							showRemoveSpellButton={showRemoveSpellButton}
							showClassBadges={showClassBadges}
							addLearntSpell={addLearntSpell}
							removeLearntSpell={removeLearntSpell}
						/>
					)
				}
			</Accordion>
			<Pagination
				key={`spell-list-pagination`}
				itemsCount={spells.length}
				itemsPerPage={pageSize}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				alwaysShown={false} />
		</>
	);
}

export default SpellAccordion;