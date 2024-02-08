using MongoDB.Bson.Serialization.Options;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.Serialization;
using System.Collections;

namespace BindleForYourDungeon.Serializers
{
	public class DictionarySerializer<TDictionary, KeySerializer, ValueSerializer> : DictionarySerializerBase<TDictionary>
		where TDictionary : class, IDictionary, new()
		where KeySerializer : IBsonSerializer, new()
		where ValueSerializer : IBsonSerializer, new()
	{
		public DictionarySerializer() : base(DictionaryRepresentation.Document, new KeySerializer(), new ValueSerializer())
		{
		}

		protected override TDictionary CreateInstance()
		{
			return new TDictionary();
		}
	}
}
