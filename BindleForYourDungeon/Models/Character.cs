using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.EntityFrameworkCore;

namespace BindleForYourDungeon.Models
{
	[Collection("characters")]
	public class Character
	{
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public Guid? Id { get; set; }
		public required string Name { get; set; }
		public required string[] CharacterClass { get; set; }
		public string Description { get; set; } = string.Empty;
		public string Race { get; set; } = string.Empty;
		public int Level { get; set; }
		public Guid[] Inventory { get; set; } = [];
		public Guid[] LearntSpells { get; set; } = [];
		public AbilityScore AbilityScore { get; set; } = new AbilityScore();
		public Guid[] Proficiency { get; set; } = [];
		public int CurrentHitPoints { get; set; }
		public int MaxHitPoints { get; set; }
		public int Experience { get; set; }
		public bool Inspired { get; set; } = false;
		public Guid[] Feats { get; set; } = [];
	}
}
