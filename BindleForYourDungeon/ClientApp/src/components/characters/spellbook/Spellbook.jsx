import { getCharacter } from '../../../apis';
import SpellCard from '../spells/SpellCard';

export async function loader({ params }) {
	const character = getCharacter(params.characterId);
	const spellIds = character.spellbook;
	GetSpell
}

export function Spellbook() {
	const spells = useLoaderData();

	return (
		{
			spells.map((spell, index) => {
		
			<SpellCard spell=

		}}
	)
}