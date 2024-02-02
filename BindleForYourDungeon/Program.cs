using BindleForYourDungeon;
using BindleForYourDungeon.Mapping;
using BindleForYourDungeon.Repositories;
using Microsoft.EntityFrameworkCore;
using MongoFramework;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("MongoDbConnectionString");

// Services
builder.Services.AddMongoC
builder.Services.AddTransient<IMongoDbConnection>(s => MongoDbConnection.FromConnectionString(connectionString));
builder.Services.AddTransient<IMongoDbContext, ApplicationContext>();
builder.Services.AddSingleton<ICharacterRepository, CharacterRepository>();
builder.Services.AddSingleton<ISpellRepository, SpellRepository>();
builder.Services.AddSingleton<IFeatRepository, FeatRepository>();

// Mappers
builder.Services.AddAutoMapper(typeof(DnD5eProfile));
builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
