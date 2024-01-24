using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.SpellTypes;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
    [ApiController]
	[Route("spells")]
	public class SpellController(
		ILogger<SpellController> logger,
		ISpellRepository spellRepository) : ControllerBase
	{
		private readonly ILogger<SpellController> _logger = logger;
		private readonly ISpellRepository spellRepository = spellRepository ?? throw new ArgumentNullException(nameof(spellRepository));

		[HttpGet]
		public IQueryable<Spell> GetSpells()
		{
			var spells = spellRepository.GetSpells();

			return spells;
		}

		[HttpGet("{spellId}")]
		public async Task<Spell> GetSpell(string spellId)
		{
			var spell = await spellRepository.GetSpellAsync(spellId);

			return spell;
		}

		[HttpGet("search/{searchTerm}")]
		public async Task<IQueryable<Spell>> SearchSpells(string searchTerm)
		{
			var spells = await spellRepository.SearchSpellsAsync(searchTerm);

			return spells;
		}

		[HttpPost]
		public async Task<IActionResult> CreateAsync(Spell spell)
		{
			await spellRepository.CreateSpellAsync(spell);
			return Created(new Uri($"www.theurlfortheapi.com/{spell.Id}"), spell);
		}

		[HttpPatch("{spellId}")]
		public async Task<IActionResult> PatchSpellAsync(Spell spell)
		{
			await spellRepository.PatchSpell(spell);

			return Ok(spell);
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteAsync(Guid spellId)
		{
			await spellRepository.DeleteSpellAsync(spellId);

			return NoContent();
		}
	}
}