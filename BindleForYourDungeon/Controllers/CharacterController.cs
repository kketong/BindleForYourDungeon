using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("characters")]
	public class CharacterController(
		ILogger<CharacterController> logger,
		ICharacterRepository characterRepository,
		ISpellRepository spellRepository,
		IFeatRepository featRepository,
		IMapper mapper) : ControllerBase
	{
		private readonly ILogger<CharacterController> _logger = logger;
		private readonly ICharacterRepository _characterRepository = characterRepository ?? throw new ArgumentNullException(nameof(characterRepository));
		private readonly ISpellRepository _spellRepository = spellRepository;
		private readonly IFeatRepository _featRepository = featRepository;
		private readonly IMapper _mapper = mapper;

		[HttpGet]
		public ActionResult<IEnumerable<CharacterDTO>> GetCharacters()
		{
			var characters = _characterRepository.GetAllCharacters();
			var characterDTOList = (IEnumerable<CharacterDTO>)_mapper.Map(
				characters,
				typeof(IEnumerable<Character>),
				typeof(IEnumerable<CharacterDTO>)
				);

			return Ok(characterDTOList);
		}

		[HttpGet("{characterId}")]
		public ActionResult<CharacterDTO> GetCharacter(string characterId)
		{
			if (!ObjectId.TryParse(characterId, out var parsedId))
			{
				return BadRequest($"{characterId} is not a valid id.");
			}
			var character = _characterRepository.GetCharacterById(parsedId);
			var characterDTO = (CharacterDTO)_mapper.Map(
				character,
				typeof(Character),
				typeof(CharacterDTO)
				);

			return Ok(characterDTO);
		}

		[HttpPost]
		public IActionResult AddCharacter(Character character)
		{
			_characterRepository.AddCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}

		[HttpPatch()]
		public IActionResult EditCharacter(Character character)
		{
			_characterRepository.EditCharacter(character);

			return Ok(character);
		}

		[HttpDelete()]
		public IActionResult DeleteAsync(Character character)
		{
			if (character.Id == default)
			{
				return BadRequest("Delete character failed: invalid ID.");
			}

			_characterRepository.DeleteCharacter(character);

			return NoContent();
		}
	}
}