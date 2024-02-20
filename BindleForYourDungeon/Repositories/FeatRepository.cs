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

		public async Task AddFeatAsync(Feat feat)
		{
			_context.Feats.Add(feat);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			await _context.SaveChangesAsync();
		}

		public async Task DeleteFeatAsync(Feat feat)
		{
			var featToDelete = await _context.Feats.FirstOrDefaultAsync(f => f.Id == feat.Id);

			if (featToDelete != null)
			{
				_context.Feats.Remove(featToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				await _context.SaveChangesAsync();
			}
			else
			{
				throw new ArgumentException("The feat to delete cannot be found.");
			}
		}

		public async Task EditFeatAsync(Feat feat)
		{
			var featToUpdate = await _context.Feats.FirstOrDefaultAsync(f => f.Id == feat.Id);

			if (featToUpdate != null)
			{
				_context.Feats.Update(featToUpdate).CurrentValues.SetValues(feat);

				_context.ChangeTracker.DetectChanges();
				await _context.SaveChangesAsync();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Feat to be updated cannot be found");
			}
		}

		public async Task<IList<Feat>> GetAllFeatsAsync() => await _context.Feats.OrderBy(f => f.Name).AsNoTracking().ToListAsync();

		public async Task<Feat> GetFeatByIdAsync(Guid id) => await _context.Feats.AsNoTracking().FirstAsync(f => Equals(f.Id, id));

		public async Task<IList<Feat>> GetFeatsByIdAsync(IEnumerable<Guid> ids) => await _context.Feats.AsNoTracking().Where(s => ids.Contains((Guid)s.Id)).ToListAsync();
	}
}
