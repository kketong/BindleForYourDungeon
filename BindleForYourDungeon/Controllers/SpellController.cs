using AutoMapper;
using BindleForYourDungeon.DTOs;
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
		public ActionResult<IEnumerable<SpellDTO>> GetSpells()
		{
			var spells = spellRepository.GetAllSpells();
			var spellsDTO = _mapper.Map<IEnumerable<SpellDTO>>(spells);
			return Ok(spellsDTO);
		}

		[HttpGet("{spellId}")]
		public ActionResult<SpellDTO> GetSpell(Guid spellId)
		{
			var spell = spellRepository.GetSpellById(spellId);
			var spellsDTO = _mapper.Map(
				spell,
				typeof(Spell),
				typeof(SpellDTO)
				) as SpellDTO;

			return Ok(spellsDTO);
		}

		[HttpGet("getfilteredspells")]
		public ActionResult<IEnumerable<SpellDTO>> GetFilteredSpells(List<Guid> spellIds)
		{
			var spells = spellRepository.GetSpellsById(spellIds);
			var spellsDTO = _mapper.Map(
				spells,
				typeof(IEnumerable<Spell>),
				typeof(IEnumerable<SpellDTO>)
				) as IEnumerable<SpellDTO>;

			return Ok(spellsDTO);
		}

		[HttpPost]
		public IActionResult AddSpell(Spell spell)
		{
			spellRepository.AddSpell(spell);

			return Created(Url.Content("~/") + spell.Id, spell);
		}

		[HttpPost("dnd5e")]
		public IActionResult AddDnd5ESpell(DnD5eSpell dnd5ESpell)
		{
			var mappedSpell = _mapper.Map<Spell>(dnd5ESpell);
			spellRepository.AddSpell(mappedSpell);

			return Created(Url.Content("~/") + mappedSpell.Id, dnd5ESpell);
		}


		[HttpPatch()]
		public IActionResult EditSpell(Spell spell)
		{
			spellRepository.EditSpell(spell);

			return Ok(spell);
		}

		[HttpDelete()]
		public IActionResult DeleteSpell(Spell spell)
		{
			if (spell.Id == default)
			{
				return BadRequest("Delete dnd5ESpell failed: invalid ID.");
			}

			spellRepository.DeleteSpell(spell);

			return NoContent();
		}
	}
}