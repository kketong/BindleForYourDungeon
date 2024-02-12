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

		public void AddCharacter(Character newCharacter)
		{
			_context.Characters.Add(newCharacter);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			_context.SaveChanges();
		}

		public void DeleteCharacter(Character character)
		{
			var characterToDelete = _context.Characters.FirstOrDefault(f => f.Id == character.Id);

			if (characterToDelete != null)
			{
				_context.Characters.Remove(characterToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				_context.SaveChanges();
			}
			else
			{
				throw new ArgumentException("The character to delete cannot be found.");
			}
		}

		public void EditCharacter(Character updatedCharacter)
		{
			var characterToUpdate = GetCharacterById((Guid)updatedCharacter.Id);

			if (characterToUpdate != null)
			{
				_context.Characters.Update(characterToUpdate).CurrentValues.SetValues(updatedCharacter);
				// SetValues does not detect and update child entities.
				characterToUpdate.AbilityScore = updatedCharacter.AbilityScore;
				_context.ChangeTracker.DetectChanges();
				_context.SaveChanges();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Character to be updated cannot be found");
			}
		}

		public IEnumerable<Character> GetAllCharacters() => _context.Characters.OrderBy(f => f.Name).AsNoTracking().AsEnumerable();

		public Character GetCharacterById(Guid id) => _context.Characters.AsNoTracking().First(c => Equals(c.Id, id));
	}
}
