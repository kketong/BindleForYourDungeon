using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("feats")]
	public class FeatController(
		ILogger<FeatController> logger,
		IFeatRepository featRepository) : ControllerBase
	{
		private readonly ILogger<FeatController> _logger = logger;
		private readonly IFeatRepository featRepository = featRepository ?? throw new ArgumentNullException(nameof(featRepository));

		[HttpGet]
		public IEnumerable<Feat> GetFeats()
		{
			var feats = featRepository.GetAllFeats();

			return feats;
		}

		[HttpGet("{featId}")]
		public IEnumerable<Feat> GetFeat(string featId)
		{
			var feats = featRepository.GetAllFeats();

			return feats;
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