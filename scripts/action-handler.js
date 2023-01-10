// System Module Imports
import { getSetting } from './utils.js'

// Core Module Imports
import { CoreActionHandler, Logger } from './config.js'

export class ActionHandler extends CoreActionHandler {
    /**
     * Build System Actions
     * @override
     * @param {object} actionList
     * @param {object} character
     * @param {array} subcategoryIds
     * @returns {object}
     */
    async buildSystemActions (actionList, character, subcategoryIds) {
        const actor = character?.actor

        if (actor?.type === 'character' || actor?.type === 'npc') {
            return this._buildCharacterActions(actionList, character, subcategoryIds)
        }
        if (actor?.type === 'vehicle') {
            return this._buildVehicleActions(actionList, character, subcategoryIds)
        }
        if (!actor) {
            return this._buildMultipleTokenActions(actionList, subcategoryIds)
        }
    }

    /**
     * Build Character Actions
     * @private
     * @param {object} actionList
     * @param {object} character
     * @param {array} subcategoryIds
     * @returns {object}
     */
    async _buildCharacterActions (actionList, character, subcategoryIds) {
        const inventorySubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'equipped' ||
            subcategoryId === 'consumables' ||
            subcategoryId === 'containers' ||
            subcategoryId === 'equipment' ||
            subcategoryId === 'loot' ||
            subcategoryId === 'tools' ||
            subcategoryId === 'weapons' ||
            subcategoryId === 'unequipped'
        )

        const actionSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'actions' ||
            subcategoryId === 'bonus-actions' ||
            subcategoryId === 'crew-actions' ||
            subcategoryId === 'lair-actions' ||
            subcategoryId === 'legendary-actions' ||
            subcategoryId === 'reactions' ||
            subcategoryId === 'other-actions'
        )

        const effectSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'passive-effects' ||
            subcategoryId === 'temporary-effects'
        )

        const featureSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'active-features' ||
            subcategoryId === 'passive-features'
        )

        const spellSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'cantrips' ||
            subcategoryId === '1st-level-spells' ||
            subcategoryId === '2nd-level-spells' ||
            subcategoryId === '3rd-level-spells' ||
            subcategoryId === '4th-level-spells' ||
            subcategoryId === '5th-level-spells' ||
            subcategoryId === '6th-level-spells' ||
            subcategoryId === '7th-level-spells' ||
            subcategoryId === '8th-level-spells' ||
            subcategoryId === '9th-level-spells'
        )

        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'abilities')) {
            this._buildAbilities(actionList, character, 'ability', 'abilities')
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'checks')) {
            this._buildAbilities(actionList, character, 'abilityCheck', 'checks')
        }
        if (actionSubcategoryIds) {
            this._buildActions(actionList, character, actionSubcategoryIds)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'combat')) {
            this._buildCombat(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'conditions')) {
            this._buildConditions(actionList, character)
        }
        if (featureSubcategoryIds) {
            this._buildFeatures(actionList, character, featureSubcategoryIds)
        }
        if (effectSubcategoryIds) {
            this._buildEffects(actionList, character, effectSubcategoryIds)
        }
        if (inventorySubcategoryIds) {
            this._buildInventory(actionList, character, inventorySubcategoryIds)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'rests')) {
            this._buildRests(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'saves')) {
            this._buildAbilities(actionList, character, 'abilitySave', 'saves')
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'skills')) {
            this._buildSkills(actionList, character)
        }
        if (spellSubcategoryIds) {
            this._buildSpells(actionList, character, spellSubcategoryIds)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'utility')) {
            this._buildUtility(actionList, character)
        }
    }

    /**
     * Build Vehicle  Actions
     * @private
     * @param {object} actionList
     * @param {object} character
     * @param {array} subcategoryIds
     * @returns {object}
     */
    async _buildVehicleActions (actionList, character, subcategoryIds) {
        const inventorySubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'consumables' ||
            subcategoryId === 'equipment' ||
            subcategoryId === 'tools' ||
            subcategoryId === 'weapons'
        )

        const effectSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'passive-effects' ||
            subcategoryId === 'temporary-effects' ||
            subcategoryId === 'inactive-effects'
        )

        const featureSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'active-features' ||
            subcategoryId === 'passive-features'
        )

        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'abilities')) {
            this._buildAbilities(actionList, character, 'ability', 'abilities')
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'checks')) {
            this._buildAbilities(actionList, character, 'abilityCheck', 'checks')
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'combat')) {
            this._buildCombat(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'conditions')) {
            this._buildConditions(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'effects')) {
            this._buildEffects(actionList, character, effectSubcategoryIds)
        }
        if (featureSubcategoryIds) {
            this._buildFeatures(actionList, character)
        }
        if (inventorySubcategoryIds) {
            this._buildInventory(actionList, character, inventorySubcategoryIds)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'saves')) {
            this._buildAbilities(actionList, character, 'abilitySave', 'saves')
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'utility')) {
            this._buildUtility(actionList, character)
        }
    }

    /**
     * Build Multiple Token Actions
     * @private
     * @param {object} actionList
     * @param {array} subcategoryIds
     * @returns {object}
     */
    async _buildMultipleTokenActions (actionList, subcategoryIds) {
        const character = { actor: { id: 'multi' }, token: { id: 'multi' } }

        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'abilities')) {
            this._buildAbilities(
                actionList,
                character,
                'ability',
                'abilities'
            )
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'combat')) {
            this._buildCombat(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'conditions')) {
            this._buildConditions(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'checks')) {
            this._buildAbilities(
                actionList,
                character,
                'abilityCheck',
                'checks'
            )
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'rests')) {
            this._buildRests(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'saves')) {
            this._buildAbilities(
                actionList,
                character,
                'abilitySave',
                'saves'
            )
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'skills')) {
            this._buildSkills(actionList, character)
        }
        if (subcategoryIds.some((subcategoryId) => subcategoryId === 'utility')) {
            this._buildUtility(actionList, character)
        }
    }

    /**
     * Build Abilities
     * @private
     * @param {object} actionList
     * @param {object} character
     * @param {string} actionType
     * @param {string} subcategoryId
     */
    _buildAbilities (actionList, character, actionType, subcategoryId) {
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character.token?.id
        const abbr = getSetting('abbreviateSkills')

        const abilities = (actorId === 'multi') ? game.dnd5e.config.abilities : actor.system.abilities

        if (abilities.length === 0) return

        // Get actions
        const actions = Object.entries(abilities)
            .filter((ability) => abilities[ability[0]].value !== 0)
            .map((ability) => {
                const id = ability[0]
                const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                const name = abbr ? abbreviatedName : game.dnd5e.config.abilities[id]
                const encodedValue = [actionType, actorId, tokenId, id].join(
                    this.delimiter
                )
                let icon
                if (subcategoryId === 'checks') {
                    icon = ''
                } else {
                    icon = this._getProficiencyIcon(abilities[id].proficient)
                }
                return {
                    id,
                    name,
                    encodedValue,
                    icon,
                    selected: true
                }
            })

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Build Actions
     * @param {object} actionList The action list
     * @param {object} character The actor and/or token
     * @param {array} actionSubcategoryIds The action subcategory IDs
     */
    _buildActions (actionList, character, actionSubcategoryIds) {
        const actor = character?.actor
        if (!actor) return

        let items = actor.items

        if (items.length === 0) return

        // Discard slow items
        items = this._discardSlowItems(items)

        actionSubcategoryIds.forEach(actionSubcategoryId => {
            let activationType = null
            switch (actionSubcategoryId) {
            case 'actions':
                activationType = 'action'
                break
            case 'bonus-actions':
                activationType = 'bonus'
                break
            case 'crew-actions':
                activationType = 'crew'
                break
            case 'lair-actions':
                activationType = 'lair'
                break
            case 'legendary-actions':
                activationType = 'legendary'
                break
            case 'reactions':
                activationType = 'reaction'
                break
            case 'other-actions':
                activationType = ''
                break
            }

            const itemsByActivationType = items.filter(item => item.system?.activation?.type === activationType)

            this._buildItems(actionList, character, itemsByActivationType, actionSubcategoryId)
        })
    }

    /**
     * Build Combat
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildCombat (actionList, character) {
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const actionType = 'utility'
        const subcategoryId = 'combat'

        const combatTypes = {
            initiative: { id: 'initiative', name: this.i18n('tokenActionHud.dnd5e.rollInitiative') },
            endTurn: { id: 'endTurn', name: this.i18n('tokenActionHud.endTurn') }
        }

        // Delete endTurn for multiple tokens
        if (game.combat?.current?.tokenId !== tokenId) delete combatTypes.endTurn

        // Get actions
        const actions = Object.entries(combatTypes).map((combatType) => {
            const id = combatType[1].id
            const name = combatType[1].name
            const encodedValue = [actionType, actorId, tokenId, id].join(this.delimiter)
            let info1 = ''
            let cssClass = ''
            if (combatType[0] === 'initiative' && game.combat) {
                const tokenIds = canvas.tokens.controlled.map((token) => token.id)
                // const combatants = tokenIds.map((id) =>
                //     game.combat.combatants.find((combatant) => combatant.tokenId === id)
                // ).filter((combatant) => combatant)
                const combatants = game.combat.combatants.filter((combatant) => tokenIds.includes(combatant.tokenId))

                // Get initiative for single token
                if (combatants.length === 1) {
                    const currentInitiative = combatants[0].initiative
                    info1 = currentInitiative
                }

                const active = combatants.length > 0 && (combatants.every((combatant) => combatant?.initiative)) ? ' active' : ''
                cssClass = `toggle${active}`
            }
            return {
                id,
                name,
                encodedValue,
                info1,
                cssClass,
                selected: true
            }
        })

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Build Conditions
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildConditions (actionList, character) {
        if (!character?.token) return
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const actors = (actorId === 'multi') ? this._getActors() : [actor]
        const actionType = 'condition'
        const subcategoryId = 'conditions'

        const conditions = CONFIG.statusEffects.filter((condition) => condition.id !== '')

        if (conditions.length === 0) return

        const actions = conditions.map((condition) => {
            const id = condition.id
            const name = this.i18n(condition.label)
            const encodedValue = [actionType, actorId, tokenId, id].join(
                this.delimiter
            )
            const active = actors.every((actor) => {
                const effects = actor.effects
                return effects
                    .map((effect) => effect.flags?.core?.statusId)
                    .some((statusId) => statusId === id)
            })
                ? ' active'
                : ''
            const cssClass = `toggle${active}`
            const img = condition.icon
            return {
                id,
                name,
                encodedValue,
                img,
                cssClass,
                selected: true
            }
        })

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Build Effects
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildEffects (actionList, character, effectSubcategoryIds) {
        const actor = character?.actor
        const actionType = 'effect'

        // Get effects
        const effects = actor.effects

        if (effects.size === 0) return

        // Build passive effects
        if (effectSubcategoryIds.some((subcategoryId) => subcategoryId === 'passive-effects')) {
            const passiveEffects = effects.filter((effect) => !effect.isTemporary)
            this._buildItems(actionList, character, passiveEffects, 'passive-effects', actionType)
        }

        // Build temporary effects
        if (effectSubcategoryIds.some((subcategoryId) => subcategoryId === 'temporary-effects')) {
            const temporaryEffects = effects.filter((effect) => effect.isTemporary)
            this._buildItems(actionList, character, temporaryEffects, 'temporary-effects', actionType)
        }
    }

    /**
     * Build Features
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildFeatures (actionList, character, featureSubcategoryIds) {
        const actor = character?.actor
        const actionType = 'feature'

        // Get feat items
        let feats = actor.items.filter((item) => item.type === 'feat')

        if (feats.length === 0) return

        // Discard slow items
        feats = this._discardSlowItems(feats)

        // Sort items
        feats = this.sortItems(feats)

        if (featureSubcategoryIds.some((subcategoryId) => subcategoryId === 'active-features')) {
            const activeFeatures = feats.filter((item) => {
                const activationType = item.system.activation.type
                return (
                    activationType &&
                    activationType !== '' &&
                    activationType !== 'lair' &&
                    activationType !== 'legendary'
                )
            })
            this._buildItems(actionList, character, activeFeatures, 'active-features', actionType)
        }

        if (featureSubcategoryIds.some((subcategoryId) => subcategoryId === 'passive-features')) {
            const activeFeatures = feats.filter((item) => {
                const activationType = item.system.activation.type
                return (!activationType || activationType === '')
            })
            this._buildItems(actionList, character, activeFeatures, 'passive-features', actionType)
        }
    }

    /**
     * Build Inventory
     * @private
     * @param {object} actionList
     * @param {object} character
     * @param {array} inventorySubcategoryIds
     */
    _buildInventory (actionList, character, inventorySubcategoryIds) {
        const actor = character?.actor

        const validItems = this._discardSlowItems(
            actor.items.filter((item) => item.system.quantity > 0)
        )

        if (validItems.length === 0) return

        const sortedItems = this.sortItems(validItems)

        // Equipped
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'equipped')) {
            const equipped = this._getActiveEquipment(
                sortedItems.filter((item) => item.system.equipped)
            )
            this._buildItems(actionList, character, equipped, 'equipped')
        }

        // Unequipped
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'unequipped')) {
            const unequipped = this._getActiveEquipment(
                sortedItems.filter((item) => !item.system.equipped)
            )
            this._buildItems(actionList, character, unequipped, 'unequipped')
        }

        // Consumables
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'consumables')) {
            const allConsumables = this._getActiveEquipment(
                sortedItems.filter((item) => item.type === 'consumable')
            )
            const consumables = this._discardExpendedItems(allConsumables)

            this._buildItems(actionList, character, consumables, 'consumables')
        }

        // Equipped Inventory
        let equippedItems
        if (getSetting('showUnequippedItems')) {
            equippedItems = sortedItems.filter((item) =>
                item.type !== 'consumable' &&
                item.type !== 'spell' &&
                item.type !== 'feat'
            )
        } else {
            equippedItems = sortedItems.filter((item) => item.type !== 'consumable' && item.system.equipped)
        }
        const activeEquipped = this._getActiveEquipment(equippedItems)

        // Containers
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'containers')) {
            const containers = activeEquipped.filter((item) => item.type === 'backpack')
            this._buildItems(actionList, character, containers, 'containers')
        }

        // Equipment
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'equipment')) {
            const equipment = activeEquipped.filter((item) => item.type === 'equipment')
            this._buildItems(actionList, character, equipment, 'equipment')
        }

        // Loot
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'loot')) {
            const loot = activeEquipped.filter((item) => item.type === 'loot')
            this._buildItems(actionList, character, loot, 'loot')
        }

        // Tools
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'tools')) {
            const tools = validItems.filter((item) => item.type === 'tool')
            this._buildItems(actionList, character, tools, 'tools')
        }

        // Weapons
        if (inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'weapons')) {
            const weapons = activeEquipped.filter((item) => item.type === 'weapon')
            this._buildItems(actionList, character, weapons, 'weapons')
        }
    }

    /**
     * Build Items
     * @private
     * @param {object} actionList
     * @param {object} character
     * @param {object} items
     * @param {string} subcategoryId
     */
    _buildItems (actionList, character, items, subcategoryId, actionType = 'item') {
        if (items.length === 0) return

        const actions = items.map((item) =>
            this._getAction(actionType, character, item)
        )

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Get Active Equipment
     * @private
     * @param {object} equipment
     * @returns {object}
     */
    _getActiveEquipment (equipment) {
        let activeEquipment = []
        if (!getSetting('showItemsWithoutActivationCosts')) {
            const activationTypes = Object.keys(game.dnd5e.config.abilityActivationTypes)
                .filter((at) => at !== 'none')

            activeEquipment = equipment.filter((e) => {
                const activation = e.system.activation
                if (!activation) return false

                return activationTypes.includes(e.system.activation.type)
            })
        } else {
            activeEquipment = equipment
        }

        return activeEquipment
    }

    /**
     * Get Action
     * @private
     * @param {string} actionType
     * @param {object} character
     * @param {object} entity
     * @returns {object}
     */
    _getAction (actionType, character, entity) {
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const id = entity.id ?? entity._id
        let name = entity?.name ?? entity?.label
        if (
            entity?.system?.recharge &&
            !entity?.system?.recharge?.charged &&
            entity?.system?.recharge?.value
        ) {
            name += ` (${this.i18n('DND5E.Recharge')})`
        }
        let cssClass = ''
        if (Object.hasOwn(entity, 'disabled')) {
            const active = (!entity.disabled)
                ? ' active'
                : ''
            cssClass = `toggle${active}`
        }
        const encodedValue = [actionType, actorId, tokenId, id].join(
            this.delimiter
        )
        const img = this.getImage(entity)
        const icon = this._getIcon(entity?.system?.activation?.type)
        const itemInfo = this._getItemInfo(actor, entity)
        const info1 = itemInfo.info1
        const info2 = itemInfo.info2
        const info3 = itemInfo.info3
        return {
            id,
            name,
            encodedValue,
            cssClass,
            img,
            icon,
            info1,
            info2,
            info3,
            selected: true
        }
    }

    /**
     * Get Item Info
     * @private
     * @param {object} actor
     * @param {object} item
     * @returns {object}
     */
    _getItemInfo (actor, item) {
        return {
            info1: this._getQuantityData(item) ?? '',
            info2: this._getUsesData(item) ?? '',
            info3: this._getConsumeData(item, actor) ?? ''
        }
    }

    /**
     * Build Rests
     * @param {object} actionList
     * @param {object} character
     */
    _buildRests (actionList, character) {
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const actors = (actorId === 'multi') ? this._getActors() : [actor]
        if (!actors.every((actor) => actor.type === 'character')) return
        const actionType = 'utility'
        const subcategoryId = 'rests'

        const restTypes = {
            shortRest: { name: this.i18n('DND5E.ShortRest') },
            longRest: { name: this.i18n('DND5E.LongRest') }
        }

        const actions = Object.entries(restTypes)
            .map((restType) => {
                const id = restType[0]
                const name = restType[1].name
                const encodedValue = [actionType, actorId, tokenId, id].join(this.delimiter)
                return {
                    id,
                    name,
                    encodedValue,
                    selected: true
                }
            })

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Build Skills
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildSkills (actionList, character) {
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const actionType = 'skill'
        const abbr = getSetting('abbreviateSkills')

        // Get skills
        const skills = (actorId === 'multi') ? game.dnd5e.config.skills : actor.system.skills

        if (skills.length === 0) return

        // Get actions
        const actions = Object.entries(skills)
            .map((skill) => {
                try {
                    const id = skill[0]
                    const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                    const name = abbr ? abbreviatedName : game.dnd5e.config.skills[id].label
                    const encodedValue = [actionType, actorId, tokenId, id].join(
                        this.delimiter
                    )
                    const icon = this._getProficiencyIcon(skills[id].value)
                    return {
                        id,
                        name,
                        encodedValue,
                        icon
                    }
                } catch (error) {
                    Logger.error(skill)
                    return null
                }
            })
            .filter((skill) => !!skill)

        this.addActionsToActionList(actionList, actions, 'skills')
    }

    /**
     * Build Spells
     * @param {object} actionList
     * @param {object} character
     */
    _buildSpells (actionList, character) {
        const actor = character?.actor
        const actionType = 'spell'

        // Get spell items
        let spells = actor.items.filter((item) => item.type === 'spell')

        if (spells.length === 0) return

        // Discard slow spells
        spells = this._discardSlowItems(spells)

        // Discard expended spells
        spells = this._discardExpendedItems(spells)

        // Discard non-preprared spells
        spells = this._discardNonPreparedSpells(actor, spells)

        // Sport spells by level
        spells = this._sortSpellsByLevel(spells)

        // Reverse sort spells by level
        const spellSlotInfo = Object.entries(actor.system.spells).sort((a, b) => {
            return Intl.Collator().compare(b[0], a[0])
        })

        // Go through spells and if higher available slots exist, mark spell slots available at lower levels.
        const pactInfo = spellSlotInfo.find((spell) => spell[0] === 'pact')

        let slotsAvailable = false
        spellSlotInfo
            .filter((spell) => spell[0] !== 'maxLevel')
            .forEach((spell) => {
                if (spell[0].startsWith('spell')) {
                    if (!slotsAvailable && spell[1].max > 0 && spell[1].value > 0) {
                        slotsAvailable = true
                    }

                    if (!slotsAvailable && spell[0] === 'spell' + pactInfo[1]?.level) {
                        if (pactInfo[1].max > 0 && pactInfo[1].value > 0) { slotsAvailable = true }
                    }

                    spell[1].slotsAvailable = slotsAvailable
                } else {
                    if (!spell[1]) spell[1] = {}

                    spell[1].slotsAvailable = !spell[1].max || spell[1].value > 0
                }
            })

        const pactIndex = spellSlotInfo.findIndex((spell) => spell[0] === 'pact')

        if (!spellSlotInfo[pactIndex][1].slotsAvailable) {
            const pactSpellEquivalent = spellSlotInfo.findIndex(
                (spell) => spell[0] === 'spell' + pactInfo[1].level
            )
            spellSlotInfo[pactIndex][1].slotsAvailable =
                spellSlotInfo[pactSpellEquivalent][1].slotsAvailable
        }

        // Get preparation modes/levels
        const spellLevelIds = [
            ...new Set(
                spells.map((spell) => {
                    const prepId = spell.system.preparation.mode
                    const levelId = spell.system.level
                    const isPrep = !!(prepId === 'pact' || prepId === 'atwill' || prepId === 'innate')
                    if (isPrep) {
                        return prepId
                    } else {
                        return levelId
                    }
                })
            )
        ]

        // Get spell levels
        const spellLevels = spellLevelIds.map((spellLevel) => {
            const id = spellLevel
            return id
        })

        for (const spellLevel of spellLevels) {
            let subcategoryId = null
            switch (spellLevel) {
            case 0:
                subcategoryId = 'cantrips'
                break
            case 1:
                subcategoryId = '1st-level-spells'
                break
            case 2:
                subcategoryId = '2nd-level-spells'
                break
            case 3:
                subcategoryId = '3rd-level-spells'
                break
            case 4:
                subcategoryId = '4th-level-spells'
                break
            case 5:
                subcategoryId = '5th-level-spells'
                break
            case 6:
                subcategoryId = '6th-level-spells'
                break
            case 7:
                subcategoryId = '7th-level-spells'
                break
            case 8:
                subcategoryId = '8th-level-spells'
                break
            case 9:
                subcategoryId = '9th-level-spells'
                break
            }
            const spellLevelId = spellLevel
            const isPrep = !!(
                spellLevelId === 'pact' ||
                spellLevelId === 'atwill' ||
                spellLevelId === 'innate'
            )
            const levelInfo = spellSlotInfo.find((level) => level[0] === `spell${spellLevelId}`)?.[1]
            const slots = levelInfo?.value
            const max = levelInfo?.max
            const slotsAvailable = levelInfo?.slotsAvailable
            const ignoreSlotsAvailable = getSetting('showUnchargedItems')

            if (max && !(slotsAvailable || ignoreSlotsAvailable)) continue

            if (max > 0) {
                const data = {}
                data.info1 = `${slots}/${max}`
                this.addSubcategoryInfo(actionList, subcategoryId, data)
            }

            // Get actions
            const actions = []
            for (const spell of spells) {
                const spellSpellLevelId = isPrep
                    ? spell.system.preparation.mode
                    : spell.system.level

                if (spellSpellLevelId === spellLevelId) {
                    const action = this._getAction(actionType, character, spell)
                    if (getSetting('displaySpellInfo')) {
                        this._addSpellInfo(spell, action)
                    }
                    actions.push(action)
                }
            }

            this.addActionsToActionList(actionList, actions, subcategoryId)
        }
    }

    /**
     * Sort Spells by Level
     * @private
     * @param {object} spells
     * @returns {object}
     */
    _sortSpellsByLevel (spells) {
        const spellsArray = Object.keys(spells).map(key => spells[key])
        spellsArray.sort((a, b) => {
            if (a.system.level === b.system.level) {
                return a.name.localeCompare(b.name)
            }
            return a.system.level - b.system.level
        })
        return spellsArray
    }

    /**
     * Add Spell Info
     * @param {object} spell
     * @param {object} action
     */
    _addSpellInfo (spell, action) {
        const components = spell.system.components

        action.info1 = ''
        action.info2 = ''
        action.info3 = ''

        if (components?.vocal) {
            action.info1 += this.i18n('DND5E.ComponentVerbal').charAt(0).toUpperCase()
        }

        if (components?.somatic) {
            action.info1 += this.i18n('DND5E.ComponentSomatic').charAt(0).toUpperCase()
        }

        if (components?.material) {
            action.info1 += this.i18n('DND5E.ComponentMaterial').charAt(0).toUpperCase()
        }

        if (components?.concentration) {
            action.info2 += this.i18n('DND5E.Concentration').charAt(0).toUpperCase()
        }

        if (components?.ritual) {
            action.info3 += this.i18n('DND5E.Ritual').charAt(0).toUpperCase()
        }
    }

    /**
     * Build Utility
     * @private
     * @param {object} actionList
     * @param {object} character
     */
    _buildUtility (actionList, character) {
        const actor = character?.actor
        const actorId = character?.actor?.id
        const tokenId = character?.token?.id
        const actors = (actorId === 'multi') ? this._getActors() : [actor]
        if (!actors.every((actor) => actor.type === 'character')) return
        const actionType = 'utility'
        const subcategoryId = 'utility'

        const utilityTypes = {
            deathSave: { name: this.i18n('DND5E.DeathSave') },
            inspiration: { name: this.i18n('DND5E.Inspiration') }
        }

        // Delete 'deathSave' for multiple tokens
        if (actorId === 'multi' || actor.system.attributes.hp.value > 0) delete utilityTypes.deathSave

        // Get actions
        const actions = Object.entries(utilityTypes)
            .map((utilityType) => {
                const id = utilityType[0]
                const name = utilityType[1].name
                const encodedValue = [actionType, actorId, tokenId, id].join(this.delimiter)
                let cssClass = ''
                if (utilityType[0] === 'inspiration') {
                    const active = actors.every((actor) => actor.system.attributes?.inspiration)
                        ? ' active'
                        : ''
                    cssClass = `toggle${active}`
                }
                return {
                    id,
                    name,
                    encodedValue,
                    cssClass,
                    selected: true
                }
            })

        this.addActionsToActionList(actionList, actions, subcategoryId)
    }

    /**
     * Get Actors
     * @private
     * @returns {object}
     */
    _getActors () {
        const allowedTypes = ['character', 'npc']
        const actors = canvas.tokens.controlled.map((token) => token.actor)
        if (actors.every((actor) => allowedTypes.includes(actor.type))) {
            return actors
        }
    }

    /**
     * Get Quantity
     * @private
     * @param {object} item
     * @returns {string}
     */
    _getQuantityData (item) {
        const quantity = item?.system?.quantity
        return (quantity > 1) ? quantity : ''
    }

    /**
     * Get Uses
     * @private
     * @param {object} item
     * @returns {string}
     */
    _getUsesData (item) {
        let result = ''

        const uses = item?.system?.uses
        if (!uses) return result

        result = uses.value === 0 && uses.max ? '0' : uses.value

        if (uses.max > 0) {
            result += `/${uses.max}`
        }

        return result
    }

    /**
     * Get Consume
     * @private
     * @param {object} item
     * @param {object} actor
     * @returns {string}
     */
    _getConsumeData (item, actor) {
        let result = ''

        const consumeType = item?.system?.consume?.type
        if (consumeType && consumeType !== '') {
            const consumeId = item.system.consume.target
            const parentId = consumeId.substr(0, consumeId.lastIndexOf('.'))
            if (consumeType === 'attribute') {
                const target = getProperty(actor, `system.${parentId}`)

                if (target) {
                    result = target.value ?? 0
                    if (target.max) result += `/${target.max}`
                }
            }

            if (consumeType === 'charges') {
                const consumeId = item.system.consume.target
                const target = actor.items.get(consumeId)
                const uses = target?.system.uses
                if (uses?.value) {
                    result = uses.value
                    if (uses.max) result += `/${uses.max}`
                }
            }

            if (!(consumeType === 'attribute' || consumeType === 'charges')) {
                const consumeId = item.system.consume.target
                const target = actor.items.get(consumeId)
                const quantity = target?.system.quantity
                if (quantity) {
                    result = quantity
                }
            }
        }

        return result
    }

    /**
     * Discard Slow Items
     * @private
     * @param {object} items
     * @returns {object}
     */
    _discardSlowItems (items) {
        let result

        if (!getSetting('showSlowActions')) {
            result = items.filter((item) => {
                return (
                    !item.system.activation ||
                    !(
                        item.system.activation.type === 'minute' ||
                        item.system.activation.type === 'hour' ||
                        item.system.activation.type === 'day'
                    )
                )
            })
        }

        return result || items
    }

    /**
     * Discard Non-Prepared Spells
     * @private
     * @param {object} spells
     * @returns {object}
     */
    _discardNonPreparedSpells (actor, spells) {
        if (actor.type !== 'character' && getSetting('showUnequippedItems')) return

        const nonpreparableSpells = Object.keys(game.dnd5e.config.spellPreparationModes)
            .filter((p) => p !== 'prepared')

        let result = spells
        if (getSetting('showUnpreparedSpells')) {
            result = spells.filter((spell) => {
                return (
                    spell.system.preparation.prepared ||
                    nonpreparableSpells.includes(spell.system.preparation.mode) ||
                    spell.system.level === 0
                )
            })
        } else {
            result = spells.filter((spell) => spell.system.preparation.prepared)
        }

        return result
    }

    /**
     * Discard Expended Items
     * @private
     * @param {object} items
     * @returns {object}
     */
    _discardExpendedItems (items) {
        if (getSetting('showUnchargedItems')) return items

        return items.filter((item) => {
            const uses = item.system.uses
            // Assume something with no uses is unlimited in its use
            if (!uses) return true

            // If it has a max but value is 0, don't return
            if (uses.max > 0 && !uses.value) return false

            return true
        })
    }

    /**
     * Get Proficiency Icon
     * @param {string} level
     * @returns {string}
     */
    _getProficiencyIcon (level) {
        const icons = {
            0: '',
            0.5: '<i class="fas fa-adjust"></i>',
            1: '<i class="fas fa-check"></i>',
            2: '<i class="fas fa-check-double"></i>'
        }
        return icons[level]
    }

    /**
     * Get Icon
     * @param {object} action
     * @returns {string}
     */
    _getIcon (action) {
        const img = {
            bonus: '<i class="fas fa-plus"></i>',
            crew: '<i class="fas fa-users"></i>',
            day: '<i class="fas fa-hourglass-end"></i>',
            hour: '<i class="fas fa-hourglass-half"></i>',
            lair: '<i class="fas fa-home"></i>',
            minute: '<i class="fas fa-hourglass-start"></i>',
            legendary: '<i class="fas fa-dragon"></i>',
            reaction: '<i class="fas fa-bolt"></i>',
            special: '<i class="fas fa-star"></i>'
        }
        return img[action]
    }
}
