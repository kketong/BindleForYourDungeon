using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface ISpellRepository
	{
		void AddSpell(Spell newSpell);
		void DeleteSpell(Spell spell);
		void EditSpell(Spell updatedSpell);
		IEnumerable<Spell> GetAllSpells();
		Spell GetSpellById(Guid id);
		IEnumerable<Spell> GetSpellsById(IEnumerable<Guid> ids);
	}
}