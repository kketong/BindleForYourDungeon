using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface ICharacterRepository
	{
		Task CreateCharacterAsync(Character character);
		Task DeleteCharacterAsync(Character character);
		Task<Character> GetCharacterAsync(Guid characterId);
		IQueryable<Character> GetCharacters();
		Task PatchCharacter(Character character, CancellationToken cancellationToken);
		Task<IQueryable<Character>> SearchCharactersAsync(string searchTerm);
	}
}