using BindleForYourDungeon;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MongoFramework;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("MongoDbConnectionString");
var mongoConnection = MongoDbConnection.FromConnectionString(connectionString);
builder.Services.AddSingleton(new ApplicationContext(mongoConnection));

builder.Services.AddSingleton<ICharacterRepository, CharacterRepository>();

builder.Services.AddControllersWithViews();
//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//	options.UseSqlServer(builder.Configuration.GetConnectionString("SqlDbConnectionString"))
//);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
