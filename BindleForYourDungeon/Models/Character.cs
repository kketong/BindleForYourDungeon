using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.ComponentModel.DataAnnotations.Schema;

namespace BindleForYourDungeon.Models
{
	[Table("Characters")]
	public class Character
	{
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public Guid Id { get; set; }
		public required string Name { get; set; }
		public required string[] CharacterClass { get; set; }
		public required string Description { get; set; }
		public string Race { get; set; } = string.Empty;
		public int Level { get; set; }
		public Guid? Inventory { get; set; }
		public ICollection<string>? LearntSpells { get; set; }
		public AbilityScore AbilityScore { get; set; } = new AbilityScore();
		public Proficiency[] Proficiency { get; set; } = [];
		public int CurrentHitPoints { get; set; } = 0;
		public int MaxHitPoints { get; set; } = 0;
		public int Experience { get; set; } = 0;
		public bool Inspired { get; set; } = false;
		public Feat[] Feat { get; set; } = [];
	}
}
