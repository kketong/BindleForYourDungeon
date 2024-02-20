using AutoMapper;
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
		public async Task<ActionResult<IList<Character>>> GetCharacters()
		{
			var characters = await _characterRepository.GetAllCharactersAsync();

			return Ok(characters);
		}

		[HttpGet("{characterId}")]
		public async Task<ActionResult<Character>> GetCharacter(Guid characterId)
		{
			var character = await _characterRepository.GetCharacterByIdAsync(characterId);

			return Ok(character);
		}

		[HttpPost]
		public async Task<ActionResult> AddCharacter(Character character)
		{
			await _characterRepository.AddCharacterAsync(character);

			return Created(Url.Content("~/") + character.Id, character);
		}

		[HttpPost("{characterId}/addspell")]
		public async Task<ActionResult> AddSpellToCharacter(Guid characterId, [FromBody] Guid spellId)
		{
			var character = await _characterRepository.GetCharacterByIdAsync(characterId);
			if (character.LearntSpells.Contains(spellId))
			{
				return BadRequest($"Spell already learnt.");
			}

			character.LearntSpells = [.. character.LearntSpells, spellId];
			await _characterRepository.EditCharacterAsync(character);

			return Ok(character);
		}

		[HttpPost("{characterId}/addfeat")]
		public async Task<ActionResult> AddFeatToCharacter(Guid characterId, [FromBody] Guid featId)
		{

			var character = await _characterRepository.GetCharacterByIdAsync(characterId);
			if (character.Feats.Contains(featId))
			{
				return BadRequest($"Feat already learnt.");
			}
			character.Feats = [.. character.Feats, featId];
			await _characterRepository.EditCharacterAsync(character);

			return Ok(character);
		}


		[HttpPost("{characterId}/removespell")]
		public async Task<IActionResult> RemoveSpellFromCharacter(Guid characterId, [FromBody] Guid spellId)
		{
			var character = await _characterRepository.GetCharacterByIdAsync(characterId);
			if (!character.LearntSpells.Contains(spellId))
			{
				return BadRequest($"Character has not learnt this spell.");
			}

			character.LearntSpells = character.LearntSpells.Except([spellId]).ToArray();
			await _characterRepository.EditCharacterAsync(character);

			return Ok(character);
		}


		[HttpPost("{characterId}/removefeat")]
		public async Task<IActionResult> RemoveFeatFromCharacter(Guid characterId, [FromBody] Guid featId)
		{
			var character = await _characterRepository.GetCharacterByIdAsync(characterId);

			if (!character.Feats.Contains(featId))
			{
				return BadRequest("Character does not have this feat.");
			}

			character.Feats = character.Feats.Except([featId]).ToArray();
			await _characterRepository.EditCharacterAsync(character);

			return Ok(character);
		}

		[HttpPatch()]
		public async Task<IActionResult> EditCharacter(Character character)
		{
			await _characterRepository.EditCharacterAsync(character);

			return Ok(character);
		}

		[HttpDelete("{characterId}")]
		public async Task<IActionResult> DeleteAsync(Guid characterId)
		{
			await _characterRepository.DeleteCharacterAsync(characterId);

			return NoContent();
		}
	}
}