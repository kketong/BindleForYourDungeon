using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.Enums
{
	[JsonConverter(typeof(JsonStringEnumConverter<DamageType>))]
	public enum DamageType
    {
        acid,
        bludgeoning,
        cold,
        fire,
        force,
        lightning,
        necrotic,
        piercing,
        poison,
        psychic,
        radiant,
        slashing,
        thunder
    }
}