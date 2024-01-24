using BindleForYourDungeon.Models.Enums;
using BindleForYourDungeon.Models.SpellTypes;
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
		public Guid Id { get; set; }
		public required string Name { get; set; }
		public required CharacterClass[] CharacterClass { get; set; }
		public required string Description { get; set; }
		public int Level { get; set; }
		public Inventory? Inventory { get; set; }
		public Spell[]? Spells { get; set; }
	}
}
