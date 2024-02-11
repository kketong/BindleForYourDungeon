using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;

namespace BindleForYourDungeon.Models
{
    [Collection("characters")]
    public class Character
    {
        public ObjectId Id { get; set; }
        public required string Name { get; set; }
        public required string[] CharacterClass { get; set; }
        public required string Description { get; set; }
        public string Race { get; set; } = string.Empty;
        public int Level { get; set; }
        public ObjectId[]? Inventory { get; set; } = [];
        public ObjectId[]? LearntSpells { get; set; } = [];
        public AbilityScore AbilityScore { get; set; } = new AbilityScore();
        public ObjectId[]? Proficiency { get; set; } = [];
        public int CurrentHitPoints { get; set; } = 0;
        public int MaxHitPoints { get; set; } = 0;
        public int Experience { get; set; } = 0;
        public bool Inspired { get; set; } = false;
        public ObjectId[]? Feats { get; set; } = [];
    }
}
