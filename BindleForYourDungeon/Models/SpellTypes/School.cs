
using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.Spell
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

