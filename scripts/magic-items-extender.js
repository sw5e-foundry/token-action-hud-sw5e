export let MagicItemActionListExtender = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    MagicItemActionListExtender = class MagicItemActionListExtender extends coreModule.api.ActionListExtender {
        constructor (actionHandler) {
            super(actionHandler.categoryManager)
            this.actionHandler = actionHandler
            this.categoryManager = actionHandler.categoryManager
            this.actor = null
        }

        /**
     * Extend the action list
     */
        extendActionList () {
            this.actor = this.actionHandler.actor
            if (!this.actor) return

            const actor = MagicItems.actor(this.actor.id)

            if (!actor) return

            const magicItems = actor.items ?? []

            if (magicItems.length === 0) return

            const parentSubcategoryId = 'magic-items'
            const parentSubcategoryType = 'system'
            const parentSubcategoryData = {
                id: parentSubcategoryId,
                type: parentSubcategoryType
            }

            magicItems.forEach((magicItem) => {
                if (magicItem.attuned && !this._isItemAttuned(magicItem)) return
                if (magicItem.equipped && !this._isItemEquipped(magicItem)) return

                const subcategoryId = `magic-items_${magicItem.id}`
                const subcategoryName = magicItem.name
                const subcategoryType = 'system-derived'
                const subcategoryInfo1 = `${magicItem.uses}/${magicItem.charges}`
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName,
                    type: subcategoryType,
                    info1: subcategoryInfo1
                }

                // Add subcategory to action list
                this.actionHandler.addSubcategoryToActionList(parentSubcategoryData, subcategoryData)

                const actions = magicItem.ownedEntries.map((entry) => {
                    const effect = entry.item
                    const id = effect.id
                    const name = effect.name
                    const encodedValue = [
                        'magicItem',
                        `${magicItem.id}>${id}`
                    ].join('|')
                    const img = coreModule.api.Utils.getImage(effect)
                    const info1 = effect.consumption
                    const info2 = (effect.baseLevel) ? `${coreModule.api.Utils.i18n('SW5E.AbbreviationLevel')} ${effect.baseLevel}` : ''
                    return {
                        id,
                        name,
                        encodedValue,
                        img,
                        info1,
                        info2,
                        selected: true
                    }
                })

                // Add actions to action list
                this.actionHandler.addActionsToActionList(actions, subcategoryData)
            })
        }

        /**
     * Whether the magic item is equipped or not
     * @param {object} magicItem The item
     * @returns {boolean}
     */
        _isItemEquipped (magicItem) {
            return magicItem.item.system.equipped
        }

        /**
     * Whether the magic items is attuned or not
     * @param {object} magicItem The item
     * @returns {boolean}
     */
        _isItemAttuned (magicItem) {
            const attunement = magicItem.item.system.attunment
            const attunementRequired = CONFIG.SW5E.attunementTypes?.REQUIRED ?? 1

            if (attunement === attunementRequired) return false

            return true
        }
    }
})
