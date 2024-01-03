using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon
{
	public class CharacterRepository(ApplicationContext context) : ICharacterRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));

		public async void CreateCharacterAsync(Character character)
		{
			_context.Characters.Add(character);

			await _context.SaveChangesAsync();
		}

		public async Task<Character> GetCharacterAsync(string name)
		{
			var character = await _context.Characters.Where(characters => characters.Name == name).FirstOrDefaultAsync();

			return character;
		}

		public IEnumerable<Character> GetCharacters()
		{
			var character = _context.Characters;

			return character;
		}
	}
}
