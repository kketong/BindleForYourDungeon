
using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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
		public ActionResult<FeatDTO> GetFeat(string featId)
		{
			if (!ObjectId.TryParse(featId, out var parsedId))
			{
				var msg = $"{featId} is not a valid id.";
				_logger.LogWarning(msg);
				return BadRequest(msg);
			}
			var feat = featRepository.GetFeatById(parsedId);
			var featDTO = _mapper.Map<FeatDTO>(feat);

			return Ok(featDTO);
		}

		[HttpGet("getfilteredfeats")]
		public ActionResult<IEnumerable<FeatDTO>> GetFilteredFeats(List<string> featIds)
		{
			var objectIds = new List<ObjectId>();
			var invalidIds = new List<string>();
			foreach (var featId in featIds)
			{
				if (ObjectId.TryParse(featId, out var parsedId))
				{
					objectIds.Add(parsedId);
				}
				else
				{
					invalidIds.Add(featId);
				}
			}
			var feats = featRepository.GetFeatsById(objectIds);
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