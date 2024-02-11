using BindleForYourDungeon.Models.SpellTypes;
using MongoDB.Bson;

namespace BindleForYourDungeon.Repositories
{
	public interface ISpellRepository
	{
		void AddSpell(Spell newSpell);
		void DeleteSpell(Spell spell);
		void EditSpell(Spell updatedSpell);
		IEnumerable<Spell> GetAllSpells();
		Spell GetSpellById(ObjectId id);
		IEnumerable<Spell> GetSpellsById(IEnumerable<ObjectId> ids);
	}
}