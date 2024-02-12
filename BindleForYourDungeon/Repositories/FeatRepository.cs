using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon.Repositories
{
	public class FeatRepository(
		ApplicationContext context,
		ILogger<FeatRepository> logger) : IFeatRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));
		private readonly ILogger _logger = logger;

		public void AddFeat(Feat newFeat)
		{
			_context.Feats.Add(newFeat);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			_context.SaveChanges();
		}

		public void DeleteFeat(Feat feat)
		{
			var featToDelete = _context.Feats.FirstOrDefault(f => f.Id == feat.Id);

			if (featToDelete != null)
			{
				_context.Feats.Remove(featToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				_context.SaveChanges();
			}
			else
			{
				throw new ArgumentException("The feat to delete cannot be found.");
			}
		}

		public void EditFeat(Feat updatedFeat)
		{
			var featToUpdate = _context.Feats.FirstOrDefault(f => f.Id == updatedFeat.Id);


			if (featToUpdate != null)
			{
				_context.Feats.Update(featToUpdate).CurrentValues.SetValues(updatedFeat);

				_context.ChangeTracker.DetectChanges();
				_context.SaveChangesAsync();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Feat to be updated cannot be found");
			}
		}

		public IEnumerable<Feat> GetAllFeats() => _context.Feats.OrderBy(f => f.Name).AsNoTracking().AsEnumerable();

		public Feat GetFeatById(Guid id) => _context.Feats.AsNoTracking().First(f => f.Id == id);

		public IEnumerable<Feat> GetFeatsById(IEnumerable<Guid> ids) => _context.Feats.AsNoTracking().Where(s => ids.Contains((Guid)s.Id));
	}
}
