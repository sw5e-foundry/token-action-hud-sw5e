import { MODULE } from './constants.js'

export function register (updateFunc) {
    game.settings.register(MODULE.ID, 'abbreviateSkills', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.abbreviateSkills.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.abbreviateSkills.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'showSlowActions', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showSlowActions.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showSlowActions.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'displayPowerInfo', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.displayPowerInfo.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.displayPowerInfo.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'showUnchargedItems', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnchargedItems.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnchargedItems.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'showUnequippedItems', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnequippedItems.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnequippedItems.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'showUnpreparedPowers', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnpreparedPowers.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showUnpreparedPowers.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(MODULE.ID, 'showItemsWithoutActivationCosts', {
        name: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showItemsWithoutActivationCosts.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.sw5e.settings.showItemsWithoutActivationCosts.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })
}
