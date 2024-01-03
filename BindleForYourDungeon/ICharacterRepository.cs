using BindleForYourDungeon.Models;

namespace BindleForYourDungeon
{
	public interface ICharacterRepository
	{
		void CreateCharacterAsync(Character character);
		Task<Character> GetCharacterAsync(string name);
		IEnumerable<Character> GetCharacters();
	}
}