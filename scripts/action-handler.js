// System Module Imports
import { ACTIVATION_TYPE_ICON, PREPARED_ICON, PROFICIENCY_LEVEL_ICON } from './constants.js'
import { getSetting } from './utils.js'

// Core Module Imports
import { CoreActionHandler, CoreUtils, Logger } from './config.js'

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
    activationSubcategoryIds = null
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
        if (this.actorId !== 'multi') {
            let items = this.actor.items
            items = this._discardSlowItems(items)
            items = this.sortItemsByName(items)
            this.items = items
        }

        // Set settings variables
        this.abbreviateSkills = getSetting('abbreviateSkills')
        this.displaySpellInfo = getSetting('displaySpellInfo')
        this.showItemsWithoutActivationCosts = getSetting('showItemsWithoutActivationCosts')
        this.showUnchargedItems = getSetting('showUnchargedItems')
        this.showUnequippedItems = getSetting('showUnequippedItems')
        this.showUnpreparedSpells = getSetting('showUnpreparedSpells')

        // Set subcategory variables
        this.subcategoryIds = subcategoryIds

        this.activationSubcategoryIds = subcategoryIds.filter((subcategoryId) =>
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

        // Add subcategory ids for activation types
        if (this.activationSubcategoryIds.length > 0) {
            this.featureSubcategoryIds = [
                'active-features',
                'passive-features'
            ]
            this.spellSubcategoryIds = [
                'cantrips',
                '1st-level-spells',
                '2nd-level-spells',
                '3rd-level-spells',
                '4th-level-spells',
                '5th-level-spells',
                '6th-level-spells',
                '7th-level-spells',
                '8th-level-spells',
                '9th-level-spells',
                'at-will-spells',
                'innate-spells',
                'pact-spells'
            ]
        }

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

            // Add subcategory ids for activation types
            if (this.activationSubcategoryIds.length > 0) {
                this.inventorySubcategoryIds = [
                    'consumables',
                    'containers',
                    'equipment',
                    'loot',
                    'tools',
                    'weapons'
                ]
            }

            this._buildCharacterActions()
        }
        if (this.actorType === 'vehicle') {
            this.inventorySubcategoryIds = this.subcategoryIds.filter((subcategoryId) =>
                subcategoryId === 'consumables' ||
                subcategoryId === 'equipment' ||
                subcategoryId === 'tools' ||
                subcategoryId === 'weapons'
            )

            // Add subcategory ids for activation types
            if (this.activationSubcategoryIds.length > 0) {
                this.inventorySubcategoryIds = [
                    'consumables',
                    'equipment',
                    'tools',
                    'weapons'
                ]
            }

            this._buildVehicleActions()
        }
        if (!this.actor) {
            this._buildMultipleTokenActions()
        }
    }

    /**
     * Build Character Actionss
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
        if (!this.subcategoryIds.includes(subcategoryId)) return

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

        // Create subcategory data
        const subcategoryData = { id: subcategoryId, type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    async buildActivations (items, subcategoryData, actionType = 'item') {
        // Create map of items according to activation type
        const activationItems = new Map()

        // Create subcategory mappings
        const subcategoryMappings = {
            actions: 'action',
            'bonus-actions': 'bonus',
            'crew-actions': 'crew',
            'lair-actions': 'lair',
            'legendary-actions': 'legendary',
            reactions: 'reaction',
            'other-actions': 'other'
        }

        const activationTypes = ['action', 'bonus', 'crew', 'lair', 'legendary', 'reaction']

        // Loop through items
        for (const [key, value] of items) {
            const activationType = value.system?.activation?.type
            const activationTypeOther = (activationTypes.includes(activationType)) ? activationType : 'other'
            if (!activationItems.has(activationTypeOther)) activationItems.set(activationTypeOther, new Map())
            activationItems.get(activationTypeOther).set(key, value)
        }

        // Loop through action subcategory ids
        for (const subcategoryId of this.activationSubcategoryIds) {
            const activationType = subcategoryMappings[subcategoryId]

            // Skip if no items exist
            if (!activationItems.has(activationType)) continue

            // Clone and add to subcategory data
            const subcategoryDataClone = { ...subcategoryData, id: `${subcategoryId}+${subcategoryData.id}`, type: 'system-derived' }

            // Create parent subcategory data
            const parentSubcategoryData = { id: subcategoryId, type: 'system' }

            // Add subcategory to action list
            await this.addSubcategoryToActionList(parentSubcategoryData, subcategoryDataClone)

            // Add spell slot info to subcategory
            this.addSubcategoryInfo(subcategoryData)

            // Build actions
            this._buildActions(activationItems.get(activationType), subcategoryDataClone, actionType)
        }
    }

    /**
     * Build Combat
     * @private
     */
    _buildCombat () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.includes('combat')) return

        const actionType = 'utility'

        // Set combat types
        const combatTypes = {
            initiative: { id: 'initiative', name: CoreUtils.i18n('tokenActionHud.dnd5e.rollInitiative') },
            endTurn: { id: 'endTurn', name: CoreUtils.i18n('tokenActionHud.endTurn') }
        }

        // Delete endTurn for multiple tokens
        if (game.combat?.current?.tokenId !== this.tokenId) delete combatTypes.endTurn

        // Get actions
        const actions = Object.entries(combatTypes).map((combatType) => {
            const id = combatType[1].id
            const name = combatType[1].name
            const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
            const info1 = {}
            let cssClass = ''
            if (combatType[0] === 'initiative' && game.combat) {
                const tokenIds = canvas.tokens.controlled.map((token) => token.id)
                const combatants = game.combat.combatants.filter((combatant) => tokenIds.includes(combatant.tokenId))

                // Get initiative for single token
                if (combatants.length === 1) {
                    const currentInitiative = combatants[0].initiative
                    info1.class = 'tah-spotlight'
                    info1.text = currentInitiative
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

        // Create subcategory data
        const subcategoryData = { id: 'combat', type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    /**
     * Build Conditions
     * @private
     */
    _buildConditions () {
        // Exit if the no subcategory or token exists
        if (!this.subcategoryIds.includes('conditions')) return
        if (!this.token) return

        const actionType = 'condition'

        // Get conditions
        const conditions = CONFIG.statusEffects.filter((condition) => condition.id !== '')

        // Exit if no conditions exist
        if (conditions.length === 0) return

        // Get actions
        const actions = conditions.map((condition) => {
            const id = condition.id
            const name = CoreUtils.i18n(condition.label)
            const encodedValue = [actionType, this.actorId, this.tokenId, id].join(this.delimiter)
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

        // Create subcategory data
        const subcategoryData = { id: 'conditions', type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
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

        // Iterate effects and add to a map based on the isTemporary value
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
        if (this.effectSubcategoryIds.includes('passive-effects')) {
            const subcategoryData = { id: 'passive-effects', type: 'system' }
            this._buildActions(passiveEffects, subcategoryData, actionType)
        }

        // Build temporary effects
        if (this.effectSubcategoryIds.includes('temporary-effects')) {
            const subcategoryData = { id: 'temporary-effects', type: 'system' }
            this._buildActions(temporaryEffects, subcategoryData, actionType)
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
        if (this.featureSubcategoryIds.includes('active-features')) {
            const subcategoryData = {
                id: 'active-features',
                name: CoreUtils.i18n('tokenActionHud.dnd5e.activeFeatures'),
                type: 'system'
            }

            // Build actions
            this._buildActions(activeFeatures, subcategoryData, actionType)

            // Build activations
            if (this.activationSubcategoryIds) this.buildActivations(activeFeatures, subcategoryData, actionType)
        }

        // Build passive features
        if (this.featureSubcategoryIds.includes('passive-features')) {
            const subcategoryData = {
                id: 'passive-features',
                name: CoreUtils.i18n('tokenActionHud.dnd5e.passiveFeatures'),
                type: 'system'
            }

            // Build actions
            this._buildActions(passiveFeatures, subcategoryData, actionType)

            // Build activations
            if (this.activationSubcategoryIds) this.buildActivations(passiveFeatures, subcategoryData, actionType)
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

        const inventoryMap = new Map()

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
                if (equipped) {
                    if (!inventoryMap.has('equipped')) inventoryMap.set('equipped', new Map())
                    inventoryMap.get('equipped').set(key, value)
                }
                if (!equipped) {
                    if (!inventoryMap.has('unequipped')) inventoryMap.set('unequipped', new Map())
                    inventoryMap.get('unequipped').set(key, value)
                }
                if (isUsableItem && type === 'consumable') {
                    if (!inventoryMap.has('consumables')) inventoryMap.set('consumables', new Map())
                    inventoryMap.get('consumables').set(key, value)
                }
                if (isEquippedItem) {
                    if (type === 'backpack') {
                        if (!inventoryMap.has('containers')) inventoryMap.set('containers', new Map())
                        inventoryMap.get('containers').set(key, value)
                    }
                    if (type === 'equipment') {
                        if (!inventoryMap.has('equipment')) inventoryMap.set('equipment', new Map())
                        inventoryMap.get('equipment').set(key, value)
                    }
                    if (type === 'loot') {
                        if (!inventoryMap.has('loot')) inventoryMap.set('loot', new Map())
                        inventoryMap.get('loot').set(key, value)
                    }
                    if (type === 'tool') {
                        if (!inventoryMap.has('tools')) inventoryMap.set('tools', new Map())
                        inventoryMap.get('tools').set(key, value)
                    }
                    if (type === 'weapon') {
                        if (!inventoryMap.has('weapons')) inventoryMap.set('weapons', new Map())
                        inventoryMap.get('weapons').set(key, value)
                    }
                }
            }
        }

        // Create subcategory name mappings
        const subcategoryNameMappings = {
            equipped: CoreUtils.i18n('DND5E.Equipped'),
            unequipped: CoreUtils.i18n('DND5E.Unequipped'),
            consumables: CoreUtils.i18n('ITEM.TypeConsumablePl'),
            containers: CoreUtils.i18n('ITEM.TypeContainerPl'),
            equipment: CoreUtils.i18n('ITEM.TypeEquipmentPl'),
            loot: CoreUtils.i18n('ITEM.TypeLootPl'),
            tools: CoreUtils.i18n('ITEM.TypeToolPl'),
            weapons: CoreUtils.i18n('ITEM.TypeWeaponPl')
        }

        // Loop through inventory subcateogry ids
        for (const subcategoryId of this.inventorySubcategoryIds) {
            if (!inventoryMap.has(subcategoryId)) continue

            // Create subcategory data
            const subcategoryData = {
                id: subcategoryId,
                name: subcategoryNameMappings[subcategoryId],
                type: 'system'
            }

            const inventory = inventoryMap.get(subcategoryId)

            // Build actions
            this._buildActions(inventory, subcategoryData)

            // Build activations
            if (this.activationSubcategoryIds) this.buildActivations(inventory, subcategoryData)
        }
    }

    /**
     * Build Rests
     * @private
     */
    _buildRests () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.includes('rests')) return

        // Exit if every actor is not the character type
        if (!this.actors.every(actor => actor.type === 'character')) return

        const actionType = 'utility'

        // Set rest types
        const restTypes = {
            shortRest: { name: CoreUtils.i18n('DND5E.ShortRest') },
            longRest: { name: CoreUtils.i18n('DND5E.LongRest') }
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

        // Create subcategory data
        const subcategoryData = { id: 'rests', type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    /**
     * Build Skills
     * @private
     */
    _buildSkills () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.includes('skills')) return

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

        // Create subcategory data
        const subcategoryData = { id: 'skills', type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    /**
     * Build Spells
     */
    _buildSpells () {
        // Exit if no subcategories exist
        if (!this.spellSubcategoryIds) return

        const actionType = 'spell'

        const spellsMap = new Map()

        // Loop through items
        for (const [key, value] of this.items) {
            const type = value.type
            if (type === 'spell') {
                const isUsableItem = this._isUsableItem(value)
                const isUsableSpell = this._isUsableSpell(value)
                if (isUsableItem && isUsableSpell) {
                    const preparationMode = value.system.preparation.mode
                    switch (preparationMode) {
                    case 'atwill':
                        if (!spellsMap.has('at-will-spells')) spellsMap.set('at-will-spells', new Map())
                        spellsMap.get('at-will-spells').set(key, value)
                        break
                    case 'innate':
                        if (!spellsMap.has('innate-spells')) spellsMap.set('innate-spells', new Map())
                        spellsMap.get('innate-spells').set(key, value)
                        break
                    case 'pact':
                        if (!spellsMap.has('pact-spells')) spellsMap.set('pact-spells', new Map())
                        spellsMap.get('pact-spells').set(key, value)
                        break
                    default:
                    { const level = value.system.level
                        switch (level) {
                        case 0:
                            if (!spellsMap.has('cantrips')) spellsMap.set('cantrips', new Map())
                            spellsMap.get('cantrips').set(key, value)
                            break
                        case 1:
                            if (!spellsMap.has('1st-level-spells')) spellsMap.set('1st-level-spells', new Map())
                            spellsMap.get('1st-level-spells').set(key, value)
                            break
                        case 2:
                            if (!spellsMap.has('2nd-level-spells')) spellsMap.set('2nd-level-spells', new Map())
                            spellsMap.get('2nd-level-spells').set(key, value)
                            break
                        case 3:
                            if (!spellsMap.has('3rd-level-spells')) spellsMap.set('3rd-level-spells', new Map())
                            spellsMap.get('3rd-level-spells').set(key, value)
                            break
                        case 4:
                            if (!spellsMap.has('4th-level-spells')) spellsMap.set('4th-level-spells', new Map())
                            spellsMap.get('4th-level-spells').set(key, value)
                            break
                        case 5:
                            if (!spellsMap.has('5th-level-spells')) spellsMap.set('5th-level-spells', new Map())
                            spellsMap.get('5th-level-spells').set(key, value)
                            break
                        case 6:
                            if (!spellsMap.has('6th-level-spells')) spellsMap.set('6th-level-spells', new Map())
                            spellsMap.get('6th-level-spells').set(key, value)
                            break
                        case 7:
                            if (!spellsMap.has('7th-level-spells')) spellsMap.set('7th-level-spells', new Map())
                            spellsMap.get('7th-level-spells').set(key, value)
                            break
                        case 8:
                            if (!spellsMap.has('8th-level-spells')) spellsMap.set('8th-level-spells', new Map())
                            spellsMap.get('8th-level-spells').set(key, value)
                            break
                        case 9:
                            if (!spellsMap.has('9th-level-spells')) spellsMap.set('9th-level-spells', new Map())
                            spellsMap.get('9th-level-spells').set(key, value)
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
            const hasLevel = value.level > 0
            if (key === 'pact') {
                if (!pactSlotAvailable && hasValue && hasMax && hasLevel) pactSlotAvailable = true
                if (!hasLevel) pactSlotAvailable = false
                value.slotAvailable = pactSlotAvailable
                pactSlot = [key, value]
            }
            if (key.startsWith('spell') && key !== 'spell0') {
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

        const subcategoryMappings = {
            '1st-level-spells': { spellMode: 1, name: CoreUtils.i18n('tokenActionHud.dnd5e.1stLevelSpells') },
            '2nd-level-spells': { spellMode: 2, name: CoreUtils.i18n('tokenActionHud.dnd5e.2ndLevelSpells') },
            '3rd-level-spells': { spellMode: 3, name: CoreUtils.i18n('tokenActionHud.dnd5e.3rdLevelSpells') },
            '4th-level-spells': { spellMode: 4, name: CoreUtils.i18n('tokenActionHud.dnd5e.4thLevelSpells') },
            '5th-level-spells': { spellMode: 5, name: CoreUtils.i18n('tokenActionHud.dnd5e.5thLevelSpells') },
            '6th-level-spells': { spellMode: 6, name: CoreUtils.i18n('tokenActionHud.dnd5e.6thLevelSpells') },
            '7th-level-spells': { spellMode: 7, name: CoreUtils.i18n('tokenActionHud.dnd5e.7thLevelSpells') },
            '8th-level-spells': { spellMode: 8, name: CoreUtils.i18n('tokenActionHud.dnd5e.8thLevelSpells') },
            '9th-level-spells': { spellMode: 9, name: CoreUtils.i18n('tokenActionHud.dnd5e.9thLevelSpells') },
            'at-will-spells': { spellMode: 'atwill', name: CoreUtils.i18n('tokenActionHud.dnd5e.atWillSpells') },
            cantrips: { spellMode: 0, name: CoreUtils.i18n('tokenActionHud.dnd5e.cantrips') },
            'innate-spells': { spellMode: 'innate', name: CoreUtils.i18n('tokenActionHud.dnd5e.innateSpells') },
            'pact-spells': { spellMode: 'pact', name: CoreUtils.i18n('tokenActionHud.dnd5e.pactSpells') }
        }

        const spellSlotModes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'pact']

        for (const subcategoryId of this.spellSubcategoryIds) {
            const spellMode = subcategoryMappings[subcategoryId].spellMode
            const subcategoryName = subcategoryMappings[subcategoryId].name

            // Skip if no spells exist
            if (!spellsMap.has(subcategoryId)) continue

            const levelInfo = (spellMode === 'pact') ? pactSlot[1] : spellSlots.find(spellSlot => spellSlot[0] === `spell${spellMode}`)?.[1]
            const slots = levelInfo?.value
            const max = levelInfo?.max
            const slotsAvailable = levelInfo?.slotAvailable

            // Skip if spells require spell slots and none are available
            if (!slotsAvailable && spellSlotModes.includes(spellMode)) continue

            // Create subcategory data=
            const subcategoryInfo = {}
            subcategoryInfo.info1 = { class: 'tah-spotlight', text: (max >= 0) ? `${slots}/${max}` : '' }
            const subcategoryData = {
                id: subcategoryId,
                name: subcategoryName,
                type: 'system',
                info: subcategoryInfo
            }

            // Add spell slot info to subcategory
            this.addSubcategoryInfo(subcategoryData)

            const spells = spellsMap.get(subcategoryId)

            // Build actions
            this._buildActions(spells, subcategoryData, actionType)

            // Build activations
            if (this.activationSubcategoryIds) { this.buildActivations(spells, subcategoryData, actionType) }
        }
    }

    /**
     * Build Utility
     * @private
     */
    _buildUtility () {
        // Exit if no subcategory exists
        if (!this.subcategoryIds.includes('utility')) return

        // Exit if every actor is not the character type
        if (!this.actors.every((actor) => actor.type === 'character')) return

        const actionType = 'utility'

        // Set utility types
        const utilityTypes = {
            deathSave: { name: CoreUtils.i18n('DND5E.DeathSave') },
            inspiration: { name: CoreUtils.i18n('DND5E.Inspiration') }
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

        // Crreate subcategory data
        const subcategoryData = { id: 'utility', type: 'system' }

        // Add actions to action list
        this.addActionsToActionList(actions, subcategoryData)
    }

    /**
     * Get Actions
     * @private
     * @param {object} items
     * @param {object} subcategoryData
     * @param {string} actionType
     */
    _buildActions (items, subcategoryData, actionType = 'item') {
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
            name += ` (${CoreUtils.i18n('DND5E.Recharge')})`
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
        const info1 = info?.info1
        const info2 = info?.info2
        const info3 = info?.info3
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
        const quantityData = this._getQuantityData(item)
        const usesData = this._getUsesData(item)
        const consumeData = this._getConsumeData(item)

        return {
            info1: { text: quantityData },
            info2: { text: usesData },
            info3: { text: consumeData }
        }
    }

    /**
     * Add Spell Info
     * @param {object} spell
     */
    _getSpellInfo (spell) {
        const components = spell.system.components

        const componentsArray = []
        const info1 = {}
        const info2 = {}
        const info3 = {}

        // Components
        if (components?.vocal) componentsArray.push(CoreUtils.i18n('DND5E.ComponentVerbal'))
        if (components?.somatic) componentsArray.push(CoreUtils.i18n('DND5E.ComponentSomatic'))
        if (components?.material) componentsArray.push(CoreUtils.i18n('DND5E.ComponentMaterial'))

        if (componentsArray.length) {
            info1.title = componentsArray.join(', ')
            info1.text = componentsArray.map(component => component.charAt(0).toUpperCase()).join('')
        }

        // Concentration
        if (components?.concentration) {
            const title = CoreUtils.i18n('DND5E.Concentration')
            info2.title = title
            info2.text = title.charAt(0).toUpperCase()
        }

        // Ritual
        if (components?.ritual) {
            const title = CoreUtils.i18n('DND5E.Ritual')
            info3.title = title
            info3.text = title.charAt(0).toUpperCase()
        }

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

        // Loop items and set those with fast activation types into the new map
        for (const [key, value] of items.entries()) {
            const activation = value.system.activation
            const activationType = value.system.activation?.type
            if (activation && !slowActivationTypes.includes(activationType)) filteredItems.set(key, value)
        }

        return filteredItems
    }

    /**
     * Get Proficiency Icon
     * @param {string} level
     * @returns {string}
     */
    _getProficiencyIcon (level) {
        const title = CONFIG.DND5E.proficiencyLevels[level] ?? ''
        const icon = PROFICIENCY_LEVEL_ICON[level]
        if (icon) return `<i class="${icon}" title="${title}"></i>`
    }

    /**
     * Get icon for the activation type
     * @param {object} activationType
     * @returns {string}
     */
    _getActivationTypeIcon (activationType) {
        const title = CONFIG.DND5E.abilityActivationTypes[activationType] ?? ''
        const icon = ACTIVATION_TYPE_ICON[activationType]
        if (icon) return `<i class="${icon}" title="${title}"></i>`
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
        const icon = (prepared) ? PREPARED_ICON : `${PREPARED_ICON} tah-icon-disabled`
        const title = (prepared) ? CoreUtils.i18n('DND5E.SpellPrepared') : CoreUtils.i18n('DND5E.SpellUnprepared')

        // Return icon if the preparation mode is 'prepared' and the spell is not a cantrip
        return (preparationMode === 'prepared' && level !== 0) ? `<i class="${icon}" title="${title}"></i>` : ''
    }
}
