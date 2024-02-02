using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.Repositories
{
	public interface IFeatRepository
	{
		void CreateFeat(Feat feat);
		Feat GetFeat(string featId);
		IEnumerable<Feat> GetFeats();
		void UpdateFeat(Feat feat);
		void DeleteFeat(string featId);
	}
}