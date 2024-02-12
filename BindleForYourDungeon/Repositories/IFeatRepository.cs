using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface IFeatRepository
	{
		void AddFeat(Feat newFeat);
		void DeleteFeat(Feat feat);
		void EditFeat(Feat updatedFeat);
		IEnumerable<Feat> GetAllFeats();
		Feat GetFeatById(Guid id);
		IEnumerable<Feat> GetFeatsById(IEnumerable<Guid> ids);
	}
}