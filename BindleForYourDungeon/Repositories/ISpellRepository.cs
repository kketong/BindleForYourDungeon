using BindleForYourDungeon.Models.SpellTypes;

namespace BindleForYourDungeon.Repositories
{
	public interface ISpellRepository
	{
		Task CreateSpellAsync(Spell spell);
		Task DeleteSpellAsync(Guid spellId);
		Task<Spell> GetSpellAsync(string spellId);
		Task PutSpellsAsync(IEnumerable<Spell> spells);
		IQueryable<Spell> GetSpells();
		Task UpdateSpellAsync(Spell spell);
		Task<IQueryable<Spell>> SearchSpellsAsync(string searchTerm);
	}
}