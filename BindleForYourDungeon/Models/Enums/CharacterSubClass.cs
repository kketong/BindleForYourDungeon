using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter<CharacterSubClass>))]
    public enum CharacterSubClass
    {
        berserker,
        champion,
        devotion,
        draconic,
        evocation,
        fiend,
        hunter,
        land,
        life,
        lore,
        openHand,
        thief
    }
}