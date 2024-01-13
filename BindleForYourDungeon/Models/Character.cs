using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.ComponentModel.DataAnnotations.Schema;

namespace BindleForYourDungeon.Models
{
	[Table("Characters")]
	public class Character
	{
		//Use "[Column("mappedname")]" to map a different name to the field.
		[Column("Id")]
		[BsonId(IdGenerator = typeof(CombGuidGenerator))]
		public Guid CharacterId { get; set; }	
		public required string Name { get; set; }
		public CharacterClass[] CharacterClass { get; set; }
		public required string Description { get; set; }
		public int Level { get; set; }
		public Inventory? Inventory { get; set; }
	}
}
