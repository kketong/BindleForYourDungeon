using BindleForYourDungeon.Models.SpellTypes;

namespace BindleForYourDungeon.Repositories
{
	public interface ISpellRepository
	{
		Task CreateSpellAsync(Spell spell);
		Task DeleteSpellAsync(Guid spellId);
		Task<Spell> GetSpellAsync(string spellId);
		IQueryable<Spell> GetSpells();
		Task PatchSpell(Spell spell);
		Task<IQueryable<Spell>> SearchSpellsAsync(string searchTerm);
	}
}