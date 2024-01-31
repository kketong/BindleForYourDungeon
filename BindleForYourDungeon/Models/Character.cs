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
		public int Level { get; set; }
		public Guid? Inventory { get; set; }
		public ICollection<string>? LearntSpells { get; set; }
		public AbilityScore AbilityScore { get; set; }
		public Proficiency Proficiency { get; set; }
		public int CurrentHitPoints { get; set; }
		public int MaxHitPoints { get; set; }

	}
}
