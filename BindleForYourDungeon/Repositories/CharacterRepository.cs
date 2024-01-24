using BindleForYourDungeon.Models;
using DnsClient.Protocol;
using Microsoft.AspNetCore.Http.HttpResults;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BindleForYourDungeon.Repositories
{
	public class CharacterRepository(ApplicationContext context) : ICharacterRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));

		public async Task CreateCharacterAsync(Character character)
		{
			_context.Characters.Add(character);

			await _context.SaveChangesAsync();
		}

		public async Task<Character> GetCharacterAsync(Guid characterId)
		{
			var character = await _context.Characters.FindAsync(characterId);

			return character;
		}

		public Task<IQueryable<Character>> SearchCharactersAsync(string searchTerm)
		{
			var characters = _context.Characters.Where(characters =>
			characters.Name.Contains(searchTerm) ||
			characters.Description.Contains(searchTerm));

			return (Task<IQueryable<Character>>)characters;
		}

		public IQueryable<Character> GetCharacters()
		{
			var character = _context.Characters;

			return character;
		}

		public async Task PatchCharacter(Character character, CancellationToken cancellationToken)
		{
			_context.Characters.Update(character);

			await _context.SaveChangesAsync(cancellationToken);
		}

		public async Task DeleteCharacterAsync(Character character)
		{
			_context.Characters.Remove(character);
			
			await _context.SaveChangesAsync();
		}
	}
}
