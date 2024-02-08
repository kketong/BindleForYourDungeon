using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using MongoDB.Bson.Serialization.IdGenerators;

namespace BindleForYourDungeon.Models.SpellTypes
{
	[Collection("spells")]
	public class Spell
	{
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public ObjectId Id { get; set; }
		public required string Name { get; set; }
		public required List<string> Desc { get; set; }
		public List<string>? HigherLevel { get; set; }
		public string? Range { get; set; }
		public List<string>? Components { get; set; }
		public string? Material { get; set; }
		public bool Ritual { get; set; }
		public string? Duration { get; set; }
		public bool Concentration { get; set; }
		public string? CastingTime { get; set; }
		public int Level { get; set; }
		public string? AttackType { get; set; }

		public string? DamageType { get; set; }

		public Dictionary<string, object>? DamageAtSlotLevel { get; set; }

		public Dictionary<string, object>? DamageAtCharacterLevel { get; set; }
		public string? School { get; set; }
		public List<string>? Classes { get; set; }
		public List<string>? Subclasses { get; set; }
		public AreaOfEffect? AreaOfEffect { get; set; }
	}
}