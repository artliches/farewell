export interface StatsObject {
    name: string,
    descrip: string,
    value: number,
    rollsArray: Array<any>,
    statMod: string,
    promoRolls: any,
};

export interface VitalsObject {
    name: string,
    descrip: string,
    value?: number,
    valueObj?: {
      current: number,
      die: string,
    },
    rollsArray: string,
    promoRolls?: any,
};

export interface DescripIndexObj {
    descrip: string,
    currIndex: number
};

export interface ShockObj {
    value: number,
    effect: string,
};

export interface EmbeddedNameObj {
    part: string,
    currIndex: number
}

export interface SkillObject {
    descrip: string,
    data: string,
    currIndex: number,
    arrayIndex: number,
};

export interface BeastObject {
    originalArray: string[],
    currBeast: number
};

export interface DescripIndexTableObj {
    descrip: string,
    currIndex: number,
    tableIndex: number
};

export interface DescripIndexLimitObj {
    descrip: string,
    currIndex: number,
    limitNum: number
};

export interface ShockTrackerObj {
    carry: number,
    ready: number,
    personal: number
};

export interface WarscrollObj {
    descrip: string,
    currIndex: number,
    isFromReadiness?: boolean,
    isFromNothing?: boolean,
    isFromClass?: boolean,
    isFromPromo?: boolean,
}

export interface ReadyObject {
    descrip: string,
    currIndex: number,
    tableIndex: number,
    presenceString: string
};

export interface AmmoObj {
    descrip: number,
    die: string,
};

export interface DescripOriginalObj {
    descrip: string,
    original: string,
};

export interface ExtrasObj {
    descrip: string,
    presenceString?: string
}

export interface ShitObj {
    carryObj: DescripIndexTableObj,
    firearmsObj: DescripIndexLimitObj,
    ammoObj: AmmoObj,
    sidearmsObj: DescripIndexLimitObj,
    armorObj: DescripIndexLimitObj,
    extrasArray: ExtrasObj[],
    personalObj: DescripIndexTableObj,
    readyObj: ReadyObject,
    readyObjFromMerit: DescripOriginalObj[],
    slagvarra: string[],
    warScrolls: WarscrollObj[],
    shockObj: ShockTrackerObj,
    hasNothing: boolean,
};

export interface ClassObj {
    skillObj: SkillObject[],
    beastObj: BeastObject,
};

export interface IdentityObj {
    nameObj: DescripIndexObj, 
    embeddedNameObj: EmbeddedNameObj[],
    reasonObj: DescripIndexObj,
    scarsObj: DescripIndexObj,
    vicesObj: DescripIndexObj,
    shockObj: ShockObj,
};

export interface AbilitiesObj {
    statsArray: StatsObject[],
    vitalsArray: VitalsObject[],
};

export interface SquadObj {
    attachmentsNum: number,
    machineNum: number,
    squadMakeup: {name: string[], firearms: string[], sidearms: string[], specials: string[]},
    squadObj: {size: number, firearm: {descrip: any, original: string, isScroll: boolean}, sidearm: {descrip: any, original: string, isScroll: boolean}, special: string},
    morale: number,
    armor: string,
    hasHelmet: boolean,
};

export interface LeaderObj {
    leaderObj: {
        name: string,
        specialitiesObj: {
          specialities: string[],
          chosenSpeciality: string,
          original: string,
        },
        special: string,
        stats: {
          name: string,
          mod: number,
        }[],
        startingShit: Array<any>
      },
      ammoObj: {value: number, die: string},
      hpObj: {value: number, die: string},
      embeddedNameObj: {first: string, middle: string, last: string},
      nickname: string,
      armorWithHelmet: boolean,
      armorObj: {descrip: string, currIndex: number, limitNum: number},
      firearmsObj: {descrip: string, currIndex: number, limitNum: number},
      sidearmsObj: {descrip: string, currIndex: number, limitNum: number},
      warScrollObj: {descrip: string, currIndex: number}[],
      shockObj: {value: number, effect: string},
      scarObj: {descrip: string, original: string},
};

export interface LeaderGrvntSaveObj {
    grvntInfo: LeaderObj,
    arrayIndex: number,
};