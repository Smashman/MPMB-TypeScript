var iFileName = "Beniverse [by Smashman].js";
RequiredSheetVersion(13);

SourceList.Beniverse = {
	name: "The Beniverse",
	abbreviation: "Beniverse",
	group: "Homebrew",
	url: "",
	date: "2020-03-12"
};

const roarOfTheBearRegex = /roar of the bear/i;
MagicItemsList["roar of the bear"] = {
	name: "Roar of the Bear",
	source: [["Beniverse", 0]],
	type: `${MagicItemType.Weapon} (greataxe)`,
	rarity: MagicItemRarity.Uncommon,
	description: "Choose dormant or awakened",
	attunement: true,
	usages: 1,
	recovery: "dawn",
	action: [[ActionType.Action, " (slam)"]],
	weaponsAdd: ["Roar of the Bear", "Bear Roar"],
	weaponOptions: [{
		baseWeapon: "greataxe",
		regExpSearch: roarOfTheBearRegex,
		name: "Roar of the Bear",
		isMagicWeapon: true,
		source: [["Beniverse", 0]]
	}],
	choices: ["Dormant", "Awakened"],
	calcRegex: roarOfTheBearRegex,
	"dormant": <Partial<MagicItem>>{
		rarity: MagicItemRarity.Uncommon,
		description: "As an action, I can slam the axe into the ground. All creatures within 5 ft must make a DC 13 Con save. On a fail, they take 1d8 Thunder damage and are pushed 5 ft. On success, they take half damage and are not pushed. Recharges at dawn.",
		descriptionFull: desc2([
			"The head of this greataxe has the form of a leaping bear etched into the metal.",
			"As an action, you can slam the greataxe into the ground. Each creature within 5ft must make a DC13 Constitution saving throw. On a failed save, a creature takes 1d8 thunder damage and is pushed 5 feet away from you. On a successful save, the creature takes half as much and is not pushed. This property of the axe can't be used again until the next dawn."
		], true),
		weaponOptions: [{
			regExpSearch: /bear roar/i,
			name: "Bear Roar",
			source: [["Beniverse", 0]],
			ability: 0,
			type: WeaponType.Spell,
			damage: [1, 8, DamageType.Thunder],
			range: "5-ft radius",
			description: "Slam as action. Con save; success - half damage; fail - pushed 5 ft",
			dc: true,
			modifiers: [5, ""]
		}],
		calcChanges: {
			atkAdd: [
				function (fields, v) {
					if (v.isMeleeWeapon && MagicItemsList["roar of the bear"].calcRegex.test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + "Slam to cause 'Bear Roar' (action)";
					}
				}, "Roar of the Bear gains a slam effect"
			],
		}
	},
	"awakened": <Partial<MagicItem>>{
		rarity: MagicItemRarity.Rare,
		description: "As an action or attack, I can slam the axe into the ground. All creatures within 5 ft must make a DC 14 Con save. On a fail, they take 2d8 Thunder damage and are pushed 10 ft. On success, they take half damage and are not pushed. Recharges at dawn.",
		descriptionFull: desc2([
			"The head of this greataxe has the form of a leaping bear etched into the metal. The eyes of the bear glow with a dull white.",
			"You have a +1 bonus to attack and damage rolls made with this magic weapon.",
			"As an action or an attack, you can slam the greataxe into the ground. Each creature within 5ft must make a DC14 Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much and is not pushed. This property of the axe can't be used again until the next dawn."
		], true),
		weaponOptions: [{
			regExpSearch: /bear roar/i,
			name: "Bear Roar",
			source: [["Beniverse", 0]],
			ability: 0,
			type: WeaponType.Spell,
			damage: [2, 8, DamageType.Thunder],
			range: "5-ft radius",
			description: "Slam as action or attack. Con save; success - half damage; fail - pushed 10 ft",
			dc: true,
			modifiers: [6, ""]
		}],
		calcChanges: {
			atkAdd: [
				function (fields, v) {
					if (v.isMeleeWeapon && MagicItemsList["roar of the bear"].calcRegex.test(v.WeaponTextName)) {
						fields.Description += (fields.Description ? '; ' : '') + "Slam to cause 'Bear Roar' (action or attack)";
					}
				}, "When Awakened, Roar of the Bear has +1 on attack and damage rolls and its slam effect can be used as an attack and the DC is increased to 14"
			],
			atkCalc: [
				function (fields, v, output) {
					if (v.isMeleeWeapon && MagicItemsList["roar of the bear"].calcRegex.test(v.WeaponTextName)) {
						output.magic = 1;
					}
				}, ''
			]
		}
	}
};

var foilOfTheFoxRegex = /foil of the fox/i;
MagicItemsList["foil of the fox"] = {
	name: "Foil of the Fox",
	source: [["Beniverse", 0]],
	rarity: MagicItemRarity.Rare,
	type: `${MagicItemType.Weapon} (rapier)`,
	description: "I have a +1 bonus to attack and damage rolls with this weapon. When I use my Cutting Words feature, the affected creature cannot use their reaction to make opportunity attacks until their next turn. The first time each day that I roll a 20 on an attack roll, I regain one expended use of Bardic Inspiration.",
	descriptionFull: desc2([
		"This fine and flexible blade has a tassel attached to the pommel that evokes a fox's tail.",
		"You have a +1 bonus to attack and damage rolls made with this magic weapon.",
		"Whenever you use your Cutting Words feature, the affected creature cannot use their reaction to make opportunity attacks until the start of their turn.",
		"Additionally, the first time you roll a 20 on an attack roll made with this weapon each day, you regain one expended use of Bardic Inspriation."
	], true),
	attunement: true,
	prerequisite: "Requires attunement by a bard with the Cutting Words feature",
	prereqeval: function(v) { return classes.known.bard && classes.known.bard.level >= 2 && classes.known.bard.subclass && classes.known.bard.subclass === "bard-college of lore"; },
	weaponsAdd: ["Foil of the Fox"],
	weaponOptions: [{
		baseWeapon: 'rapier',
		regExpSearch: foilOfTheFoxRegex,
		name: "Foil of the Fox",
		isMagicWeapon: true,
		source: [["Beniverse", 0]]
	}],
	calcRegex: foilOfTheFoxRegex,
	calcChanges: {
		atkAdd: [
			function (fields, v) {
				if (v.isMeleeWeapon && MagicItemsList["foil of the fox"].calcRegex.test(v.WeaponTextName)) {
					fields.Description += (fields.Description ? '; ' : '') + 'On natural 20: Regain expended Bardic Inspiration';
				}
			}, "The Foil of the Fox has +1 on attack and damage rolls and regains an expended Bardic Inspiration on a natural 20 roll"
		],
		atkCalc: [
			function (fields, v, output) {
				if (v.isMeleeWeapon && MagicItemsList["foil of the fox"].calcRegex.test(v.WeaponTextName)) {
					output.magic = 1;
				}
			}, ""
		]
	}
};

var sunburstRegex = /sunburst/i;
MagicItemsList.sunburst = {
	name: "Sunburst",
	source: [["Beniverse", 0]],
	rarity: MagicItemRarity.Uncommon,
	type: `${MagicItemType.Weapon} (longsword)`,
	description: "The sword has 3 charges. When a creature in 5 ft. of me makes an attack roll, as a reaction, I can expend one charge to emit a flash. The attacker must make a DC 14 Con save or be blinded until the start of their next turn. Undead have disadvantage on this save. The sword regains all charges at dawn.",
	descriptionFull: desc2([
		"This fine gold-coloured longsword has the shape of a sun for a crossguard. It was given to Sevro by Father Douson Reinall for his pious duty at the 'Temple of the Dawn' in Whitestone.",
		"You have a +1 bonus to attack and damage rolls made with this magic weapon.",
		"The sword has 3 charges. When a creature within 5 ft. of you makes an attack, as a reaction, you can expend one charge to have the sword emit a flash of blinding light. The attacker must make a DC 14 Constitution saving throw, or be blinded until the start of their next turn. Undead have disadvantage on this saving throw.",
		"The sword regains all expended charges daily at dawn."
	], true),
	attunement: true,
	prerequisite: "Requires attunement by a creature that worships the Dawnfather",
	weaponsAdd: ["Sunburst"],
	weaponOptions: [{
		baseWeapon: "longsword",
		regExpSearch: sunburstRegex,
		name: "Sunburst",
		isMagicWeapon: true,
		source: [["Beniverse", 0]]
	}],
	usages: 3,
	recovery: "dawn",
	action: [[ActionType.Reaction, " (blind)"]],
	calcRegex: sunburstRegex,
	calcChanges: {
		atkAdd: [
			function (fields, v) {
				if (v.isMeleeWeapon && MagicItemsList.sunburst.calcRegex.test(v.WeaponTextName)) {
					fields.Description += (fields.Description ? '; ' : '') + 'Reaction: Flash of light to blind an attacker (DC 14 Con save). Undead have disadv. on save';
				}
			}, "Suburst has +1 on attack and damage rolls and has a flash of light reaction"
		],
		atkCalc: [
			function (fields, v, output) {
				if (v.isMeleeWeapon && MagicItemsList.sunburst.calcRegex.test(v.WeaponTextName)) {
					output.magic = 1;
				}
			}, ""
		]
	}
};

MagicItemsList["dragon knight helm"] = {
	name: "Dragon Knight Helm",
	source: [["Beniverse", 0]],
	type: MagicItemType.WondrousItem,
	rarity: MagicItemRarity.Rare,
	description: "This imposing red dragon scaled helm provides me +1 bonus to AC. Additionally once per day, I can cast the fear spell (save DC 14)",
	descriptionFull: desc2([
		"This imposing red dragon scaled helm provides a +1 bonus to AC.",
		"Additionally once per day, you can cast the fear spell (save DC 14)."
	], true),
	attunement: true,
	extraAC: [{mod : 1, magic : true, text : "I gain a +1 bonus to AC while attuned."}],
	fixedDC: 14,
	usages: 1,
	recovery: "dawn",
	spellcastingBonus: {
		name: "Once per dawn",
		spells: ["fear"],
		selection: ["fear"],
		firstCol: "oncelr"
	}
};

MagicItemsList["dragon claw boots"] = {
	name: "Dragon Claw Boots",
	source: [["Beniverse", 0]],
	rarity: MagicItemRarity.Rare,
	type: MagicItemType.WondrousItem,
	attunement: true,
	description: "As an action, I can transmute my feet into red dragon claws. The claws give me a climbing speed equal to my walking speed and can also be used as natural weapons.",
	descriptionFull: desc2([
		"These red dragon scaled boots have 3 charges. As an action you can expend one charge to transmute your feet into those of a red dragon for one minute. This form grants a climbing speed equal to your walking speed and allows you to make an unarmed attack with your feet which deals 1d6 piercing damage.",
		"The boots regain 1d2 expended charges daily at dawn."
	], true),
	usages: 3,
	recovery: "dawn",
	additional: "regains 1d2",
	action: [[ActionType.Action, ""]],
	weaponsAdd: ["Dragon Claw Boot"],
	weaponOptions: [{
		baseWeapon: "unarmed strike",
		regExpSearch: /^dragon claw boot$/i,
		name: "Dragon Claw Boot",
		source: [["Beniverse", 0]],
		damage: [1, 6, DamageType.Piercing]
	}]
};

MagicItemsList["cinder king's scale"] = {
	name: "Cinder King's Scale",
	source: [["Beniverse", 0]],
	type: `${MagicItemType.Armor} (shield)`,
	rarity: MagicItemRarity.Uncommon,
	attunement: true,
	description: "Once per short rest, when hit by fire damage, I can use my reaction to gain resistance to fire damage until the end of my next turn. The resistance also applies to the triggering damage.",
	descriptionFull: desc2([
		"This large red dragon scale was once part of Thordak's hide. Bequethed to Parmin, he fashioned this one and others like it into shields for his dragon knights.",
		"Once per short rest, as a reaction when hit by fire damage, you can use the essence of this scale to gain resistance to fire damage until the end of your next turn. The resistance also applies to the triggering damage."
	], true),
	action: [[ActionType.Reaction, ""]],
	usages: 1,
	recovery: RecoveryType.ShortRest
};

MagicItemsList["skybreaker"] = {
	name: "Skybreaker",
	source: [["Beniverse", 0]],
	description: "I have a +2 bonus to attack and damage rolls with Skybreaker. On a roll of 20 to hit, it cuts off one limb (see notes). If the target has no limbs or is immune to force damage, it takes +3d8 necrotic damage instead. Target of attack has AC 10 + Dex. Can be summoned as an action. Is dismissed if disarmed.",
	descriptionFull: desc2([
		"The slightly translucent form of this blade is almost 6 feet long and unexpectedly light. Skybreaker is one of three known Mistblades, which were forged from the shards of an ancient Titan's shattered blade.",
		"You gain a +2 bonus to attack and damage rolls made with this magic weapon. When you hit with an atack using Skybreaker, the target takes 2d6 force damage, or 2d8 force damage if the weapon is used with two hands. It has the following additional properties.",
		`${toUni('Summon')}. As an action, you can summon Skybreaker to your hand. As a bonus action, you can dismiss the blade, returning it to its pocket dimension. If you are disarmed, Skybreaker is dismissed.`,
		`${toUni('Keen')}. Skybreaker cuts through mundane armor and non-magical material with little effort. The target of an attack from Skybreaker has their armor class effectively reduced to 10 + Dex modifier + relevant additional properties.`,
		`${toUni('Limb Sever')}. When you attack a creature that has discernable limbs and roll a 20 on the attack roll, you sever the limb's connection to the creature's soul, becoming grey and lifeless. Consult the _Limb Sever_ table below for the effects. A creature is immune to this effect if it is immune to force damage, doesn't have limbs, has legendary actions, or the DM decides that the creature is too big for its limbs to be cut off with this weapon. Such a creature instead takes an extra 3d8 necrotic damage from the hit.`,
	], true),
	type: `${MagicItemType.Weapon} (Mistblade)`,
	rarity: MagicItemRarity.Artifact,
	attunement: true,
	weaponsAdd: ["Skybreaker"],
	action: [[ActionType.Action, " (summon)"], [ActionType.BonusAction, " (dismiss)"]],
	weaponOptions: [{
		regExpSearch: /skybreaker/i,
		name: "Skybreaker",
		isAlwaysProf: true,
		type: WeaponType.AlwaysProf,
		ability: AbilityScoreNumber.Strength,
		abilitytodamage: true,
		damage: [2, 6, DamageType.Force],
		range: "Melee",
		description: "Versatile (2d8); Dismissed if disarmed; Keen: Target AC is 10 + Dex; On 20 to hit: sever limb",
		modifiers: [2,2],
	}],
	toNotesPage: [{
		name: "Skybreaker Limb Sever table",
		source: ["Beniverse", 0],
		popupName: "Skybreaker Limb Sever table",
		page3notes: true,
		note: [
			"d6 Effect",
			"1   Left foot is severed, target moves at half speed",
			"2   Right foot is severed, target moves at half speed",
			"3   Main hand is severed, target can only hold one item and makes attacks with disadvantage",
			"4   Off-hand is severed, target cannot use two handed weapons and can only hold one item",
			"5   A blow to the head. The target is blinded.",
			"6   Roll twice taking both results (ignoring this result)"
		]
	}]
};

SourceList["UA:SMT"] = {
	name : "Unearthed Arcana: Spells and Magic Tattoos",
	abbreviation : "UA:SMT",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2020/dnd/downloads/UA2020-SpellsTattoos.pdf",
	date : "2020/03/26"
};

SpellsList["spirit shroud-ua"] = {
	name: "Spirit Shroud",
	classes: [CharacterClass.Cleric, CharacterClass.Paladin, CharacterClass.Warlock, CharacterClass.Wizard],
	source: [["UA:SMT", 2]],
	level: SpellLevel.Third,
	school: SpellSchool.Necromancy,
	time: SpellCastTime.BonusAction,
	range: 'Self',
	components: 'V,S',
	duration: 'Conc, 1 min',
	description: 'Crea in 10ft 1d8+1d8/SL Radi./Necr. dmg from my atks; Crea start turn in 10ft, -10ft spd, til my turn',
	descriptionFull: desc2([
		'You call forth spirits of the dead, which flit around you for the spell’s duration. The spirits are intangible and invulnerable, and they are good or evil (your choice).',
		'Until the spell ends, any attack you make deals 1d8 extra damage when you hit a creature within 10 feet of you. This damage is radiant if the spirits are good and necrotic if they are evil. Any creature that takes this damage can’t regain hit points until the start of your next turn.',
		'In addition, any creature of your choice that you can see that starts its turn within 10 feet of you has its speed reduced by 10 feet until the start of your next turn.',
		AtHigherLevels + 'When you cast this spell using a spell slot of 4th level or higher, the extra damage increases by 1d8 for each slot level above 3rd.'
	], true)
};

function desc2(arr, noInitialIndent) {
	return (noInitialIndent ? '' : "\n   ") + arr.join("\n   ");
}