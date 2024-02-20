using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon.Repositories
{
	public class SpellRepository(
		ApplicationContext context,
		ILogger<SpellRepository> logger) : ISpellRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));
		private readonly ILogger _logger = logger;

		public async Task AddSpellAsync(Spell newSpell)
		{
			_context.Spells.Add(newSpell);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			await _context.SaveChangesAsync();
		}

		public async Task DeleteSpellAsync(Spell spell)
		{
			var spellToDelete = _context.Spells.FirstOrDefault(f => f.Id == spell.Id);

			if (spellToDelete != null)
			{
				_context.Spells.Remove(spellToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				await _context.SaveChangesAsync();
			}
			else
			{
				throw new ArgumentException("The spell to delete cannot be found.");
			}
		}

		public async Task EditSpellAsync(Spell updatedSpell)
		{
			var spellToUpdate = _context.Spells.FirstOrDefault(f => f.Id == updatedSpell.Id);


			if (spellToUpdate != null)
			{
				_context.Spells.Update(spellToUpdate).CurrentValues.SetValues(updatedSpell);

				_context.ChangeTracker.DetectChanges();
				await _context.SaveChangesAsync();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Spell to be updated cannot be found");
			}
		}

		public async Task<IList<Spell>> GetAllSpellsAsync() => await _context.Spells.OrderBy(f => f.Name).AsNoTracking().ToListAsync();

		public async Task<Spell> GetSpellByIdAsync(Guid id) => await _context.Spells.AsNoTracking().FirstAsync(s => Equals(s.Id, id));

		public async Task<IList<Spell>> GetSpellsByIdAsync(IEnumerable<Guid> ids) => await _context.Spells.AsNoTracking().Where(s => ids.Contains((Guid)s.Id)).ToListAsync();
	}
}
