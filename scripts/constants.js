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
export const REQUIRED_CORE_MODULE_VERSION = '1.3'

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
 * Prepared icon
 */
export const PREPARED_ICON = 'fas fa-sun'

/**
 * Ritual icon
 */
export const RITUAL_ICON = 'fas fa-circle-r'

/**
 * Proficiency level icons
 */
export const PROFICIENCY_LEVEL_ICON = {
    0.5: 'fas fa-adjust',
    1: 'fas fa-check',
    2: 'fas fa-check-double'
}

export const SUBCATEGORY = {
    _1stLevelPowers: { id: '1st-level-powers', name: 'tokenActionHud.sw5e.1stLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _2ndLevelPowers: { id: '2nd-level-powers', name: 'tokenActionHud.sw5e.2ndLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _3rdLevelPowers: { id: '3rd-level-powers', name: 'tokenActionHud.sw5e.3rdLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _4thLevelPowers: { id: '4th-level-powers', name: 'tokenActionHud.sw5e.4thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _5thLevelPowers: { id: '5th-level-powers', name: 'tokenActionHud.sw5e.5thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _6thLevelPowers: { id: '6th-level-powers', name: 'tokenActionHud.sw5e.6thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _7thLevelPowers: { id: '7th-level-powers', name: 'tokenActionHud.sw5e.7thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _8thLevelPowers: { id: '8th-level-powers', name: 'tokenActionHud.sw5e.8thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    _9thLevelPowers: { id: '9th-level-powers', name: 'tokenActionHud.sw5e.9thLevelPowers', type: 'system', hasDerivedSubcategories: false },
    abilities: { id: 'abilities', name: 'tokenActionHud.sw5e.abilities', type: 'system', hasDerivedSubcategories: false },
    actions: { id: 'actions', name: 'SW5E.ActionPl', type: 'system', hasDerivedSubcategories: true },
    activeFeatures: { id: 'active-features', name: 'tokenActionHud.sw5e.activeFeatures', type: 'system', hasDerivedSubcategories: false },
    artificerInfusions: { id: 'artificer-infusions', name: 'tokenActionHud.sw5e.artificerInfusions', type: 'system', hasDerivedSubcategories: false },
    atWillPowers: { id: 'at-will-powers', name: 'tokenActionHud.sw5e.atWillPowers', type: 'system', hasDerivedSubcategories: false },
    backgroundFeatures: { id: 'background-features', name: 'tokenActionHud.sw5e.backgroundFeatures', type: 'system', hasDerivedSubcategories: false },
    bonusActions: { id: 'bonus-actions', name: 'tokenActionHud.sw5e.bonusActions', type: 'system', hasDerivedSubcategories: true },
    cantrips: { id: 'cantrips', name: 'tokenActionHud.sw5e.cantrips', type: 'system', hasDerivedSubcategories: false },
    channelDivinity: { id: 'channel-divinity', name: 'tokenActionHud.sw5e.channelDivinity', type: 'system', hasDerivedSubcategories: false },
    checks: { id: 'checks', name: 'tokenActionHud.sw5e.checks', type: 'system', hasDerivedSubcategories: false },
    classFeatures: { id: 'class-features', name: 'tokenActionHud.sw5e.classFeatures', type: 'system', hasDerivedSubcategories: false },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system', hasDerivedSubcategories: false },
    conditions: { id: 'conditions', name: 'tokenActionHud.sw5e.conditions', type: 'system', hasDerivedSubcategories: false },
    consumables: { id: 'consumables', name: 'ITEM.TypeConsumablePl', type: 'system', hasDerivedSubcategories: false },
    containers: { id: 'containers', name: 'ITEM.TypeContainerPl', type: 'system', hasDerivedSubcategories: false },
    crewActions: { id: 'crew-actions', name: 'tokenActionHud.sw5e.crewActions', type: 'system', hasDerivedSubcategories: true },
    defensiveTactics: { id: 'defensive-tactics', name: 'tokenActionHud.sw5e.defensiveTactics', type: 'system', hasDerivedSubcategories: false },
    eldritchInvocations: { id: 'eldritch-invocations', name: 'tokenActionHud.sw5e.eldritchInvocations', type: 'system', hasDerivedSubcategories: false },
    elementalDisciplines: { id: 'elemental-disciplines', name: 'tokenActionHud.sw5e.elementalDisciplines', type: 'system', hasDerivedSubcategories: false },
    equipment: { id: 'equipment', name: 'ITEM.TypeEquipmentPl', type: 'system', hasDerivedSubcategories: false },
    equipped: { id: 'equipped', name: 'SW5E.Equipped', type: 'system', hasDerivedSubcategories: false },
    feats: { id: 'feats', name: 'tokenActionHud.sw5e.feats', type: 'system', hasDerivedSubcategories: false },
    fightingStyles: { id: 'fighting-styles', name: 'tokenActionHud.sw5e.fightingStyles', type: 'system', hasDerivedSubcategories: false },
    huntersPrey: { id: 'hunters-prey', name: 'tokenActionHud.sw5e.huntersPrey', type: 'system', hasDerivedSubcategories: false },
    innatePowers: { id: 'innate-powers', name: 'tokenActionHud.sw5e.innatePowers', type: 'system', hasDerivedSubcategories: false },
    kiAbilities: { id: 'ki-abilities', name: 'tokenActionHud.sw5e.kiAbilities', type: 'system', hasDerivedSubcategories: false },
    lairActions: { id: 'lair-actions', name: 'tokenActionHud.sw5e.lairActions', type: 'system', hasDerivedSubcategories: true },
    legendaryActions: { id: 'legendary-actions', name: 'tokenActionHud.sw5e.legendaryActions', type: 'system', hasDerivedSubcategories: true },
    loot: { id: 'loot', name: 'ITEM.TypeLootPl', type: 'system', hasDerivedSubcategories: false },
    maneuvers: { id: 'maneuvers', name: 'tokenActionHud.sw5e.maneuvers', type: 'system', hasDerivedSubcategories: false },
    metamagicOptions: { id: 'metamagic-options', name: 'tokenActionHud.sw5e.metamagicOptions', type: 'system', hasDerivedSubcategories: false },
    monsterFeatures: { id: 'monster-features', name: 'tokenActionHud.sw5e.monsterFeatures', type: 'system', hasDerivedSubcategories: false },
    multiattacks: { id: 'multiattacks', name: 'tokenActionHud.sw5e.multiattacks', type: 'system', hasDerivedSubcategories: false },
    otherActions: { id: 'other-actions', name: 'tokenActionHud.sw5e.otherActions', type: 'system', hasDerivedSubcategories: true },
    pactBoons: { id: 'pact-boons', name: 'tokenActionHud.sw5e.pactBoons', type: 'system', hasDerivedSubcategories: false },
    pactPowers: { id: 'pact-powers', name: 'tokenActionHud.sw5e.pactPowers', type: 'system', hasDerivedSubcategories: false },
    passiveEffects: { id: 'passive-effects', name: 'SW5E.EffectPassive', type: 'system', hasDerivedSubcategories: false },
    passiveFeatures: { id: 'passive-features', name: 'tokenActionHud.sw5e.passiveFeatures', type: 'system', hasDerivedSubcategories: false },
    psionicPowers: { id: 'psionic-powers', name: 'tokenActionHud.sw5e.psionicPowers', type: 'system', hasDerivedSubcategories: false },
    speciesFeatures: { id: 'species-features', name: 'tokenActionHud.sw5e.speciesFeatures', type: 'system', hasDerivedSubcategories: false },
    reactions: { id: 'reactions', name: 'SW5E.ReactionPl', type: 'system', hasDerivedSubcategories: true },
    rests: { id: 'rests', name: 'tokenActionHud.sw5e.rests', type: 'system', hasDerivedSubcategories: false },
    runes: { id: 'runes', name: 'tokenActionHud.sw5e.runes', type: 'system', hasDerivedSubcategories: false },
    saves: { id: 'saves', name: 'SW5E.ClassSaves', type: 'system', hasDerivedSubcategories: false },
    skills: { id: 'skills', name: 'tokenActionHud.sw5e.skills', type: 'system', hasDerivedSubcategories: false },
    superiorHuntersDefense: { id: 'superior-hunters-defense', name: 'tokenActionHud.sw5e.superiorHuntersDefense', type: 'system', hasDerivedSubcategories: false },
    temporaryEffects: { id: 'temporary-effects', name: 'SW5E.EffectTemporary', type: 'system', hasDerivedSubcategories: false },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system', hasDerivedSubcategories: false },
    tools: { id: 'tools', name: 'ITEM.TypeToolPl', type: 'system', hasDerivedSubcategories: false },
    unequipped: { id: 'unequipped', name: 'SW5E.Unequipped', type: 'system', hasDerivedSubcategories: false },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system', hasDerivedSubcategories: false },
    weapons: { id: 'weapons', name: 'ITEM.TypeWeaponPl', type: 'system', hasDerivedSubcategories: false }
}
