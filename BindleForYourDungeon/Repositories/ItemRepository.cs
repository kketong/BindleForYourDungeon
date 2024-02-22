using BindleForYourDungeon.Models.Items;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon.Repositories
{
    public class ItemRepository(
		ApplicationContext context,
		ILogger<ItemRepository> logger) : IItemRepository
	{
		private readonly ApplicationContext _context = context ?? throw new ArgumentNullException(nameof(context));
		private readonly ILogger _logger = logger;

		public async Task AddItemAsync(Item item)
		{
			_context.Items.Add(item);

			_context.ChangeTracker.DetectChanges();
			_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

			await _context.SaveChangesAsync();
		}

		public async Task DeleteItemAsync(Item item)
		{
			var itemToDelete = await _context.Items.FirstOrDefaultAsync(f => f.Id == item.Id);

			if (itemToDelete != null)
			{
				_context.Items.Remove(itemToDelete);

				_context.ChangeTracker.DetectChanges();
				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);

				await _context.SaveChangesAsync();
			}
			else
			{
				throw new ArgumentException("The item to delete cannot be found.");
			}
		}

		public async Task EditItemAsync(Item item)
		{
			var itemToUpdate = await _context.Items.FirstOrDefaultAsync(f => f.Id == item.Id);

			if (itemToUpdate != null)
			{
				_context.Items.Update(itemToUpdate).CurrentValues.SetValues(item);

				_context.ChangeTracker.DetectChanges();
				await _context.SaveChangesAsync();

				_logger.LogInformation(_context.ChangeTracker.DebugView.LongView);
			}
			else
			{
				throw new ArgumentException("Item to be updated cannot be found");
			}
		}

		public async Task<IList<Item>> GetAllItemsAsync() => await _context.Items.OrderBy(f => f.Name).AsNoTracking().ToListAsync();

		public async Task<Item> GetItemByIdAsync(Guid id) => await _context.Items.AsNoTracking().FirstAsync(f => Equals(f.Id, id));

		public async Task<IList<Item>> GetItemsByIdAsync(IEnumerable<Guid> ids) => await _context.Items.AsNoTracking().Where(s => ids.Contains((Guid)s.Id)).ToListAsync();
	}
}
