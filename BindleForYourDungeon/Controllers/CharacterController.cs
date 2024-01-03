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

		[HttpGet("{name}")]		
		public async Task<Character> GetCharacter(string name)
		{
			var character = await characterRepository.GetCharacterAsync(name);

			return character;
		}

		[HttpPost]
		public void CreateAsync(Character character)
		{
			characterRepository.CreateCharacterAsync(character);
		}
	}
}