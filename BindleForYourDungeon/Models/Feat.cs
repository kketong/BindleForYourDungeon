using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models
{
	public class Feat
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? Id { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; }

		[JsonPropertyName("desc")]
		public string Desc { get; set; }

		[JsonPropertyName("prerequisite")]
		public string? Prerequisite { get; set; }

		[JsonPropertyName("effects_desc")]
		public List<string> EffectsDesc { get; set; }

	}
}