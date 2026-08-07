export const name_map = { "Wander": "Wander", "Mana Pot": "Pots", "Lock": "Locks", "Buy Glasses": "BuyGlasses", "Buy Mana": "BuyMana", "Meet People": "Met", "Train Strength": "TrainStrength", "Short Quest": "SQuests", "Investigate": "Secrets", "Long Quest": "LQuests", "Throw Party": "ThrowParty", "Buy Supplies": "BuySupplies", "Haggle": "Haggle", "Start Journey": "StartJourney", "AP Shop": "APShop", "AP Shop (Expensive)": "APShopExpensive", "Heal The Sick": "Heal", "Fight Monsters": "Fight", "Small Dungeon": "SDungeon", "Warrior Lessons": "WarriorLessons", "Mage Lessons": "MageLessons", "Explore Forest": "Forest", "Wild Mana": "WildMana", "Herb": "Herbs", "Hunt": "Hunt", "Sit By Waterfall": "SitByWaterfall", "Old Shortcut": "Shortcut", "Talk To Hermit": "Hermit", "Brew Potions": "BrewPotions", "Train Dexterity": "TrainDexterity", "Train Speed": "TrainSpeed", "Follow Flowers": "Flowers", "Bird Watching": "BirdWatching", "Clear Thicket": "Thicket", "Talk To Witch": "Witch", "Continue On": "ContinueOn", "Practical Magic": "PracticalMagic", "Learn Alchemy": "LearnAlchemy", "Dark Magic": "DarkMagic", "Dark Ritual": "DarkRitual", "Explore City": "City", "Gamble": "Gamble", "Get Drunk": "Drunk", "Sell Potions": "SellPotions", "Adventure Guild": "AdvGuild", "Gather Team": "GatherTeam", "Crafting Guild": "CraftGuild", "Craft Armor": "CraftArmor", "Apprentice": "Apprentice", "Mason": "Mason", "Architect": "Architect", "Read Books": "ReadBooks", "Buy Pickaxe": "BuyPickaxe", "Start Trek": "StartTrek", "Large Dungeon": "LDungeon", "Climb Mountain": "Mountain", "Mana Geyser": "Geysers", "Decipher Runes": "Runes", "Explore Cavern": "Cavern", "Soulstone": "MineSoulstones", "Check Walls": "Illusions", "Artifact": "Artifacts", "Face Judgement": "FaceJudgement", "Hunt Trolls": "HuntTrolls", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Imbue Mind": "Imbue Mind" }
export const name_map_reverse = Object.fromEntries(Object.entries(name_map).map(([k, v]) => [v, k]));
export const skill_map = { "Combat": "Combat", "Magic": "Magic", "Practical Magic": "Practical", "Alchemy": "Alchemy", "Dark Magic": "Dark", "Dark Ritual": "Ritual", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Imbue Mind": "Imbuement" }
export const skill_map_reverse = Object.fromEntries(Object.entries(skill_map).map(([k, v]) => [v, k]));

export const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
export const skill_locations = {
    "Combat": 10,
    "Magic": 10,
    "Practical": 10,
    "Alchemy": 5,
    "Dark": 10,
    "Chronomancy": 10,
    "Pyromancy": 10,
};

// The order here is used for the "progressive limited" item, so it's ordered in usefulness > zone (mostly)
// Max isn't said explicitly anywhere in the code we could just read
// Will have to be rewritten if we get to Survey
export const limitedActions = {
    "SQuests": { town: 0, max: 20, ratio: 5, bulk: 1 },
    "LQuests": { town: 0, max: 10, ratio: 5, bulk: 1 },
    "Locks": { town: 0, max: 10, ratio: 10, bulk: 1 },
    "WildMana": { town: 1, max: 100, ratio: 10, bulk: 10 },
    "Gamble": { town: 2, max: 20, ratio: 10, bulk: 1 },
    "Herbs": { town: 1, max: 200, ratio: 10, bulk: 10 },
    "Geysers": { town: 3, max: 10, ratio: 100, bulk: 1 },
    "MineSoulstones": { town: 3, max: 30, ratio: 10, bulk: 1 },
    "Hunt": { town: 1, max: 20, ratio: 10, bulk: 1 },
    "Artifacts": { town: 3, max: 20, ratio: 25, bulk: 1 },
    "Pots": { town: 0, max: 9999, ratio: 10, bulk: 1 },
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

export const skill_requirements = {
    "Heal": () => getSkillLevel("Magic") >= 12,
    "Fight": () => getSkillLevel("Combat") >= 10,
    "SDungeon": () => (getSkillLevel("Combat") + getSkillLevel("Magic")) >= 35,
    "BuySupplies": () => (getSkillLevel("Combat") + getSkillLevel("Magic")) >= 35,
    "Haggle": () => (getSkillLevel("Combat") + getSkillLevel("Magic")) >= 35,
    "StartJourney": () => (getSkillLevel("Combat") + getSkillLevel("Magic")) >= 35,

    "Hermit": () => getSkillLevel("Magic") >= 40,
    "PracticalMagic": () => getSkillLevel("Magic") >= 50,
    "LearnAlchemy": () => getSkillLevel("Magic") >= 60,
    "BrewPotions": () => getSkillLevel("Alchemy") >= 10,
    "Witch": () => getSkillLevel("Magic") >= 80,
    "DarkMagic": () => getSkillLevel("Magic") >= 100,
    "DarkRitual": () => getSkillLevel("Dark") >= 50,

    "Chronomancy": () => getSkillLevel("Magic") >= 150,
    "Pyromancy": () => getSkillLevel("Magic") >= 200,
    "ImbueMind": () => getSkillLevel("Magic") >= 300,
}

export const skill_actions = { "WarriorLessons": "Combat", "MageLessons": "Magic", "PracticalMagic": "Practical", "LearnAlchemy": "Alchemy", "DarkMagic": "Dark", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy" };

export const localization_strings = [
    ["actions>ap_shop_z1>label", "AP Shop"],
    ["actions>ap_shop_z1>tooltip", `<span id="APShopZ1">You've never seen this shop before... You... think?<br>As you gaze through the merchandise something behind your eyes hurts.<br><span id="scoutAPShopZ1">This element's content is to be replaced by a scout. I could have left it empty.</span></span>`],
];

export const new_actions = [
    new Action("AP Shop Z1", {
        type: "normal",
        expMult: 1,
        townNum: 0,
        stats: {
            Cha: 0.8,
            Luck: 0.1,
            Soul: 0.1
        },
        manaCost() {
            return 200;
        },
        canStart() {
            return resources.gold >= (window.IdleLoopsAP.nextShop(0)?.[1] ?? 0);
        },
        cost() {
            addResource("gold", -(window.IdleLoopsAP.nextShop(0)?.[1] ?? 0));
        },
        visible() {
            return true;
        },
        unlocked() {
            return true;
        },
        finish() { },
        story(completed) { }
    })
]

export const new_actions_for_predictor = {
    'AP Shop Z1': {
        affected: ['apshop1', 'gold'],
        canStart: (input) => input.gold >= (window.IdleLoopsAP.nextShop(0, input.apshop1)?.[1] ?? 0),
        effect: (r) => (r.gold -= (window.IdleLoopsAP.nextShop(0, r.apshop1)?.[1] ?? 0), r.apshop1 = (r.apshop1 || 0) + 1)
    }
}