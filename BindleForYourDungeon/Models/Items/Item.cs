using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.EntityFrameworkCore;

namespace BindleForYourDungeon.Models.Items
{
	[Collection("items")]
    // [BsonKnownTypes(typeof(Weapon))]
	[BsonDiscriminator(RootClass = true)]
	public class Item
	{
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public Guid? Id { get; set; }
        public required string Name { get; set; }
        public string? Type { get; set; }
        public string? Desc { get; set; }
        public decimal Weight { get; set; }
        public string? Rarity { get; set; }
		public int Cost { get; set; } = 0;

		// Weapon properties - not supported by Mongo EF so polymorphism will have to be implemented at a later date.
		// Check https://jira.mongodb.org/projects/EF/issues/EF-80.
		public string? Category { get; set; }
		public string? DamageDice { get; set; }
		public string? DamageType { get; set; }
		public string[]? Properties { get; set; }


	}
}
