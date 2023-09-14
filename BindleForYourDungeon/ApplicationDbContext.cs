using BindleForYourDungeon.Models;
using Microsoft.EntityFrameworkCore;

namespace BindleForYourDungeon
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
		{
		}

		public DbSet<Character> Characters { get; set; }
		public DbSet<Item> Items { get; set; }

	}
}
