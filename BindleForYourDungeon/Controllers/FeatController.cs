
using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("feats")]
	public class FeatController(
		ILogger<FeatController> logger,
		IFeatRepository featRepository,
		IMapper mapper) : ControllerBase
	{
		private readonly ILogger<FeatController> _logger = logger;
		private readonly IFeatRepository featRepository = featRepository ?? throw new ArgumentNullException(nameof(featRepository));
		private readonly IMapper _mapper = mapper;

		[HttpGet]
		public ActionResult<IEnumerable<FeatDTO>> GetFeats()
		{
			var feats = featRepository.GetAllFeats();
			var featsDTO = _mapper.Map<IEnumerable<FeatDTO>>(feats);

			return Ok(featsDTO);
		}

		[HttpGet("{featId}")]
		public ActionResult<FeatDTO> GetFeat(Guid featId)
		{
			var feat = featRepository.GetFeatById(featId);
			var featDTO = _mapper.Map<FeatDTO>(feat);

			return Ok(featDTO);
		}

		[HttpGet("getfilteredfeats")]
		public ActionResult<IEnumerable<FeatDTO>> GetFilteredFeats(List<Guid> featIds)
		{
			var feats = featRepository.GetFeatsById(featIds);
			var featsDTO = _mapper.Map<IEnumerable<FeatDTO>>(feats);

			return Ok(featsDTO);
		}

		[HttpPost]
		public IActionResult AddFeat(Feat feat)
		{
			featRepository.AddFeat(feat);

			return Created(Url.Content("~/") + feat.Id, feat);
		}

		[HttpPatch()]
		public IActionResult EditFeat(Feat feat)
		{
			featRepository.EditFeat(feat);

			return Ok(feat);
		}

		[HttpDelete()]
		public IActionResult DeleteAsync(Feat feat)
		{
			if (feat.Id == default)
			{
				return BadRequest("Delete feat failed: invalid ID.");
			}

			featRepository.DeleteFeat(feat);

			return NoContent();
		}
	}
}