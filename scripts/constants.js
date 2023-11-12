/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-sw5e'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '1.5'

/**
 * Action type
 */
export const ACTION_TYPE = {
    ability: 'SW5E.Ability',
    check: 'tokenActionHud.sw5e.check',
    condition: 'tokenActionHud.sw5e.condition',
    counter: 'tokenActionHud.sw5e.counter',
    effect: 'SW5E.Effect',
    exhaustion: 'SW5E.Exhaustion',
    feature: 'ITEM.TypeFeat',
    item: 'tokenActionHud.sw5e.item',
    save: 'SW5E.ActionSave',
    skill: 'tokenActionHud.sw5e.skill',
    power: 'ITEM.TypePower',
    utility: 'SW5E.ActionUtil'
}

/**
 * Activation type icons
 */
export const ACTIVATION_TYPE_ICON = {
    bonus: 'fas fa-plus',
    crew: 'fas fa-users',
    day: 'fas fa-hourglass-end',
    hour: 'fas fa-hourglass-half',
    lair: 'fas fa-home',
    minute: 'fas fa-hourglass-start',
    legendary: 'fas fas fa-dragon',
    reaction: 'fas fa-bolt',
    special: 'fas fa-star'
}

/**
 * Concentration icon
 */
export const CONCENTRATION_ICON = 'fas fa-circle-c'

/**
 * Conditions
 */
export const CONDITION = {
    blind: { uuid: 'Compendium.sw5e.conditions.JournalEntry.XNjuuloYOfesNbbZ.JournalEntryPage.7GjhHk3xKqp8TyW5' },
    blinded: { uuid: 'Compendium.sw5e.conditions.JournalEntry.XNjuuloYOfesNbbZ.JournalEntryPage.7GjhHk3xKqp8TyW5' },
    'Convenient Effect: Blinded': { uuid: 'Compendium.sw5e.conditions.JournalEntry.XNjuuloYOfesNbbZ.JournalEntryPage.7GjhHk3xKqp8TyW5' },
    charmed: { uuid: 'Compendium.sw5e.conditions.JournalEntry.xlfP4WiC8dt2mHXv.JournalEntryPage.QvC5VJNVXef6HSV3' },
    'Convenient Effect: Charmed': { uuid: 'Compendium.sw5e.conditions.JournalEntry.xlfP4WiC8dt2mHXv.JournalEntryPage.QvC5VJNVXef6HSV3' },
    deaf: { uuid: 'Compendium.sw5e.conditions.JournalEntry.y0QASIZcnC8e30lr.JournalEntryPage.keiC53ZQvWgWo1Ij' },
    deafened: { uuid: 'Compendium.sw5e.conditions.JournalEntry.y0QASIZcnC8e30lr.JournalEntryPage.keiC53ZQvWgWo1Ij' },
    'Convenient Effect: Deafened': { uuid: 'Compendium.sw5e.conditions.JournalEntry.y0QASIZcnC8e30lr.JournalEntryPage.keiC53ZQvWgWo1Ij' },
    fear: { uuid: 'Compendium.sw5e.conditions.JournalEntry.9P1kVYb1U3WElbKS.JournalEntryPage.gNyo5XDztoY6bpOm' },
    'Convenient Effect: Frightened': { uuid: 'Compendium.sw5e.conditions.JournalEntry.9P1kVYb1U3WElbKS.JournalEntryPage.gNyo5XDztoY6bpOm' },
    frightened: { uuid: 'Compendium.sw5e.conditions.JournalEntry.9P1kVYb1U3WElbKS.JournalEntryPage.gNyo5XDztoY6bpOm' },
    grappled: { uuid: 'Compendium.sw5e.conditions.JournalEntry.PQ0MUIr3IzvMXEu5.JournalEntryPage.NlgZcYSCnBAF4fco' },
    'Convenient Effect: Grappled': { uuid: 'Compendium.sw5e.conditions.JournalEntry.PQ0MUIr3IzvMXEu5.JournalEntryPage.NlgZcYSCnBAF4fco' },
    incapacitated: { uuid: 'Compendium.sw5e.conditions.JournalEntry.COPoH4lzofPVzIiK.JournalEntryPage.GsE74BOZqBl8xeg0' },
    'Convenient Effect: Incapacitated': { uuid: 'Compendium.sw5e.conditions.JournalEntry.COPoH4lzofPVzIiK.JournalEntryPage.GsE74BOZqBl8xeg0' },
    invisible: { uuid: 'Compendium.sw5e.conditions.JournalEntry.eQD2ubHBnMNlMIR0.JournalEntryPage.HGElHeDDzNdoNF7k' },
    'Convenient Effect: Invisible': { uuid: 'Compendium.sw5e.conditions.JournalEntry.eQD2ubHBnMNlMIR0.JournalEntryPage.HGElHeDDzNdoNF7k' },
    paralysis: { uuid: 'Compendium.sw5e.conditions.JournalEntry.OZn3BCm8cHO8G3cT.JournalEntryPage.RCnBOTqKT8ne41lo' },
    paralyzed: { uuid: 'Compendium.sw5e.conditions.JournalEntry.OZn3BCm8cHO8G3cT.JournalEntryPage.RCnBOTqKT8ne41lo' },
    'Convenient Effect: Paralyzed': { uuid: 'Compendium.sw5e.conditions.JournalEntry.OZn3BCm8cHO8G3cT.JournalEntryPage.RCnBOTqKT8ne41lo' },
    petrified: { uuid: 'Compendium.sw5e.conditions.JournalEntry.aalhUc7zItsYml45.JournalEntryPage.7JdzBcIcesZD9Tqj' },
    'Convenient Effect: Petrified': { uuid: 'Compendium.sw5e.conditions.JournalEntry.aalhUc7zItsYml45.JournalEntryPage.7JdzBcIcesZD9Tqj' },
    poison: { uuid: 'Compendium.sw5e.conditions.JournalEntry.fGgXKHClM9aTq8t7.JournalEntryPage.zGYZ5qCKa0nwC8wI' },
    poisoned: { uuid: 'Compendium.sw5e.conditions.JournalEntry.fGgXKHClM9aTq8t7.JournalEntryPage.zGYZ5qCKa0nwC8wI' },
    'Convenient Effect: Poisoned': { uuid: 'Compendium.sw5e.conditions.JournalEntry.fGgXKHClM9aTq8t7.JournalEntryPage.zGYZ5qCKa0nwC8wI' },
    prone: { uuid: 'Compendium.sw5e.conditions.JournalEntry.r2bQT0RrvwFIWKGh.JournalEntryPage.g3I8wal6v20Oozdz' },
    'Convenient Effect: Prone': { uuid: 'Compendium.sw5e.conditions.JournalEntry.r2bQT0RrvwFIWKGh.JournalEntryPage.g3I8wal6v20Oozdz' },
    restrain: { uuid: 'Compendium.sw5e.conditions.JournalEntry.MtoBPQrFn6PSrNyb.JournalEntryPage.4cViA1ZdwzO1qQ6S' },
    restrained: { uuid: 'Compendium.sw5e.conditions.JournalEntry.MtoBPQrFn6PSrNyb.JournalEntryPage.4cViA1ZdwzO1qQ6S' },
    'Convenient Effect: Restrained': { uuid: 'Compendium.sw5e.conditions.JournalEntry.MtoBPQrFn6PSrNyb.JournalEntryPage.4cViA1ZdwzO1qQ6S' },
    shocked: { uuid: 'Compendium.sw5e.conditions.JournalEntry.HBSJojgAGu9Gsctd.JournalEntryPage.0BmSz4ItfxMsL4bt' },
    stun: { uuid: 'Compendium.sw5e.conditions.JournalEntry.HBSJojgAGu9Gsctd.JournalEntryPage.0BmSz4ItfxMsL4bt' },
    stunned: { uuid: 'Compendium.sw5e.conditions.JournalEntry.HgKfTdiUxEEQ9Ebp.JournalEntryPage.3bbnsGzy2JKHptRO' },
    'Convenient Effect: Stunned': { uuid: 'Compendium.sw5e.conditions.JournalEntry.HBSJojgAGu9Gsctd.JournalEntryPage.0BmSz4ItfxMsL4bt' },
    unconscious: { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpQxbma06eaNVsQB.JournalEntryPage.vPG5xITK6msE8UKx' },
    'Convenient Effect: Unconscious': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpQxbma06eaNVsQB.JournalEntryPage.vPG5xITK6msE8UKx' },
    exhaustion: { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' },
    'Convenient Effect: Exhaustion 1': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' },
    'Convenient Effect: Exhaustion 2': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' },
    'Convenient Effect: Exhaustion 3': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' },
    'Convenient Effect: Exhaustion 4': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' },
    'Convenient Effect: Exhaustion 5': { uuid: 'Compendium.sw5e.conditions.JournalEntry.EpnBWP4VKrmHICaa.JournalEntryPage.9h0Z9tisNv7AqiOT' }
}

/**
 * Groups
 */
export const GROUP = {
    _1stLevelPowers: { id: '1st-level-powers', name: 'tokenActionHud.sw5e.1stLevelPowers', type: 'system' },
    _2ndLevelPowers: { id: '2nd-level-powers', name: 'tokenActionHud.sw5e.2ndLevelPowers', type: 'system' },
    _3rdLevelPowers: { id: '3rd-level-powers', name: 'tokenActionHud.sw5e.3rdLevelPowers', type: 'system' },
    _4thLevelPowers: { id: '4th-level-powers', name: 'tokenActionHud.sw5e.4thLevelPowers', type: 'system' },
    _5thLevelPowers: { id: '5th-level-powers', name: 'tokenActionHud.sw5e.5thLevelPowers', type: 'system' },
    _6thLevelPowers: { id: '6th-level-powers', name: 'tokenActionHud.sw5e.6thLevelPowers', type: 'system' },
    _7thLevelPowers: { id: '7th-level-powers', name: 'tokenActionHud.sw5e.7thLevelPowers', type: 'system' },
    _8thLevelPowers: { id: '8th-level-powers', name: 'tokenActionHud.sw5e.8thLevelPowers', type: 'system' },
    _9thLevelPowers: { id: '9th-level-powers', name: 'tokenActionHud.sw5e.9thLevelPowers', type: 'system' },
    abilities: { id: 'abilities', name: 'tokenActionHud.sw5e.abilities', type: 'system' },
    actions: { id: 'actions', name: 'SW5E.ActionPl', type: 'system' },
    activeFeatures: { id: 'active-features', name: 'tokenActionHud.sw5e.activeFeatures', type: 'system' },
    atWillPowers: { id: 'at-will-powers', name: 'tokenActionHud.sw5e.atWillPowers', type: 'system' },
    backgroundFeatures: { id: 'background-features', name: 'tokenActionHud.sw5e.backgroundFeatures', type: 'system' },
    bonusActions: { id: 'bonus-actions', name: 'tokenActionHud.sw5e.bonusActions', type: 'system' },
    checks: { id: 'checks', name: 'tokenActionHud.sw5e.checks', type: 'system' },
    classFeatures: { id: 'class-features', name: 'tokenActionHud.sw5e.classFeatures', type: 'system' },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system' },
    conditions: { id: 'conditions', name: 'tokenActionHud.sw5e.conditions', type: 'system' },
    consumables: { id: 'consumables', name: 'ITEM.TypeConsumablePl', type: 'system' },
    containers: { id: 'containers', name: 'ITEM.TypeContainerPl', type: 'system' },
    counters: { id: 'counters', name: 'tokenActionHud.sw5e.counters', type: 'system' },
    crewActions: { id: 'crew-actions', name: 'tokenActionHud.sw5e.crewActions', type: 'system' },
    defensiveTactics: { id: 'defensive-tactics', name: 'tokenActionHud.sw5e.defensiveTactics', type: 'system' },
    equipment: { id: 'equipment', name: 'ITEM.TypeEquipmentPl', type: 'system' },
    equipped: { id: 'equipped', name: 'SW5E.Equipped', type: 'system' },
    exhaustion: { id: 'exhaustion', name: 'SW5E.Exhaustion', type: 'system' },
    feats: { id: 'feats', name: 'tokenActionHud.sw5e.feats', type: 'system' },
    fightingStyles: { id: 'fighting-styles', name: 'tokenActionHud.sw5e.fightingStyles', type: 'system' },
    innatePowers: { id: 'innate-powers', name: 'tokenActionHud.sw5e.innatePowers', type: 'system' },
    lairActions: { id: 'lair-actions', name: 'tokenActionHud.sw5e.lairActions', type: 'system' },
    legendaryActions: { id: 'legendary-actions', name: 'tokenActionHud.sw5e.legendaryActions', type: 'system' },
    loot: { id: 'loot', name: 'ITEM.TypeLootPl', type: 'system' },
    maneuvers: { id: 'maneuvers', name: 'tokenActionHud.sw5e.maneuvers', type: 'system' },
    metamagicOptions: { id: 'metamagic-options', name: 'tokenActionHud.sw5e.metamagicOptions', type: 'system' },
    monsterFeatures: { id: 'monster-features', name: 'tokenActionHud.sw5e.monsterFeatures', type: 'system' },
    multiattacks: { id: 'multiattacks', name: 'tokenActionHud.sw5e.multiattacks', type: 'system' },
    otherActions: { id: 'other-actions', name: 'tokenActionHud.sw5e.otherActions', type: 'system' },
    passiveEffects: { id: 'passive-effects', name: 'SW5E.EffectPassive', type: 'system' },
    passiveFeatures: { id: 'passive-features', name: 'tokenActionHud.sw5e.passiveFeatures', type: 'system' },
    speciesFeatures: { id: 'species-features', name: 'tokenActionHud.sw5e.speciesFeatures', type: 'system' },
    reactions: { id: 'reactions', name: 'SW5E.ReactionPl', type: 'system' },
    rests: { id: 'rests', name: 'tokenActionHud.sw5e.rests', type: 'system' },
    repairs: { id: 'repairs', name: 'tokenActionHud.sw5e.repairs', type: 'system' },
    runes: { id: 'runes', name: 'tokenActionHud.sw5e.runes', type: 'system' },
    saves: { id: 'saves', name: 'SW5E.ClassSaves', type: 'system' },
    skills: { id: 'skills', name: 'tokenActionHud.sw5e.skills', type: 'system' },
    temporaryEffects: { id: 'temporary-effects', name: 'SW5E.EffectTemporary', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' },
    tools: { id: 'tools', name: 'ITEM.TypeToolPl', type: 'system' },
    unequipped: { id: 'unequipped', name: 'SW5E.Unequipped', type: 'system' },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system' },
    weapons: { id: 'weapons', name: 'ITEM.TypeWeaponPl', type: 'system' }
}

/**
 * Prepared icon
 */
export const PREPARED_ICON = 'fas fa-sun fa-fw'

/**
 * Rarity
 */
export const RARITY = {
    standard: 'SW5E.ItemRarityStandard',
    premium: 'SW5E.ItemRarityPremium',
    prototype: 'SW5E.ItemRarityPrototype',
    advanced: 'SW5E.ItemRarityAdvanced',
    legendary: 'SW5E.ItemRarityLegendary',
    artifact: 'SW5E.ItemRarityArtifact'
}

/**
 * Ritual icon
 */
export const RITUAL_ICON = 'fas fa-circle-r'

/**
 * Weapon properties
 */
export const WEAPON_PROPERTY = {
    mgc: 'SW5E.WeaponPropertyEnh',
    aut: 'SW5E.WeaponPropertyAut',
    bur: 'SW5E.WeaponPropertyBur',
    dir: 'SW5E.WeaponPropertyDir',
    hvy: 'SW5E.WeaponPropertyHvy',
    hid: 'SW5E.WeaponPropertyHid',
    ken: 'SW5E.WeaponPropertyKen',
    pic: 'SW5E.WeaponPropertyPic',
    ran: 'SW5E.WeaponPropertyRan',
    rap: 'SW5E.WeaponPropertyRap',
    rel: 'SW5E.WeaponPropertyRel',
    smr: 'SW5E.WeaponPropertySmr',
    spc: 'SW5E.WeaponPropertySpc',
    vic: 'SW5E.WeaponPropertyVic',
    bit: 'SW5E.WeaponPropertyBit',
    bri: 'SW5E.WeaponPropertyBri',
    bru: 'SW5E.WeaponPropertyBru',
    cor: 'SW5E.WeaponPropertyCor',
    def: 'SW5E.WeaponPropertyDef',
    dex: 'SW5E.WeaponPropertyDex',
    drm: 'SW5E.WeaponPropertyDrm',
    dgd: 'SW5E.WeaponPropertyDgd',
    dis: 'SW5E.WeaponPropertyDis',
    dpt: 'SW5E.WeaponPropertyDpt',
    dou: 'SW5E.WeaponPropertyDou',
    fin: 'SW5E.WeaponPropertyFin',
    fix: 'SW5E.WeaponPropertyFix',
    ilk: 'SW5E.WeaponPropertyIlk',
    lgt: 'SW5E.WeaponPropertyLgt',
    lum: 'SW5E.WeaponPropertyLum',
    mig: 'SW5E.WeaponPropertyMig',
    mod: 'SW5E.WeaponPropertyMod',
    neu: 'SW5E.WeaponPropertyNeu',
    pen: 'SW5E.WeaponPropertyPen',
    pcl: 'SW5E.WeaponPropertyPcl',
    rch: 'SW5E.WeaponPropertyRch',
    rck: 'SW5E.WeaponPropertyRck',
    ret: 'SW5E.WeaponPropertyRet',
    shk: 'SW5E.WeaponPropertyShk',
    sil: 'SW5E.WeaponPropertySil',
    slg: 'SW5E.WeaponPropertySlg',
    son: 'SW5E.WeaponPropertySon',
    spz: 'SW5E.WeaponPropertySpz',
    str: 'SW5E.WeaponPropertyStr',
    swi: 'SW5E.WeaponPropertySwi',
    thr: 'SW5E.WeaponPropertyThr',
    two: 'SW5E.WeaponPropertyTwo',
    ver: 'SW5E.WeaponPropertyVer',
    con: 'SW5E.WeaponPropertyCon',
    exp: 'SW5E.WeaponPropertyExp',
    hom: 'SW5E.WeaponPropertyHom',
    ion: 'SW5E.WeaponPropertyIon',
    mlt: 'SW5E.WeaponPropertyMlt',
    ovr: 'SW5E.WeaponPropertyOvr',
    pow: 'SW5E.WeaponPropertyPow',
    sat: 'SW5E.WeaponPropertySat',
    zon: 'SW5E.WeaponPropertyZon'
}
