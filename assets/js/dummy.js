class wowCharacter {
    wow_class = "";
    wow_race = "";
    wow_level = 0;
    constructor(wow_class, wow_race, wow_level)
    {
        this.wow_class = wow_class;
        this.wow_race = wow_race;
        this.wow_level = wow_level;
    }
}
//const 

class classColor {
    r = 0;
    g = 0;
    b = 0;
    constructor(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class wowClass {
    name = "";
    constructor(name, color)
    {
        this.name = name;
        this.color = new classColor(color.r, color.g, color.b);
    }
}

/*
Death Knight	196, 30, 58          #C41E3A	Red
Demon Hunter	163, 48, 201         #A330C9	Dark Magenta
Druid	        255, 124, 10	        #FF7C0A	Orange
Evoker	        51, 147, 127	        #33937F	Dark Emerald
Hunter	        170, 211, 114	        #AAD372	Pistachio
Mage	        63, 199, 235	        #3FC7EB	Light Blue
Monk	        0, 255, 152	        #00FF98	Spring Green
Paladin	        244, 140, 186	        #F48CBA	Pink
Priest	        255, 255, 255	        #FFFFFF	White*
Rogue	        255, 244, 104	        #FFF468	Yellow*
Shaman	        0, 112, 221	        #0070DD	Blue
Warlock	        135, 136, 238	        #8788EE	Purple
Warrior	        198, 155, 109	        #C69B6D	Tan

*/

class wowClass2 {
    name = "";
    constructor(name, color)
    {
        this.name = name;
        this.color = new classColor(color.r, color.g, color.b);
    }
}

const wow = {
    classes: [
        "Warrior"
      , "Hunter"
      , "Priest"
      , "Mage"
      , "Monk"
      , "Deamon Hunter"
      , "Evoker"
      , "Paladin"
      , "Rogue"
      , "Shaman"
      , "Warlock"
      , "Druid"
      , "Death Knight"
  ],
    classes_v2: {
        Warrior: { name: "Warrior", color: new classColor(158, 107, 53) }
        , Hunter: { name: "Hunter", color: new classColor(158, 107, 53) }
        , Priest: { name: "Priest", color: new classColor(255, 255, 255) }
        , Mage: { name : "Mage", color: new classColor(63, 199, 235) }
        , Monk: { name : "Monk", color: new classColor(0, 255, 152) }
        , DeamonHunter: { name : "Deamon Hunter", color: new classColor(163, 48, 201) }
        , Evoker: { name : "Evoker", color: new classColor(51, 147, 127) }
        , Paladin: { name : "Paladin", color: new classColor(244, 140, 186) }
        , Rogue: { name : "Rogue", color: new classColor(255, 244, 104) }
        , Shaman: { name : "Shaman", color: new classColor(0, 112, 221) }
        , Warlock: { name : "Warlock", color: new classColor(135, 136, 238) }
        , Druid: { name : "Druid", color: new classColor(255, 124, 10) }
        , DeathKnight: { name : "Death Knight", color: new classColor(196, 30, 58) }
    },
    race: [
        "Human", "Dwarf", "Night Elf", "Gnome", "Draenei",
        "Worgen", "Pandaren", "Dracthyr", "Orc", "Undead",
        "Tauren", "Troll", "Blood Elf", "Goblin", "Pandaren",
        "Dracthyr", "Void Elf", "Lightforged Draenei", "Dark Iron Dwarf", "Kul Tiran",
        "Mechagnome", "Nightborne", "Highmountain Tauren", "Mag'har Orc", "Zandalari Troll",
        "Vulpera"
    ],
    getRandomCharacter() {

        const classCount = this.classes.length;
        const raceCount = this.race.length;
        const classNo = Math.floor(Math.random() * classCount);
        const raceNo = Math.floor(Math.random() * raceCount);
        const wowclass = this.classes[classNo];
        const wowrace = this.race[raceNo];
        const wowlevel = Math.floor(Math.random() * 100 + 1);
        return new wowCharacter(wowclass, wowrace, wowlevel);
    }
    ,
    getData() {
        return this.classes[3];
    },
    character: {
        카운트베이시: {
            level: 90,
            class_: "Mage",
            race: "Troll",
            professions: {
                tailoring: {
                    skillevel: 325,
                    rank: "master"
                },
                enchanting: {
                    skillevel: 225,
                    rank: "expert"
                }
            },
            trainingDummyDamage: [50, 70, 90, 30, 20, 230]
        },
        부캐: {
            level: 53,
            class_: "Warrior",
            race: "Tauren",
            atk: 100000000,
            def: 1000000,
        }
    }
}

const swingDance = {
    pattens:
        [
            "Swing Out",
            "Send In",
            "Send Out",
            "Hal Takier Swing Out",
            "Pop Turn"
        ],
    styling:
        [
            "Swivel"
        ],
    anmu:
        [
            {
                name: "트랭키두",
                bpm: 180

            },
            {
                name: "두잉더자이브",
                bpm: 150
            },
            {
                name: "심샘",
                bpm: 140
            },
            {
                name: "트릭컬레이션",
                bpm: 130
            }
        ]
}

/*
https://worldofwarcraft.blizzard.com/en-us/game/races
const race = [];
for (const race_name of document.querySelectorAll(".RaceTile-name")) race.push(race_name.innerHTML);
console.log(race);
*/


