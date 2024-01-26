using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.SpellTypes;
using NuGet.Versioning;

namespace BindleForYourDungeon.Repositories
{
	public class SpellRepository(ApplicationContext context) : ISpellRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));

		public async Task CreateSpellAsync(Spell spell)
		{
			_context.Spells.Add(spell);

			await _context.SaveChangesAsync();
		}
		public async Task CreateSpellsAsync(IEnumerable<Spell> spells)
		{
			_context.Spells.AddRange(spells);

			await _context.SaveChangesAsync();
		}

		public async Task<Spell> GetSpellAsync(string spellId)
		{
			var spell = await _context.Spells.FindAsync(spellId);

			return spell;
		}

		public Task<IQueryable<Spell>> SearchSpellsAsync(string searchTerm)
		{
			var spell = _context.Spells.Where(spell =>
				spell.Name.Contains(searchTerm) ||
							 spell.Desc.Contains(searchTerm));

			return (Task<IQueryable<Spell>>) spell;
		}

		public IQueryable<Spell> GetSpells()
		{
			var spells = _context.Spells;

			return spells;
		}

		public async Task UpdateSpellAsync(Spell spell)
		{
			_context.Spells.Update(spell);

			await _context.SaveChangesAsync();
		}

		public async Task DeleteSpellAsync(Guid spellId)
		{
			_context.Spells.RemoveById(spellId);

			await _context.SaveChangesAsync();
		}
	}
}
