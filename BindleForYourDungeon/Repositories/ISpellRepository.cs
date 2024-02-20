using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface ISpellRepository
	{
		Task AddSpellAsync(Spell newSpell);
		Task DeleteSpellAsync(Spell spell);
		Task EditSpellAsync(Spell updatedSpell);
		Task<IList<Spell>> GetAllSpellsAsync();
		Task<Spell> GetSpellByIdAsync(Guid id);
		Task<IList<Spell>> GetSpellsByIdAsync(IEnumerable<Guid> ids);
	}
}