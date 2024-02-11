using AutoMapper;
using BindleForYourDungeon.DTOs;
using BindleForYourDungeon.Models;
using BindleForYourDungeon.Models.SpellTypes;
using MongoDB.Bson;

namespace BindleForYourDungeon.Mapping
{
	public class CharacterProfile : Profile
	{
		public CharacterProfile()
		{
			CreateMap<Character, CharacterDTO>();
			CreateMap<Spell, SpellDTO>();
			CreateMap<Feat, FeatDTO>();
			CreateMap<List<ObjectId>, List<string>>().ConvertUsing(o => o.Select(os => os.ToString()).ToList());
			CreateMap<List<string>, List<ObjectId>>().ConvertUsing(o => o.Select(ObjectId.Parse).ToList());
			CreateMap<ObjectId, string>().ConvertUsing(o => o.ToString());
		}
	}
}
