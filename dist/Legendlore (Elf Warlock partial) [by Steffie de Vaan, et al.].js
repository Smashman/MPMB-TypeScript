var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// var iFileName = 'Legendlore (Elf Warlock partial) [by Steffie de Vaan, et al.].js';
RequiredSheetVersion(13);
SourceList["SV:LL"] = {
    name: "Steffie de Vaan, et al: Legendlore",
    abbreviation: "SV:LL",
    group: "Homebrew",
    date: "2020-04-02"
};
var scoresText = "Three +1 bonuses, or one +2 and one +1 bonus among Charisma, Dexterity, Intelligence and Wisdom";
var sleeplessTrait = "Sleepless: I do not sleep and may take a long rest by meditating for four hours. I am immune to mundane or magical effects that induce sleep.";
var baseElfObject = {
    regExpSearch: /^(?=.*legendlore)(?=.*elf).*$/i,
    name: "Elf (Legendlore)",
    sortname: "Elf (Legendlore)",
    source: [["SV:LL", 31]],
    plural: "Elves (Legendlore)",
    size: 3 /* Medium */,
    speed: {
        walk: { spd: 30, enc: 20 }
    },
    languageProfs: ["Common", "Forestspeak"],
    vision: [["Darkvision", 60]],
    savetxt: {
        text: ["Magic can't put me to sleep"]
    },
    skills: ["performance" /* Performance */],
    toolProfs: ["Musical instrument or other artistic tools"],
    age: " typically claim adulthood from around age 30 to 100 and can live to be 750 years old",
    scorestxt: scoresText,
    trait: [
        "Legendlore Elf (" + scoresText + ")",
        sleeplessTrait
    ].join("\n")
};
var rainbowElfObject = {
    regExpSearch: /^(?=.*rainbow)(?=.*legendlore)(?=.*elf).*$/i,
    name: "Rainbow Elf (Legendlore)",
    sortname: "Elf, Rainbow (Legendlore)",
    plural: "Rainbow Elves",
    abilitySave: 6 /* Charisma */,
    trait: [
        "Rainbow Legendlore Elf (" + scoresText + ")",
        sleeplessTrait,
        "Rainbow Step: Once per short rest, as a bonus action, I can magically teleport up to 30 ft to an unoccupied space I can see. Once I reach 3rd level, this gains an additional random effect. See the third page notes section for the effects."
    ].join("\n"),
    features: {
        "rainbow step": {
            name: "Rainbow Step",
            source: [["SV:LL", 0]],
            minlevel: 1,
            usages: 1,
            recovery: "short rest" /* ShortRest */,
            action: [["bonus action" /* BonusAction */, ""]]
        }
    },
    toNotesPage: [
        {
            name: "Rainbow Step effects table",
            source: ["SV:LL", 31],
            popupName: "Rainbow Step effects table",
            page3notes: true,
            additional: "DC 8 + Cha mod + Prof",
            note: [
                "d6 Effect",
                "1 After using Rainbow Step, each creature of my choice within 5 ft of me takes fire dmg\n      This fire damage is equal to my Charisma modifier (minimum 1)",
                "2 After using Rainbow Step, each crea. of my choice within 5 ft of me takes radiant dmg\n      This radiant damage is equal to my Charisma modifier (minimum 1)",
                "3 After using Rainbow Step, up to 2 creature of my choice in 10 ft must make a Wis save\n      On a fail the creatures are charmed for 1 min or until allies or I damage them",
                "4 After using Rainbow Step, up to 2 creature of my choice in 10 ft must make a Wis save\n      On a fail the creatures are frightened of me until the end of my next turn",
                "5 After using Rainbow Step, each creature of my choice within 5 ft of me takes cold dmg\n      This cold damage is equal to my Charisma modifier (minimum 1)",
                "6 After using Rainbow Step, each crea. of my choice, I can see in 5 ft must make Con save\n      On a fail, the creatures take poison damage equal to my Charisma modifier (minimum 1)\n      Additionally they are poisoned and must make a DC 10 Con save at the end of its turn\n      On a success, they are no longer poisoned\n      On a fail, the creatures remain poisoned until the end of their next turn."
            ]
        }
    ]
};
RaceList["rainbow elf-legendlore"] = __assign(__assign({}, baseElfObject), rainbowElfObject);
var forestElfTrait = "Forest Legendlore Elf (" + scoresText + ")\n" + sleeplessTrait + "\nKeen Mind: I always know which way is north and the number of hours left before the next sunrise or sunset. I can accurately recall anything I have seen or heard within the past month.";
var forestElfObject = {
    regExpSearch: /^(?=.*forest)(?=.*legendlore)(?=.*elf).*$/i,
    name: "Forest Elf (Legendlore)",
    sortname: "Elf, Forest (Legendlore)",
    plural: "Forest Elves",
    trait: forestElfTrait
};
RaceList["forest elf-legendlore"] = __assign(__assign({}, baseElfObject), forestElfObject);
FeatsList["adaptable"] = {
    name: "Adaptable",
    source: [["SV:LL", 88]],
    description: "I gain proficiency in any 3 of the following: Arcana, History, Nature, Religion, one language or a tool. [+1 Intelligence]",
    prerequisite: "Earthborn character",
    scores: [0, 0, 0, 1, 0, 0],
    skillstxt: "Any 3 of the following: Arcana, History, Nature, Religion, one language or a tool"
};
FeatsList["expression blank"] = {
    name: "Expression Blank",
    source: [["SV:LL", 91]],
    description: "Insight checks against me are made with disadvantage and if I in an an area that magically compels truth (such as Zone of Truth), I automatically know. [+1 Wisdom]",
    scores: [0, 0, 0, 0, 1, 0]
};
SpellsList["chains of binding"] = {
    name: "Chains of Binding",
    source: [["SV:LL", 117]],
    description: "1 crea. save or 2d6 blu. dmg and restrained. On start of affected crea. turn, can deal 2d6 blu. dmg",
    descriptionFull: "This spell causes hooked chains to explode from the ground within range, latching onto a single creature within the line of effect. The target must succeed on a Strength saving throw or suffer 2d6 bludgeoning damage. On a failed save, the target also gains the restrained condition.\nThe caster may choose to inflict an additional 2d6 bludgeoning damage on a creature who begins their turn restrained by the chains. A creature restrained by the chains can use its action to make a Strength check against your spell save DC. On a success, it frees itself.\nWhen the spell ends, the chains fade away into nothingness.",
    classes: ["sorcerer" /* Sorcerer */, "warlock" /* Warlock */, "wizard" /* Wizard */],
    level: 2 /* Second */,
    school: "Conj" /* Conjuration */,
    time: "1 a" /* Action */,
    range: "90 ft",
    components: "V,S,F",
    duration: "Conc, 1 min",
    save: "Str" /* Strength */,
};
SpellsList["dark flame"] = {
    name: "Dark Flame",
    source: [["SV:LL", 118]],
    description: "Crea. in 20 ft of touched object have darkvision for the duration",
    descriptionFull: "You touch an object which begins producing flames of darkness that encircle the object for a 20-foot-radius. These flames produce no heat and do not consume oxygen. For the duration, all creatures within the flames have darkvision within the affected area.",
    classes: ["bard" /* Bard */, "sorcerer" /* Sorcerer */, "warlock" /* Warlock */, "wizard" /* Wizard */],
    level: 2 /* Second */,
    school: "Evoc" /* Evocation */,
    time: "1 a" /* Action */,
    range: "Touch",
    components: "V,S,F",
    duration: "1 h"
};
BackgroundList["writer"] = {
    regExpSearch: /writer/i,
    name: "Writer",
    source: [["SV:LL", 81]],
    skillstxt: "Choose two from Insight, Persuasion, History, Performance or Perception",
    toolProfs: ["Calligrapher's Supplies", ["Artisan's tools", 1]],
    equipright: [
        ["Calligrapher's Supplies", "", 5],
        ["Notebook full of jotted down ideas", "", ""]
    ],
    gold: 0,
    feature: "Metaknowledge",
    trait: [],
    bond: [],
    ideal: [],
    flaw: [],
    limfeaname: "Metaknowledge",
    usages: 1,
    recovery: "Session"
};
BackgroundFeatureList["metaknowledge"] = {
    source: [["SV:LL", 78]],
    description: "Once per session, with a successful Insight check, I can ask the GM any question about the structure of the narrative"
};
