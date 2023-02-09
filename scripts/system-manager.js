// System Module Imports
import { ActionHandler } from './action-handler.js'
import { MagicItemActionListExtender } from './magic-items-extender.js'
import { RollHandler as Core } from './roll-handler.js'
import { RollHandlerObsidian as Obsidian5e } from './roll-handler-obsidian.js'
import * as systemSettings from './settings.js'
import { DEFAULTS } from './defaults.js'

// Core Module Imports
import { CoreSystemManager, CoreCategoryManager, CoreUtils } from './config.js'

export class SystemManager extends CoreSystemManager {
    /** @override */
    doGetCategoryManager () {
        return new CoreCategoryManager()
    }

    /** @override */
    doGetActionHandler (categoryManager) {
        const actionHandler = new ActionHandler(categoryManager)
        if (CoreUtils.isModuleActive('magicitems')) { actionHandler.addFurtherActionHandler(new MagicItemActionListExtender(actionHandler)) }
        return actionHandler
    }

    /** @override */
    getAvailableRollHandlers () {
        let coreTitle = 'Core D&D5e'

        if (CoreUtils.isModuleActive('midi-qol')) { coreTitle += ` [supports ${CoreUtils.getModuleTitle('midi-qol')}]` }

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
        const defaults = DEFAULTS
        // If the 'Magic Items' module is active, then add a subcategory for it
        if (game.modules.get('magicitems')?.active) {
            defaults.subcategories.push({ id: 'magic-items', name: CoreUtils.i18n('tokenActionHud.dnd5e.magicItems'), type: 'system', hasDerivedSubcategories: true })
            defaults.subcategories.sort((a, b) => a.id.localeCompare(b.id))
        }
        return defaults
    }
}
