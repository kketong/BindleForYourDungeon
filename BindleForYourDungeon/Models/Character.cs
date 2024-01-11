using System.ComponentModel.DataAnnotations.Schema;

namespace BindleForYourDungeon.Models
{
	[Table("Characters")]
	public class Character
	{
		//Use "[Column("mappedname")]" to map a different name to the field.
		[Column("Id")]
		public int CharacterId { get; set; }		
		public string Name { get; set; }
		public CharacterClass CharacterClass { get; set; }
		public string Description { get; set; }
		public int Level { get; set; }
		public Inventory Inventory { get; set; }
	}
}
