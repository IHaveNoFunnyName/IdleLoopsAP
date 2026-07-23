export const name_map = { "Wander": "Wander", "Mana Pot": "Pots", "Lock": "Locks", "Buy Glasses": "BuyGlasses", "Buy Mana": "BuyMana", "Meet People": "Met", "Train Strength": "TrainStrength", "Short Quest": "SQuests", "Investigate": "Secrets", "Long Quest": "LQuests", "Throw Party": "ThrowParty", "Warrior Lessons": "WarriorLessons", "Mage Lessons": "MageLessons", "Heal The Sick": "Heal", "Fight Monsters": "Fight", "Small Dungeon": "SDungeon", "Buy Supplies": "BuySupplies", "Haggle": "Haggle", "Start Journey": "StartJourney", "Explore Forest": "Forest", "Wild Mana": "WildMana", "Herb": "Herbs", "Hunt": "Hunt", "Sit By Waterfall": "SitByWaterfall", "Old Shortcut": "Shortcut", "Talk To Hermit": "Hermit", "Practical Magic": "PracticalMagic", "Learn Alchemy": "LearnAlchemy", "Brew Potions": "BrewPotions", "Train Dexterity": "TrainDexterity", "Train Speed": "TrainSpeed", "Follow Flowers": "Flowers", "Bird Watching": "BirdWatching", "Clear Thicket": "Thicket", "Talk To Witch": "Witch", "Dark Magic": "DarkMagic", "Dark Ritual": "DarkRitual", "Continue On": "ContinueOn", "Explore City": "City", "Gamble": "Gamble", "Get Drunk": "Drunk", "Sell Potions": "SellPotions", "Adventure Guild": "AdvGuild", "Gather Team": "GatherTeam", "Large Dungeon": "LDungeon", "Crafting Guild": "CraftGuild", "Apprentice": "Apprentice", "Mason": "Mason", "Architect": "Architect", "Read Books": "ReadBooks", "Buy Pickaxe": "BuyPickaxe", "Start Trek": "StartTrek", "Climb Mountain": "Mountain", "Mana Geyser": "Geysers", "Decipher Runes": "Runes", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Explore Cavern": "Cavern", "Soulstone": "MineSoulstones", "Hunt Trolls": "HuntTrolls", "Check Walls": "Illusions", "Artifact": "Artifacts", "Face Judgement": "FaceJudgement", "Combat": "Combat", "Magic": "Magic", "Alchemy": "Alchemy", "Imbue Mind": "Imbuement" }
export const name_map_reverse = Object.fromEntries(Object.entries(name_map).map(([k, v]) => [v, k]));

export const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
export const skill_locations = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];

// The order here is used for the "progressive limited" item, so it's ordered in usefulness > zone (mostly)
// Max isn't said explicitly anywhere in the code we could just read
// Will have to be rewritten if we get to Survey
export const limitedActions = {
    "SQuests": { town: 0, max: 20, ratio: 5 },
    "LQuests": { town: 0, max: 10, ratio: 5 },
    "Locks": { town: 0, max: 10, ratio: 10 },
    "WildMana": { town: 1, max: 100, ratio: 10 },
    "Gamble": { town: 2, max: 20, ratio: 10 },
    "Herbs": { town: 1, max: 200, ratio: 10 },
    "Geysers": { town: 3, max: 10, ratio: 100 },
    "MineSoulstones": { town: 3, max: 30, ratio: 10 },
    "Hunt": { town: 1, max: 20, ratio: 10 },
    "Artifacts": { town: 3, max: 20, ratio: 25 },
    "Pots": { town: 0, max: 9999, ratio: 10 },
}
export const segments = {
    "Heal": 3,
    "Fight": 3,
    "SDungeon": 7,
    "AdvGuild": 3,
    "LDungeon": 7,
    "CraftGuild": 3,
    "HuntTrolls": 5,
}

export const skill_actions = ["WarriorLessons", "MageLessons", "PracticalMagic", "LearnAlchemy", "DarkMagic"];