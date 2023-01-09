export function register (updateFunc) {
    const appName = 'token-action-hud-dnd5e'

    game.settings.register(appName, 'abbreviateSkills', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.abbreviateSkills.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.abbreviateSkills.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'showSlowActions', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showSlowActions.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showSlowActions.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'displaySpellInfo', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.displaySpellInfo.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.displaySpellInfo.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'showUnchargedItems', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnchargedItems.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnchargedItems.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'showUnequippedItems', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnequippedItems.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnequippedItems.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'showUnpreparedSpells', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnpreparedSpells.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showUnpreparedSpells.hint'
        ),
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
        onChange: (value) => {
            updateFunc(value)
        }
    })

    game.settings.register(appName, 'showItemsWithoutActivationCosts', {
        name: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showItemsWithoutActivationCosts.name'
        ),
        hint: game.i18n.localize(
            'tokenActionHud.dnd5e.settings.showItemsWithoutActivationCosts.hint'
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
