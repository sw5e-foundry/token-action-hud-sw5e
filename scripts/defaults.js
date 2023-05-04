import { SUBCATEGORY } from './constants.js'

/**
 * Default categories and subcategories
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const subcategories = SUBCATEGORY
    Object.values(subcategories).forEach(subcategory => {
        subcategory.name = coreModule.api.Utils.i18n(subcategory.name)
        subcategory.listName = `Subcategory: ${coreModule.api.Utils.i18n(subcategory.name)}`
    })
    const subcategoriesArray = Object.values(subcategories)
    DEFAULTS = {
        categories: [
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('SW5E.Inventory'),
                subcategories: [
                    { ...subcategories.weapons, nestId: 'inventory_weapons' },
                    { ...subcategories.equipment, nestId: 'inventory_equipment' },
                    { ...subcategories.consumables, nestId: 'inventory_consumables' },
                    { ...subcategories.tools, nestId: 'inventory_tools' },
                    { ...subcategories.containers, nestId: 'inventory_containers' },
                    { ...subcategories.loot, nestId: 'inventory_loot' }
                ]
            },
            {
                nestId: 'features',
                id: 'features',
                name: coreModule.api.Utils.i18n('SW5E.Features'),
                subcategories: [
                    { ...subcategories.activeFeatures, nestId: 'features_active-features' },
                    { ...subcategories.passiveFeatures, nestId: 'features_passive-features' }
                ]
            },
            {
                nestId: 'powers',
                id: 'powers',
                name: coreModule.api.Utils.i18n('ITEM.TypePowerPl'),
                subcategories: [
                    { ...subcategories.atWillPowers, nestId: 'powers_at-will-powers' },
                    { ...subcategories.innatePowers, nestId: 'powers_innate-powers' },
                    { ...subcategories.pactPowers, nestId: 'powers_pact-powers' },
                    { ...subcategories.cantrips, nestId: 'powers_cantrips' },
                    { ...subcategories._1stLevelPowers, nestId: 'powers_1st-level-powers' },
                    { ...subcategories._2ndLevelPowers, nestId: 'powers_2nd-level-powers' },
                    { ...subcategories._3rdLevelPowers, nestId: 'powers_3rd-level-powers' },
                    { ...subcategories._4thLevelPowers, nestId: 'powers_4th-level-powers' },
                    { ...subcategories._5thLevelPowers, nestId: 'powers_5th-level-powers' },
                    { ...subcategories._6thLevelPowers, nestId: 'powers_6th-level-powers' },
                    { ...subcategories._7thLevelPowers, nestId: 'powers_7th-level-powers' },
                    { ...subcategories._8thLevelPowers, nestId: 'powers_8th-level-powers' },
                    { ...subcategories._9thLevelPowers, nestId: 'powers_9th-level-powers' }
                ]
            },
            {
                nestId: 'attributes',
                id: 'attributes',
                name: coreModule.api.Utils.i18n('SW5E.Attributes'),
                subcategories: [
                    { ...subcategories.abilities, nestId: 'attributes_abilities' },
                    { ...subcategories.skills, nestId: 'attributes_skills' }
                ]
            },
            {
                nestId: 'effects',
                id: 'effects',
                name: coreModule.api.Utils.i18n('SW5E.Effects'),
                subcategories: [
                    { ...subcategories.temporaryEffects, nestId: 'effects_temporary-effects' },
                    { ...subcategories.passiveEffects, nestId: 'effects_passive-effects' }
                ]
            },
            {
                nestId: 'conditions',
                id: 'conditions',
                name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.conditions'),
                subcategories: [
                    { ...subcategories.conditions, nestId: 'conditions_conditions' }
                ]
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                subcategories: [
                    { ...subcategories.combat, nestId: 'utility_combat' },
                    { ...subcategories.token, nestId: 'utility_token' },
                    { ...subcategories.rests, nestId: 'utility_rests' },
                    { ...subcategories.utility, nestId: 'utility_utility' }
                ]
            }
        ],
        subcategories: subcategoriesArray
    }
})
