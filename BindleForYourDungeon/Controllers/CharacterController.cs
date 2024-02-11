using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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

		[HttpPost("{characterId}/addspell")]
		public IActionResult AddSpellToCharacter(string characterId, [FromBody]string spellId)
		{
			if (!ObjectId.TryParse(characterId, out var parsedCharacterId)) {
				return BadRequest($"{characterId} is not a valid character id.");
			}
			
			if (!ObjectId.TryParse(spellId, out var parsedSpellId))
			{
				return BadRequest($"'{spellId}' is not a valid spell id.");
			}

			if (_spellRepository.GetSpellById(parsedSpellId) == null)
			{
				return BadRequest($"spell id '{spellId}' not found.");
			}

			var character = _characterRepository.GetCharacterById(parsedCharacterId);
			if (character.LearntSpells.Contains(parsedSpellId))
			{
				return BadRequest($"Spell already learnt.");
			}
			character.LearntSpells = character.LearntSpells?.Append(parsedSpellId).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}

		[HttpPost("{characterId}/addfeat")]
		public IActionResult AddFeatToCharacter(string characterId, [FromBody]string featId)
		{
			if (!ObjectId.TryParse(characterId, out var parsedCharacterId)) {
				return BadRequest($"{characterId} is not a valid character id.");
			}
			
			if (!ObjectId.TryParse(featId, out var parsedFeatId))
			{
				return BadRequest($"'{featId}' is not a valid feat id.");
			}

			if (_featRepository.GetFeatById(parsedFeatId) == null)
			{
				return BadRequest($"feat id '{featId}' not found.");
			}

			var character = _characterRepository.GetCharacterById(parsedCharacterId);
			if (character.Feats.Contains(parsedFeatId))
			{
				return BadRequest($"Feat already learnt.");
			}
			character.Feats = character.Feats?.Append(parsedFeatId).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}


		[HttpPost("{characterId}/removespell")]
		public IActionResult RemoveSpellFromCharacter(string characterId, [FromBody]string spellId)
		{
			if (!ObjectId.TryParse(characterId, out var parsedCharacterId))
			{
				return BadRequest($"{characterId} is not a valid character id.");
			}

			if (!ObjectId.TryParse(spellId, out var parsedSpellId))
			{
				return BadRequest($"'{spellId}' is not a valid spell id.");
			}

			if (_spellRepository.GetSpellById(parsedSpellId) == null)
			{
				return BadRequest($"spell id '{spellId}' not found.");
			}

			var character = _characterRepository.GetCharacterById(parsedCharacterId);
			if (!character.LearntSpells.Contains(parsedSpellId))
			{
				return BadRequest($"Spell not learnt.");
			}

			character.LearntSpells = character.LearntSpells?.Except([parsedSpellId]).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}


		[HttpPost("{characterId}/removefeat")]
		public IActionResult RemoveFeatFromCharacter(string characterId, [FromBody]string featId)
		{
			if (!ObjectId.TryParse(characterId, out var parsedCharacterId))
			{
				return BadRequest($"{characterId} is not a valid character id.");
			}

			if (!ObjectId.TryParse(featId, out var parsedFeatId))
			{
				return BadRequest($"'{featId}' is not a valid feat id.");
			}

			if (_featRepository.GetFeatById(parsedFeatId) == null)
			{
				return BadRequest($"feat id '{featId}' not found.");
			}

			var character = _characterRepository.GetCharacterById(parsedCharacterId);
			if (!character.Feats.Contains(parsedFeatId))
			{
				return BadRequest($"Feat not learnt.");
			}

			character.Feats = character.Feats?.Except([parsedFeatId]).ToArray();
			_characterRepository.EditCharacter(character);

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