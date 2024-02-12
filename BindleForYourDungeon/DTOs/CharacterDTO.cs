using BindleForYourDungeon.Models;

namespace BindleForYourDungeon.DTOs
{
	public class CharacterDTO
	{
		public string Id { get; set; } = string.Empty;
		public required string Name { get; set; }
		public required string[] CharacterClass { get; set; }
		public required string Description { get; set; }
		public string Race { get; set; } = string.Empty;
		public int Level { get; set; }
		public string[] Inventory { get; set; } = [];
		public string[] LearntSpells { get; set; } = [];
		public AbilityScore AbilityScore { get; set; } = new AbilityScore();
		public string[] Proficiency { get; set; } = [];
		public int CurrentHitPoints { get; set; } = 0;
		public int MaxHitPoints { get; set; } = 0;
		public int Experience { get; set; } = 0;
		public bool Inspired { get; set; } = false;
		public string[] Feats { get; set; } = [];
	}
}
