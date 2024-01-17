using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
    public interface ICharacterRepository
    {
        Task CreateCharacterAsync(Character character);
        Task DeleteCharacterAsync(Guid characterId);
        Task<Character> GetCharacterAsync(Guid characterId);
        IQueryable<Character> GetCharacters();
        Task<IQueryable<Character>> SearchCharactersAsync(string searchTerm);
    }
}