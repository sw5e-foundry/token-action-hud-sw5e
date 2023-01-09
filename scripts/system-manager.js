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
    doGetActionHandler (character, categoryManager) {
        const actionHandler = new ActionHandler(character, categoryManager)

        if (CoreSystemManager.isModuleActive('magicitems')) { actionHandler.addFurtherActionHandler(new MagicItemActionListExtender()) }

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
            default: {
                categories: {
                    inventory: {
                        id: 'inventory',
                        title: this.i18n('DND5E.Inventory'),
                        subcategories: {
                            inventory_weapons: {
                                id: 'weapons',
                                title: this.i18n('DND5E.ItemTypeWeaponPl'),
                                type: 'system'
                            },
                            inventory_equipment: {
                                id: 'equipment',
                                title: this.i18n('DND5E.ItemTypeEquipmentPl'),
                                type: 'system'
                            },
                            inventory_consumables: {
                                id: 'consumables',
                                title: this.i18n('DND5E.ItemTypeConsumablePl'),
                                type: 'system'
                            },
                            inventory_tools: {
                                id: 'tools',
                                title: this.i18n('DND5E.ItemTypeToolPl'),
                                type: 'system'
                            },
                            inventory_containers: {
                                id: 'containers',
                                title: this.i18n('DND5E.ItemTypeContainerPl'),
                                type: 'system'
                            },
                            inventory_loot: {
                                id: 'loot',
                                title: this.i18n('DND5E.ItemTypeLootPl'),
                                type: 'system'
                            }
                        }
                    },
                    features: {
                        id: 'features',
                        title: this.i18n('DND5E.Features'),
                        subcategories: {
                            'features_active-features': {
                                id: 'active-features',
                                title: this.i18n('tokenActionHud.dnd5e.activeFeatures'),
                                type: 'system'
                            },
                            'features_passive-features': {
                                id: 'passive-features',
                                title: this.i18n('tokenActionHud.dnd5e.passiveFeatures'),
                                type: 'system'
                            }
                        }
                    },
                    spells: {
                        id: 'spells',
                        title: this.i18n('DND5E.ItemTypeSpellPl'),
                        subcategories: {
                            spells_cantrips: {
                                id: 'cantrips',
                                title: this.i18n('tokenActionHud.dnd5e.cantrips'),
                                type: 'system'
                            },
                            'spells_1st-level-spells': {
                                id: '1st-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.1stLevelSpells'),
                                type: 'system'
                            },
                            'spells_2nd-level-spells': {
                                id: '2nd-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.2ndLevelSpells'),
                                type: 'system'
                            },
                            'spells_3rd-level-spells': {
                                id: '3rd-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.3rdLevelSpells'),
                                type: 'system'
                            },
                            'spells_4th-level-spells': {
                                id: '4th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.4thLevelSpells'),
                                type: 'system'
                            },
                            'spells_5th-level-spells': {
                                id: '5th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.5thLevelSpells'),
                                type: 'system'
                            },
                            'spells_6th-level-spells': {
                                id: '6th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.6thLevelSpells'),
                                type: 'system'
                            },
                            'spells_7th-level-spells': {
                                id: '7th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.7thLevelSpells'),
                                type: 'system'
                            },
                            'spells_8th-level-spells': {
                                id: '8th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.8thLevelSpells'),
                                type: 'system'
                            },
                            'spells_9th-level-spells': {
                                id: '9th-level-spells',
                                title: this.i18n('tokenActionHud.dnd5e.9thLevelSpells'),
                                type: 'system'
                            }
                        }
                    },
                    attributes: {
                        id: 'attributes',
                        title: this.i18n('DND5E.Attributes'),
                        subcategories: {
                            attributes_abilities: {
                                id: 'abilities',
                                title: this.i18n('tokenActionHud.dnd5e.abilities'),
                                type: 'system'
                            },
                            attributes_skills: {
                                id: 'skills',
                                title: this.i18n('tokenActionHud.dnd5e.skills'),
                                type: 'system'
                            }
                        }
                    },
                    effects: {
                        id: 'effects',
                        title: this.i18n('DND5E.Effects'),
                        subcategories: {
                            'effects_temporary-effects': {
                                id: 'temporary-effects',
                                title: this.i18n('DND5E.EffectTemporary'),
                                type: 'system'
                            },
                            'effects_passive-effects': {
                                id: 'passive-effects',
                                title: this.i18n('DND5E.EffectPassive'),
                                type: 'system'
                            }
                        }
                    },
                    conditions: {
                        id: 'conditions',
                        title: this.i18n('tokenActionHud.dnd5e.conditions'),
                        subcategories: {
                            conditions_conditions: {
                                id: 'conditions',
                                title: this.i18n('tokenActionHud.dnd5e.conditions'),
                                type: 'system'
                            }
                        }
                    },
                    utility: {
                        id: 'utility',
                        title: this.i18n('tokenActionHud.utility'),
                        subcategories: {
                            utility_combat: {
                                id: 'combat',
                                title: this.i18n('tokenActionHud.combat'),
                                type: 'system'
                            },
                            utility_token: {
                                id: 'token',
                                title: this.i18n('tokenActionHud.token'),
                                type: 'system'
                            },
                            utility_rests: {
                                id: 'rests',
                                title: this.i18n('tokenActionHud.dnd5e.rests'),
                                type: 'system'
                            },
                            utility_utility: {
                                id: 'utility',
                                title: this.i18n('tokenActionHud.utility'),
                                type: 'system'
                            }
                        }
                    }
                },
                subcategories: [
                    { id: 'abilities', title: this.i18n('tokenActionHud.dnd5e.abilities'), type: 'system' },
                    { id: 'actions', title: this.i18n('DND5E.ActionPl'), type: 'system' },
                    { id: 'bonus-actions', title: this.i18n('tokenActionHud.dnd5e.bonusActions'), type: 'system' },
                    { id: 'lair-actions', title: this.i18n('tokenActionHud.dnd5e.lairActions'), type: 'system' },
                    { id: 'legendary-actions', title: this.i18n('tokenActionHud.dnd5e.legendaryActions'), type: 'system' },
                    { id: 'checks', title: this.i18n('tokenActionHud.dnd5e.checks'), type: 'system' },
                    { id: 'combat', title: this.i18n('tokenActionHud.combat'), type: 'system' },
                    { id: 'conditions', title: this.i18n('tokenActionHud.dnd5e.conditions'), type: 'system' },
                    { id: 'consumables', title: this.i18n('DND5E.ItemTypeConsumablePl'), type: 'system' },
                    { id: 'containers', title: this.i18n('DND5E.ItemTypeContainerPl'), type: 'system' },
                    { id: 'crew-actions', title: this.i18n('tokenActionHud.dnd5e.crewActions'), type: 'system' },
                    { id: 'temporary-effects', title: this.i18n('DND5E.EffectTemporary'), type: 'system' },
                    { id: 'passive-effects', title: this.i18n('DND5E.EffectPassive'), type: 'system' },
                    { id: 'equipment', title: this.i18n('DND5E.ItemTypeEquipmentPl'), type: 'system' },
                    { id: 'equipped', title: this.i18n('DND5E.Equipped'), type: 'system' },
                    { id: 'active-features', title: this.i18n('tokenActionHud.dnd5e.activeFeatures'), type: 'system' },
                    { id: 'passive-features', title: this.i18n('tokenActionHud.dnd5e.passiveFeatures'), type: 'system' },
                    { id: 'loot', title: this.i18n('DND5E.ItemTypeLootPl'), type: 'system' },
                    { id: 'other-actions', title: this.i18n('tokenActionHud.dnd5e.otherActions'), type: 'system' },
                    { id: 'reactions', title: this.i18n('DND5E.ReactionPl'), type: 'system' },
                    { id: 'rests', title: this.i18n('tokenActionHud.dnd5e.rests'), type: 'system' },
                    { id: 'saves', title: this.i18n('DND5E.ClassSaves'), type: 'system' },
                    { id: 'skills', title: this.i18n('tokenActionHud.dnd5e.skills'), type: 'system' },
                    { id: 'cantrips', title: this.i18n('tokenActionHud.dnd5e.cantrips'), type: 'system' },
                    { id: '1st-level-spells', title: this.i18n('tokenActionHud.dnd5e.1stLevelSpells'), type: 'system' },
                    { id: '2nd-level-spells', title: this.i18n('tokenActionHud.dnd5e.2ndLevelSpells'), type: 'system' },
                    { id: '3rd-level-spells', title: this.i18n('tokenActionHud.dnd5e.3rdLevelSpells'), type: 'system' },
                    { id: '4th-level-spells', title: this.i18n('tokenActionHud.dnd5e.4thLevelSpells'), type: 'system' },
                    { id: '5th-level-spells', title: this.i18n('tokenActionHud.dnd5e.5thLevelSpells'), type: 'system' },
                    { id: '6th-level-spells', title: this.i18n('tokenActionHud.dnd5e.6thLevelSpells'), type: 'system' },
                    { id: '7th-level-spells', title: this.i18n('tokenActionHud.dnd5e.7thLevelSpells'), type: 'system' },
                    { id: '8th-level-spells', title: this.i18n('tokenActionHud.dnd5e.8thLevelSpells'), type: 'system' },
                    { id: '9th-level-spells', title: this.i18n('tokenActionHud.dnd5e.9thLevelSpells'), type: 'system' },
                    { id: 'token', title: this.i18n('tokenActionHud.token'), type: 'system' },
                    { id: 'tools', title: this.i18n('DND5E.ItemTypeToolPl'), type: 'system' },
                    { id: 'weapons', title: this.i18n('DND5E.ItemTypeWeaponPl'), type: 'system' },
                    { id: 'unequipped', title: this.i18n('DND5E.Unequipped'), type: 'system' },
                    { id: 'utility', title: this.i18n('tokenActionHud.utility'), type: 'system' }
                ]
            }
        }
        // If the 'Magic Items' module is active, then add a subcategory for it
        if (game.modules.get('magicitems')?.active) {
            defaults.default.subcategories.push({ id: 'magic-items', title: this.i18n('tokenActionHud.dnd5e.magicItems'), type: 'system' })
            defaults.default.subcategories.sort((a, b) => a.id.localeCompare(b.id))
        }
        await game.user.update({ flags: { 'token-action-hud-core': defaults } })
    }
}
