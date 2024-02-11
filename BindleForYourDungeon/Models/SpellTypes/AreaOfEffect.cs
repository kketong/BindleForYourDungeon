using System.Text.Json.Serialization;

namespace BindleForYourDungeon.Models.SpellTypes
{
    public class AreaOfEffect
    {
		[JsonPropertyName("type")]
		public required string Type { get; set; }

		[JsonPropertyName("size")]
		public int Size { get; set; }
    }
}