namespace BindleForYourDungeon.Models
{
	public class Inventory
	{
		public int Id { get; set; }
		public List<Item> Items { get; set; }

		public Inventory(List<Item>? items)
		{
			Items = items ?? new List<Item>();
		}
	}
}
