using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models
{
	[JsonConverter(typeof(JsonStringEnumConverter<CharacterClass>))]
	public enum CharacterClass
	{
		None,
		Barbarian,
		Bard,
		Cleric,
		Druid,
		Fighter,
		Monk,
		Paladin,
		Ranger,
		Rogue,
		Sorcerer,
		Warlock,
		Wizard
	}
}