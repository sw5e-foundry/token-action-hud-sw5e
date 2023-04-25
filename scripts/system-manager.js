// System Module Imports
import { ActionHandler } from './action-handler.js'
import { MagicItemActionListExtender } from './magic-items-extender.js'
import { RollHandler as Core } from './roll-handler.js'
import { RollHandlerObsidian as Obsidian5e } from './roll-handler-obsidian.js'
import { DEFAULTS } from './defaults.js'
import * as systemSettings from './settings.js'

export let SystemManager = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    SystemManager = class SystemManager extends coreModule.api.SystemManager {
    /** @override */
        doGetCategoryManager () {
            return new coreModule.api.CategoryManager()
        }

        /** @override */
        doGetActionHandler (categoryManager) {
            const actionHandler = new ActionHandler(categoryManager)
            if (coreModule.api.Utils.isModuleActive('magicitems')) { actionHandler.addFurtherActionHandler(new MagicItemActionListExtender(actionHandler)) }
            return actionHandler
        }

        /** @override */
        getAvailableRollHandlers () {
            let coreTitle = 'Core D&D5e'

            if (coreModule.api.Utils.isModuleActive('midi-qol')) { coreTitle += ` [supports ${coreModule.api.Utils.getModuleTitle('midi-qol')}]` }

            const choices = { core: coreTitle }
            coreModule.api.SystemManager.addHandler(choices, 'obsidian')

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
            const defaults = DEFAULTS
            // If the 'Magic Items' module is active, then add a group for it
            if (game.modules.get('magicitems')?.active) {
                const name = coreModule.api.Utils.i18n('tokenActionHud.dnd5e.magicItems')
                defaults.groups.push(
                    {
                        id: 'magic-items',
                        name,
                        listName: `Group: ${name}`,
                        type: 'system'
                    }
                )
                defaults.groups.sort((a, b) => a.id.localeCompare(b.id))
            }
            return defaults
        }
    }
})
