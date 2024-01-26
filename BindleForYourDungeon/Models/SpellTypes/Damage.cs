
using BindleForYourDungeon.Models.Enums;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.SpellTypes
{
	public class Damage
	{
		public string? DamageType { get; set; }

		public Dictionary<string, string>? DamageAtSlotLevel { get; set; }

		public Dictionary<string, string>? DamageAtCharacterLevel { get; set; } 
	}
}