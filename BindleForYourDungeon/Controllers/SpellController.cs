using AutoMapper;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.DnD5e;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("spells")]
	public class SpellController(
		ILogger<SpellController> logger,
		ISpellRepository spellRepository,
		IMapper mapper) : ControllerBase
	{
		private readonly ILogger<SpellController> _logger = logger;
		private readonly IMapper _mapper = mapper;
		private readonly ISpellRepository spellRepository = spellRepository ?? throw new ArgumentNullException(nameof(spellRepository));

		[HttpGet]
		public async Task<ActionResult<IList<Spell>>> GetSpells()
		{
			var spells = await spellRepository.GetAllSpellsAsync();

			return Ok(spells);
		}

		[HttpGet("{spellId}")]
		public async Task<ActionResult<Spell>> GetSpell(Guid spellId)
		{
			var spell = await spellRepository.GetSpellByIdAsync(spellId);

			return Ok(spell);
		}

		[HttpPost]
		public async Task<ActionResult> AddSpell(Spell spell)
		{
			await spellRepository.AddSpellAsync(spell).ConfigureAwait(false);

			return Created(Url.Content("~/") + spell.Id, spell);
		}

		[HttpPost("dnd5e")]
		public async Task<ActionResult> AddDnd5ESpell(DnD5eSpell dnd5ESpell)
		{
			var mappedSpell = _mapper.Map<Spell>(dnd5ESpell);
			await spellRepository.AddSpellAsync(mappedSpell).ConfigureAwait(false);

			return Created(Url.Content("~/") + mappedSpell.Id, mappedSpell);
		}

		[HttpPatch]
		public async Task<ActionResult<Spell>> EditSpell(Spell spell)
		{
			await spellRepository.EditSpellAsync(spell);

			return Ok(spell);
		}

		[HttpDelete]
		public async Task<ActionResult> DeleteSpell(Spell spell)
		{
			if (spell.Id == default)
			{
				var errorMessage = "Delete dnd5ESpell failed: invalid ID.";
				_logger.LogWarning(errorMessage);

				return BadRequest(errorMessage);
			}

			await spellRepository.DeleteSpellAsync(spell);

			return NoContent();
		}
	}
}