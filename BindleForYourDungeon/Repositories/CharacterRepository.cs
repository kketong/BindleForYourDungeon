using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon.Repositories
{
	public class CharacterRepository(
		ApplicationContext context,
		ILogger<CharacterRepository> logger) : ICharacterRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));
		private readonly ILogger _logger = logger;

		public async Task AddCharacterAsync(Character newCharacter)
		{
			_context.Characters.Add(newCharacter);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			await _context.SaveChangesAsync();
		}

		public async Task DeleteCharacterAsync(Guid characterId)
		{
			var characterToDelete = await _context.Characters.FirstOrDefaultAsync(f => Equals(f.Id, characterId));

			if (characterToDelete != null)
			{
				_context.Characters.Remove(characterToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				await _context.SaveChangesAsync();
			}
			else
			{
				throw new ArgumentException("The character to delete cannot be found.");
			}
		}

		public async Task EditCharacterAsync(Character updatedCharacter)
		{
			if (updatedCharacter.Id == null)
			{
				throw new ArgumentException("Id cannot be null.");
			}

			var characterToUpdate = await _context.Characters.FindAsync(updatedCharacter.Id);
			if (characterToUpdate != null)
			{
				_context.Characters.Update(characterToUpdate).CurrentValues.SetValues(updatedCharacter);
				// SetValues does not detect and update child entities.
				characterToUpdate.AbilityScore = updatedCharacter.AbilityScore;
				_context.ChangeTracker.DetectChanges();
				await _context.SaveChangesAsync();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Character cannot be found.");
			}
		}

		public async Task<IList<Character>> GetAllCharactersAsync() => await _context.Characters.OrderBy(f => f.Name).AsNoTracking().ToListAsync();

		public async Task<Character> GetCharacterByIdAsync(Guid id) => await _context.Characters.AsNoTracking().FirstAsync(c => Equals(c.Id, id));
	}
}
