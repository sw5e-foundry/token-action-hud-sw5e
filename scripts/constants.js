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
export const REQUIRED_CORE_MODULE_VERSION = '1.4'

/**
 * Action type
 */
export const ACTION_TYPE = {
    ability: 'SW5E.Ability',
    check: 'tokenActionHud.sw5e.check',
    condition: 'tokenActionHud.sw5e.condition',
    effect: 'SW5E.Effect',
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
    blind: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ' },
    blinded: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ' },
    'Convenient Effect: Blinded': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ' },
    charmed: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.zZaEBrKkr66OWJvD' },
    'Convenient Effect: Charmed': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.zZaEBrKkr66OWJvD' },
    deaf: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY' },
    deafened: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY' },
    'Convenient Effect: Deafened': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY' },
    fear: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij' },
    'Convenient Effect: Frightened': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij' },
    frightened: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij' },
    grappled: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.gYDAhd02ryUmtwZn' },
    'Convenient Effect: Grappled': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.gYDAhd02ryUmtwZn' },
    incapacitated: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.TpkZgLfxCmSndmpb' },
    'Convenient Effect: Incapacitated': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.TpkZgLfxCmSndmpb' },
    invisible: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.3UU5GCTVeRDbZy9u' },
    'Convenient Effect: Invisible': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.3UU5GCTVeRDbZy9u' },
    paralysis: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP' },
    paralyzed: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP' },
    'Convenient Effect: Paralyzed': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP' },
    petrified: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xaNDaW6NwQTgHSmi' },
    'Convenient Effect: Petrified': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xaNDaW6NwQTgHSmi' },
    poison: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx' },
    poisoned: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx' },
    'Convenient Effect: Poisoned': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx' },
    prone: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.y0TkcdyoZlOTmAFT' },
    'Convenient Effect: Prone': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.y0TkcdyoZlOTmAFT' },
    restrain: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc' },
    restrained: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc' },
    'Convenient Effect: Restrained': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc' },
    stun: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS' },
    stunned: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS' },
    'Convenient Effect: Stunned': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS' },
    unconscious: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd' },
    'Convenient Effect: Unconscious': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd' },
    exhaustion: { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' },
    'Convenient Effect: Exhaustion 1': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' },
    'Convenient Effect: Exhaustion 2': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' },
    'Convenient Effect: Exhaustion 3': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' },
    'Convenient Effect: Exhaustion 4': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' },
    'Convenient Effect: Exhaustion 5': { uuid: 'Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv' }
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
    crewActions: { id: 'crew-actions', name: 'tokenActionHud.sw5e.crewActions', type: 'system' },
    defensiveTactics: { id: 'defensive-tactics', name: 'tokenActionHud.sw5e.defensiveTactics', type: 'system' },
    equipment: { id: 'equipment', name: 'ITEM.TypeEquipmentPl', type: 'system' },
    equipped: { id: 'equipped', name: 'SW5E.Equipped', type: 'system' },
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
export const PREPARED_ICON = 'fas fa-sun'

/**
 * Proficiency level icons
 */
export const PROFICIENCY_LEVEL_ICON = {
    0.5: 'fas fa-adjust',
    1: 'fas fa-check',
    2: 'fas fa-check-double'
}

/**
 * Rarity
 */
export const RARITY = {
    common: 'tokenActionHud.dnd5e.common',
    uncommon: 'tokenActionHud.dnd5e.uncommon',
    rare: 'tokenActionHud.dnd5e.rare',
    veryRare: 'tokenActionHud.dnd5e.veryRare',
    legendary: 'tokenActionHud.dnd5e.legendary',
    artifact: 'tokenActionHud.dnd5e.artifact'
}

/**
 * Ritual icon
 */
export const RITUAL_ICON = 'fas fa-circle-r'

/**
 * Weapon properties
 */
export const WEAPON_PROPERTY = {
    ada: 'DND5E.WeaponPropertiesAda',
    amm: 'DND5E.WeaponPropertiesAmm',
    fin: 'DND5E.WeaponPropertiesFin',
    fir: 'DND5E.WeaponPropertiesFir',
    foc: 'DND5E.WeaponPropertiesFoc',
    hvy: 'DND5E.WeaponPropertiesHvy',
    lgt: 'DND5E.WeaponPropertiesLgt',
    lod: 'DND5E.WeaponPropertiesLod',
    mgc: 'DND5E.WeaponPropertiesMgc',
    rch: 'DND5E.WeaponPropertiesRch',
    rel: 'DND5E.WeaponPropertiesRel',
    ret: 'DND5E.WeaponPropertiesRet',
    sil: 'DND5E.WeaponPropertiesSil',
    spc: 'DND5E.WeaponPropertiesSpc',
    thr: 'DND5E.WeaponPropertiesThr',
    two: 'DND5E.WeaponPropertiesTwo',
    ver: 'DND5E.WeaponPropertiesVer'
}
