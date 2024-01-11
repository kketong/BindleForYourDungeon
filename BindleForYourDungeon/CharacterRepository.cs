using BindleForYourDungeon.Models;

namespace BindleForYourDungeon
{
	public class CharacterRepository(ApplicationContext context) : ICharacterRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));

		public async Task CreateCharacterAsync(Character character)
		{
			_context.Characters.Add(character);

			await _context.SaveChangesAsync();
		}

		public async Task<Character> GetCharacterAsync(int characterId)
		{
			var character = await _context.Characters.FindAsync(characterId);

			return character;
		}

		public Task<IQueryable<Character>> SearchCharactersAsync(string searchTerm)
		{
			var characters = _context.Characters.Where(characters =>
			characters.Name.Contains(searchTerm) ||
			characters.Description.Contains(searchTerm));

			return (Task<IQueryable<Character>>) characters;
		}

		public IEnumerable<Character> GetCharacters()
		{
			var character = _context.Characters;

			return character;
		}
	}
}
