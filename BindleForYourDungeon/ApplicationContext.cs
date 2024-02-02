using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.SpellTypes;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace BindleForYourDungeon
{
	public class ApplicationContext(IMongoClient mongoClient) : DbContext
	{
		public IMongoClient MongoClient { get; set; } = mongoClient;
		public DbSet<Character> Characters { get; set; } = 
		public DbSet<Spell> Spells { get; set; }
		public DbSet<Feat> Feats { get; set; }
		public DbSet<Item> Items { get; set; }

		public static ApplicationContext Create(IMongoDatabase database) =>
			new(new DbContextOptionsBuilder<global::ApplicationContext>()
				.UseMongoDB(mongoClient, mongoClient.GetDatabase("sample_mflix").DatabaseNamespace.DatabaseName)
				.Options);

		//protected override void OnConfigureMapping(MappingBuilder mappingBuilder)
		//{
		// To map property names, use the following snippet:
		//  mappingBuilder.Entity<Character>()
		//	.HasProperty(m => m.Name, b => b.HasElementName("MappedName"))
		//  .ToCollection("Characters");
		// Then add "[Column("MappedName")]" attribute to the model property.
		//}
	}
}
