export const LEADERS = [
    {
        name: 'grizzled veteran',
        specialities: [
            `<strong class="clickable">Troll-Blooded.</strong> Heal <strong>d4</strong> per turn`,
            `<strong class="clickable">Tank Slicer.</strong> <strong>Zweihander</strong> (<em>d10, IMPACT 2</em>)`,
            `<strong class="clickable">Thunderhorse.</strong> <strong>Charge</strong> (<em>d6</em>), <strong>Fiery Breath</strong> (<em>d8, BURN 2, once per combat</em>)`,
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
            `<strong class="clickable">Thumper.</strong> All attacks have <strong>HEAVY</strong>`,
            `<strong class="clickable">Foresight.</strong> Carries 2 <strong>Shinrippers</strong> <strong>3d4</strong>, (<em>IMPACT 1, HEAVY, SHOCK; 1-in-6 chance to go off when handled</em>) that can be detonated anywhere`,
            `<strong class="clickable">Death From Below.</strong> Tunnels underground for <strong>[d4]</strong> turn(s) (<em>once per combat</em>), attacks have <strong>IMPACT 2</strong> while in tunnels`,
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
            `<strong class="clickable">Night Stalker.</strong> Always has <strong>On Watch</strong>`,
            `<strong class="clickable">Coriolis Effect.</strong> <strong>1-in-6 chance</strong> they hit a second grvnt for <strong>d6</strong> damage`,
            `<strong class="clickable">Occult Obscurity.</strong> Fades into the surroundings, cannot be targeted for <strong>[d4] rounds</strong>`,
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
            `<strong class="clickable">Beheader.</strong> <strong>Malevolent Rifle</strong> with <strong>d8 </strong>bayonet`,
            `<strong class="clickable">Carbine.</strong> Attacks <strong>twice</strong> in melee`,
            `<strong class="clickable">Letters From Home.</strong> <strong>[d4]</strong> letter explosives with a random <strong>Weapon Keyword</strong>`,
            `<strong class="clickable">Lovesick.</strong> Casts a random <strong>War Scroll</strong>, once per combat`,
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
            `<strong class="clickable">Saint’s Cross.</strong> Melee (<em>d8</em>) or <strong>Large Shield</strong>`,
            `<strong class="clickable">Galgorian Chanting.</strong> Lower <strong>Omens</strong>, <strong>Powers</strong>, or <strong>Ammo</strong> by <strong>1</strong> for all grvnts, once per combat`,
            `<strong class="clickable">Thurible.</strong> Melee (<em>d6, BURN 1</em>), counter-attacks when taking <strong>SHOCK</strong>`,
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
            `<strong class="clickable">Leeches.</strong> <strong>[d6]</strong> Onda Leeches (<em>block d2 damage per squad member</em>)`,
            `<strong class="clickable">Aegis.</strong> Shield giving <strong>Full cover</strong>`,
            `<strong class="clickable">Last Rites.</strong> Raise <strong>[d2]</strong> fallen squad members, once per combat`,
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
            `<strong class="clickable">Falchon.</strong> <strong>DR14</strong> to hit, talon attack (<em>d10</em>)`,
            `<strong class="clickable">Hyena.</strong> <strong>3-in-6</strong> chance to cast a random <strong>War Scroll</strong>`,
            `<strong class="clickable">Kongoose.</strong> Melee (<em>2d6 to two grvnts</em>), permanent <strong>-d6 Armor</strong>`,
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
            `<strong class="clickable">GROWTH.</strong> <strong class="underline">Club</strong> <strong>d8</strong> (<em>SHOCK</em>), <strong class="underline">Vines</strong> <strong>-d2</strong> (<em>Partial cover</em>)`,
            `<strong class="clickable">DECAY.</strong> <strong class="underline">Fox</strong> <strong>d6</strong> (<em>IMPACT 1</em>), <strong class="underline">Hides</strong> <strong>-d4</strong> (<em>Partial cover</em>)`,
            `<strong class="clickable">MOVEMENT.</strong> <strong>Super Speed</strong>, once per combat`,
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
            `<strong class="clickable">Ash.</strong> <strong>SILENCE</strong> <strong>[d4]</strong> grvnts (<em>cannot use specials or scrolls</em>), once per combat`,
            `<strong class="clickable">Cobalt.</strong> Gain <strong>-d4 Armor</strong> for each kill with their <strong>Bannerspear</strong>`,
            `<strong class="clickable">Coal.</strong> All grvnts suffer <strong>[d4] SHOCK</strong>, once per combat`,
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
            `<strong class="clickable">Tower.</strong> <strong>[d3]</strong> levels, <strong>+1 DR</strong> to avoid attacks per level`,
            `<strong class="clickable">Wire.</strong> Stop grvnts for <strong>[d2]</strong> turn(s) (<em>d3 damage, then test SHOCK</em>)`,
            `<strong class="clickable">Bunker.</strong> <strong>Full cover</strong> for squad`,
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
            `<strong class="clickable">Eyes.</strong> <strong>+2 DR</strong> to dodge ranged attacks per eye`,
            `<strong class="clickable">Teeth.</strong> Gain <strong>-d2 Armor</strong> per teeth`,
            `<strong class="clickable">Fingers.</strong> Gain <strong>+1 damage</strong> per finger`,
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
];

export const SQUADS = [
    {
        name: [' The Fortunate Sons'],
        firearms: [
            `Vermin Maimer`,
            `Schleswig Sprayer`,
            `Malevolent Rifle`,
        ],
        sidearms: [
            `SLAGG Bangs`,
            `Fire Spear`,
            `Barbed Wire Club`,
        ],
        specials: [
            `<strong class="clickable">Cover Huggers.</strong> DR13 to hit`,
            `<strong class="clickable">Ferocious.</strong> Does not suffer <strong>SHOCK</strong>`,
            `<strong class="clickable">Medic.</strong> Replenishes 1 squad member once`,
            `<strong class="clickable">Well Equipped.</strong> Attacks with a <strong>Richters MG</strong> (<em>Spend 1 SLAGG: 2d6 to d3 targets, IMPACT 1; d2 turns to set up</em>) instead of Firearm`,
        ],
    },
    {
        name: [' Armata Strigoi'],
        firearms: [
            `666 Shooter`,
            `Dual Cvlt .45`,
            `Malevolent Rifle`,
        ],
        sidearms: [
            `Scream Grenades`,
            `Shorter Sword`,
            `Barbed Wire Club`,
        ],
        specials: [
            `<strong class="clickable">Life Eternal.</strong> Each felled squad member drops a live <strong>Scream Grenade</strong> (<em>small explosive <strong>d4</strong>, <em>BLAST 3, HEAVY</em></em>)`,
            `<strong class="clickable">Cold Iron.</strong> One squad member wields a <strong>Zweihander</strong> (<em><strong>d10</strong>, <em>HEAVY</em></em>) but dies taking any damage`,
            `<strong class="clickable">Munitions Expert.</strong> Attacks with a <strong>Malevolent Rifle (M1)</strong> (<em><strong>d8</strong> rifle, <em>two-handed, IMPACT 1</em></em>) as if they had an additional squad member`,
            `<strong class="clickable">Detonation Pike.</strong> Sacrifice a squad member to make one attack with a <strong>Boom Lance</strong> (<em><strong>d10</strong> rocket launcher, <em>two-handed, BLAST 2, HEAVY</em></em>)`,
        ],
    },
    {
        name: [' Fire and Forgive'],
        firearms: [
            `[Casts] Nay-Palm`,
            `666 Shooter`,
            `Malevolent Rifle`,
        ],
        sidearms: [
            `[Casts] Misfire`,
            `Punch Dagger`,
            `Short Bow`,
        ],
        specials: [
            `<strong class="clickable">Shielded.</strong> -1 damage`,
            `<strong class="clickable">Sorrowful Sonnet.</strong> PCs test <strong>SHOCK</strong> each round`,
            `<strong class="clickable">Sharpshooter.</strong> Sacrifice a squad member to make one <strong>d10</strong> attack (<em>IMPACT 2</em>)`,
            `<strong class="clickable">Banners Unfurled.</strong> Prevents the use of <strong>Omens</strong>`,
        ],
    },
    {
        name: [' Iron Maidens'],
        firearms: [
            `[Casts] For Whom the Bell Tolls`,
            `Boom Lance`,
            `Slug Launcher`,
        ],
        sidearms: [
            `Shorter Sword`,
            `Zweihander`,
            `<strong class="clickable">Tergol’s Secret Cocktail</strong> <strong>d4</strong> damage, SHOCK, BURN 3`,
        ],
        specials: [
            `<strong class="clickable">SLAGG Transport.</strong> Carries 2 <strong>SLAGG</strong>`,
            `<strong class="clickable">Temporally Displaced.</strong> Remaining squad size doubles after <strong>2d2 turns</strong>`,
            `<strong class="clickable">Destructive.</strong> Spends a turn to completely destroy a target’s <strong>cover</strong>`,
            `<strong class="clickable">Flanking.</strong> Moves to cover when a squad member is <strong>Downed</strong>`,
        ],
    },
];

export const MACHINES = [
    {
        name: 'GASLOBBER',
        hp: 12, 
        morale: '-',
        weapon: `<strong>Gas Canister Shell.</strong> Releases GAS within 20ft radius of target`,
        armor: `<strong>Blast Screen.</strong> -d4`,
        special: 'Usually far from the front'
    },
    {
        name: `LANDCRUSHER`,
        hp: 20,
        morale: '-',
        weapon: `<strong>Mounted Cannon.</strong> d12, IMPACT 4, SHOCK (<em>fires once every d4 rounds</em>)`,
        armor: `<strong>Forged SLAGG Plating.</strong> -d10`,
        special: `Tries to run over grvnts between Cannon shots. Destroys all cover.`,
    },
    {
        name: `SKYCRAWLER`,
        hp: '*',
        morale: 9,
        weapon: `<strong>Strafe.</strong> d4 grvnts test Agility DR14 or 3d6 damage spread evenly (<em>IMPACT 1</em>)`,
        armor: `<strong>Sheet Metal.</strong> -d4`,
        special: `When Skycrawler would take damage, test Morale`,
    },
    {
        name: `SEASPLITTER`,
        hp: 30,
        morale: 10 ,
        weapon: `<strong>Heavy Guns.</strong> d12 damage to all targets in a 30ft area`,
        armor: `<strong>Iron Lung.</strong> -d12`,
        special: `Seacrawler cannot dodge, all attacks hit`,
    },
];
