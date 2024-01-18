using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("character")]
	public class CharacterController(
		ILogger<CharacterController> logger,
		ICharacterRepository characterRepository) : ControllerBase
	{
		private readonly ILogger<CharacterController> _logger = logger;
		private readonly ICharacterRepository characterRepository = characterRepository ?? throw new ArgumentNullException(nameof(characterRepository));

		[HttpGet]
		public IQueryable<Character> GetCharacters()
		{
			//var newchar = new Character()
			//{
			//	Description = "Dummy description",
			//	Level = 1,
			//	Name = "Tavern Keeper"
			//};
			//characterRepository.CreateCharacterAsync(newchar);
			var characters = characterRepository.GetCharacters();

			return characters;
		}

		[HttpGet("{characterId}")]
		public async Task<Character> GetCharacter(Guid characterId)
		{
			var character = await characterRepository.GetCharacterAsync(characterId);

			return character;
		}

		[HttpGet("search/{searchTerm}")]
		public async Task<IQueryable<Character>> SearchCharacters(string searchTerm)
		{
			var characters = await characterRepository.SearchCharactersAsync(searchTerm);

			return characters;
		}

		[HttpPost]
		public async Task<IActionResult> CreateAsync(Character character)
		{
			await characterRepository.CreateCharacterAsync(character);
			return Created(new Uri("www.todo.com"), character);
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteAsync(Guid characterId)
		{
			await characterRepository.DeleteCharacterAsync(characterId);

			return NoContent();
		}
	}
}