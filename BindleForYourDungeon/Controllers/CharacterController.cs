using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

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
			var characterDTOList = _mapper.Map<IEnumerable<CharacterDTO>>(characters);

			return Ok(characterDTOList);
		}

		[HttpGet("{characterId}")]
		public ActionResult<CharacterDTO> GetCharacter(Guid characterId)
		{
			var character = _characterRepository.GetCharacterById(characterId);
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
		public IActionResult AddSpellToCharacter(Guid characterId, [FromBody] Guid spellId)
		{
			var character = _characterRepository.GetCharacterById(characterId);
			if (character.LearntSpells.Contains(spellId))
			{
				return BadRequest($"Spell already learnt.");
			}

			character.LearntSpells = character.LearntSpells.Append(spellId).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}

		[HttpPost("{characterId}/addfeat")]
		public IActionResult AddFeatToCharacter(Guid characterId, [FromBody] Guid featId)
		{

			var character = _characterRepository.GetCharacterById(characterId);
			if (character.Feats.Contains(featId))
			{
				return BadRequest($"Feat already learnt.");
			}
			character.Feats = character.Feats.Append(featId).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}


		[HttpPost("{characterId}/removespell")]
		public IActionResult RemoveSpellFromCharacter(Guid characterId, [FromBody] Guid spellId)
		{
			var character = _characterRepository.GetCharacterById(characterId);
			if (!character.LearntSpells.Contains(spellId))
			{
				return BadRequest($"Spell not learnt.");
			}

			character.LearntSpells = character.LearntSpells?.Except([spellId]).ToArray();
			_characterRepository.EditCharacter(character);

			return Created(Url.Content("~/") + character.Id, character);
		}


		[HttpPost("{characterId}/removefeat")]
		public IActionResult RemoveFeatFromCharacter(Guid characterId, [FromBody] Guid featId)
		{
			var character = _characterRepository.GetCharacterById(characterId);

			character.Feats = character.Feats?.Except([featId]).ToArray();
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