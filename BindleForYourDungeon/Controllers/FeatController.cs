using BindleForYourDungeon.Models;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("feats")]
	public class FeatController(
		ILogger<FeatController> logger,
		IFeatRepository FeatRepository
		) : ControllerBase
	{
		private readonly ILogger<FeatController> _logger = logger;
		private readonly IFeatRepository FeatRepository = FeatRepository ?? throw new ArgumentNullException(nameof(FeatRepository));

		[HttpGet]
		public IEnumerable<Feat> GetFeats()
		{
			var feats = FeatRepository.GetFeats().OrderBy(feat => feat.Name);

			return feats;
		}

		[HttpGet("{featId}")]
		public Feat GetFeat(string featId)
		{
			var feat = FeatRepository.GetFeat(featId);

			return feat;
		}

		[HttpPut]
		public IActionResult PutFeat(Feat feat)
		{
			var existingFeat = FeatRepository.GetFeats().Where(f => f.Name == feat.Name).FirstOrDefault();
			if (existingFeat != null)
			{
				feat.Id = existingFeat.Id;
				FeatRepository.UpdateFeat(feat);

				return Ok(existingFeat);
			}

			FeatRepository.CreateFeat(feat);

			return Created(string.Empty, feat);
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(string featId)
		{
			FeatRepository.DeleteFeat(featId);

			return NoContent();
		}
	}
}