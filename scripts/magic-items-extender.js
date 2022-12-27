import { CoreActionListExtender } from './config.js'

export default class MagicItemActionListExtender extends CoreActionListExtender {
    /**
     * Extend the action list
     * @param {object} actionList The action list
     * @param {object} character The actor and/or token
     */
    extendActionList (actionList, character) {
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        if (!actorId) return

        const actor = MagicItems.actor(actorId)

        if (!actor) return

        const magicItems = actor.items ?? []

        if (magicItems.length === 0) return

        const parentSubcategoryId = 'magic-items'
        const subcategoryList = []

        magicItems.forEach((magicItem) => {
            if (magicItem.attuned && !this._isItemAttuned(magicItem)) return
            if (magicItem.equipped && !this._isItemEquipped(magicItem)) return

            const subcategoryId = `magic-items_${magicItem.id}`
            const subcategoryName = magicItem.name
            const subcategory = this.initializeEmptySubcategory(subcategoryId, parentSubcategoryId, subcategoryName, 'system')
            subcategory.info1 = `${magicItem.uses}/${magicItem.charges}`

            const actions = magicItem.ownedEntries.map((entry) => {
                const effect = entry.item
                const id = effect.id
                const name = effect.name
                const encodedValue = [
                    'magicItem',
                    actorId,
                    tokenId,
                    `${magicItem.id}>${id}`
                ].join('|')
                const img = this.getImage(effect)
                const info1 = effect.consumption
                let info2 = ''
                if (effect.baseLevel) {
                    info2 = `${this.i18n('tokenActionHud.levelAbbreviation')} ${effect.baseLevel}`
                }
                return {
                    id,
                    name,
                    encodedValue,
                    img,
                    info1,
                    info2
                }
            })

            this.addToSubcategoryList(subcategoryList, subcategoryId, subcategory, actions)
        })

        this.addSubcategoriesToActionList(actionList, subcategoryList, parentSubcategoryId)
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
        const itemData = magicItem.item.system

        if (itemData.attunement) {
            const attuned = CONFIG.DND5E.attunementTypes?.ATTUNED ?? 2
            return itemData.attunement === attuned
        }

        if (itemData.attuned) return itemData.attuned

        return false
    }
}
