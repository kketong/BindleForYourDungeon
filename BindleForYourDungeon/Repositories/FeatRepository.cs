using BindleForYourDungeon.Models;
using MongoFramework.Linq;

namespace BindleForYourDungeon.Repositories
{
	public class FeatRepository(ApplicationContext context) : IFeatRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));

		public void CreateFeat(Feat feat)
		{
			_context.Feats.Add(feat);

			_context.SaveChangesAsync().Wait();
		}

		public Feat GetFeat(string featId)
		{
			var feat = _context.Feats.Find(featId);

			return feat;
		}

		public IEnumerable<Feat> GetFeats()
		{
			return _context.Feats;
		}

		public void UpdateFeat(Feat feat)
		{
			_context.Feats.Update(feat);

			_context.SaveChangesAsync().Wait();
		}

		public void DeleteFeat(string featId)
		{
			_context.Feats.RemoveById(featId);

			_context.SaveChangesAsync().Wait();
		}
	}
}
