using System.Text.Json.Serialization;
using BindleForYourDungeon.Models.SpellTypes;

namespace BindleForYourDungeon.Models.Dnd5E
{
	public class Dnd5ESpell
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
		public Dnd5EDamage? Damage { get; set; }

		[JsonPropertyName("school")]
		public Dnd5ESchool School { get; set; }

		[JsonPropertyName("classes")]
		public List<Dnd5EClass> Classes { get; set; }

		[JsonPropertyName("subclasses")]
		public List<Dnd5ESubclass> Subclasses { get; set; }

		[JsonPropertyName("url")]
		public string Url { get; set; }

		[JsonPropertyName("area_of_effect")]
		public AreaOfEffect? AreaOfEffect { get; set; }

	}

	public class Dnd5EDamage
	{
		[JsonPropertyName("damage_type")]
		public Dnd5EDamageType? DamageType { get; set; }

		[JsonPropertyName("damage_at_slot_level")]
		public Dictionary<string, string>? DamageAtSlotLevel { get; set; }

		[JsonPropertyName("damage_at_character_level")]
		public Dictionary<string, string>? DamageAtCharacterLevel { get; set; }
	}

	public class Dnd5EDamageAtSlotLevel
	{
		[JsonPropertyName("2")]
		public string? _2 { get; set; }

		[JsonPropertyName("3")]
		public string? _3 { get; set; }

		[JsonPropertyName("4")]
		public string? _4 { get; set; }

		[JsonPropertyName("5")]
		public string? _5 { get; set; }

		[JsonPropertyName("6")]
		public string? _6 { get; set; }

		[JsonPropertyName("7")]
		public string? _7 { get; set; }

		[JsonPropertyName("8")]
		public string? _8 { get; set; }

		[JsonPropertyName("9")]
		public string? _9 { get; set; }
	}

	public class Dnd5EDamageType
	{
		[JsonPropertyName("index")]
		public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("url")]
		public string Url { get; set; }
	}

	public class Dnd5ESchool
	{
		//	[JsonPropertyName("index")]
		//	public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}
	public class Dnd5EClass
	{
		//[JsonPropertyName("index")]
		//public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}

	public class Dnd5ESubclass
	{
		//	[JsonPropertyName("index")]
		//	public string Index { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		//[JsonPropertyName("url")]
		//public string Url { get; set; }
	}
}