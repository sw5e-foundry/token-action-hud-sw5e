import { GROUP } from './constants.js'

/**
 * Default categories and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'inventory',
                id: 'inventory',
                name: coreModule.api.Utils.i18n('SW5E.Inventory'),
                groups: [
                    { ...groups.weapons, nestId: 'inventory_weapons' },
                    { ...groups.equipment, nestId: 'inventory_equipment' },
                    { ...groups.consumables, nestId: 'inventory_consumables' },
                    { ...groups.tools, nestId: 'inventory_tools' },
                    { ...groups.containers, nestId: 'inventory_containers' },
                    { ...groups.loot, nestId: 'inventory_loot' }
                ]
            },
            {
                nestId: 'features',
                id: 'features',
                name: coreModule.api.Utils.i18n('SW5E.Features'),
                groups: [
                    { ...groups.activeFeatures, nestId: 'features_active-features' },
                    { ...groups.passiveFeatures, nestId: 'features_passive-features' }
                ]
            },
            {
                nestId: 'powers',
                id: 'powers',
                name: coreModule.api.Utils.i18n('ITEM.TypePowerPl'),
                groups: [
                    { ...groups.atWillPowers, nestId: 'powers_at-will-powers' },
                    { ...groups.innatePowers, nestId: 'powers_innate-powers' },
                    { ...groups.pactPowers, nestId: 'powers_pact-powers' },
                    { ...groups.at-wills, nestId: 'powers_at-wills' },
                    { ...groups._1stLevelPowers, nestId: 'powers_1st-level-powers' },
                    { ...groups._2ndLevelPowers, nestId: 'powers_2nd-level-powers' },
                    { ...groups._3rdLevelPowers, nestId: 'powers_3rd-level-powers' },
                    { ...groups._4thLevelPowers, nestId: 'powers_4th-level-powers' },
                    { ...groups._5thLevelPowers, nestId: 'powers_5th-level-powers' },
                    { ...groups._6thLevelPowers, nestId: 'powers_6th-level-powers' },
                    { ...groups._7thLevelPowers, nestId: 'powers_7th-level-powers' },
                    { ...groups._8thLevelPowers, nestId: 'powers_8th-level-powers' },
                    { ...groups._9thLevelPowers, nestId: 'powers_9th-level-powers' }
                ]
            },
            {
                nestId: 'attributes',
                id: 'attributes',
                name: coreModule.api.Utils.i18n('SW5E.Attributes'),
                groups: [
                    { ...groups.abilities, nestId: 'attributes_abilities' },
                    { ...groups.skills, nestId: 'attributes_skills' }
                ]
            },
            {
                nestId: 'effects',
                id: 'effects',
                name: coreModule.api.Utils.i18n('SW5E.Effects'),
                groups: [
                    { ...groups.temporaryEffects, nestId: 'effects_temporary-effects' },
                    { ...groups.passiveEffects, nestId: 'effects_passive-effects' }
                ]
            },
            {
                nestId: 'conditions',
                id: 'conditions',
                name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.conditions'),
                groups: [
                    { ...groups.conditions, nestId: 'conditions_conditions' }
                ]
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                groups: [
                    { ...groups.combat, nestId: 'utility_combat' },
                    { ...groups.token, nestId: 'utility_token' },
                    { ...groups.rests, nestId: 'utility_rests' },
                    { ...groups.utility, nestId: 'utility_utility' }
                ]
            }
        ],
        groups: groupsArray
    }
})
