using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace BindleForYourDungeon.Repositories
{
    public class SpellRepository(
		ApplicationContext context,
		ILogger<SpellRepository> logger) : ISpellRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));
		private readonly ILogger _logger = logger;

		public void AddSpell(Spell newSpell)
		{
			_context.Spells.Add(newSpell);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			_context.SaveChanges();
		}

		public void DeleteSpell(Spell spell)
		{
			var spellToDelete = _context.Spells.FirstOrDefault(f => f.Id == spell.Id);

			if (spellToDelete != null)
			{
				_context.Spells.Remove(spellToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				_context.SaveChanges();
			}
			else
			{
				throw new ArgumentException("The spell to delete cannot be found.");
			}
		}

		public void EditSpell(Spell updatedSpell)
		{
			var spellToUpdate = _context.Spells.FirstOrDefault(f => f.Id == updatedSpell.Id);


			if (spellToUpdate != null)
			{
				_context.Spells.Update(spellToUpdate).CurrentValues.SetValues(updatedSpell);

				_context.ChangeTracker.DetectChanges();
				_context.SaveChanges();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Spell to be updated cannot be found");
			}
		}

		public IEnumerable<Spell> GetAllSpells()
		{
			return _context.Spells.OrderBy(f => f.Name).AsNoTracking().AsEnumerable<Spell>();
		}

		public Spell GetSpellById(ObjectId id) => _context.Spells.AsNoTracking().First(s => s.Id == id);

		public IEnumerable<Spell> GetSpellsById(IEnumerable<ObjectId> ids) => _context.Spells.AsNoTracking().Where(s => ids.Contains(s.Id));
	}
}
