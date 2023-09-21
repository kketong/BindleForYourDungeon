using Microsoft.AspNetCore.Mvc;
using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("character")]
	public class CharacterController : ControllerBase
	{
		private readonly ILogger<CharacterController> _logger;

		public CharacterController(ILogger<CharacterController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IEnumerable<Character> Get()
		{
			var characterList = new List<Character>
			{
				new Character("Tavern Keeper", "A burly dwarf with a surprising floral aroma.", 2, null)
			};

			return characterList;
		}

		//[HttpPost]
		//public Character Create(Character character)
		//{
		//	return 
		//}
	}
}