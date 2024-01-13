using BindleForYourDungeon;
using Microsoft.EntityFrameworkCore;
using MongoFramework;

var builder = WebApplication.CreateBuilder(args);

// For axios?
//builder.Services.AddCors(options =>
//{
//	options.AddDefaultPolicy(
//		builder =>
//		{
//			builder.AllowAnyOrigin();
//			builder.WithOrigins("https://localhost:44405")
//								.AllowAnyHeader()
//								.AllowAnyMethod();
//		});
//});

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("MongoDbConnectionString");
var mongoConnection = MongoDbConnection.FromConnectionString(connectionString);
builder.Services.AddSingleton(new ApplicationContext(mongoConnection));

builder.Services.AddSingleton<ICharacterRepository, CharacterRepository>();

builder.Services.AddControllersWithViews();
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
