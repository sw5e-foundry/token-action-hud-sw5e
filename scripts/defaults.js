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
                name: coreModule.api.Utils.i18n('DND5E.Inventory'),
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
                name: coreModule.api.Utils.i18n('DND5E.Features'),
                subcategories: [
                    { ...subcategories.activeFeatures, nestId: 'features_active-features' },
                    { ...subcategories.passiveFeatures, nestId: 'features_passive-features' }
                ]
            },
            {
                nestId: 'spells',
                id: 'spells',
                name: coreModule.api.Utils.i18n('ITEM.TypeSpellPl'),
                subcategories: [
                    { ...subcategories.atWillSpells, nestId: 'spells_at-will-spells' },
                    { ...subcategories.innateSpells, nestId: 'spells_innate-spells' },
                    { ...subcategories.pactSpells, nestId: 'spells_pact-spells' },
                    { ...subcategories.cantrips, nestId: 'spells_cantrips' },
                    { ...subcategories._1stLevelSpells, nestId: 'spells_1st-level-spells' },
                    { ...subcategories._2ndLevelSpells, nestId: 'spells_2nd-level-spells' },
                    { ...subcategories._3rdLevelSpells, nestId: 'spells_3rd-level-spells' },
                    { ...subcategories._4thLevelSpells, nestId: 'spells_4th-level-spells' },
                    { ...subcategories._5thLevelSpells, nestId: 'spells_5th-level-spells' },
                    { ...subcategories._6thLevelSpells, nestId: 'spells_6th-level-spells' },
                    { ...subcategories._7thLevelSpells, nestId: 'spells_7th-level-spells' },
                    { ...subcategories._8thLevelSpells, nestId: 'spells_8th-level-spells' },
                    { ...subcategories._9thLevelSpells, nestId: 'spells_9th-level-spells' }
                ]
            },
            {
                nestId: 'attributes',
                id: 'attributes',
                name: coreModule.api.Utils.i18n('DND5E.Attributes'),
                subcategories: [
                    { ...subcategories.abilities, nestId: 'attributes_abilities' },
                    { ...subcategories.skills, nestId: 'attributes_skills' }
                ]
            },
            {
                nestId: 'effects',
                id: 'effects',
                name: coreModule.api.Utils.i18n('DND5E.Effects'),
                subcategories: [
                    { ...subcategories.temporaryEffects, nestId: 'effects_temporary-effects' },
                    { ...subcategories.passiveEffects, nestId: 'effects_passive-effects' }
                ]
            },
            {
                nestId: 'conditions',
                id: 'conditions',
                name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.conditions'),
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
