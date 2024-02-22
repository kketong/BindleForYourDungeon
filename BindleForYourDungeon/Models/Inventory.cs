using BindleForYourDungeon.Models.Items;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace BindleForYourDungeon.Models
{
    public class Inventory
	{
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public int Id { get; set; }
		public List<Item> Items { get; set; }

		public Inventory(List<Item>? items)
		{
			Items = items ?? new List<Item>();
		}
	}
}
