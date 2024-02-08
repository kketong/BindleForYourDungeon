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
		public IEnumerable<Spell> GetSpells()
		{
			var spells = spellRepository.GetAllSpells();

			return spells;
		}

		[HttpGet("{spellId}")]
		public IEnumerable<Spell> GetSpell(string spellId)
		{
			var spells = spellRepository.GetAllSpells();

			return spells;
		}

		[HttpPost]
		public IActionResult AddSpell(Spell spell)
		{
			spellRepository.AddSpell(spell);

			return Created(Url.Content("~/") + spell.Id, spell);
		}

		[HttpPatch()]
		public IActionResult EditSpell(Spell spell)
		{
			spellRepository.EditSpell(spell);

			return Ok(spell);
		}

		[HttpDelete()]
		public IActionResult DeleteAsync(Spell spell)
		{
			if (spell.Id == default)
			{
				return BadRequest("Delete spell failed: invalid ID.");
			}

			spellRepository.DeleteSpell(spell);

			return NoContent();
		}
	}
}