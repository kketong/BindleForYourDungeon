
using BindleForYourDungeon.Models.Enums;

namespace BindleForYourDungeon.Models.SpellTypes
{
	public class Damage
	{
		public DamageType DamageType { get; set; }
		public string[] DamageAtSlotLevel { get; set; }
	}
}