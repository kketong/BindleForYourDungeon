using AutoMapper;
using BindleForYourDungeon.Mapping;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.DnD5e;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Tests
{
    public class Tests
	{
		DnD5eSpell AreaOfEffectSpell;
		const string AreaOfEffectFilePath = "./TestData/DnD5E/AreaOfEffectSpell.json";
		DnD5eSpell DamageAtCharacterLevelSpell;
		const string DamageAtCharacterLevelFilePath = "./TestData/DnD5E/DamageAtCharacterLevelSpell.json";
		DnD5eSpell DamageAtSlotLevelSpell;
		const string DamageAtSlotLevelFilePath = "./TestData/DnD5E/DamageAtSlotLevelSpell.json";
		MapperConfiguration Configuration;
		IMapper Mapper;
		[SetUp]
		public void Setup()
		{
			var jsonString = File.ReadAllText(AreaOfEffectFilePath);
			AreaOfEffectSpell = JsonSerializer.Deserialize<DnD5eSpell>(jsonString)!;

			jsonString = File.ReadAllText(DamageAtCharacterLevelFilePath);
			DamageAtCharacterLevelSpell = JsonSerializer.Deserialize<DnD5eSpell>(jsonString)!;

			jsonString = File.ReadAllText(DamageAtSlotLevelFilePath);
			DamageAtSlotLevelSpell = JsonSerializer.Deserialize<DnD5eSpell>(jsonString)!;

			Configuration = new MapperConfiguration(cfg =>
			{
				cfg.AddProfile<DnD5eProfile>();
			});
			Mapper = Configuration.CreateMapper();

		}

		[Test]
		public void DnD5ESpells_AssertConfigurationIsValid()
		{
			var configuration = new MapperConfiguration(cfg =>
			{
				cfg.AddProfile<DnD5eProfile>();
			});

			configuration.AssertConfigurationIsValid();

			Assert.Pass();
		}

		[Test]
		public void DnD5ESpells_AreaOfEffectIsMapped()
		{
			var result = Mapper.Map<Spell>(AreaOfEffectSpell);

			Assert.That(result.AreaOfEffectType, Is.EqualTo("cube"));
			Assert.That(result.AreaOfEffectSize, Is.EqualTo("20"));
		}

		[Test]
		public void DnD5ESpells_DamageAtSlotLevelIsMapped()
		{
			var result = Mapper.Map<Spell>(DamageAtSlotLevelSpell);

			Assert.That(result.DamageAtSlotLevel, Is.Not.Null);
		}

		[Test]
		public void DnD5ESpells_DamageAtCharacterLevelIsMapped()
		{
			var result = Mapper.Map<Spell>(DamageAtCharacterLevelSpell);

			Assert.That(result.DamageAtCharacterLevel, Is.Not.Null);
		}
	}
}