using BindleForYourDungeon.Mapping;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.MongoDB;
using BindleForYourDungeon.Repositories;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container
builder.Services.AddControllersWithViews();

// MongoDB
var connectionString = builder.Configuration.GetConnectionString("MongoDbConnectionString");
var mongoDBSettings = builder.Configuration.GetSection("MongoDBSettings").Get<MongoDBSettings>();
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.AddDbContext<ApplicationContext>(options =>
	options.UseMongoDB(mongoDBSettings.AtlasURI ?? "", mongoDBSettings.DatabaseName ?? ""));

// Services
builder.Services.AddScoped<ICharacterRepository, CharacterRepository>();
builder.Services.AddScoped<ISpellRepository, SpellRepository>();
builder.Services.AddScoped<IFeatRepository, FeatRepository>();
BsonClassMap.RegisterClassMap<Feat>();
BsonClassMap.RegisterClassMap<Character>();
BsonClassMap.RegisterClassMap<Spell>();
BsonClassMap.RegisterClassMap<Item>();

// Mappers
//builder.Services.AddAutoMapper(typeof(DnD5eProfile));
builder.Services.AddAutoMapper(typeof(CharacterProfile), typeof(DnD5eProfile));

// Swagger?
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
