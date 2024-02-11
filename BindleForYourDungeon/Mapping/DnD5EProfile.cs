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
				.ForMember(dest => dest.Id, opt => opt.Ignore())
				.ForMember(dest => dest.School, opt => opt.MapFrom(src => src.School.Name))
				.ForMember(dest => dest.Classes, opt => opt.MapFrom(src => src.Classes.Select(x => x.Name)))
				.ForMember(dest => dest.Subclasses, opt => opt.MapFrom(src => src.Subclasses.Select(x => x.Name)))
				.ForMember(dest => dest.DamageType, opt => opt.PreCondition(src => src.Damage != null))
				.ForMember(dest => dest.DamageType, opt => opt.MapFrom(src => src.Damage.DamageType.Name))
				.ForMember(dest => dest.DamageAtSlotLevel, opt => opt.PreCondition(src => src.Damage?.DamageAtSlotLevel != null))
				.ForMember(dest => dest.DamageAtSlotLevel, opt => opt.MapFrom(src => string.Join(Environment.NewLine, src.Damage.DamageAtSlotLevel)))
				.ForMember(dest => dest.DamageAtCharacterLevel, opt => opt.PreCondition(src => src.Damage?.DamageAtCharacterLevel != null))
				.ForMember(dest => dest.DamageAtCharacterLevel, opt => opt.MapFrom(src => string.Join(Environment.NewLine, src.Damage.DamageAtCharacterLevel)))
				.ForMember(dest => dest.HealAtSlotLevel, opt => opt.PreCondition(src => src.HealAtSlotLevel != null))
				.ForMember(dest => dest.HealAtSlotLevel, opt => opt.MapFrom(src => string.Join(Environment.NewLine, src.HealAtSlotLevel)))
				.ForMember(dest => dest.AreaOfEffectSize, opt => opt.PreCondition(src => src.AreaOfEffect != null))
				.ForMember(dest => dest.AreaOfEffectSize, opt => opt.MapFrom(src => src.AreaOfEffect.Size))
				.ForMember(dest => dest.AreaOfEffectType, opt => opt.PreCondition(src => src.AreaOfEffect != null))
				.ForMember(dest => dest.AreaOfEffectType, opt => opt.MapFrom(src => src.AreaOfEffect.Type));

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
