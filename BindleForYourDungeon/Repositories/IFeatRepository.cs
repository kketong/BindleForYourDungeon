using BindleForYourDungeon.Models;
using MongoDB.Bson;

namespace BindleForYourDungeon.Repositories
{
	public interface IFeatRepository
	{
		void AddFeat(Feat newFeat);
		void DeleteFeat(Feat feat);
		void EditFeat(Feat updatedFeat);
		IEnumerable<Feat> GetAllFeats();
		Feat GetFeatById(ObjectId id);
		IEnumerable<Feat> GetFeatsById(IEnumerable<ObjectId> ids);
	}
}