using AutoMapper;
using BindleForYourDungeon.Models.DnD5e;
using BindleForYourDungeon.Models.SpellTypes;

namespace BindleForYourDungeon.Mapping
{
	public class DnD5eProfile : Profile
	{
		public DnD5eProfile()
		{
			CreateMap<DnD5eSpell, Spell>()
				.ForMember(dest => dest.Classes, opt => opt.MapFrom(src => src.Classes.Select(x => x.Name)))
				.ForMember(dest => dest.School, opt => opt.MapFrom(src => src.School.Name))
				.ForMember(dest => dest.Subclasses, opt => opt.MapFrom(src => src.Subclasses.Select(x => x.Name)))
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Index));

			CreateMap<DnD5eDamage, Damage>()
				.ForMember(dest => dest.DamageType, opt => opt.PreCondition(src => src.DamageType != null))
				.ForMember(dest => dest.DamageType, opt => opt.MapFrom(src => src.DamageType.Name))				
				.ForMember(x => x.DamageAtCharacterLevel, opts => opts.PreCondition((src) => src.DamageAtCharacterLevel != null))
				.ForMember(x => x.DamageAtCharacterLevel, opts => opts.AllowNull())
				.ForMember(x => x.DamageAtSlotLevel, opts => opts.PreCondition((src) => src.DamageAtSlotLevel != null))
				.ForMember(x => x.DamageAtSlotLevel, opts => opts.AllowNull());

		}
	}
}
