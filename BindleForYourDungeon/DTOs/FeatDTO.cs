namespace BindleForYourDungeon.DTOs
{
	public class FeatDTO
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string Desc { get; set; }

		public string? Prerequisite { get; set; }

		public string[] EffectsDesc { get; set; }
	}
}
