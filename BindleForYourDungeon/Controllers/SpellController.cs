using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.DnD5e;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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
		public ActionResult<SpellDTO> GetSpell(string spellId)
		{
			if (!ObjectId.TryParse(spellId, out var parsedId))
			{
				var msg = $"{spellId} is not a valid id.";
				_logger.LogWarning(msg);
				return BadRequest(msg);
			}
			var spell = spellRepository.GetSpellById(parsedId);
			var spellsDTO = _mapper.Map(
				spell,
				typeof(Spell),
				typeof(SpellDTO)
				) as SpellDTO;

			return Ok(spellsDTO);
		}

		[HttpGet("getfilteredspells")]
		public ActionResult<IEnumerable<SpellDTO>> GetFilteredSpells(List<string> spellIds)
		{
			var objectIds = new List<ObjectId>();
			var invalidIds = new List<string>();
			foreach (var spellId in spellIds)
			{
				if (ObjectId.TryParse(spellId, out var parsedId))
				{
					objectIds.Add(parsedId);
				}
				else
				{
					invalidIds.Add(spellId);
				}
			}
			var spells = spellRepository.GetSpellsById(objectIds);
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