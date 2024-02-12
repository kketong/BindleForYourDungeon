using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.Enums
{
	[JsonConverter(typeof(JsonStringEnumConverter<CharacterSubClass>))]
	public enum CharacterSubClass
	{
		Berserker,
		Champion,
		Devotion,
		Draconic,
		Evocation,
		Fiend,
		Hunter,
		Land,
		Life,
		Lore,
		OpenHand,
		Thief
	}
}