var iFileName = "Beniverse [by Smashman].js";
RequiredSheetVersion(13);
SourceList.Beniverse = {
    name: "The Beniverse",
    abbreviation: "Beniverse",
    group: "Homebrew",
    url: "",
    date: "2020-03-12"
};
var roarOfTheBearRegex = /roar of the bear/i;
MagicItemsList["roar of the bear"] = {
    name: "Roar of the Bear",
    source: [["Beniverse", 0]],
    type: "weapon" /* Weapon */ + " (greataxe)",
    rarity: "uncommon" /* Uncommon */,
    description: "Choose dormant or awakened",
    attunement: true,
    usages: 1,
    recovery: "dawn",
    action: [["action" /* Action */, " (slam)"]],
    weaponsAdd: ["Roar of the Bear", "Bear Roar"],
    weaponOptions: [{
            baseWeapon: "greataxe",
            regExpSearch: roarOfTheBearRegex,
            name: "Roar of the Bear",
            isMagicWeapon: true,
            source: [["Beniverse", 0]]
        }],
    choices: ["Dormant", "Awakened"],
    "dormant": {
        rarity: "uncommon" /* Uncommon */,
        description: "As an action, I can slam the axe into the ground. All creatures within 5 ft must make a DC 13 Con save. On a fail, they take 1d8 Thunder damage and are pushed 5 ft. On success, they take half damage and are not pushed. Recharges at dawn.",
        descriptionFull: itemDesc([
            "The head of this greataxe has the form of a leaping bear etched into the metal.",
            "As an action, you can slam the greataxe into the ground. Each creature within 5ft must make a DC13 Constitution saving throw. On a failed save, a creature takes 1d8 thunder damage and is pushed 5 feet away from you. On a successful save, the creature takes half as much and is not pushed. This property of the axe can't be used again until the next dawn."
        ]),
        weaponOptions: [{
                regExpSearch: /bear roar/i,
                name: "Bear Roar",
                source: [["Beniverse", 0]],
                ability: 0,
                type: "Spell" /* Spell */,
                damage: [1, 8, "thunder" /* Thunder */],
                range: "5-ft radius",
                description: "Slam as action. Con save; success - half damage; fail - pushed 5 ft",
                dc: true,
                modifiers: [5, ""]
            }],
        calcChanges: {
            atkAdd: [
                function (fields, v) {
                    if (v.isMeleeWeapon && roarOfTheBearRegex.test(v.WeaponTextName)) {
                        fields.Description += (fields.Description ? '; ' : '') + "Slam to cause 'Bear Roar' (action)";
                    }
                }, "Roar of the Bear gains a slam effect"
            ],
        }
    },
    "awakened": {
        rarity: "rare" /* Rare */,
        description: "As an action or attack, I can slam the axe into the ground. All creatures within 5 ft must make a DC 14 Con save. On a fail, they take 2d8 Thunder damage and are pushed 10 ft. On success, they take half damage and are not pushed. Recharges at dawn.",
        descriptionFull: itemDesc([
            "The head of this greataxe has the form of a leaping bear etched into the metal. The eyes of the bear glow with a dull white.",
            "You have a +1 bonus to attack and damage rolls made with this magic weapon.",
            "As an action or an attack, you can slam the greataxe into the ground. Each creature within 5ft must make a DC14 Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much and is not pushed. This property of the axe can't be used again until the next dawn."
        ]),
        weaponOptions: [{
                regExpSearch: /bear roar/i,
                name: "Bear Roar",
                source: [["Beniverse", 0]],
                ability: 0,
                type: "Spell" /* Spell */,
                damage: [2, 8, "thunder" /* Thunder */],
                range: "5-ft radius",
                description: "Slam as action or attack. Con save; success - half damage; fail - pushed 10 ft",
                dc: true,
                modifiers: [6, ""]
            }],
        calcChanges: {
            atkAdd: [
                function (fields, v) {
                    if (v.isMeleeWeapon && roarOfTheBearRegex.test(v.WeaponTextName)) {
                        fields.Description += (fields.Description ? '; ' : '') + "Slam to cause 'Bear Roar' (action or attack)";
                    }
                }, "When Awakened, Roar of the Bear has +1 on attack and damage rolls and its slam effect can be used as an attack and the DC is increased to 14"
            ],
            atkCalc: [
                function (fields, v, output) {
                    if (v.isMeleeWeapon && roarOfTheBearRegex.test(v.WeaponTextName)) {
                        output.magic = 1;
                    }
                }, ''
            ]
        }
    }
};
function itemDesc(arr) {
    return arr.join("\n   ");
}
