using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface IFeatRepository
	{
		Task AddFeatAsync(Feat feat);
		Task DeleteFeatAsync(Feat feat);
		Task EditFeatAsync(Feat feat);
		Task<IList<Feat>> GetAllFeatsAsync();
		Task<Feat> GetFeatByIdAsync(Guid id);
		Task<IList<Feat>> GetFeatsByIdAsync(IEnumerable<Guid> ids);
	}
}