using AutoMapper;
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
		public async Task<ActionResult<IList<Feat>>> GetFeats()
		{
			var feats = await featRepository.GetAllFeatsAsync();

			return Ok(feats);
		}

		[HttpGet("{featId}")]
		public async Task<ActionResult<Feat>> GetFeat(Guid featId)
		{
			var feat = await featRepository.GetFeatByIdAsync(featId);

			return Ok(feat);
		}

		[HttpPost]
		public async Task<ActionResult> AddFeat(Feat feat)
		{
			await featRepository.AddFeatAsync(feat);

			return Created(Url.Content("~/") + feat.Id, feat);
		}

		[HttpPatch()]
		public async Task<ActionResult<Feat>> EditFeat(Feat feat)
		{
			await featRepository.EditFeatAsync(feat);

			return Ok(feat);
		}

		[HttpDelete()]
		public async Task<ActionResult> DeleteAsync(Feat feat)
		{
			if (feat.Id == default)
			{
				var errorMessage = "Delete feat failed: invalid ID.";
				_logger.LogWarning(errorMessage);
				return BadRequest(errorMessage);
			}

			await featRepository.DeleteFeatAsync(feat);

			return NoContent();
		}
	}
}