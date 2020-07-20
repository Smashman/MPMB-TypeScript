/*
	Types
*/

// Common attributes

interface MPMBObject {
	source: SourceIdentifier[];
	action?: Action[];
	usages?: number | string | NumberPerLevel | StringPerLevel;
	usagescalc?: string | StringPerLevel;
	recovery?: Recovery;
	altResource?: string | StringPerLevel;
	limfeaname?: string;
	additional?: string | StringPerLevel;
	extraLimitedFeatures?: LimitedFeature[];
	toolProfs?: ToolProficiency[];
	languageProfs?: LanguageProficiency[];
	saves?: AbilityScoreAbbr[];
	skills?: (SkillProficiency | [SkillProficiency, "full" | "only" | "increment"])[];
	skillstxt?: string;
	armorProfs?: ArmorProficiencies;
	weaponProfs?: WeaponProficiencies;
	weaponsAdd?: string[];
	armorAdd?: string;
	shieldAdd?: string | [string, number, number];
	ammoOptions?: Ammo[];
	armorOptions?: Armor[];
	weaponOptions?: Partial<Weapon>[];
	/** Array of Damage type or tuple of damage type and resistance condition */
	dmgres?: (DamageType | [DamageType, string])[];
	savetxt?: SaveText;
	vision?: Vision[];
	speed?: SpeedTypes;
	carryingCapacity?: number;
	// advantages
	scores?: Scores;
	scorestxt?: string;
	scoresOverride?: Scores;
	scoresMaximum?: Scores;
	spellcastingBonus?: SpellCastingBonus;
	spellcastingAbility?: AbilityScoreNumber;
	fixedDC?: number;
	fixedSpAttack?: number;
	spellcastingExtra?: string[];
	spellFirstColTitle?: string;
	spellChanges?: { [key: string]: SpellChange };
	calcChanges?: CalcChanges;
	addMod?: AddMod[];
	extraAC?: ExtraAC[];
	toNotesPage?: ToNotesPage[];
	eval?: Eval;
	removeeval?: Eval;
	changeeval?: Eval;
	[key: string]: any; // Allows any additional properties, but still type checks specific ones
}

// Main types

interface Race extends MPMBObject {
	regExpSearch: RegExp;
	name: string;
	sortname?: string;
	plural: string;
	size: Size;
	age: string;
	height?: string;
	weight?: string;
	heightMetric?: string;
	weightMetric?: string;
	trait: string;
	abilitySave?: AbilityScoreNumber;
	variants?: string[];
	features?: { [ key: string ]: Feature };
}

interface SubClass extends MPMBObject {
	regExpSearch: RegExp;
	subname: string;
	fullname?: string;
	abilitySave?: AbilityScoreNumber;
	abilitySaveAlt?: AbilityScoreNumber;
	spellcastingFactor?: SpellCastingFactor;
	spellcastingTable?: SpellCastingTable;
	spellcastingKnown?: SpellCastingKnown;
	spellcastingList?: SpellCastingList;
	spellcastingExtra?: string[];
	features?: { [ key: string ]: ClassFeature };
}

interface Feat extends MPMBObject {
	name: string;
	description: string;
	descriptionFull?: string;
	prerequisite?: string;
	prereqeval?: (v: any) => boolean;
	allowDuplicates?: boolean;
}

interface Spell {
	name: string;
	nameShort?: string;
	nameAlt?: string;
	regExpSearch?: RegExp;
	classes?: CharacterClass[];
	source: SourceIdentifier[];
	level: SpellLevel;
	school: SpellSchool;
	time: SpellCastTime | string;
	range: string;
	components?: string;
	compMaterial?: string;
	duration: string;
	save?: AbilityScoreAbbr;
	description: string;
	descriptionMetric?: string;
	descriptionFull?: string;
	descriptionCantripDie?: string;
	ritual?: boolean;
	psionic?: boolean;
	firstCol?: string;
	dependencies?: Spell[];
}

interface Background extends MPMBObject {
	regExpSearch?: RegExp;
	name: string;
	gold: number;
	equipleft?: InventoryItem[];
	equipright?: InventoryItem[];
	feature: string;
	trait: string[];
	ideal: ([string, string])[];
	bond: string[];
	flaw: string[];
	extra?: string[];
	variant?: string[];
	lifestyle?: Lifestyle;
}

interface BackgroundFeature {
	description: string;
	source: SourceIdentifier[];
}

interface Source {
	name: string;
	abbreviation: string;
	group?: string;
	url?: string;
	date?: string;
	defaultExcluded?: boolean;
}

interface Creature {
	name: string;
	source: SourceIdentifier[];
	size: Size;
	type: CreatureType | string;
	subtype: string;
	companion?: "familiar" | "familiar_not_al" | "mount" | "steed" | "pact_of_the_chain" | "companion";
	alignment: Alignment | string;
	ac: number;
	hp: number;
	hd: HitDice;
	speed: string;
	scores: Tuple<number, 6>;
	saves: Tuple<number | "", 6>;
	skills?: { [key in SkillProficiency]: number };
	damage_vulnerabilities?: string;
	damage_resistances?: string;
	damage_immunities?: string;
	condition_immunities?: string;
	senses: string;
	passivePerception?: number;
	languages: string;
	challengeRating: string;
	proficiencyBonus: number;
	attacksAction: number;
	attacks: any[]; // TODO
	features?: any[]; // TODO
	actions?: any[]; // TODO
	traits?: any[]; // TODO
	wildshapeString?: string;
	eval?: Eval;
	removeeval?: Eval;
}

interface Weapon extends MPMBObject {
	name: string;
	regExpSearch: RegExp;
	source: SourceIdentifier[];
	type: WeaponType;
	ability: AbilityScoreNumber;
	abilitytodamage: boolean;
	damage: Damage;
	range: string;
	description: string;
	list?: 'melee' | 'ranged' | 'spell' | 'improvised';
	weight?: number;
	dc?: boolean;
	modifiers?: [string | number, string | number];
	monkweapon?: boolean;
	isMagicWeapon?: boolean;
	isAlwaysProf?: boolean;
	ammo?: AmmoType;
	SpellsList?: string;
	baseWeapon?: string;
}

interface MagicItem extends MPMBObject {
	name: string;
	nameAlt?: string;
	nameTest?: string | RegExp;
	source: SourceIdentifier[];
	type: MagicItemType | string;
	rarity: MagicItemRarity;
	attunement?: boolean;
	weight?: number;
	description: string;
	descriptionLong?: string;
	descriptionFull?: string;
	notLegalAL?: boolean;
	magicItemTable?: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I')[];
	storyItemAL?: boolean;
	extraTooltip?: string;
	prerequisite?: string;
	prereqeval?: Eval;
	allowDuplicates?: boolean;
	calculate?: string;
	chooseGear?: any;
	choice?: string[];
	selfChoosing?(): string;
}

// Misc types

type Ammo = any; // TODO
type Armor = any; // TODO
type Fields = any; // TODO
type Attack = any; // TODO
type AttackOutput = any; // TODO
type ArmorInformation = any; // TODO

type Eval = (lvl?: [number, number], chc?: [string, string, string]) => void;

/** Tuple of name of item, amount of item, weight of item */
type InventoryItem = [string, number | "", number | ""];

type SpellCastingBySpellLevel = Tuple<number, 9>;
type SpellCastingTable = Tuple<SpellCastingBySpellLevel, 20>;

interface Feature extends MPMBObject {
	name: string;
	minlevel: CharacterLevel;
	choices?: string[];
	choicesNotInMenu?: boolean;
}

interface ClassFeature extends Feature {
	description: string;
}

type Damage = [
	number | 'C', // Number of die (or cantrip scaling)
	number, // Size of die
	DamageType
]

type CharacterLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

interface ExtraAC {
	mod: number;
	name?: string;
	magic?: boolean;
	text: string;
	stopeval(v: ArmorInformation): boolean;
}

interface CalcChanges {
	hp?(totalHD: number): [number, string, boolean?],
	atkAdd?: [(fields?: Fields, v?: Attack) => void, string?],
	atkCalc?: [(fields?: Fields, v?: Attack, output?: AttackOutput) => void, string?],
	spellCalc?: [(type: "dc" | "attack" | "prepare", spellcasters: CharacterClass[], ability: AbilityScoreNumber) => number, string?]
	spellList?: [() => void, string?];
	spellAdd?: [() => void, string?];
}

interface AddMod {
	type: "skill" | "save" | "";
	field: string;
	mod: string | number;
	text: string;
}

type SpellChange = Omit<Spell, 'class' | 'level'> & { changes: string };

interface LimitedFeature {
	name: string;
	usages: number;
	recovery: Recovery;
	usagescalc?: string;
	additional?: string;
}

type StringPerLevel = Tuple<string, 20>;
type NumberPerLevel = Tuple<number, 20>;

type Recovery = RecoveryType | string;

type Action = [ActionType, string];

type SourceIdentifier = [
	string, // Source Abbreviation
	number  // Page numnber
]

interface Speed {
	spd: number | string,
	enc: number | string
}

interface SpeedTypes {
	walk: Speed;
	climb?: Speed;
	fly?: Speed;
	swim?: Speed;
	burrow?: Speed;
	allModes?: string
}

/** Defined tool or tuple of tool and ability score to associate or tuple of tool type and number of type allowed */
type ToolProficiency = string | [string, AbilityScoreAbbr | number];

/** Defined language or number of free choice, or tuple of language list and number allowed to be chosen from */
type LanguageProficiency = string | number | [string, number];

type Vision = [
	string, // Vision Type
	number  // Radius
];

interface SaveText {
	text?: string[];
	immune?: (DamageType | string)[];
	adv_vs?: string[];
}

type WeaponProficiencies = [
	boolean, // Simple
	boolean, // Martial
	string[] // Other
];

type ArmorProficiencies = [
	boolean, // Light
	boolean, // Medium
	boolean, // Heavy
	boolean  // Shields
];

type Scores = [
	number, // Strength
	number, // Dexterity
	number, // Constitution
	number, // Intelligence
	number, // Wisdom
	number  // Charisma
];

type SpellLevelRange = [SpellLevel, SpellLevel];

interface SpellCastingKnown {
	cantrips?: NumberPerLevel;
	spells?: NumberPerLevel;
	prepared?: boolean;
}

interface SpellCastingList {
	class?: CharacterClass;
	school?: SpellSchool[];
	level?: SpellLevelRange;
	ritual?: boolean;
	spells?: string[];
	notspells?: string[];
}

interface SpellCastingBonus {
	name: string;
	spells?: string[];
	times?: number;
	selection?: string[];
	spellcastingAbility?: AbilityScoreNumber;
	fixedDC?: number;
	fixedSpAttack?: number;
	class?: CharacterClass;
	school?: SpellSchool[];
	level?: SpellLevelRange;
	firstCol?: string;
}

interface ToNotesPage {
	name: string;
	note?: string | string[];
	page3notes?: boolean;
	popupName?: string;
	source?: SourceIdentifier;
	additional?: string;
	amendTo?: string;
}

type HitDice = [
	number, // Number
	number  // Die size
]

/*
	Enums
*/
declare const enum DamageType {
	Acid = "acid",
	Bludgeoning = "bludgeoning",
	Cold = "cold",
	Fire = "fire",
	Force = "force",
	Lightning = "lightning",
	Necrotic = "necrotic",
	Piercing = "piercing",
	Poison = "poison",
	Psychic = "psychic",
	Radiant = "radiant",
	Slashing = "slashing",
	Thunder = "thunder"
}

declare const enum SkillProficiency {
	Athletics = "athletics",
	Acrobatics = "acrobatics",
	Animalhandling = "animal handling",
	Stealth = "stealth",
	Arcana = "arcana",
	History = "history",
	Investigation = "investigation",
	Nature = "nature",
	Religion = "religion",
	Insight = "insight",
	Medicine = "medicine",
	Perception = "perception",
	Sleightofhand = "sleight of hand",
	Survival = "survival",
	Deception = "deception",
	Intimidation = "intimidation",
	Performance = "performance",
	Persuasion = "persuasion"
}

declare const enum AbilityScoreString {
	Strength = "strength",
	Dexterity = "dexterity",
	Constitution = "constitution",
	Intelligence = "intelligence",
	Wisdom = "wisdom",
	Charisma = "charisma"
}

declare const enum AbilityScoreAbbr {
	Strength = "Str",
	Dexterity = "Dex",
	Constitution = "Con",
	Intelligence = "Int",
	Wisdom = "Wis",
	Charisma = "Cha"
}

declare const enum AbilityScoreNumber {
	Strength = 1,
	Dexterity = 2,
	Constitution = 3,
	Intelligence = 4,
	Wisdom = 5,
	Charisma = 6
}

declare const enum CharacterClass {
	Artificer = "artificer",
	Barbarian = "barbarian",
	Bard = "bard",
	Cleric = "cleric",
	Druid = "druid",
	Fighter = "fighter",
	Monk = "monk",
	Paladin = "paladin",
	Ranger = "ranger",
	Rogue = "rogue",
	Sorcerer = "sorcerer",
	Warlock = "warlock",
	Wizard = "wizard"
}

declare const enum SpellLevel {
	Cantrip,
	First,
	Second,
	Third,
	Fourth,
	Fifth,
	Sixth,
	Seventh,
	Eighth,
	Ninth
}

declare const enum SpellSchool {
	Abjuration = "Abjur",
	Conjuration = "Conj",
	Divination = "Div",
	Enchantment = "Ench",
	Evocation = "Evoc",
	Illusion = "Illus",
	Necromancy = "Necro",
	Transmutation = "Transmutation"
}

declare const enum Size {
	Tiny = 1,
	Small = 2,
	Medium = 3,
	Large = 4,
	Gargantuan = 5
}

declare const enum ActionType {
	Action = "action",
	BonusAction = "bonus action",
	Reaction = "reaction"
}

declare const enum RecoveryType {
	LongRest = "long rest",
	ShortRest = "short rest",
	Dawn = "dawn"
}

declare const enum SpellCastTime {
	Action = "1 a",
	BonusAction = "1 bns",
	Reaction = "1 rea",
	Round = "1 rnd",
	Minute = "1 min",
	Hour = "1 h"
}

declare const enum Lifestyle {
	Wretched = "wretched",
	Squalid = "squalid",
	Poor = "poor",
	Modest = "modest",
	Comfortable = "comfortable",
	Wealthy = "wealthy",
	Aristocratic = "aristocratic"
}

declare const enum SpellCastingFactor {
	FullCaster = 1,
	HalfCaster = 2,
	ThirdCaster = 3
}

declare const enum CreatureType {
	Aberration = "Aberration",
	Beast = "Beast",
	Celestial = "Celestial",
	Construct = "Construct",
	Dragon = "Dragon",
	Elemental = "Elemental",
	Fey = "Fey",
	Fiend = "Fiend",
	Giant = "Giant",
	Humanoid = "Humanoid",
	Monstrosity = "Monstrosity",
	Ooze = "Ooze",
	Plant = "Plant",
	Undead = "Undead"
}

declare const enum Alignment {
	Unaligned = "Unaligned",
	LawfulGood = "Lawful Good",
	NeutralGood = "Neutral Good",
	ChaoticGood = "Chaotic Good",
	LawfulNeutral = "Lawful Neutral",
	Neutral = "Neutral",
	ChaoticNeutral = "Chaotic Neutral",
	LawfulEvil = "Lawful Evil",
	NeutralEvil = "Neutral Evil",
	ChaoticEvil = "Chaotic Evil"
}

declare const enum WeaponType {
	AlwaysProf = "AlwaysProf",
	Natural = "Natural",
	Simple = "Simple",
	Martial = "Martial",
	Cantrip = "Cantrip",
	Spell = "Spell",
	ImprovisedWeapons = "ImprovisedWeapons"
}

declare const enum AmmoType {
	Arrow = "arrow",
	Bolt = "bolt",
	Bullet = "bullet",
	Dagger = "dagger",
	Dart = "dart",
	Flask = "flask",
	Axe = "axe",
	Javelin = "javelin",
	Hammer = "hammer",
	Needle = "needle",
	Spear = "spear",
	Trident = "trident",
	Vial = "vial"
}

declare const enum MagicItemType {
	WondrousItem = "wondrous item",
	Armor = "armor",
	Shield = "shield",
	Weapon = "weapon",
	Ring = "ring",
	Rod = "rod",
	Staff = "staff",
	Wand = "wand",
	Potion = "potion",
	Scroll = "scroll"
}

declare const enum MagicItemRarity {
	Common = "common",
	Uncommon = "uncommon",
	Rare = "rare",
	VeryRare = "very rare",
	Legendary = "legendary",
	Artifact = "artifact"
}

/*
	Interface declarations
*/
declare function What(field: FieldIdentifier): string;
declare function Who(field: FieldIdentifier): string;
declare function How(field: FieldIdentifier): string;
declare function Hide(field: FieldIdentifier): void;
declare function Value(field: FieldIdentifier, FldValue: string, tooltip?: string, submitNm?: string): void;

declare function isTemplVis(tempNm: string, returnPrefix?: string): [boolean, string] | boolean;
declare function DoTemplate(tempNm: string, AddRemove: 'Add' | 'Remove' | 'RemoveAll', removePrefix?: string, GoOn?: boolean): number;
declare function PickDropdown(field: FieldIdentifier, FldValue: any): void;
declare function desc(lines: string[]): string;
declare function toUni(input: string): string;

declare const AbilityScores: {
	abbreviations : AbilityScoreAbbr[]
};

declare const typePF: boolean;
declare const levels: number[];
declare const AtHigherLevels: string;

declare function RequiredSheetVersion(version: number): void;
declare function AddSubClass(iClass: CharacterClass, subClassName: string, subclassObj: SubClass): void;
declare function AddRacialVariant(race: string, variantName: string, variantObj: Partial<Race>): void;

declare const SourceList: { [key: string]: Source };
declare const RaceList: { [key: string]: Race };
declare const FeatsList: { [key: string]: Feat };
declare const SpellsList: { [key: string]: Spell };
declare const BackgroundList: { [key: string]: Background };
declare const BackgroundFeatureList: { [key: string]: BackgroundFeature };
declare const CreatureList: { [key: string]: Creature };
declare const MagicItemsList: { [key: string]: MagicItem };
declare const WeaponsList: { [key: string]: Weapon };

declare const CurrentRace: Race & {
	known : string,
	variant : string,
	variants : string,
	level : number,
	name : string,
	source : string,
	plural : string,
	size : number,
	age : string,
	height : string,
	weight : string,
	trait : string,
	features : string
};
declare const CurrentUpdates: {
	types: string[],
	notesChanges: string[],
	skillStrOld: string
};

/*
	Helper types
*/
type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };