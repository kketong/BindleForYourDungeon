namespace BindleForYourDungeon.DTOs
{
	public class SpellDTO
	{
		public string Id { get; set; }
		public required string Name { get; set; }
		public required string[] Desc { get; set; }
		public string[]? HigherLevel { get; set; }
		public string? Range { get; set; }
		public string[]? Components { get; set; }
		public string? Material { get; set; }
		public bool Ritual { get; set; }
		public string? Duration { get; set; }
		public bool Concentration { get; set; }
		public string? CastingTime { get; set; }
		public int Level { get; set; }
		public string? AttackType { get; set; }
		public string? DamageType { get; set; }
		public string? DamageAtSlotLevel { get; set; }
		public string? DamageAtCharacterLevel { get; set; }
		public string? HealAtSlotLevel { get; set; }
		public string? School { get; set; }
		public string[]? Classes { get; set; }
		public string[]? Subclasses { get; set; }
		public string? AreaOfEffectType { get; set; }
		public string? AreaOfEffectSize { get; set; }

	}
}