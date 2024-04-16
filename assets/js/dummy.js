const wow = {
    classes: ["Warrior", "Hunter", "Priest", "Mage", "Monk", "Deamon Hunter", "Evoker", "Paladin", "Rogue", "Shaman", "Warlock", "Druid", "Death Knight"],
    getData()
    {
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
            trainingDummyDamage: [50,70,90,30,20,230]
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