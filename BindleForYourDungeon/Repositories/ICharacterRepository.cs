using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface ICharacterRepository
	{
		Task AddCharacterAsync(Character newCharacter);
		Task DeleteCharacterAsync(Guid characterId);
		Task EditCharacterAsync(Character updatedCharacter);
		Task<IList<Character>> GetAllCharactersAsync();
		Task<Character> GetCharacterByIdAsync(Guid id);
	}
}