using BindleForYourDungeon.Models.Items;

namespace BindleForYourDungeon.Repositories
{
    public interface IItemRepository
	{
		Task AddItemAsync(Item item);
		Task DeleteItemAsync(Item item);
		Task EditItemAsync(Item item);
		Task<IList<Item>> GetAllItemsAsync();
		Task<Item> GetItemByIdAsync(Guid id);
		Task<IList<Item>> GetItemsByIdAsync(IEnumerable<Guid> ids);
	}
}