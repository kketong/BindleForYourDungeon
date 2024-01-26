using AutoMapper;
using BindleForYourDungeon.Models.Dnd5E;
using BindleForYourDungeon.Models.SpellTypes;
using Microsoft.IdentityModel.Tokens;

namespace BindleForYourDungeon.Mapping
{
	public class DnD5EProfile : Profile
	{
		public DnD5EProfile()
		{
			CreateMap<Dnd5ESpell, Spell>()
				.ForMember(dest => dest.Classes, opt => opt.MapFrom(src => src.Classes.Select(x => x.Name)))
				.ForMember(dest => dest.School, opt => opt.MapFrom(src => src.School.Name))
				.ForMember(dest => dest.Subclasses, opt => opt.MapFrom(src => src.Subclasses.Select(x => x.Name)));

			CreateMap<Dnd5EDamage, Damage>()
				.ForMember(dest => dest.DamageType, opt => opt.PreCondition(src => src.DamageType != null))
				.ForMember(dest => dest.DamageType, opt => opt.MapFrom(src => src.DamageType.Name))				
				.ForMember(x => x.DamageAtCharacterLevel, opts => opts.PreCondition((src) => src.DamageAtCharacterLevel != null))
				.ForMember(x => x.DamageAtCharacterLevel, opts => opts.AllowNull())
				.ForMember(x => x.DamageAtSlotLevel, opts => opts.PreCondition((src) => src.DamageAtSlotLevel != null))
				.ForMember(x => x.DamageAtSlotLevel, opts => opts.AllowNull());


		}

		private static List<string> ToDamageAtSlotLevel(Dnd5EDamageAtSlotLevel atSlotLevel)
		{
			var list = new List<string>();
			if (atSlotLevel._2 != null) {
				list.Add(atSlotLevel._2);
			}
			if (atSlotLevel._3 != null) {
				list.Add(atSlotLevel._3);
			}
			if (atSlotLevel._4 != null)
			{
				list.Add(atSlotLevel._4);
			}
			if (atSlotLevel._5 != null)
			{
				list.Add(atSlotLevel._5);
			}
			if (atSlotLevel._6 != null)
			{
				list.Add(atSlotLevel._6);
			}
			if (atSlotLevel._7 != null)
			{
				list.Add(atSlotLevel._7);
			}
			if (atSlotLevel._8 != null)
			{
				list.Add(atSlotLevel._8);
			}
			if (atSlotLevel._9 != null)
			{
				list.Add(atSlotLevel._9);
			}
			return list;
		}

	}
}
