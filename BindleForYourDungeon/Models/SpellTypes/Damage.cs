using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using MongoDB.EntityFrameworkCore;

namespace BindleForYourDungeon.Models.SpellTypes
{
	public class Damage
	{
		public string? DamageType { get; set; }
		[BsonDictionaryOptions(DictionaryRepresentation.ArrayOfDocuments)]
		public Dictionary<string, object> DamageAtSlotLevel { get; set; }

		[BsonDictionaryOptions(DictionaryRepresentation.ArrayOfDocuments)]
		public Dictionary<string, object> DamageAtCharacterLevel { get; set; } 


	}
}