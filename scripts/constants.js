/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-dnd5e'
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
export const REQUIRED_CORE_MODULE_VERSION = '1.2'

/**
 * Action type
 */
export const ACTION_TYPE = {
    ability: 'DND5E.Ability',
    check: 'tokenActionHud.dnd5e.check',
    condition: 'tokenActionHud.dnd5e.condition',
    effect: 'DND5E.Effect',
    feature: 'ITEM.TypeFeat',
    item: 'tokenActionHud.dnd5e.item',
    save: 'DND5E.ActionSave',
    skill: 'tokenActionHud.dnd5e.skill',
    spell: 'ITEM.TypeSpell',
    utility: 'DND5E.ActionUtil'
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
    _1stLevelSpells: { id: '1st-level-spells', name: 'tokenActionHud.dnd5e.1stLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _2ndLevelSpells: { id: '2nd-level-spells', name: 'tokenActionHud.dnd5e.2ndLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _3rdLevelSpells: { id: '3rd-level-spells', name: 'tokenActionHud.dnd5e.3rdLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _4thLevelSpells: { id: '4th-level-spells', name: 'tokenActionHud.dnd5e.4thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _5thLevelSpells: { id: '5th-level-spells', name: 'tokenActionHud.dnd5e.5thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _6thLevelSpells: { id: '6th-level-spells', name: 'tokenActionHud.dnd5e.6thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _7thLevelSpells: { id: '7th-level-spells', name: 'tokenActionHud.dnd5e.7thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _8thLevelSpells: { id: '8th-level-spells', name: 'tokenActionHud.dnd5e.8thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    _9thLevelSpells: { id: '9th-level-spells', name: 'tokenActionHud.dnd5e.9thLevelSpells', type: 'system', hasDerivedSubcategories: false },
    abilities: { id: 'abilities', name: 'tokenActionHud.dnd5e.abilities', type: 'system', hasDerivedSubcategories: false },
    actions: { id: 'actions', name: 'DND5E.ActionPl', type: 'system', hasDerivedSubcategories: true },
    activeFeatures: { id: 'active-features', name: 'tokenActionHud.dnd5e.activeFeatures', type: 'system', hasDerivedSubcategories: false },
    artificerInfusions: { id: 'artificer-infusions', name: 'tokenActionHud.dnd5e.artificerInfusions', type: 'system', hasDerivedSubcategories: false },
    atWillSpells: { id: 'at-will-spells', name: 'tokenActionHud.dnd5e.atWillSpells', type: 'system', hasDerivedSubcategories: false },
    backgroundFeatures: { id: 'background-features', name: 'tokenActionHud.dnd5e.backgroundFeatures', type: 'system', hasDerivedSubcategories: false },
    bonusActions: { id: 'bonus-actions', name: 'tokenActionHud.dnd5e.bonusActions', type: 'system', hasDerivedSubcategories: true },
    cantrips: { id: 'cantrips', name: 'tokenActionHud.dnd5e.cantrips', type: 'system', hasDerivedSubcategories: false },
    channelDivinity: { id: 'channel-divinity', name: 'tokenActionHud.dnd5e.channelDivinity', type: 'system', hasDerivedSubcategories: false },
    checks: { id: 'checks', name: 'tokenActionHud.dnd5e.checks', type: 'system', hasDerivedSubcategories: false },
    classFeatures: { id: 'class-features', name: 'tokenActionHud.dnd5e.classFeatures', type: 'system', hasDerivedSubcategories: false },
    combat: { id: 'combat', name: 'tokenActionHud.combat', type: 'system', hasDerivedSubcategories: false },
    conditions: { id: 'conditions', name: 'tokenActionHud.dnd5e.conditions', type: 'system', hasDerivedSubcategories: false },
    consumables: { id: 'consumables', name: 'ITEM.TypeConsumablePl', type: 'system', hasDerivedSubcategories: false },
    containers: { id: 'containers', name: 'ITEM.TypeContainerPl', type: 'system', hasDerivedSubcategories: false },
    crewActions: { id: 'crew-actions', name: 'tokenActionHud.dnd5e.crewActions', type: 'system', hasDerivedSubcategories: true },
    defensiveTactics: { id: 'defensive-tactics', name: 'tokenActionHud.dnd5e.defensiveTactics', type: 'system', hasDerivedSubcategories: false },
    eldritchInvocations: { id: 'eldritch-invocations', name: 'tokenActionHud.dnd5e.eldritchInvocations', type: 'system', hasDerivedSubcategories: false },
    elementalDisciplines: { id: 'elemental-disciplines', name: 'tokenActionHud.dnd5e.elementalDisciplines', type: 'system', hasDerivedSubcategories: false },
    equipment: { id: 'equipment', name: 'ITEM.TypeEquipmentPl', type: 'system', hasDerivedSubcategories: false },
    equipped: { id: 'equipped', name: 'DND5E.Equipped', type: 'system', hasDerivedSubcategories: false },
    feats: { id: 'feats', name: 'tokenActionHud.dnd5e.feats', type: 'system', hasDerivedSubcategories: false },
    fightingStyles: { id: 'fighting-styles', name: 'tokenActionHud.dnd5e.fightingStyles', type: 'system', hasDerivedSubcategories: false },
    huntersPrey: { id: 'hunters-prey', name: 'tokenActionHud.dnd5e.huntersPrey', type: 'system', hasDerivedSubcategories: false },
    innateSpells: { id: 'innate-spells', name: 'tokenActionHud.dnd5e.innateSpells', type: 'system', hasDerivedSubcategories: false },
    kiAbilities: { id: 'ki-abilities', name: 'tokenActionHud.dnd5e.kiAbilities', type: 'system', hasDerivedSubcategories: false },
    lairActions: { id: 'lair-actions', name: 'tokenActionHud.dnd5e.lairActions', type: 'system', hasDerivedSubcategories: true },
    legendaryActions: { id: 'legendary-actions', name: 'tokenActionHud.dnd5e.legendaryActions', type: 'system', hasDerivedSubcategories: true },
    loot: { id: 'loot', name: 'ITEM.TypeLootPl', type: 'system', hasDerivedSubcategories: false },
    maneuvers: { id: 'maneuvers', name: 'tokenActionHud.dnd5e.maneuvers', type: 'system', hasDerivedSubcategories: false },
    metamagicOptions: { id: 'metamagic-options', name: 'tokenActionHud.dnd5e.metamagicOptions', type: 'system', hasDerivedSubcategories: false },
    monsterFeatures: { id: 'monster-features', name: 'tokenActionHud.dnd5e.monsterFeatures', type: 'system', hasDerivedSubcategories: false },
    multiattacks: { id: 'multiattacks', name: 'tokenActionHud.dnd5e.multiattacks', type: 'system', hasDerivedSubcategories: false },
    otherActions: { id: 'other-actions', name: 'tokenActionHud.dnd5e.otherActions', type: 'system', hasDerivedSubcategories: true },
    pactBoons: { id: 'pact-boons', name: 'tokenActionHud.dnd5e.pactBoons', type: 'system', hasDerivedSubcategories: false },
    pactSpells: { id: 'pact-spells', name: 'tokenActionHud.dnd5e.pactSpells', type: 'system', hasDerivedSubcategories: false },
    passiveEffects: { id: 'passive-effects', name: 'DND5E.EffectPassive', type: 'system', hasDerivedSubcategories: false },
    passiveFeatures: { id: 'passive-features', name: 'tokenActionHud.dnd5e.passiveFeatures', type: 'system', hasDerivedSubcategories: false },
    psionicPowers: { id: 'psionic-powers', name: 'tokenActionHud.dnd5e.psionicPowers', type: 'system', hasDerivedSubcategories: false },
    raceFeatures: { id: 'race-features', name: 'tokenActionHud.dnd5e.raceFeatures', type: 'system', hasDerivedSubcategories: false },
    reactions: { id: 'reactions', name: 'DND5E.ReactionPl', type: 'system', hasDerivedSubcategories: true },
    rests: { id: 'rests', name: 'tokenActionHud.dnd5e.rests', type: 'system', hasDerivedSubcategories: false },
    runes: { id: 'runes', name: 'tokenActionHud.dnd5e.runes', type: 'system', hasDerivedSubcategories: false },
    saves: { id: 'saves', name: 'DND5E.ClassSaves', type: 'system', hasDerivedSubcategories: false },
    skills: { id: 'skills', name: 'tokenActionHud.dnd5e.skills', type: 'system', hasDerivedSubcategories: false },
    superiorHuntersDefense: { id: 'superior-hunters-defense', name: 'tokenActionHud.dnd5e.superiorHuntersDefense', type: 'system', hasDerivedSubcategories: false },
    temporaryEffects: { id: 'temporary-effects', name: 'DND5E.EffectTemporary', type: 'system', hasDerivedSubcategories: false },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system', hasDerivedSubcategories: false },
    tools: { id: 'tools', name: 'ITEM.TypeToolPl', type: 'system', hasDerivedSubcategories: false },
    unequipped: { id: 'unequipped', name: 'DND5E.Unequipped', type: 'system', hasDerivedSubcategories: false },
    utility: { id: 'utility', name: 'tokenActionHud.utility', type: 'system', hasDerivedSubcategories: false },
    weapons: { id: 'weapons', name: 'ITEM.TypeWeaponPl', type: 'system', hasDerivedSubcategories: false }
}
