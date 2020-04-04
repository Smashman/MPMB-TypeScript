// var iFileName = 'Legendlore (Elf Warlock partial) [by Steffie de Vaan, et al.].js';
RequiredSheetVersion(13);
SourceList["SV:LL"] = {
	name: "Steffie de Vaan, et al: Legendlore",
	abbreviation: "SV:LL",
	group: "Homebrew",
	date: "2020-04-02"
};

const scoresText = "Three +1 bonuses, or one +2 and one +1 bonus among Charisma, Dexterity, Intelligence and Wisdom";
const sleeplessTrait = "Sleepless: I do not sleep and may take a long rest by meditating for four hours. I am immune to mundane or magical effects that induce sleep.";

const baseElfObject: Race = {
	regExpSearch: /^(?=.*legendlore)(?=.*elf).*$/i,
	name: "Elf (Legendlore)",
	sortname: "Elf (Legendlore)",
	source: [["SV:LL", 31]],
	plural: "Elves (Legendlore)",
	size: Size.Medium,
	speed: {
		walk: {spd: 30, enc: 20}
	},
	languageProfs: ["Common", "Forestspeak"],
	vision: [["Darkvision", 60]],
	savetxt: {
		text: ["Magic can't put me to sleep"]
	},
	skills: [SkillProficiency.Performance],
	toolProfs: ["Musical instrument or other artistic tools"],
	age: " typically claim adulthood from around age 30 to 100 and can live to be 750 years old",
	scorestxt: scoresText,
	trait: [
		"Legendlore Elf (" + scoresText + ")",
		sleeplessTrait
	].join("\n")
};

const rainbowElfObject: Partial<Race> = {
	regExpSearch: /^(?=.*rainbow)(?=.*legendlore)(?=.*elf).*$/i,
	name: "Rainbow Elf (Legendlore)",
	sortname: "Elf, Rainbow (Legendlore)",
	plural: "Rainbow Elves",
	abilitySave : AbilityScoreNumber.Charisma,
	trait: [
		"Rainbow Legendlore Elf (" + scoresText + ")",
		sleeplessTrait,
		"Rainbow Step: Once per short rest, as a bonus action, I can magically teleport up to 30 ft to an unoccupied space I can see. Once I reach 3rd level, this gains an additional random effect. See the third page notes section for the effects."
	].join("\n"),
	features : {
		"rainbow step" : {
			name : "Rainbow Step",
			source: [["SV:LL", 0]],
			minlevel : 1,
			usages : 1,
			recovery : RecoveryType.ShortRest,
			action : [[ActionType.BonusAction, ""]]
		}
	},
	toNotesPage: [
		{
			name : "Rainbow Step effects table",
			source : ["SV:LL", 31],
			popupName : "Rainbow Step effects table",
			page3notes : true,
			note : [
"d6 Effect",
`1 After using Rainbow Step, each creature of my choice within 5 ft of me takes fire dmg
      This fire damage is equal to my Charisma modifier (minimum 1)`,
`2 After using Rainbow Step, each crea. of my choice within 5 ft of me takes radiant dmg
      This radiant damage is equal to my Charisma modifier (minimum 1)`,
"3  After using Rainbow Step, up to two creatures of your choice within 10 feet of you must succeed on a Wisdom saving throw or be charmed by you for 1 minute, or until you or any of your companions do any damage to it.",
"4  After using Rainbow Step, up to two creatures of your choice within 10 feet of you must succeed on a Wisdom saving throw or be frightened by you until the end of your next turn.",
`5 After using Rainbow Step, each creature of my choice within 5 ft of me takes cold dmg
      This cold damage is equal to my Charisma modifier (minimum 1)`,
"6  After using Rainbow Step, each creature of your choice that you can see within 5 feet must succeed on a Constitution saving throw or take poison damage equal to your Charisma modifier (minimum of 1 damage). If the targeted creature fails the saving throw, the creature is poisoned, suffers the damage, and at the end of its turn must succeed on a Constitution saving throw (DC 10) or remain poisoned until the end of its next turn."
			]
		}
	]
};

RaceList["rainbow elf-legendlore"] = {
	...baseElfObject,
	...rainbowElfObject
};

const forestElfTrait = `Forest Legendlore Elf (${scoresText})
${sleeplessTrait}
Keen Mind: I always know which way is north and the number of hours left before the next sunrise or sunset. I can accurately recall anything I have seen or heard within the past month.`;

const forestElfObject: Partial<Race> = {
	regExpSearch: /^(?=.*forest)(?=.*legendlore)(?=.*elf).*$/i,
	name: "Forest Elf (Legendlore)",
	sortname: "Elf, Forest (Legendlore)",
	plural: "Forest Elves",
	trait: forestElfTrait
};

RaceList["forest elf-legendlore"] = {
	...baseElfObject,
	...forestElfObject
};

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
	classes: [CharacterClass.Sorcerer, CharacterClass.Warlock, CharacterClass.Wizard],
	level: SpellLevel.Second,
	school: SpellSchool.Conjuration,
	time: SpellCastTime.Action,
	range: "90 ft",
	components: "V,S,F",
	duration: "Conc, 1 min",
	save: AbilityScoreAbbr.Strength,
};

SpellsList["dark flame"] = {
	name: "Dark Flame",
	source: [["SV:LL", 118]],
	description: "Crea. in 20 ft of touched object have darkvision for the duration",
	descriptionFull: "You touch an object which begins producing flames of darkness that encircle the object for a 20-foot-radius. These flames produce no heat and do not consume oxygen. For the duration, all creatures within the flames have darkvision within the affected area.",
	classes: [CharacterClass.Bard, CharacterClass.Sorcerer, CharacterClass.Warlock, CharacterClass.Wizard],
	level: SpellLevel.Second,
	school: SpellSchool.Evocation,
	time: SpellCastTime.Action,
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