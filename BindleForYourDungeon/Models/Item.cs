namespace BindleForYourDungeon.Models
{
	public class Item
	{
		public int Id { get; set; }
		public string Name { get; set; } = "Item";
		public string? Description { get; set; }
		public decimal Weight { get; set; } = decimal.Zero;
	}
}
