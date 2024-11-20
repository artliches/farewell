export const LEADERS = [
    {
        name: 'grizzled veteran',
        specialities: [
            `<strong class="clickable">Troll-Blooded.</strong> Heal d4 per turn`,
            `<strong class="clickable">Tank Slicer.</strong> Zweihander (d10, IMPACT 2)`,
            `<strong class="clickable">Thunderhorse.</strong> Charge (d6), Fiery Breath (d8, BURN 2, once per combat)`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 10
            },
            {
                name: 'ammo',
                mod: 3
            },
        ],
        startingShit: [
            {
                firearms: 10
            },
            {
                sidearm: 10
            },
            {
                armor: 6
            }
        ],
    },
    {
        name: 'expendable sapper',
        specialities: [
            `<strong class="clickable">Thumper.</strong> All attacks have HEAVY`,
            `<strong class="clickable">Foresight.</strong> Carries 2 Shinrippers that can be detonated anywhere`,
            `<strong class="clickable">Death From Below.</strong> Tunnels underground for d4 turns (once per combat), attacks have IMPACT 2 while in tunnels`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 3
            },
        ],
        startingShit: [
            {
                firearms: 10
            },
            {
                sidearm: 3
            },
            {
                armor: 4
            }
        ],
    },
    {
        name: 'recluse marksman',
        specialities: [
            `<strong class="clickable">Night Stalker.</strong> Always has On Watch`,
            `<strong class="clickable">Coriolis Effect.</strong> 1-in-6 chance they hit a second grvnt for d6 damage`,
            `<strong class="clickable">Occult Obscurity.</strong> Fades into the surroundings, cannot be targeted for d4 rounds`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 4
            },
        ],
        startingShit: [
            {
                armor: 2
            },
            {
                firearms: `<strong class="underline">More-Precise Rifle.</strong> <strong>d10</strong> ranged, <em>SCOPED, IMPACT 1</em>`
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'homesick rifleman',
        specialities: [
            `<strong class="clickable">Beheader.</strong> Malevolent Rifle with d8 bayonet`,
            `<strong class="clickable">Carbine.</strong> Attacks twice in melee`,
            `<strong class="clickable">Letters From Home.</strong> d4 letter explosives with a random Weapon Keyword`,
            `<strong class="clickable">Lovesick.</strong> Casts a random War Scroll, once per combat`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 4
            },
        ],
        startingShit: [
            {
                armor: 4
            },
            {
                firearms: `<strong class="underline">Malevolent Rifle (M1).</strong> <strong>d8</strong> rifle, two-handed, <em>IMPACT 1</em>`
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'cynically cursed chaplain',
        specialities: [
            `<strong class="clickable">Saint’s Cross.</strong> Melee (d8) or Large Shield`,
            `<strong class="clickable">Galgorian Chanting.</strong> Lower Omens, Powers, or Ammo by 1 for all grvnts, once per combat`,
            `<strong class="clickable">Thurible.</strong> Melee (d6, BURN 1), counter-attacks when taking SHOCK`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
        ],
        startingShit: [
            {
                warscroll: 2
            },
            {
                armor: 4
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'arcane medic',
        specialities: [
            `<strong class="clickable">Leeches.</strong> d6 Onda Leeches (block d2 damage per squad member)`,
            `<strong class="clickable">Aegis.</strong> Shield giving Full cover`,
            `<strong class="clickable">Last Rites.</strong> Raise d2 fallen squad members, once per combat`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 2
            },
        ],
        startingShit: [
            {
                armor: 6
            },
            {
                firearms: 6
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'altered mercenary',
        specialities: [
            `<strong class="clickable">Falchon.</strong> DR14 to hit, talon attack (d10)`,
            `<strong class="clickable">Hyena.</strong> 3-in-6 chance to cast a random War Scroll`,
            `<strong class="clickable">Kongoose.</strong> Melee (2d6 to two grvnts), permanent -d6 Armor`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 8
            },
        ],
        startingShit: [
            {
                armor: 2
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'embedded one',
        specialities: [
            `<strong class="clickable">GROWTH.</strong> Club d8 (SHOCK), Vines -d2 (Partial cover)`,
            `<strong class="clickable">DECAY.</strong> Fox d6 (IMPACT 1), Hides -d4 (Partial cover)`,
            `<strong class="clickable">MOVEMENT.</strong> Super Speed, once per combat`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 8
            },
        ],
        startingShit: [
            {
                sidearm: 10
            }
        ],
    },
    {
        name: 'radiant bannerman',
        specialities: [
            `<strong class="clickable">Ash.</strong> SILENCE d4 grvnts (cannot use specials or scrolls), once per combat`,
            `<strong class="clickable">Cobalt.</strong> Gain -d4 Armor for each kill with their Bannerspear`,
            `<strong class="clickable">Coal.</strong> All squad member suffer d4 SHOCK, once per combat`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 3
            },
        ],
        startingShit: [
            {
                armor: 2
            },
            {
                firearms: 4
            }
        ],
    },
    {
        name: 'new world engineer',
        specialities: [
            `<strong class="clickable">Tower.</strong> d3 levels, +1 DR to avoid attacks per level`,
            `<strong class="clickable">Wire.</strong> Stop grvnts for d2 turns (d3 damage, then test SHOCK)`,
            `<strong class="clickable">Bunker.</strong> Full cover for squad`,
        ],
        special: '',
        stats: [
            {
                name: 'hp',
                mod: 8
            },
            {
                name: 'ammo',
                mod: 4
            },
        ],
        startingShit: [
            {
                armor: 4
            },
            {
                firearms: 6
            },
            {
                sidearm: 10
            },
        ],
    },
    {
        name: 'despondent interpreter',
        specialities: [],
        special: ': If taken alive, gain possession of their <strong>Record</strong> (<em>d3 random occurrences already marked off</em>)',
        stats: [
            {
                name: 'hp',
                mod: 6
            },
            {
                name: 'ammo',
                mod: 2
            },
        ],
        startingShit: [
            {
                armor: 4
            },
            {
                firearms: 4
            },
            {
                sidearm: 10
            },
            {
                warscroll: 1
            }
        ],
    },
    {
        name: 'sadistic soldier',
        specialities: [
            `<strong class="clickable">Eyes.</strong> +2 DR to dodge ranged attacks per eye`,
            `<strong class="clickable">Teeth.</strong> Gain -d2 Armor per teeth`,
            `<strong class="clickable">Fingers.</strong> Gain +1 damage per finger`,
        ],
        special: ': Affects whole squad',
        stats: [
            {
                name: 'hp',
                mod: 10
            },
            {
                name: 'ammo',
                mod: 2
            },
        ],
        startingShit: [
            {
                armor: 2
            },
            {
                firearms: 10
            },
            {
                sidearm: `<strong class="underline">Punch Dagger.</strong> <strong>d4</strong>, <em>SHOCK</em>`
            }
        ],
    }
]