using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.SpellTypes;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

internal class ApplicationContext(DbContextOptions options) : DbContext(options)
{
	public DbSet<Character> Characters { get; init; }
	public DbSet<Spell> Spells { get; init; }
	public DbSet<Feat> Feats { get; init; }
	public DbSet<Item> Items { get; init; }

	public static ApplicationContext Create(IMongoDatabase database) =>
		new(new DbContextOptionsBuilder<ApplicationContext>()
			.UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
			.Options);

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.Entity<Character>().ToCollection("characters");
		modelBuilder.Entity<Spell>().ToCollection("spells");
		modelBuilder.Entity<Feat>().ToCollection("feats");
		modelBuilder.Entity<Item>().ToCollection("items");
	}
}