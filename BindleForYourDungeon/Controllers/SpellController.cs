using AutoMapper;
using BindleForYourDungeon.Models.Dnd5E;
using BindleForYourDungeon.Models.SpellTypes;
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
		private readonly ISpellRepository spellRepository = spellRepository ?? throw new ArgumentNullException(nameof(spellRepository));
		private readonly IMapper mapper = mapper;

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

		[HttpPut]
		public async Task<IActionResult> PutSpellAsync(Spell spell)
		{
			if (spell.Id != null)
			{
				var existingSpell = await spellRepository.GetSpellAsync(spell.Id);
				if (existingSpell != null)
				{
					await spellRepository.UpdateSpellAsync(spell);

					return Ok(existingSpell);
				}

				return BadRequest("SpellId not found. If you meant to create a spell, please remove SpellId from your request.");
			}
			await spellRepository.CreateSpellAsync(spell);

			return Created(string.Empty, spell);
		}


		[HttpPost("dnd5e")]
		public async Task<IActionResult> PostDnd5eSpellsAsync(Dnd5ESpell[] spells)
		{
			var mappedSpells = new List<Spell>();
			foreach (var spell in spells)
			{
				var mappedSpell = mapper.Map<Dnd5ESpell, Spell>(spell);
				mappedSpells.Add(mappedSpell);
			}

			await spellRepository.CreateSpellsAsync(mappedSpells);

			return Created(string.Empty, mappedSpells);
		}

		[HttpDelete]
		public async Task<IActionResult> DeleteAsync(Guid spellId)
		{
			await spellRepository.DeleteSpellAsync(spellId);

			return NoContent();
		}
	}
}