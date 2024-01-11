using BindleForYourDungeon.Models;

namespace BindleForYourDungeon
{
	public interface ICharacterRepository
	{
		Task CreateCharacterAsync(Character character);
		Task<Character> GetCharacterAsync(int characterId);
		IEnumerable<Character> GetCharacters();
		Task<IQueryable<Character>> SearchCharactersAsync(string searchTerm);
	}
}