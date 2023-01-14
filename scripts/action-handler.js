// System Module Imports
import { getSetting } from './utils.js'

// Core Module Imports
import { CoreActionHandler, Logger } from './config.js'

export class ActionHandler extends CoreActionHandler {
    // Initialize actor and token variables
    actor = null
    actors = null
    actorId = null
    actorType = null
    character = null
    token = null
    tokenId = null

    // Initialize items variable
    items = null

    // Initialize setting variables
    abbreviateSkills = null
    displaySpellInfo = null
    showItemsWithoutActivationCosts = null
    showUnchargedItems = null
    showUnequippedItems = null
    showUnpreparedSpells = null

    // Initialize subcategoryIds variables
    subcategoryIds = null
    actionSubcategoryIds = null
    effectSubcategoryIds = null
    featureSubcategoryIds = null
    inventorySubcategoryIds = null
    spellSubcategoryIds = null

    // Initialize action variables
    featureActions = null
    inventoryActions = null
    spellActions = null

    /**
     * Build System Actions
     * @override
     * @param {object} actionList
     * @param {object} character
     * @param {array} subcategoryIds
     * @returns {object}
     */
    async buildSystemActions (character, subcategoryIds) {
        // Set actor and token variables
        this.actor = character?.actor
        this.actorId = this.actor?.id ?? 'multi'
        this.actors = (this.actorId === 'multi') ? this._getActors() : [this.actor]
        this.actorType = this.actor?.type
        this.token = character?.token
        this.tokenId = this.token?.id ?? 'multi'

        // Set items variable
        let items = this.actor.items
        items = this._discardSlowItems(items)
        items = this.sortItemsByName(items)
        this.items = items

        // Set settings variables
        this.abbreviateSkills = getSetting('abbreviateSkills')
        this.displaySpellInfo = getSetting('displaySpellInfo')
        this.showItemsWithoutActivationCosts = getSetting('showItemsWithoutActivationCosts')
        this.showUnchargedItems = getSetting('showUnchargedItems')
        this.showUnequippedItems = getSetting('showUnequippedItems')
        this.showUnpreparedSpells = getSetting('showUnpreparedSpells')

        // Set subcategory variables
        this.subcategoryIds = subcategoryIds

        this.actionSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'actions' ||
            subcategoryId === 'bonus-actions' ||
            subcategoryId === 'crew-actions' ||
            subcategoryId === 'lair-actions' ||
            subcategoryId === 'legendary-actions' ||
            subcategoryId === 'reactions' ||
            subcategoryId === 'other-actions'
        )

        this.effectSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'passive-effects' ||
            subcategoryId === 'temporary-effects'
        )

        this.featureSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'active-features' ||
            subcategoryId === 'passive-features'
        )

        this.spellSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
            subcategoryId === 'cantrips' ||
            subcategoryId === '1st-level-spells' ||
            subcategoryId === '2nd-level-spells' ||
            subcategoryId === '3rd-level-spells' ||
            subcategoryId === '4th-level-spells' ||
            subcategoryId === '5th-level-spells' ||
            subcategoryId === '6th-level-spells' ||
            subcategoryId === '7th-level-spells' ||
            subcategoryId === '8th-level-spells' ||
            subcategoryId === '9th-level-spells' ||
            subcategoryId === 'at-will-spells' ||
            subcategoryId === 'innate-spells' ||
            subcategoryId === 'pact-spells'
        )

        if (this.actorType === 'character' || this.actorType === 'npc') {
            this.inventorySubcategoryIds = subcategoryIds.filter((subcategoryId) =>
                subcategoryId === 'equipped' ||
                subcategoryId === 'consumables' ||
                subcategoryId === 'containers' ||
                subcategoryId === 'equipment' ||
                subcategoryId === 'loot' ||
                subcategoryId === 'tools' ||
                subcategoryId === 'weapons' ||
                subcategoryId === 'unequipped'
            )
            return this._buildCharacterActions()
        }
        if (this.actorType === 'vehicle') {
            this.inventorySubcategoryIds = this.subcategoryIds.filter((subcategoryId) =>
                subcategoryId === 'consumables' ||
                subcategoryId === 'equipment' ||
                subcategoryId === 'tools' ||
                subcategoryId === 'weapons'
            )
            return this._buildVehicleActions()
        }
        if (!this.actor) {
            return this._buildMultipleTokenActions()
        }
    }

    /**
     * Build Character Actions
     * @private
     * @returns {object}
     */
    async _buildCharacterActions () {
        this._buildAbilities('ability', 'abilities')
        this._buildAbilities('abilityCheck', 'checks')
        this._buildAbilities('abilitySave', 'saves')
        this._buildCombat()
        this._buildConditions()
        this._buildEffects()
        this._buildFeatures()
        this._buildInventory()
        this._buildRests()
        this._buildSkills()
        this._buildSpells()
        this._buildUtility()
    }

    /**
     * Build Vehicle  Actions
     * @private
     * @returns {object}
     */
    async _buildVehicleActions () {
        this._buildAbilities('ability', 'abilities')
        this._buildAbilities('abilityCheck', 'checks')
        this._buildAbilities('abilitySave', 'saves')
        this._buildCombat()
        this._buildConditions()
        this._buildEffects()
        this._buildFeatures()
        this._buildInventory()
        this._buildUtility()
    }

    /**
     * Build Multiple Token Actions
     * @private
     * @returns {object}
     */
    async _buildMultipleTokenActions () {
        this._buildAbilities('ability', 'abilities')
        this._buildAbilities('abilityCheck', 'checks')
        this._buildAbilities('abilitySave', 'saves')
        this._buildCombat()
        this._buildConditions()
        this._buildRests()
        this._buildSkills()
        this._buildUtility()
    }

    /**
     * Build Abilities
     * @private
     * @param {string} actionType
     * @param {string} subcategoryId
     */
    _buildAbilities (actionType, subcategoryId) {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.some((id) => id === subcategoryId)) return

        // Get abilities
        const abilities = (this.actorId === 'multi') ? game.dnd5e.config.abilities : this.actor.system.abilities

        // Exit if no abilities exist
        if (abilities.length === 0) return

        // Get actions
        const actions = Object.entries(abilities)
            .filter((ability) => abilities[ability[0]].value !== 0)
            .map((ability) => {
                const id = ability[0]
                const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                const name = this.abbreviateSkills ? abbreviatedName : game.dnd5e.config.abilities[id]
                const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
                const icon = (subcategoryId !== 'checks') ? this._getProficiencyIcon(abilities[id].proficient) : ''
                return {
                    id,
                    name,
                    encodedValue,
                    icon,
                    selected: true
                }
            })

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Build Combat
     * @private
     */
    _buildCombat (actionList) {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.some((subcategoryId) => subcategoryId === 'combat')) return

        const actionType = 'utility'
        const subcategoryId = 'combat'

        // Set combat types
        const combatTypes = {
            initiative: { id: 'initiative', name: this.i18n('tokenActionHud.dnd5e.rollInitiative') },
            endTurn: { id: 'endTurn', name: this.i18n('tokenActionHud.endTurn') }
        }

        // Delete endTurn for multiple tokens
        if (game.combat?.current?.tokenId !== this.tokenId) delete combatTypes.endTurn

        // Get actions
        const actions = Object.entries(combatTypes).map((combatType) => {
            const id = combatType[1].id
            const name = combatType[1].name
            const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
            let info1 = ''
            let cssClass = ''
            if (combatType[0] === 'initiative' && game.combat) {
                const tokenIds = canvas.tokens.controlled.map((token) => token.id)
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

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Build Conditions
     * @private
     */
    _buildConditions () {
        // Exit if the no subcategory or token exists
        if (!this.subcategoryIds.some((subcategoryId) => subcategoryId === 'conditions')) return
        if (!this.token) return

        const actionType = 'condition'
        const subcategoryId = 'conditions'

        // Get conditions
        const conditions = CONFIG.statusEffects.filter((condition) => condition.id !== '')

        // Exit if no conditions exist
        if (conditions.length === 0) return

        // Get actions
        const actions = conditions.map((condition) => {
            const id = condition.id
            const name = this.i18n(condition.label)
            const encodedValue = [actionType, this.actorId, this.tokenId, id].join(
                this.delimiter
            )
            const active = this.actors.every((actor) => {
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

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Build Effects
     * @private
     */
    _buildEffects () {
        // Exit if no subcategories exist
        if (!this.effectSubcategoryIds) return

        const actionType = 'effect'

        // Get effects
        const effects = this.actor.effects

        // Exit if no effects exist
        if (effects.size === 0) return

        // Map passive and temporary effects to new maps
        const passiveEffects = new Map()
        const temporaryEffects = new Map()

        for (const effect of effects) {
            const key = effect.id
            const isTemporary = effect.isTemporary
            if (isTemporary) {
                temporaryEffects.set(key, effect)
            } else {
                passiveEffects.set(key, effect)
            }
        }

        // Build passive effects
        if (this.effectSubcategoryIds.some((subcategoryId) => subcategoryId === 'passive-effects')) {
            const subcategoryId = 'passive-effects'
            this._buildActions(passiveEffects, { id: subcategoryId }, actionType)
        }

        // Build temporary effects
        if (this.effectSubcategoryIds.some((subcategoryId) => subcategoryId === 'temporary-effects')) {
            const subcategoryId = 'temporary-effects'
            this._buildActions(temporaryEffects, { id: subcategoryId }, actionType)
        }
    }

    /**
     * Build Features
     * @private
     */
    _buildFeatures () {
        // Exit if no subcategories exist
        if (!this.featureSubcategoryIds) return

        const actionType = 'feature'

        // Get feats
        const feats = new Map()
        for (const [key, value] of this.items) {
            const type = value.type
            if (type === 'feat') feats.set(key, value)
        }

        // Early exit if no feats exist
        if (feats.size === 0) return

        // Map active and passive features to new maps
        const activeFeatures = new Map()
        const passiveFeatures = new Map()

        for (const [key, value] of feats) {
            const activationType = value.system.activation?.type
            const excludedActivationTypes = ['', 'lair', 'legendary']
            if (activationType && !excludedActivationTypes.includes(activationType)) activeFeatures.set(key, value)
            if (!activationType || activationType === '') passiveFeatures.set(key, value)
        }

        // Build active features
        if (this.featureSubcategoryIds.some((subcategoryId) => subcategoryId === 'active-features')) {
            const subcategoryId = 'active-features'

            // Build actions
            this._buildActions(activeFeatures, { id: subcategoryId }, actionType)

            // Build activations
            const subcategoryName = this.i18n('tokenActionHud.dnd5e.activeFeatures')
            const subcategoryData = {
                id: subcategoryId,
                name: subcategoryName
            }
            if (this.actionSubcategoryIds) this.buildActivations(activeFeatures, subcategoryData, actionType)
        }

        // Build passive features
        if (this.featureSubcategoryIds.some((subcategoryId) => subcategoryId === 'passive-features')) {
            const subcategoryId = 'passive-features'

            // Build actions
            this._buildActions(passiveFeatures, { id: subcategoryId }, actionType)

            // Build activations
            const subcategoryName = this.i18n('tokenActionHud.dnd5e.passiveFeatures')
            const subcategoryData = {
                id: subcategoryId,
                name: subcategoryName
            }
            if (this.actionSubcategoryIds) this.buildActivations(passiveFeatures, subcategoryData, actionType)
        }
    }

    /**
     * Build Activations
     * @param {object} items
     * @param {object} subcategoryData
     * @param {string} actionType
     */
    buildActivations (items, subcategoryData, actionType = 'item') {
        const actionItems = new Map()
        const bonusActionItems = new Map()
        const crewActionItems = new Map()
        const lairActionItems = new Map()
        const legendaryActionItems = new Map()
        const reactionItems = new Map()
        const otherActionItems = new Map()

        for (const [key, value] of items) {
            const activationType = value.system?.activation?.type
            switch (activationType) {
            case 'action':
                actionItems.set(key, value)
                break
            case 'bonus':
                bonusActionItems.set(key, value)
                break
            case 'crew':
                crewActionItems.set(key, value)
                break
            case 'lair':
                lairActionItems.set(key, value)
                break
            case 'legendary':
                legendaryActionItems.set(key, value)
                break
            case 'reaction':
                reactionItems.set(key, value)
                break
            default:
                otherActionItems.set(key, value)
                break
            }
        }

        let activationItems = null
        for (const actionSubcategoryId of this.actionSubcategoryIds) {
            switch (actionSubcategoryId) {
            case 'actions':
                activationItems = actionItems
                break
            case 'bonus-actions':
                activationItems = bonusActionItems
                break
            case 'crew-actions':
                activationItems = crewActionItems
                break
            case 'lair-actions':
                activationItems = lairActionItems
                break
            case 'legendary-actions':
                activationItems = legendaryActionItems
                break
            case 'reactions':
                activationItems = reactionItems
                break
            case 'other-actions':
                activationItems = otherActionItems
                break
            }

            subcategoryData.id = `${actionSubcategoryId}+${subcategoryData.id}`
            subcategoryData.type = 'system-derived'

            const parentSubcategoryData = {
                id: actionSubcategoryId,
                type: 'system'
            }

            // Add subcategory to action list
            this.addSubcategoryToActionList(parentSubcategoryData, subcategoryData)

            // Get actions
            this._buildActions(activationItems, subcategoryData, actionType)
        }
    }

    /**
     * Build Inventory
     * @private
     */
    _buildInventory () {
        // Exit if no subcategories exist
        if (!this.inventorySubcategoryIds) return
        // Exit early if no items exist
        if (this.items.size === 0) return

        // Initialize maps
        const equippedItems = new Map()
        const unequippedItems = new Map()
        const consumableItems = new Map()
        const containerItems = new Map()
        const equipmentItems = new Map()
        const lootItems = new Map()
        const toolItems = new Map()
        const weaponItems = new Map()

        for (const [key, value] of this.items) {
            // Set variables
            const equipped = value.system.equipped
            const hasQuantity = value.system?.quantity > 0
            const isActiveItem = this._isActiveItem(value)
            const isUsableItem = this._isUsableItem(value)
            const isEquippedItem = this._isEquippedItem(value)
            const type = value.type

            // Set items into maps
            if (hasQuantity && isActiveItem) {
                if (equipped) equippedItems.set(key, value)
                if (!equipped) unequippedItems.set(key, value)
                if (isUsableItem && type === 'consumable') consumableItems.set(key, value)
                if (isEquippedItem) {
                    if (type === 'backpack') containerItems.set(key, value)
                    if (type === 'equipment') equipmentItems.set(key, value)
                    if (type === 'loot') lootItems.set(key, value)
                    if (type === 'tool') toolItems.set(key, value)
                    if (type === 'weapon') weaponItems.set(key, value)
                }
            }
        }

        // Equipped
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'equipped')) {
            const subcategoryId = 'equipped'

            // Build actions
            this._buildActions(equippedItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.Equipped')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(equippedItems, subcategoryData)
            }
        }

        // Unequipped
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'unequipped')) {
            const subcategoryId = 'unequipped'

            // Build actions
            this._buildActions(unequippedItems, { id: subcategoryId })
        }

        // Containers
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'containers')) {
            const subcategoryId = 'containers'

            // Build actions
            this._buildActions(containerItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.ItemTypeContainerPl')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(containerItems, subcategoryData)
            }
        }

        // Equipment
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'equipment')) {
            const subcategoryId = 'equipment'

            // Get actions
            this._buildActions(equipmentItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.ItemTypeEquipmentPl')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(equipmentItems, subcategoryData)
            }
        }

        // Loot
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'loot')) {
            const subcategoryId = 'loot'

            // Get actions
            this._buildActions(lootItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.ItemTypeLootPl')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(lootItems, subcategoryData)
            }
        }

        // Tools
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'tools')) {
            const subcategoryId = 'tools'

            // Get actions
            this._buildActions(toolItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.ItemTypeToolPl')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(toolItems, subcategoryData)
            }
        }

        // Weapons
        if (this.inventorySubcategoryIds.some((subcategoryId) => subcategoryId === 'weapons')) {
            const subcategoryId = 'weapons'

            // Get actions
            this._buildActions(weaponItems, { id: subcategoryId })

            // Build activations
            if (this.actionSubcategoryIds) {
                const subcategoryName = this.i18n('DND5E.ItemTypeWeaponPl')
                const subcategoryData = {
                    id: subcategoryId,
                    name: subcategoryName
                }
                this.buildActivations(weaponItems, subcategoryData)
            }
        }
    }

    /**
     * Build Rests
     * @private
     */
    _buildRests () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.some((subcategoryId) => subcategoryId === 'rests')) return
        // Exit if every actor is not the character type
        if (!this.actors.every(actor => actor.type === 'character')) return

        const actionType = 'utility'
        const subcategoryId = 'rests'

        // Set rest types
        const restTypes = {
            shortRest: { name: this.i18n('DND5E.ShortRest') },
            longRest: { name: this.i18n('DND5E.LongRest') }
        }

        // Get actions
        const actions = Object.entries(restTypes)
            .map((restType) => {
                const id = restType[0]
                const name = restType[1].name
                const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
                return {
                    id,
                    name,
                    encodedValue,
                    selected: true
                }
            })

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Build Skills
     * @private
     */
    _buildSkills () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.some((subcategoryId) => subcategoryId === 'skills')) return

        const subcategoryId = 'skills'
        const actionType = 'skill'

        // Get skills
        const skills = (this.actorId === 'multi') ? game.dnd5e.config.skills : this.actor.system.skills

        // Exit if there are no skills
        if (skills.length === 0) return

        // Get actions
        const actions = Object.entries(skills)
            .map((skill) => {
                try {
                    const id = skill[0]
                    const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                    const name = this.abbreviateSkills ? abbreviatedName : game.dnd5e.config.skills[id].label
                    const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
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

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Build Spells
     */
    _buildSpells () {
        // Exit if no subcategories exist
        if (!this.spellSubcategoryIds) return

        const actionType = 'spell'

        // Initialize map
        const cantripSpells = new Map()
        const level1Spells = new Map()
        const level2Spells = new Map()
        const level3Spells = new Map()
        const level4Spells = new Map()
        const level5Spells = new Map()
        const level6Spells = new Map()
        const level7Spells = new Map()
        const level8Spells = new Map()
        const level9Spells = new Map()
        const atWillSpells = new Map()
        const innateSpells = new Map()
        const pactSpells = new Map()

        // Set map
        for (const [key, value] of this.items) {
            const type = value.type
            if (type === 'spell') {
                const isUsableItem = this._isUsableItem(value)
                const isUsableSpell = this._isUsableSpell(value)
                if (isUsableItem && isUsableSpell) {
                    const preparationMode = value.system.preparation.mode
                    switch (preparationMode) {
                    case 'atwill':
                        atWillSpells.set(key, value)
                        break
                    case 'innate':
                        innateSpells.set(key, value)
                        break
                    case 'pact':
                        pactSpells.set(key, value)
                        break
                    default:
                    { const level = value.system.level
                        switch (level) {
                        case 0:
                            cantripSpells.set(key, value)
                            break
                        case 1:
                            level1Spells.set(key, value)
                            break
                        case 2:
                            level2Spells.set(key, value)
                            break
                        case 3:
                            level3Spells.set(key, value)
                            break
                        case 4:
                            level4Spells.set(key, value)
                            break
                        case 5:
                            level5Spells.set(key, value)
                            break
                        case 6:
                            level6Spells.set(key, value)
                            break
                        case 7:
                            level7Spells.set(key, value)
                            break
                        case 8:
                            level8Spells.set(key, value)
                            break
                        case 9:
                            level9Spells.set(key, value)
                            break
                        }
                    }
                    }
                }
            }
        }

        // Reverse sort spell slots by level
        const systemSpells = Object.entries(this.actor.system.spells).reverse()

        // Set spell slot availability
        let pactSlot = null
        const spellSlots = []
        let spellSlotAvailable = this.showUnchargedItems
        let pactSlotAvailable = this.showUnchargedItems
        for (const [key, value] of systemSpells) {
            const hasValue = value.value > 0
            const hasMax = value.max > 0
            if (key === 'pact') {
                if (!pactSlotAvailable && hasValue && hasMax) pactSlotAvailable = true
                value.slotAvailable = pactSlotAvailable
                pactSlot = [key, value]
            }
            if (key.startsWith('spell')) {
                if (!spellSlotAvailable && hasValue && hasMax) spellSlotAvailable = true
                value.slotAvailable = spellSlotAvailable
                spellSlots.push([key, value])
            } else {
                if (hasValue) {
                    value.slotsAvailable = true
                    spellSlots.push(key, value)
                }
            }
        }

        // Set equivalent spell slot where pact slot is available
        if (pactSlot[1].slotAvailable) {
            const pactSpellEquivalent = spellSlots.findIndex(spell => spell[0] === 'spell' + pactSlot[1].level)
            spellSlots[pactSpellEquivalent][1].slotsAvailable = true
        }

        for (const subcategoryId of this.spellSubcategoryIds) {
            let spellMode = null
            let spells = null
            let subcategoryName = null
            switch (subcategoryId) {
            case 'cantrips':
                spellMode = '0'
                spells = cantripSpells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.cantrips')
                break
            case '1st-level-spells':
                spellMode = '1'
                spells = level1Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.1stLevelSpells')
                break
            case '2nd-level-spells':
                spellMode = '2'
                spells = level2Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.2ndLevelSpells')
                break
            case '3rd-level-spells':
                spellMode = '3'
                spells = level3Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.3rdLevelSpells')
                break
            case '4th-level-spells':
                spellMode = '4'
                spells = level4Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.4thLevelSpells')
                break
            case '5th-level-spells':
                spellMode = '5'
                spells = level5Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.5thLevelSpells')
                break
            case '6th-level-spells':
                spellMode = '6'
                spells = level6Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.6thLevelSpells')
                break
            case '7th-level-spells':
                spellMode = '7'
                spells = level7Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.7thLevelSpells')
                break
            case '8th-level-spells':
                spellMode = '8'
                spells = level8Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.8thLevelSpells')
                break
            case '9th-level-spells':
                spellMode = '9'
                spells = level9Spells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.9thLevelSpells')
                break
            case 'at-will-spells':
                spellMode = 'atwill'
                spells = atWillSpells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.atWillSpells')
                break
            case 'innate-spells':
                spellMode = 'innate'
                spells = innateSpells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.innateSpells')
                break
            case 'pact-spells':
                spellMode = 'pact'
                spells = pactSpells
                subcategoryName = this.i18n('tokenActionHud.dnd5e.pactSpells')
                break
            }

            // Exit if no spells exist
            if (!spells) return

            const spellSlotModes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'pact']
            const levelInfo = (spellMode === 'pact') ? pactSlot[1] : spellSlots.find(spellSlot => spellSlot[0] === `spell${spellMode}`)?.[1]
            const slots = levelInfo?.value
            const max = levelInfo?.max
            const slotsAvailable = levelInfo?.slotAvailable

            // Exit if spells require spell slots and none are available
            if (!slotsAvailable && spellSlotModes.includes(spellMode)) return

            // Add spell slot info to subcategory title
            let subcategoryInfo
            if (max > 0) {
                subcategoryInfo = {}
                subcategoryInfo.info1 = `${slots}/${max}`
                this.addSubcategoryInfo({ subcategoryId, subcategoryInfo })
            }

            // Build actions
            this._buildActions(spells, { id: subcategoryId }, actionType)

            // Build activations
            const subcategoryData = { id: subcategoryId, name: subcategoryName, info1: subcategoryInfo?.info1 }
            if (this.actionSubcategoryIds) {
                this.buildActivations(spells, subcategoryData, actionType)
            }
        }
    }

    /**
     * Build Utility
     * @private
     */
    _buildUtility () {
        // Exit if no subcategory exists
        if (this.subcategoryIds.some((subcategoryId) => subcategoryId === 'utility')) return
        // Exit if every actor is not the character type
        if (!this.actors.every((actor) => actor.type === 'character')) return

        const actionType = 'utility'
        const subcategoryId = 'utility'

        // Set utility types
        const utilityTypes = {
            deathSave: { name: this.i18n('DND5E.DeathSave') },
            inspiration: { name: this.i18n('DND5E.Inspiration') }
        }

        // Delete 'deathSave' for multiple tokens
        if (this.actorId === 'multi' || this.actor.system.attributes.hp.value > 0) delete utilityTypes.deathSave

        // Get actions
        const actions = Object.entries(utilityTypes)
            .map((utilityType) => {
                const id = utilityType[0]
                const name = utilityType[1].name
                const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
                let cssClass = ''
                if (utilityType[0] === 'inspiration') {
                    const active = this.actors.every((actor) => actor.system.attributes?.inspiration)
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

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryId)
    }

    /**
     * Get Actions
     * @private
     * @param {object} items
     * @param {object} subcategoryData
     * @param {string} actionType
     */
    _buildActions (items, subcategoryData = {}, actionType = 'item') {
        // Exit if there are no items
        if (items.size === 0) return

        // Exit if there is no subcategoryId
        const subcategoryId = (typeof subcategoryData === 'string' ? subcategoryData : subcategoryData?.id)
        if (!subcategoryId) return

        // Get actions
        const actions = [...items].map(item => this._getAction(actionType, item[1]))

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    /**
     * Get Action
     * @private
     * @param {string} actionType
     * @param {object} entity
     * @returns {object}
     */
    _getAction (actionType, entity) {
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
            const active = (!entity.disabled) ? ' active' : ''
            cssClass = `toggle${active}`
        }
        const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
        const img = this.getImage(entity)
        const icon1 = this._getActivationTypeIcon(entity?.system?.activation?.type)
        let icon2 = null
        let info = null
        if (entity.type === 'spell') {
            icon2 = this._getPreparedIcon(entity)
            if (this.displaySpellInfo) info = this._getSpellInfo(entity)
        } else {
            info = this._getItemInfo(entity)
        }
        const info1 = info.info1
        const info2 = info.info2
        const info3 = info.info3
        return {
            id,
            name,
            encodedValue,
            cssClass,
            img,
            icon1,
            icon2,
            info1,
            info2,
            info3,
            selected: true
        }
    }

    /**
     * Is Active Item
     * @param {object} item
     * @returns {boolean}
     */
    _isActiveItem (item) {
        if (this.showItemsWithoutActivationCosts) return true
        const activationTypes = Object.keys(game.dnd5e.config.abilityActivationTypes).filter((at) => at !== 'none')
        const activation = item.system.activation
        const activationType = activation?.type
        if (activation && activationTypes.includes(activationType)) return true
        return false
    }

    /**
     * Is Equipped Item
     * @private
     * @param {object} item
     * @returns {boolean}
     */
    _isEquippedItem (item) {
        const type = item.type
        const excludedTypes = ['consumable', 'spell', 'feat']
        if (this.showUnequippedItems && !excludedTypes.includes(type)) return true
        const equipped = item.system.equipped
        if (equipped && type !== 'consumable') return true
        return false
    }

    /**
     * Is Usable Item
     * @private
     * @param {object} item The item
     * @returns {boolean}
     */
    _isUsableItem (item) {
        if (this.showUnchargedItems) return true
        const uses = item.system.uses
        if (!uses) return false
        return true
    }

    /**
     * Is Usable Spell
     * @param {object} spell  The spell
     * @returns {boolean}
     */
    _isUsableSpell (spell) {
        if (this.actorType !== 'character' && this.showUnequippedItems) return true
        const prepared = spell.system.preparation.prepared
        if (this.showUnpreparedSpells) return true
        // Set variables
        const level = spell.system.level
        const preparationModes = Object.keys(game.dnd5e.config.spellPreparationModes)
            .filter(preparationMode => preparationMode !== 'prepared')
        const preparationMode = spell.system.preparation.mode

        // Return true if spell is a cantrip, has a preparation mode other than 'prepared' or is prepared
        if (level === 0 || preparationModes.includes(preparationMode) || prepared) return true
        return false
    }

    /**
     * Get Item Info
     * @private
     * @param {object} item
     * @returns {object}
     */
    _getItemInfo (item) {
        return {
            info1: this._getQuantityData(item) ?? '',
            info2: this._getUsesData(item) ?? '',
            info3: this._getConsumeData(item) ?? ''
        }
    }

    /**
     * Add Spell Info
     * @param {object} spell
     */
    _getSpellInfo (spell) {
        const components = spell.system.components

        let info1 = ''
        let info2 = ''
        let info3 = ''

        if (components?.vocal) info1 += this.i18n('DND5E.ComponentVerbal').charAt(0).toUpperCase()
        if (components?.somatic) info1 += this.i18n('DND5E.ComponentSomatic').charAt(0).toUpperCase()
        if (components?.material) info1 += this.i18n('DND5E.ComponentMaterial').charAt(0).toUpperCase()
        if (components?.concentration) info2 += this.i18n('DND5E.Concentration').charAt(0).toUpperCase()
        if (components?.ritual) info3 += this.i18n('DND5E.Ritual').charAt(0).toUpperCase()

        return { info1, info2, info3 }
    }

    /**
     * Get Actors
     * @private
     * @returns {object}
     */
    _getActors () {
        const allowedTypes = ['character', 'npc']
        const actors = canvas.tokens.controlled.map((token) => token.actor)
        if (actors.every((actor) => allowedTypes.includes(actor.type))) { return actors }
    }

    /**
     * Get Quantity
     * @private
     * @param {object} item
     * @returns {string}
     */
    _getQuantityData (item) {
        const quantity = item?.system?.quantity ?? 0
        return (quantity > 1) ? quantity : ''
    }

    /**
     * Get Uses
     * @private
     * @param {object} item
     * @returns {string}
     */
    _getUsesData (item) {
        const uses = item?.system?.uses
        if (!uses) return ''
        return (uses.value > 0 || uses.max > 0) ? `${uses.value ?? '0'}${(uses.max > 0) ? `/${uses.max}` : ''}` : ''
    }

    /**
     * Get Consume
     * @private
     * @param {object} item
     * @param {object} actor
     * @returns {string}
     */
    _getConsumeData (item) {
        // Get consume target and type
        const consumeId = item?.system?.consume?.target
        const consumeType = item?.system?.consume?.type

        // Return resources
        if (consumeType === 'attribute') {
            const parentId = consumeId.substr(0, consumeId.lastIndexOf('.'))
            const target = this.actor.system[parentId]

            return (target) ? `${target.value ?? '0'}${(target.max) ? `/${target.max}` : ''}` : ''
        }

        const target = this.items.get(consumeId)

        // Return charges
        if (consumeType === 'charges') {
            const uses = target?.system.uses

            return (uses?.value) ? `${uses.value}${(uses.max) ? `/${uses.max}` : ''}` : ''
        }

        // Return quantity
        return target?.system?.quantity ?? ''
    }

    /**
     * Discard Slow Items
     * @private
     * @param {object} items
     * @returns {object}
     */
    _discardSlowItems (items) {
        // Get setting
        const showSlowActions = getSetting('showSlowActions')

        // Return all items
        if (showSlowActions) return items

        // Return filtered items
        const slowActivationTypes = ['minute', 'hour', 'day']

        // Initialize map
        const filteredItems = new Map()

        // Iterate through items and set items with non-slow activation types into the new map
        for (const [key, value] of items) {
            const activation = value.system.activation
            const activationType = value.system.activation?.type
            if (activation && !slowActivationTypes.includes(activationType)) filteredItems.set([key, value])
        }

        return filteredItems
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
     * Get icon for the activation type
     * @param {object} action
     * @returns {string}
     */
    _getActivationTypeIcon (action) {
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

    /**
     * Get icon for a prepared spell
     * @param {boolean} prepararation
     * @returns 
     */
    _getPreparedIcon (spell) {
        const level = spell.system.level
        const preparationMode = spell.system.preparation.mode
        const prepared = spell.system.preparation.prepared

        // Return true if spell is prepared, the preparation mode is 'prepared and it is not a cantrip
        if (prepared && preparationMode === 'prepared' && level !== 0) return '<i class="fas fa-sun"></i>'
    }
}
