using Microsoft.AspNetCore.Mvc;
using BindleForYourDungeon.Models;

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
		public IEnumerable<Character> GetCharacters()
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
		public async Task<Character> GetCharacter(int characterId)
		{
			var character = await characterRepository.GetCharacterAsync(characterId);

			return character;
		}

		[HttpGet("characters/search/{searchTerm}")]
		public async Task<IQueryable<Character>> SearchCharacters(string searchTerm)
		{
			var characters = await characterRepository.SearchCharactersAsync(searchTerm);

			return characters;
		}

		[HttpPost]
		public async Task CreateAsync(Character character)
		{
			await characterRepository.CreateCharacterAsync(character);
		}
	}
}