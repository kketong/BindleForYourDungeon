
using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.Enums
{
	[JsonConverter(typeof(JsonStringEnumConverter<School>))]
	public enum School
	{
		abjuration,
		conjuration,
		divination,
		enchantment,
		evocation,
		illusion,
		necromancy,
		transmutation
	}
}

