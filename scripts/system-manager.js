// System Module Imports
import { ActionHandler } from './action-handler.js'
import { MagicItemActionListExtender } from './magic-items-extender.js'
import { RollHandler as Core } from './roll-handler.js'
import { RollHandlerObsidian as Obsidian5e } from './roll-handler-obsidian.js'
import * as systemSettings from './settings.js'

// Core Module Imports
import { CoreSystemManager, CoreCategoryManager } from './config.js'

export class SystemManager extends CoreSystemManager {
    /** @override */
    doGetCategoryManager (user) {
        const categoryManager = new CoreCategoryManager(user)
        return categoryManager
    }

    /** @override */
    doGetActionHandler (categoryManager) {
        const actionHandler = new ActionHandler(categoryManager)

        if (CoreSystemManager.isModuleActive('magicitems')) { actionHandler.addFurtherActionHandler(new MagicItemActionListExtender(actionHandler)) }

        return actionHandler
    }

    /** @override */
    getAvailableRollHandlers () {
        let coreTitle = 'Core D&D5e'

        if (CoreSystemManager.isModuleActive('midi-qol')) { coreTitle += ` [supports ${CoreSystemManager.getModuleTitle('midi-qol')}]` }

        const choices = { core: coreTitle }
        CoreSystemManager.addHandler(choices, 'obsidian')

        return choices
    }

    /** @override */
    doGetRollHandler (handlerId) {
        let rollHandler
        switch (handlerId) {
        case 'obsidian':
            rollHandler = new Obsidian5e()
            break
        case 'core':
        default:
            rollHandler = new Core()
            break
        }

        return rollHandler
    }

    /** @override */
    doRegisterSettings (updateFunc) {
        systemSettings.register(updateFunc)
    }

    /** @override */
    async doRegisterDefaultFlags () {
        const defaults = {
            categories: [
                {
                    nestId: 'inventory',
                    id: 'inventory',
                    name: this.i18n('DND5E.Inventory'),
                    subcategories: [
                        {
                            nestId: 'inventory_weapons',
                            id: 'weapons',
                            name: this.i18n('DND5E.ItemTypeWeaponPl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'inventory_equipment',
                            id: 'equipment',
                            name: this.i18n('DND5E.ItemTypeEquipmentPl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'inventory_consumables',
                            id: 'consumables',
                            name: this.i18n('DND5E.ItemTypeConsumablePl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'inventory_tools',
                            id: 'tools',
                            name: this.i18n('DND5E.ItemTypeToolPl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'inventory_containers',
                            id: 'containers',
                            name: this.i18n('DND5E.ItemTypeContainerPl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'inventory_loot',
                            id: 'loot',
                            name: this.i18n('DND5E.ItemTypeLootPl'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'features',
                    id: 'features',
                    name: this.i18n('DND5E.Features'),
                    subcategories: [
                        {
                            nestId: 'features_active-features',
                            id: 'active-features',
                            name: this.i18n('tokenActionHud.dnd5e.activeFeatures'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            id: 'passive-features',
                            nestId: 'features_passive-features',
                            name: this.i18n('tokenActionHud.dnd5e.passiveFeatures'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'spells',
                    id: 'spells',
                    name: this.i18n('DND5E.ItemTypeSpellPl'),
                    subcategories: [
                        {
                            nestId: 'spells_at-will-spells',
                            id: 'at-will-spells',
                            name: this.i18n('tokenActionHud.dnd5e.atWillSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_innate-spells',
                            id: 'innate-spells',
                            name: this.i18n('tokenActionHud.dnd5e.innateSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_pact-spells',
                            id: 'pact-spells',
                            name: this.i18n('tokenActionHud.dnd5e.pactSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_cantrips',
                            id: 'cantrips',
                            name: this.i18n('tokenActionHud.dnd5e.cantrips'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_1st-level-spells',
                            id: '1st-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.1stLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_2nd-level-spells',
                            id: '2nd-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.2ndLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_3rd-level-spells',
                            id: '3rd-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.3rdLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_4th-level-spells',
                            id: '4th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.4thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_5th-level-spells',
                            id: '5th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.5thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_6th-level-spells',
                            id: '6th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.6thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_7th-level-spells',
                            id: '7th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.7thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_8th-level-spells',
                            id: '8th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.8thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'spells_9th-level-spells',
                            id: '9th-level-spells',
                            name: this.i18n('tokenActionHud.dnd5e.9thLevelSpells'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'attributes',
                    id: 'attributes',
                    name: this.i18n('DND5E.Attributes'),
                    subcategories: [
                        {
                            nestId: 'attributes_abilities',
                            id: 'abilities',
                            name: this.i18n('tokenActionHud.dnd5e.abilities'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'attributes_skills',
                            id: 'skills',
                            name: this.i18n('tokenActionHud.dnd5e.skills'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'effects',
                    id: 'effects',
                    name: this.i18n('DND5E.Effects'),
                    subcategories: [
                        {
                            nestId: 'effects_temporary-effects',
                            id: 'temporary-effects',
                            name: this.i18n('DND5E.EffectTemporary'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'effects_passive-effects',
                            id: 'passive-effects',
                            name: this.i18n('DND5E.EffectPassive'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'conditions',
                    id: 'conditions',
                    name: this.i18n('tokenActionHud.dnd5e.conditions'),
                    subcategories: [
                        {
                            nestId: 'conditions_conditions',
                            id: 'conditions',
                            name: this.i18n('tokenActionHud.dnd5e.conditions'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                },
                {
                    nestId: 'utility',
                    id: 'utility',
                    name: this.i18n('tokenActionHud.utility'),
                    subcategories: [
                        {
                            nestId: 'utility_combat',
                            id: 'combat',
                            name: this.i18n('tokenActionHud.combat'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'utility_token',
                            id: 'token',
                            name: this.i18n('tokenActionHud.token'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'utility_rests',
                            id: 'rests',
                            name: this.i18n('tokenActionHud.dnd5e.rests'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        },
                        {
                            nestId: 'utility_utility',
                            id: 'utility',
                            name: this.i18n('tokenActionHud.utility'),
                            type: 'system',
                            hasDerivedSubcategories: false
                        }
                    ]
                }
            ],
            subcategories: [
                { id: 'abilities', name: this.i18n('tokenActionHud.dnd5e.abilities'), type: 'system', hasDerivedSubcategories: false },
                { id: 'checks', name: this.i18n('tokenActionHud.dnd5e.checks'), type: 'system', hasDerivedSubcategories: false },
                { id: 'combat', name: this.i18n('tokenActionHud.combat'), type: 'system', hasDerivedSubcategories: false },
                { id: 'conditions', name: this.i18n('tokenActionHud.dnd5e.conditions'), type: 'system', hasDerivedSubcategories: false },
                { id: 'rests', name: this.i18n('tokenActionHud.dnd5e.rests'), type: 'system', hasDerivedSubcategories: false },
                { id: 'saves', name: this.i18n('DND5E.ClassSaves'), type: 'system', hasDerivedSubcategories: false },
                { id: 'skills', name: this.i18n('tokenActionHud.dnd5e.skills'), type: 'system', hasDerivedSubcategories: false },
                { id: 'token', name: this.i18n('tokenActionHud.token'), type: 'system', hasDerivedSubcategories: false },
                { id: 'utility', name: this.i18n('tokenActionHud.utility'), type: 'system', hasDerivedSubcategories: false },
                { id: 'actions', name: this.i18n('DND5E.ActionPl'), type: 'system', hasDerivedSubcategories: true },
                { id: 'bonus-actions', name: this.i18n('tokenActionHud.dnd5e.bonusActions'), type: 'system', hasDerivedSubcategories: true },
                { id: 'crew-actions', name: this.i18n('tokenActionHud.dnd5e.crewActions'), type: 'system', hasDerivedSubcategories: true },
                { id: 'lair-actions', name: this.i18n('tokenActionHud.dnd5e.lairActions'), type: 'system', hasDerivedSubcategories: true },
                { id: 'legendary-actions', name: this.i18n('tokenActionHud.dnd5e.legendaryActions'), type: 'system', hasDerivedSubcategories: true },
                { id: 'other-actions', name: this.i18n('tokenActionHud.dnd5e.otherActions'), type: 'system', hasDerivedSubcategories: true },
                { id: 'reactions', name: this.i18n('DND5E.ReactionPl'), type: 'system', hasDerivedSubcategories: true },
                { id: 'consumables', name: this.i18n('DND5E.ItemTypeConsumablePl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'containers', name: this.i18n('DND5E.ItemTypeContainerPl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'temporary-effects', name: this.i18n('DND5E.EffectTemporary'), type: 'system', hasDerivedSubcategories: false },
                { id: 'passive-effects', name: this.i18n('DND5E.EffectPassive'), type: 'system', hasDerivedSubcategories: false },
                { id: 'equipment', name: this.i18n('DND5E.ItemTypeEquipmentPl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'loot', name: this.i18n('DND5E.ItemTypeLootPl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'tools', name: this.i18n('DND5E.ItemTypeToolPl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'weapons', name: this.i18n('DND5E.ItemTypeWeaponPl'), type: 'system', hasDerivedSubcategories: false },
                { id: 'equipped', name: this.i18n('DND5E.Equipped'), type: 'system', hasDerivedSubcategories: false },
                { id: 'unequipped', name: this.i18n('DND5E.Unequipped'), type: 'system', hasDerivedSubcategories: false },
                { id: 'active-features', name: this.i18n('tokenActionHud.dnd5e.activeFeatures'), type: 'system', hasDerivedSubcategories: false },
                { id: 'passive-features', name: this.i18n('tokenActionHud.dnd5e.passiveFeatures'), type: 'system', hasDerivedSubcategories: false },
                { id: 'at-will-spells', name: this.i18n('tokenActionHud.dnd5e.atWillSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: 'cantrips', name: this.i18n('tokenActionHud.dnd5e.cantrips'), type: 'system', hasDerivedSubcategories: false },
                { id: 'innate-spells', name: this.i18n('tokenActionHud.dnd5e.innateSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: 'pact-spells', name: this.i18n('tokenActionHud.dnd5e.pactSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '1st-level-spells', name: this.i18n('tokenActionHud.dnd5e.1stLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '2nd-level-spells', name: this.i18n('tokenActionHud.dnd5e.2ndLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '3rd-level-spells', name: this.i18n('tokenActionHud.dnd5e.3rdLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '4th-level-spells', name: this.i18n('tokenActionHud.dnd5e.4thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '5th-level-spells', name: this.i18n('tokenActionHud.dnd5e.5thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '6th-level-spells', name: this.i18n('tokenActionHud.dnd5e.6thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '7th-level-spells', name: this.i18n('tokenActionHud.dnd5e.7thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '8th-level-spells', name: this.i18n('tokenActionHud.dnd5e.8thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
                { id: '9th-level-spells', name: this.i18n('tokenActionHud.dnd5e.9thLevelSpells'), type: 'system', hasDerivedSubcategories: false }
            ]
        }
        // If the 'Magic Items' module is active, then add a subcategory for it
        if (game.modules.get('magicitems')?.active) {
            defaults.subcategories.push({ id: 'magic-items', name: this.i18n('tokenActionHud.dnd5e.magicItems'), type: 'system', hasDerivedSubcategories: true })
            defaults.subcategories.sort((a, b) => a.id.localeCompare(b.id))
        }
        await game.user.setFlag(this.namespace, 'default', defaults)
    }
}
