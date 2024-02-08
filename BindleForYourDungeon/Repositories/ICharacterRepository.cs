using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using MongoDB.Bson;

namespace BindleForYourDungeon.Repositories
{
    public interface ICharacterRepository
	{
		void AddCharacter(Character newCharacter);
		void DeleteCharacter(Character character);
		void EditCharacter(Character updatedCharacter);
		IEnumerable<Character> GetAllCharacters();
		Character? GetCharacterById(ObjectId id);
	}
}