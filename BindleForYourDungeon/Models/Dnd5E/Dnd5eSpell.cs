using System.Text.Json.Serialization;
using BindleForYourDungeon.Models.SpellTypes;

namespace BindleForYourDungeon.Models.DnD5e
{
	public class DnD5eSpell
	{
		[JsonPropertyName("index")]
		public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("desc")]
		public List<string> Desc { get; set; }

		[JsonPropertyName("higher_level")]
		public List<string> HigherLevel { get; set; }

		[JsonPropertyName("range")]
		public string Range { get; set; }

		[JsonPropertyName("components")]
		public List<string> Components { get; set; }

		[JsonPropertyName("material")]
		public string? Material { get; set; }

		[JsonPropertyName("ritual")]
		public bool Ritual { get; set; }

		[JsonPropertyName("duration")]
		public string Duration { get; set; }

		[JsonPropertyName("concentration")]
		public bool Concentration { get; set; }

		[JsonPropertyName("casting_time")]
		public string? CastingTime { get; set; }

		[JsonPropertyName("level")]
		public int Level { get; set; }

		[JsonPropertyName("attack_type")]
		public string? AttackType { get; set; }

		[JsonPropertyName("damage")]
		public DnD5eDamage? Damage { get; set; }

		[JsonPropertyName("school")]
		public DnD5eSchool School { get; set; }

		[JsonPropertyName("classes")]
		public List<DnD5eClass> Classes { get; set; }

		[JsonPropertyName("subclasses")]
		public List<DnD5eSubclass> Subclasses { get; set; }

		[JsonPropertyName("url")]
		public string Url { get; set; }

		[JsonPropertyName("area_of_effect")]
		public AreaOfEffect? AreaOfEffect { get; set; }

		[JsonPropertyName("heal_at_slot_level")]
		public IDictionary<string, string>? HealAtSlotLevel { get; set; }
	}

	public class DnD5eDamage
	{
		[JsonPropertyName("damage_type")]
		public DnD5eDamageType? DamageType { get; set; }

		[JsonPropertyName("damage_at_slot_level")]
		public IDictionary<string, string>? DamageAtSlotLevel { get; set; }

		[JsonPropertyName("damage_at_character_level")]
		public IDictionary<string, string>? DamageAtCharacterLevel { get; set; }
	}

	public class DnD5eDamageType
	{
		[JsonPropertyName("index")]
		public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("url")]
		public string Url { get; set; }
	}

	public class DnD5eSchool
	{
		//	[JsonPropertyName("index")]
		//	public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}
	public class DnD5eClass
	{
		//[JsonPropertyName("index")]
		//public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}

	public class DnD5eSubclass
	{
		//	[JsonPropertyName("index")]
		//	public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}
}