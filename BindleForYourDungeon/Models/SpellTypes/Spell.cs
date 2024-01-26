using System.ComponentModel.DataAnnotations.Schema;

namespace BindleForYourDungeon.Models.SpellTypes
{
	[Table("Spells")]
	public class Spell
	{
		public string Id { get; set; }
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
		public Damage? Damage { get; set; }
		public string? School { get; set; }
		public List<string>? Classes { get; set; }
		public List<string>? Subclasses { get; set; }
		public AreaOfEffect? AreaOfEffect { get; set; }
	}
}