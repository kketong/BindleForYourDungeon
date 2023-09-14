namespace BindleForYourDungeon.Models
{
	public class Character
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public int Level { get; set; }
		public Inventory Inventory { get; set; }

		public Character(string name, string description, int level, Inventory inventory)
		{
			Name = name;
			Description = description;
			Level = level;
			Inventory = inventory;
		}
	}
}
