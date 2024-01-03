using BindleForYourDungeon.Models;
using MongoFramework;

namespace BindleForYourDungeon
{
	public class ApplicationContext(IMongoDbConnection connection) : MongoDbContext(connection)
	{
		public MongoDbSet<Character> Characters { get; set; }
		public MongoDbSet<Item> Items { get; set; }

		protected override void OnConfigureMapping(MappingBuilder mappingBuilder)
		{
			// To map property names, use the following snippet:
			//  mappingBuilder.Entity<Character>()
			//	.HasProperty(m => m.Name, b => b.HasElementName("MappedName"))
			//  .ToCollection("Characters");
			// Then add "[Column("MappedName")]" attribute to the corresponding models property.
		}
	}
}
