using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Threading;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("characters")]
	public class CharacterController(
		ILogger<CharacterController> logger,
		ICharacterRepository characterRepository) : ControllerBase
	{
		private readonly ILogger<CharacterController> _logger = logger;
		private readonly ICharacterRepository characterRepository = characterRepository ?? throw new ArgumentNullException(nameof(characterRepository));

		[HttpGet]
		public IQueryable<Character> GetCharacters()
		{
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
			return Created(Url.Content("~/") + character.Id, character);
		}

		[HttpPost("{characterId}/addspell")]
		public async Task<IActionResult> AddSpell(Guid characterId, [FromBody]string spellId, CancellationToken cancellationToken)
		{
			var character = await characterRepository.GetCharacterAsync(characterId);
			if (character == null)
			{
				return NotFound();
			}
			else
			{
				if (!character.LearntSpells.IsNullOrEmpty())
				{
					if (character.LearntSpells.Contains(spellId))
					{
						return BadRequest($"{spellId} already learnt.");
					}
					character.LearntSpells.Add(spellId);
				}
                else
                {
					character.LearntSpells = [spellId];
				}
			}
			await characterRepository.PatchCharacter(character, cancellationToken);

			return Ok(character);
		}

		[HttpPost("{characterId}/removespell")]
		public async Task<IActionResult> RemoveSpell(Guid characterId, [FromBody] string spellId, CancellationToken cancellationToken)
		{
			var character = await characterRepository.GetCharacterAsync(characterId);
			if (character == null)
			{
				return NotFound(characterId);
			}
			else
			{
				if (!character.LearntSpells.IsNullOrEmpty())
				{
					if (!character.LearntSpells.Contains(spellId))
					{
						return BadRequest($"Target character has not learnt the spell.");
					}
					character.LearntSpells.Remove(spellId);
				}
				else
				{
					return BadRequest($"Target character has no learnt spells.");
				}
			}
			await characterRepository.PatchCharacter(character, cancellationToken);

			return Ok(character);
		}

		[HttpPatch("{characterId}")]
		public async Task<IActionResult> PatchCharacterAsync(Character character, CancellationToken cancellationToken)
		{
			await characterRepository.PatchCharacter(character, cancellationToken);

			return Ok(character);
		}

		[HttpDelete("{characterId}")]
		public async Task<IActionResult> DeleteAsync(Guid characterId)
		{
			var characterToDelete = await characterRepository.GetCharacterAsync(characterId);
			if (characterToDelete == null)
			{
				return NotFound($"character with id {characterId} not found");
			}

			await characterRepository.DeleteCharacterAsync(characterToDelete);

			return NoContent();
		}
	}
}