// System Module Imports
import { ACTIVATION_TYPE_ICON, ACTION_TYPE, CONDITION, PREPARED_ICON, PROFICIENCY_LEVEL_ICON, RARITY, WEAPON_PROPERTY } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
    // Initialize actor and token variables
        actors = null
        tokens = null
        actorType = null

        // Initialize items variable
        items = null

        // Initialize setting variables
        abbreviateSkills = null
        displayPowerInfo = null
        showItemsWithoutActivationCosts = null
        showUnchargedItems = null
        showUnequippedItems = null
        showUnpreparedPowers = null

        // Initialize groupIds variables
        activationgroupIds = null
        featuregroupIds = null
        inventorygroupIds = null
        powergroupIds = null

        // Initialize action variables
        featureActions = null
        inventoryActions = null
        powerActions = null

        systemVersion = game.sw5e.version

        /**
         * Build System Actions
         * @override
         * @param {array} groupIds
         * @returns {object}
         */
        async buildSystemActions (groupIds) {
        // Set actor and token variables
            this.actors = (!this.actor) ? this.#getActors() : [this.actor]
            this.tokens = (!this.token) ? this.#getTokens() : [this.token]
            this.actorType = this.actor?.type

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = this.#discardSlowItems(items)
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            // Set settings variables
            this.abbreviateSkills = Utils.getSetting('abbreviateSkills')
            this.displayPowerInfo = Utils.getSetting('displayPowerInfo')
            this.showItemsWithoutActivationCosts = Utils.getSetting('showItemsWithoutActivationCosts')
            this.showUnchargedItems = Utils.getSetting('showUnchargedItems')
            this.showUnequippedItems = Utils.getSetting('showUnequippedItems')
            if (this.actorType === 'npc' && !this.showUnequippedItems) {
                this.showUnequippedItems = Utils.getSetting('showUnequippedItemsNpcs')
            }
            this.showUnpreparedPowers = Utils.getSetting('showUnpreparedPowers')

            this.activationgroupIds = [
                'actions',
                'bonus-actions',
                'crew-actions',
                'lair-actions',
                'legendary-actions',
                'reactions',
                'other-actions'
            ]

            this.featuregroupIds = [
                'active-features',
                'passive-features',
                'background-features',
                'class-features',
                'feats',
                'monster-features',
                'species-features',
                'artificer-infusions',
                'channel-divinity',
                'defensive-tactics',
                'eldritch-invocations',
                'elemental-disciplines',
                'fighting-styles',
                'hunters-prey',
                'ki-abilities',
                'maneuvers',
                'metamagic-options',
                'multiattacks',
                'pact-boons',
                'psionic-powers',
                'runes',
                'superior-hunters-defense'
            ]

            this.powergroupIds = [
                'at-Wills',
                '1st-level-powers',
                '2nd-level-powers',
                '3rd-level-powers',
                '4th-level-powers',
                '5th-level-powers',
                '6th-level-powers',
                '7th-level-powers',
                '8th-level-powers',
                '9th-level-powers',
                'at-will-powers',
                'innate-powers',
                'pact-powers'
            ]

            if (this.actorType === 'character' || this.actorType === 'npc') {
                this.inventorygroupIds = [
                    'equipped',
                    'consumables',
                    'containers',
                    'equipment',
                    'loot',
                    'tools',
                    'weapons',
                    'unequipped'
                ]

                await this.#buildCharacterActions()
            } else if (this.actorType === 'vehicle') {
                this.inventorygroupIds = [
                    'consumables',
                    'equipment',
                    'tools',
                    'weapons'
                ]

                await this.#buildVehicleActions()
            } else if (!this.actor) {
                await this.#buildMultipleTokenActions()
            }
        }

        /**
         * Build character actions
         * @private
         * @returns {object}
         */
        async #buildCharacterActions () {
            await Promise.all([
                this.#buildConditions(),
                this.#buildEffects(),
                this.#buildFeatures(),
                this.#buildInventory(),
                this.#buildPowers()
            ])
            this.#buildAbilities('ability', 'abilities')
            this.#buildAbilities('check', 'checks')
            this.#buildAbilities('save', 'saves')
            this.#buildCombat()
            this.#buildRests()
            this.#buildSkills()
            this.#buildUtility()
        }

        /**
         * Build vehicle actions
         * @private
         * @returns {object}
         */
        async #buildVehicleActions () {
            await Promise.all([
                this.#buildConditions(),
                this.#buildEffects(),
                this.#buildFeatures(),
                this.#buildInventory()
            ])
            this.#buildAbilities('ability', 'abilities')
            this.#buildAbilities('check', 'checks')
            this.#buildAbilities('save', 'saves')
            this.#buildCombat()
            this.#buildUtility()
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        async #buildMultipleTokenActions () {
            this.#buildAbilities('ability', 'abilities')
            this.#buildAbilities('check', 'checks')
            this.#buildAbilities('save', 'saves')
            this.#buildCombat()
            await this.#buildConditions()
            this.#buildRests()
            this.#buildSkills()
            this.#buildUtility()
        }

        /**
         * Build abilities
         * @private
         * @param {string} actionType
         * @param {string} groupId
         */
        #buildAbilities (actionType, groupId) {
        // Get abilities
            const abilities = (!this.actor) ? game.sw5e.config.abilities : this.actor.system.abilities

            // Exit if no abilities exist
            if (abilities.length === 0) return

            // Get actions
            const actions = Object.entries(abilities)
                .filter((ability) => abilities[ability[0]].value !== 0)
                .map(([abilityId, ability]) => {
                    const id = `${actionType}-${abilityId}`
                    const abbreviatedName = abilityId.charAt(0).toUpperCase() + abilityId.slice(1)
                    const label = this.systemVersion >= '2.2' ? game.sw5e.config.abilities[abilityId].label : game.sw5e.config.abilities[abilityId]
                    const name = this.abbreviateSkills ? abbreviatedName : label
                    // Localise
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${label}`
                    const encodedValue = [actionType, abilityId].join(this.delimiter)
                    const icon1 = (groupId !== 'checks') ? this.#getProficiencyIcon(abilities[abilityId].proficient) : ''
                    const mod = (groupId !== 'saves') ? ability?.mod : ((groupId === 'saves') ? ability?.save : '')
                    const info1 = (this.actor) ? { text: coreModule.api.Utils.getModifier(mod) } : null
                    const info2 = (this.actor && groupId === 'abilities') ? { text: `(${coreModule.api.Utils.getModifier(ability?.save)})` } : null
                    return {
                        id,
                        name,
                        encodedValue,
                        icon1,
                        info1,
                        info2,
                        listName
                    }
                })

            // Create group data
            const groupData = { id: groupId, type: 'system' }

            // Add actions to action list
            this.addActions(actions, groupData)
        }

        /**
         * Build activations
         * @param {array} items       The items
         * @param {object} groupData  The group data
         * @param {string} actionType The action type
         */
        async #buildActivations (items, groupData, actionType = 'item') {
        // Create map of items according to activation type
            const activationItems = new Map()

            // Create activation type mappings
            const activationTypeMappings = {
                action: 'actions',
                bonus: 'bonus-actions',
                crew: 'crew-actions',
                lair: 'lair-actions',
                legendary: 'legendary-actions',
                reaction: 'reactions',
                reactiondamage: 'reactions',
                reactionmanual: 'reactions',
                other: 'other-actions'
            }

            // Loop through items
            for (const [key, value] of items) {
                const activationType = value.system?.activation?.type
                const activationTypeOther = (Object.keys(activationTypeMappings).includes(activationType)) ? activationType : 'other'
                const groupId = activationTypeMappings[activationTypeOther]
                if (!activationItems.has(groupId)) activationItems.set(groupId, new Map())
                activationItems.get(groupId).set(key, value)
            }

            // Loop through action group ids
            for (const activationGroupId of this.activationgroupIds) {
                // Skip if no items exist
                if (!activationItems.has(activationGroupId)) continue

                // Clone and add to group data
                const groupDataClone = { ...groupData, id: `${activationGroupId}+${groupData.id}`, type: 'system-derived' }

                // Set Equipped and Unequipped groups to not selected by default
                if (['equipped', 'unequipped'].includes(groupData.id)) { groupDataClone.defaultSelected = false }

                // Create parent group data
                const parentgroupData = { id: activationGroupId, type: 'system' }

                // Add group to HUD
                await this.addGroup(groupDataClone, parentgroupData)

                // Add power slot info to group
                this.addGroupInfo(groupData)

                // Build actions
                await this.#buildActions(activationItems.get(activationGroupId), groupDataClone, actionType)
            }
        }

        /**
         * Build combat
         * @private
         */
        #buildCombat () {
            const actionType = 'utility'

            // Set combat types
            const combatTypes = {
                initiative: { id: 'initiative', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.rollInitiative') },
                endTurn: { id: 'endTurn', name: coreModule.api.Utils.i18n('tokenActionHud.endTurn') }
            }

            // Delete endTurn for multiple tokens
            if (game.combat?.current?.tokenId !== this.token?.id) delete combatTypes.endTurn

            // Get actions
            const actions = Object.entries(combatTypes).map((combatType) => {
                const id = combatType[1].id
                const name = combatType[1].name
                const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                const listName = `${actionTypeName}${name}`
                const encodedValue = [actionType, id].join(this.delimiter)
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
                    listName
                }
            })

            // Create group data
            const groupData = { id: 'combat', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build conditions
         * @private
         */
        async #buildConditions () {
            if (this.tokens?.length === 0) return

            const actionType = 'condition'

            // Get conditions
            const conditions = CONFIG.statusEffects.filter((condition) => condition.id !== '')

            // Exit if no conditions exist
            if (conditions.length === 0) return

            // Get actions
            const actions = await Promise.all(conditions.map(async (condition) => {
                const id = condition.id
                const name = coreModule.api.Utils.i18n(condition.label) ?? condition.name
                const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                const listName = `${actionTypeName}${name}`
                const encodedValue = [actionType, id].join(this.delimiter)
                const active = this.actors.every((actor) => {
                    if (game.version.startsWith('11')) {
                        return actor.effects.some(effect => effect.statuses.some(status => status === id) && !effect?.disabled)
                    } else {
                        // V10
                        return actor.effects.some(effect => effect.flags?.core?.statusId === id && !effect?.disabled)
                    }
                })
                    ? ' active'
                    : ''
                const cssClass = `toggle${active}`
                const img = coreModule.api.Utils.getImage(condition)
                const tooltipData = await this.#getConditionTooltipData(id, name)
                const tooltip = await this.#getTooltip(tooltipData)
                return {
                    id,
                    name,
                    encodedValue,
                    img,
                    cssClass,
                    listName,
                    tooltip
                }
            }))

            // Create group data
            const groupData = { id: 'conditions', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build effects
         * @private
         */
        async #buildEffects () {
            const actionType = 'effect'

            // Get effects
            const effects = this.actor.effects

            // Exit if no effects exist
            if (effects.size === 0) return

            // Map passive and temporary effects to new maps
            const passiveEffects = new Map()
            const temporaryEffects = new Map()

            // Iterate effects and add to a map based on the isTemporary value
            for (const [effectId, effect] of effects.entries()) {
                const isTemporary = effect.isTemporary
                if (isTemporary) {
                    temporaryEffects.set(effectId, effect)
                } else {
                    passiveEffects.set(effectId, effect)
                }
            }

            await Promise.all([
                // Build passive effects
                this.#buildActions(passiveEffects, { id: 'passive-effects', type: 'system' }, actionType),
                // Build temporary effects
                this.#buildActions(temporaryEffects, { id: 'temporary-effects', type: 'system' }, actionType)
            ])
        }

        /**
         * Build features
         * @private
         */
        async #buildFeatures () {
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
            const featuresMap = new Map()

            const featureTypes = [
                { type: 'background', groupId: 'background-features' },
                { type: 'class', groupId: 'class-features' },
                { type: 'monster', groupId: 'monster-features' },
                { type: 'species', groupId: 'species-features' },
                { type: 'feats', groupId: 'feats' }
            ]

            const classFeatureTypes = [
                { type: 'artificerInfusion', groupId: 'artificer-infusions' },
                { type: 'channelDivinity', groupId: 'channel-divinity' },
                { type: 'defensiveTactic', groupId: 'defensive-tactics' },
                { type: 'eldritchInvocation', groupId: 'eldritch-invocations' },
                { type: 'elementalDiscipline', groupId: 'elemental-disciplines' },
                { type: 'fightingStyle', groupId: 'fighting-styles' },
                { type: 'huntersPrey', groupId: 'hunters-prey' },
                { type: 'ki', groupId: 'ki-abilities' },
                { type: 'maneuver', groupId: 'maneuvers' },
                { type: 'metamagic', groupId: 'metamagic-options' },
                { type: 'multiattack', groupId: 'multiattacks' },
                { type: 'pact', groupId: 'pact-boons' },
                { type: 'psionicPower', groupId: 'psionic-powers' },
                { type: 'rune', groupId: 'runes' },
                { type: 'superiorHuntersDefense', groupId: 'superior-hunters-defense' }
            ]

            for (const [key, value] of feats) {
                const activationType = value.system.activation?.type
                const type = value.system.type.value
                const subType = value.system.type?.subtype
                if (activationType) {
                    if (!featuresMap.has('active-features')) featuresMap.set('active-features', new Map())
                    featuresMap.get('active-features').set(key, value)
                }
                if (!activationType || activationType === '') {
                    if (!featuresMap.has('passive-features')) featuresMap.set('passive-features', new Map())
                    featuresMap.get('passive-features').set(key, value)
                }
                for (const featureType of featureTypes) {
                    const groupId = featureType.groupId
                    if (featureType.type === type) {
                        if (!featuresMap.has(groupId)) featuresMap.set(groupId, new Map())
                        featuresMap.get(groupId).set(key, value)
                    }
                }
                for (const featureType of classFeatureTypes) {
                    const groupId = featureType.groupId
                    if (subType && featureType.type === subType) {
                        if (!featuresMap.has(groupId)) featuresMap.set(groupId, new Map())
                        featuresMap.get(groupId).set(key, value)
                    }
                }
            }

            // Create group name mappings
            const groupNameMappings = {
                'active-features': coreModule.api.Utils.i18n('tokenActionHud.sw5e.activeFeatures'),
                'passive-features': coreModule.api.Utils.i18n('tokenActionHud.sw5e.passiveFeatures')
            }

            // Loop through inventory groups ids
            for (const groupId of this.featuregroupIds) {
                if (!featuresMap.has(groupId)) continue

                // Create group data
                const groupData = {
                    id: groupId,
                    name: groupNameMappings[groupId] ?? '',
                    type: 'system'
                }

                const features = featuresMap.get(groupId)

                // Build actions
                await this.#buildActions(features, groupData, actionType)

                // Build activations
                if (groupNameMappings[groupId]) await this.#buildActivations(features, groupData, actionType)
            }
        }

        /**
         * Build inventory
         * @private
         */
        async #buildInventory () {
        // Exit early if no items exist
            if (this.items.size === 0) return

            const inventoryMap = new Map()

            for (const [key, value] of this.items) {
            // Set variables
                const equipped = value.system.equipped
                const hasQuantity = value.system?.quantity > 0
                const isActiveItem = this.#isActiveItem(value)
                const isUsableItem = this.#isUsableItem(value)
                const isEquippedItem = this.#isEquippedItem(value)
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

            // Create group name mappings
            const groupNameMappings = {
                equipped: coreModule.api.Utils.i18n('SW5E.Equipped'),
                unequipped: coreModule.api.Utils.i18n('SW5E.Unequipped'),
                consumables: coreModule.api.Utils.i18n('ITEM.TypeConsumablePl'),
                containers: coreModule.api.Utils.i18n('ITEM.TypeContainerPl'),
                equipment: coreModule.api.Utils.i18n('ITEM.TypeEquipmentPl'),
                loot: coreModule.api.Utils.i18n('ITEM.TypeLootPl'),
                tools: coreModule.api.Utils.i18n('ITEM.TypeToolPl'),
                weapons: coreModule.api.Utils.i18n('ITEM.TypeWeaponPl')
            }

            // Loop through inventory subcateogry ids
            for (const groupId of this.inventorygroupIds) {
                if (!inventoryMap.has(groupId)) continue

                // Create group data
                const groupData = {
                    id: groupId,
                    name: groupNameMappings[groupId],
                    type: 'system'
                }

                const inventory = inventoryMap.get(groupId)

                // Build actions
                await this.#buildActions(inventory, groupData)

                // Build activations
                if (this.activationgroupIds) {
                    await this.#buildActivations(inventory, groupData)
                }
            }
        }

        /**
         * Build rests
         * @private
         */
        #buildRests () {
            // Exit if every actor is not the character type
            if (this.actors.length === 0) return
            if (!this.actors.every(actor => actor.type === 'character')) return

            const actionType = 'utility'

            // Set rest types
            const restTypes = {
                shortRest: { name: coreModule.api.Utils.i18n('SW5E.ShortRest') },
                longRest: { name: coreModule.api.Utils.i18n('SW5E.LongRest') }
            }

            // Get actions
            const actions = Object.entries(restTypes)
                .map((restType) => {
                    const id = restType[0]
                    const name = restType[1].name
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${name}`
                    const encodedValue = [actionType, id].join(this.delimiter)
                    return {
                        id,
                        name,
                        encodedValue,
                        listName
                    }
                })

            // Create group data
            const groupData = { id: 'rests', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build skills
         * @private
         */
        #buildSkills () {
            const actionType = 'skill'

            // Get skills
            const skills = (!this.actor) ? game.sw5e.config.skills : this.actor.system.skills

            // Exit if there are no skills
            if (skills.length === 0) return

            // Get actions
            const actions = Object.entries(skills)
                .map((skill) => {
                    try {
                        const id = skill[0]
                        const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                        const name = this.abbreviateSkills ? abbreviatedName : game.sw5e.config.skills[id].label
                        const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                        const listName = `${actionTypeName}${game.sw5e.config.skills[id].label}`
                        const encodedValue = [actionType, id].join(this.delimiter)
                        const icon1 = this.#getProficiencyIcon(skills[id].value)
                        const mod = skills[id].total
                        const info1 = (this.actor) ? { text: (mod || mod === 0) ? `${(mod >= 0) ? '+' : ''}${mod}` : '' } : ''
                        return {
                            id,
                            name,
                            encodedValue,
                            icon1,
                            info1,
                            listName
                        }
                    } catch (error) {
                        coreModule.api.Logger.error(skill)
                        return null
                    }
                })
                .filter((skill) => !!skill)

            // Create group data
            const groupData = { id: 'skills', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build powers
         */
        async #buildPowers () {
            const actionType = 'power'

            const powersMap = new Map()

            // Loop through items
            for (const [key, value] of this.items) {
                const type = value.type
                if (type === 'power') {
                    const isUsableItem = this.#isUsableItem(value)
                    const isUsablePower = this.#isUsablePower(value)
                    if (isUsableItem && isUsablePower) {
                        const preparationMode = value.system.preparation.mode
                        switch (preparationMode) {
                        case 'atwill':
                            if (!powersMap.has('at-will-powers')) powersMap.set('at-will-powers', new Map())
                            powersMap.get('at-will-powers').set(key, value)
                            break
                        case 'innate':
                            if (!powersMap.has('innate-powers')) powersMap.set('innate-powers', new Map())
                            powersMap.get('innate-powers').set(key, value)
                            break
                        case 'pact':
                            if (!powersMap.has('pact-powers')) powersMap.set('pact-powers', new Map())
                            powersMap.get('pact-powers').set(key, value)
                            break
                        default:
                        { const level = value.system.level
                            switch (level) {
                            case 0:
                                if (!powersMap.has('at-Wills')) powersMap.set('at-Wills', new Map())
                                powersMap.get('at-Wills').set(key, value)
                                break
                            case 1:
                                if (!powersMap.has('1st-level-powers')) powersMap.set('1st-level-powers', new Map())
                                powersMap.get('1st-level-powers').set(key, value)
                                break
                            case 2:
                                if (!powersMap.has('2nd-level-powers')) powersMap.set('2nd-level-powers', new Map())
                                powersMap.get('2nd-level-powers').set(key, value)
                                break
                            case 3:
                                if (!powersMap.has('3rd-level-powers')) powersMap.set('3rd-level-powers', new Map())
                                powersMap.get('3rd-level-powers').set(key, value)
                                break
                            case 4:
                                if (!powersMap.has('4th-level-powers')) powersMap.set('4th-level-powers', new Map())
                                powersMap.get('4th-level-powers').set(key, value)
                                break
                            case 5:
                                if (!powersMap.has('5th-level-powers')) powersMap.set('5th-level-powers', new Map())
                                powersMap.get('5th-level-powers').set(key, value)
                                break
                            case 6:
                                if (!powersMap.has('6th-level-powers')) powersMap.set('6th-level-powers', new Map())
                                powersMap.get('6th-level-powers').set(key, value)
                                break
                            case 7:
                                if (!powersMap.has('7th-level-powers')) powersMap.set('7th-level-powers', new Map())
                                powersMap.get('7th-level-powers').set(key, value)
                                break
                            case 8:
                                if (!powersMap.has('8th-level-powers')) powersMap.set('8th-level-powers', new Map())
                                powersMap.get('8th-level-powers').set(key, value)
                                break
                            case 9:
                                if (!powersMap.has('9th-level-powers')) powersMap.set('9th-level-powers', new Map())
                                powersMap.get('9th-level-powers').set(key, value)
                                break
                            }
                        }
                        }
                    }
                }
            }

            // Reverse sort power slots by level
            const systemPowers = Object.entries(this.actor.system.powers).reverse()

            // Set power slot availability
            let pactSlot = null
            const powerSlots = []
            let powerSlotAvailable = this.showUnchargedItems
            let pactSlotAvailable = this.showUnchargedItems
            for (const [key, value] of systemPowers) {
                const hasValue = value.value > 0
                const hasMax = value.max > 0
                const hasLevel = value.level > 0
                if (key === 'pact') {
                    if (!pactSlotAvailable && hasValue && hasMax && hasLevel) pactSlotAvailable = true
                    if (!hasLevel) pactSlotAvailable = false
                    value.slotAvailable = pactSlotAvailable
                    pactSlot = [key, value]
                }
                if (key.startsWith('power') && key !== 'power0') {
                    if (!powerSlotAvailable && hasValue && hasMax) powerSlotAvailable = true
                    value.slotAvailable = powerSlotAvailable
                    powerSlots.push([key, value])
                } else {
                    if (hasValue) {
                        value.slotsAvailable = true
                        powerSlots.push(key, value)
                    }
                }
            }

            // Set equivalent power slot where pact slot is available
            if (pactSlot[1].slotAvailable) {
                const pactPowerEquivalent = powerSlots.findIndex(power => power[0] === 'power' + pactSlot[1].level)
                powerSlots[pactPowerEquivalent][1].slotsAvailable = true
            }

            const groupMappings = {
                '1st-level-powers': { powerMode: 1, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.1stLevelPowers') },
                '2nd-level-powers': { powerMode: 2, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.2ndLevelPowers') },
                '3rd-level-powers': { powerMode: 3, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.3rdLevelPowers') },
                '4th-level-powers': { powerMode: 4, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.4thLevelPowers') },
                '5th-level-powers': { powerMode: 5, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.5thLevelPowers') },
                '6th-level-powers': { powerMode: 6, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.6thLevelPowers') },
                '7th-level-powers': { powerMode: 7, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.7thLevelPowers') },
                '8th-level-powers': { powerMode: 8, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.8thLevelPowers') },
                '9th-level-powers': { powerMode: 9, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.9thLevelPowers') },
                'at-will-powers': { powerMode: 'atwill', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.atWillPowers') },
                at-Wills: { powerMode: 0, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.at-Wills') },
                'innate-powers': { powerMode: 'innate', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.innatePowers') },
                'pact-powers': { powerMode: 'pact', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.pactPowers') }
            }

            const powerSlotModes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'pact']

            for (const groupId of this.powergroupIds) {
                const powerMode = groupMappings[groupId].powerMode
                const groupName = groupMappings[groupId].name

                // Skip if no powers exist
                if (!powersMap.has(groupId)) continue

                const levelInfo = (powerMode === 'pact') ? pactSlot[1] : powerSlots.find(powerSlot => powerSlot[0] === `power${powerMode}`)?.[1]
                const slots = levelInfo?.value
                const max = levelInfo?.max
                const slotsAvailable = levelInfo?.slotAvailable

                // Skip if powers require power slots and none are available
                if (!slotsAvailable && powerSlotModes.includes(powerMode)) continue

                // Create group data=
                const groupInfo = {}
                groupInfo.info1 = { class: 'tah-spotlight', text: (max >= 0) ? `${slots}/${max}` : '' }
                const groupData = {
                    id: groupId,
                    name: groupName,
                    type: 'system',
                    info: groupInfo
                }

                // Add power slot info to group
                this.addGroupInfo(groupData)

                const powers = powersMap.get(groupId)

                // Build actions
                await this.#buildActions(powers, groupData, actionType)

                // Build activations
                if (this.activationgroupIds) { await this.#buildActivations(powers, groupData, actionType) }
            }
        }

        /**
         * Build utility
         * @private
         */
        #buildUtility () {
            // Exit if every actor is not the character type
            if (this.actors.length === 0) return
            if (!this.actors.every((actor) => actor.type === 'character')) return

            const actionType = 'utility'

            // Set utility types
            const utilityTypes = {
                deathSave: { name: coreModule.api.Utils.i18n('SW5E.DeathSave') },
                inspiration: { name: coreModule.api.Utils.i18n('SW5E.Inspiration') }
            }

            // Delete 'deathSave' for multiple tokens
            if (!this.actor || this.actor.system.attributes.hp.value > 0) delete utilityTypes.deathSave

            // Get actions
            const actions = Object.entries(utilityTypes)
                .map((utilityType) => {
                    const id = utilityType[0]
                    const name = utilityType[1].name
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${name}`
                    const encodedValue = [actionType, id].join(this.delimiter)
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
                        listName
                    }
                })

            // Crreate group data
            const groupData = { id: 'utility', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build actions
         * @private
         * @param {object} items
         * @param {object} groupData
         * @param {string} actionType
         */
        async #buildActions (items, groupData, actionType = 'item') {
        // Exit if there are no items
            if (items.size === 0) return

            // Exit if there is no groupId
            const groupId = (typeof groupData === 'string' ? groupData : groupData?.id)
            if (!groupId) return

            // Get actions
            const actions = await Promise.all([...items].map(async item => await this.#getAction(actionType, item[1])))

            // Add actions to action list
            this.addActions(actions, groupData)
        }

        /**
         * Get action
         * @private
         * @param {string} actionType
         * @param {object} entity
         * @returns {object}
         */
        async #getAction (actionType, entity) {
            const id = entity.id ?? entity._id
            let name = entity?.name ?? entity?.label
            if (
                entity?.system?.recharge &&
            !entity?.system?.recharge?.charged &&
            entity?.system?.recharge?.value
            ) {
                name += ` (${coreModule.api.Utils.i18n('SW5E.Recharge')})`
            }
            const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
            const listName = `${actionTypeName}${name}`
            let cssClass = ''
            if (Object.hasOwn(entity, 'disabled')) {
                const active = (!entity.disabled) ? ' active' : ''
                cssClass = `toggle${active}`
            }
            const encodedValue = [actionType, id].join(this.delimiter)
            const img = coreModule.api.Utils.getImage(entity)
            const icon1 = this.#getActivationTypeIcon(entity?.system?.activation?.type)
            let icon2 = null
            let info = null
            if (entity.type === 'power') {
                icon2 = this.#getPreparedIcon(entity)
                if (this.displayPowerInfo) info = this.#getPowerInfo(entity)
            } else {
                info = this.#getItemInfo(entity)
            }
            const info1 = info?.info1
            const info2 = info?.info2
            const info3 = info?.info3
            const tooltipData = await this.#getTooltipData(entity)
            const tooltip = await this.#getTooltip(tooltipData)
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
                listName,
                tooltip
            }
        }

        /**
         * Is active item
         * @param {object} item
         * @returns {boolean}
         */
        #isActiveItem (item) {
            if (this.showItemsWithoutActivationCosts) return true
            const activationTypes = Object.keys(game.sw5e.config.abilityActivationTypes).filter((at) => at !== 'none')
            const activation = item.system.activation
            const activationType = activation?.type
            if (activation && activationTypes.includes(activationType)) return true
            return false
        }

        /**
         * Is equipped item
         * @private
         * @param {object} item
         * @returns {boolean}
         */
        #isEquippedItem (item) {
            const type = item.type
            const excludedTypes = ['consumable', 'power', 'feat']
            if (this.showUnequippedItems && !excludedTypes.includes(type)) return true
            const equipped = item.system.equipped
            if (equipped && type !== 'consumable') return true
            return false
        }

        /**
         * Is usable item
         * @private
         * @param {object} item The item
         * @returns {boolean}
         */
        #isUsableItem (item) {
            if (this.showUnchargedItems) return true
            const uses = item.system.uses
            if (!uses) return false
            return true
        }

        /**
         * Is usable power
         * @param {object} power  The power
         * @returns {boolean}
         */
        #isUsablePower (power) {
            if (this.actorType !== 'character' && this.showUnequippedItems) return true
            const prepared = power.system.preparation.prepared
            if (this.showUnpreparedPowers) return true
            // Set variables
            const level = power.system.level
            const preparationModes = Object.keys(game.sw5e.config.powerPreparationModes)
                .filter(preparationMode => preparationMode !== 'prepared')
            const preparationMode = power.system.preparation.mode

            // Return true if power is an at-Will, has a preparation mode other than 'prepared' or is prepared
            if (level === 0 || preparationModes.includes(preparationMode) || prepared) return true
            return false
        }

        /**
         * Get item info
         * @private
         * @param {object} item
         * @returns {object}
         */
        #getItemInfo (item) {
            const quantityData = this.#getQuantityData(item)
            const usesData = this.#getUsesData(item)
            const consumeData = this.#getConsumeData(item)

            return {
                info1: { text: quantityData },
                info2: { text: usesData },
                info3: { text: consumeData }
            }
        }

        /**
         * Add power info
         * @param {object} power
         */
        #getPowerInfo (power) {
            const components = power.system.components

            const componentsArray = []
            const info1 = {}
            const info2 = {}
            const info3 = {}

            // Components
            if (components?.vocal) componentsArray.push(coreModule.api.Utils.i18n('SW5E.ComponentVerbal'))
            if (components?.somatic) componentsArray.push(coreModule.api.Utils.i18n('SW5E.ComponentSomatic'))
            if (components?.material) componentsArray.push(coreModule.api.Utils.i18n('SW5E.ComponentMaterial'))

            if (componentsArray.length) {
                info1.title = componentsArray.join(', ')
                info1.text = componentsArray.map(component => component.charAt(0).toUpperCase()).join('')
            }

            // Concentration
            if (components?.concentration) {
                const title = coreModule.api.Utils.i18n('SW5E.Concentration')
                info2.title = title
                info2.text = title.charAt(0).toUpperCase()
            }

            // Ritual
            if (components?.ritual) {
                const title = coreModule.api.Utils.i18n('SW5E.Ritual')
                info3.title = title
                info3.text = title.charAt(0).toUpperCase()
            }

            return { info1, info2, info3 }
        }

        /**
         * Get actors
         * @private
         * @returns {object}
         */
        #getActors () {
            const allowedTypes = ['character', 'npc']
            const actors = canvas.tokens.controlled.filter(token => token.actor).map((token) => token.actor)
            if (actors.every((actor) => allowedTypes.includes(actor.type))) {
                return actors
            } else {
                return []
            }
        }

        /**
         * Get tokens
         * @private
         * @returns {object}
         */
        #getTokens () {
            const allowedTypes = ['character', 'npc']
            const tokens = canvas.tokens.controlled
            const actors = tokens.filter(token => token.actor).map((token) => token.actor)
            if (actors.every((actor) => allowedTypes.includes(actor.type))) {
                return tokens
            } else {
                return []
            }
        }

        /**
         * Get quantity
         * @private
         * @param {object} item
         * @returns {string}
         */
        #getQuantityData (item) {
            const quantity = item?.system?.quantity ?? 0
            return (quantity > 1) ? quantity : ''
        }

        /**
         * Get uses
         * @private
         * @param {object} item
         * @returns {string}
         */
        #getUsesData (item) {
            const uses = item?.system?.uses
            if (!uses) return ''
            return (uses.value > 0 || uses.max > 0) ? `${uses.value ?? '0'}${(uses.max > 0) ? `/${uses.max}` : ''}` : ''
        }

        /**
         * Get consume
         * @private
         * @param {object} item
         * @param {object} actor
         * @returns {string}
         */
        #getConsumeData (item) {
        // Get consume target and type
            const consumeId = item?.system?.consume?.target
            const consumeType = item?.system?.consume?.type

            if (consumeId === item.id) return ''

            // Return resources
            if (consumeType === 'attribute') {
                if (!consumeId) return ''
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
         * Discard slow items
         * @private
         * @param {object} items
         * @returns {object}
         */
        #discardSlowItems (items) {
            // Get setting
            const showSlowActions = Utils.getSetting('showSlowActions')

            // Return all items
            if (showSlowActions) return items

            // Return filtered items
            const slowActivationTypes = ['minute', 'hour', 'day']

            // Initialize map
            const filteredItems = new Map()

            // Loop items and set those with fast activation types into the new map
            for (const [key, value] of items.entries()) {
                const activationType = value.system?.activation?.type
                if (!slowActivationTypes.includes(activationType)) filteredItems.set(key, value)
            }

            return filteredItems
        }

        /**
         * Get proficiency icon
         * @param {string} level
         * @returns {string}
         */
        #getProficiencyIcon (level) {
            const title = CONFIG.SW5E.proficiencyLevels[level] ?? ''
            const icon = PROFICIENCY_LEVEL_ICON[level]
            if (icon) return `<i class="${icon}" title="${title}"></i>`
        }

        /**
         * Get icon for the activation type
         * @private
         * @param {object} activationType
         * @returns {string}
         */
        #getActivationTypeIcon (activationType) {
            const title = CONFIG.SW5E.abilityActivationTypes[activationType] ?? ''
            const icon = ACTIVATION_TYPE_ICON[activationType]
            if (icon) return `<i class="${icon}" title="${title}"></i>`
        }

        /**
         * Get icon for a prepared power
         * @private
         * @param {boolean} prepararation
         * @returns
         */
        #getPreparedIcon (power) {
            const level = power.system.level
            const preparationMode = power.system.preparation.mode
            const prepared = power.system.preparation.prepared
            const icon = (prepared) ? PREPARED_ICON : `${PREPARED_ICON} tah-icon-disabled`
            const title = (prepared) ? coreModule.api.Utils.i18n('SW5E.PowerPrepared') : coreModule.api.Utils.i18n('SW5E.PowerUnprepared')

            // Return icon if the preparation mode is 'prepared' and the power is not an at-Will
            return (preparationMode === 'prepared' && level !== 0) ? `<i class="${icon}" title="${title}"></i>` : ''
        }

        async #getTooltipData (entity) {
            if (this.tooltipsSetting === 'none') return ''

            const name = entity?.name ?? ''

            if (this.tooltipsSetting === 'nameOnly') return name

            const description = (typeof entity?.system?.description === 'string') ? entity?.system?.description : entity?.system?.description?.value ?? ''
            const modifiers = entity?.modifiers ?? null
            const properties = [
                ...entity.system?.chatProperties ?? [],
                ...entity.system?.equippableItemChatProperties ?? [],
                ...entity.system?.activatedEffectChatProperties ?? []
            ].filter(p => p)
            const rarity = entity?.rarity ?? null
            const traits = (entity?.type === 'weapon') ? this.#getWeaponProperties(entity?.system?.properties) : null
            return { name, description, modifiers, properties, rarity, traits }
        }

        /**
         * Get condition tooltip data
         * @param {*} id     The condition id
         * @param {*} name   The condition name
         * @returns {object} The tooltip data
         */
        async #getConditionTooltipData (id, name) {
            if (this.tooltipsSetting === 'none') return ''
            if (this.tooltipsSetting === 'nameOnly') return name

            const journalEntry = (CONDITION[id]) ? (CONDITION[id]?.uuid) ? await fromUuid(CONDITION[id].uuid) : null : null
            const description = journalEntry?.text?.content ?? ''
            return {
                name,
                description
            }
        }

        /**
         * Get tooltip
         * @param {object} tooltipData The tooltip data
         * @returns {string}           The tooltip
         */
        async #getTooltip (tooltipData) {
            if (this.tooltipsSetting === 'none') return ''
            if (typeof tooltipData === 'string') return tooltipData

            const name = coreModule.api.Utils.i18n(tooltipData.name)

            if (this.tooltipsSetting === 'nameOnly') return name

            const nameHtml = `<h3>${name}</h3>`

            const description = tooltipData?.descriptionLocalised ??
                await TextEditor.enrichHTML(coreModule.api.Utils.i18n(tooltipData?.description ?? ''), { async: true })

            const rarityHtml = tooltipData?.rarity
                ? `<span class="tah-tag ${tooltipData.rarity}">${coreModule.api.Utils.i18n(RARITY[tooltipData.rarity])}</span>`
                : ''

            const propertiesHtml = tooltipData?.properties
                ? `<div class="tah-properties">${tooltipData.properties.map(property => `<span class="tah-property">${coreModule.api.Utils.i18n(property)}</span>`).join('')}</div>`
                : ''

            const traitsHtml = tooltipData?.traits
                ? tooltipData.traits.map(trait => `<span class="tah-tag">${coreModule.api.Utils.i18n(trait.label ?? trait)}</span>`).join('')
                : ''

            const traits2Html = tooltipData?.traits2
                ? tooltipData.traits2.map(trait => `<span class="tah-tag tah-tag-secondary">${coreModule.api.Utils.i18n(trait.label ?? trait)}</span>`).join('')
                : ''

            const traitsAltHtml = tooltipData?.traitsAlt
                ? tooltipData.traitsAlt.map(trait => `<span class="tah-tag tah-tag-alt">${coreModule.api.Utils.i18n(trait.label)}</span>`).join('')
                : ''

            const modifiersHtml = tooltipData?.modifiers
                ? `<div class="tah-tags">${tooltipData.modifiers.filter(modifier => modifier.enabled).map(modifier => {
                    const label = coreModule.api.Utils.i18n(modifier.label)
                    const sign = modifier.modifier >= 0 ? '+' : ''
                    const mod = `${sign}${modifier.modifier ?? ''}`
                    return `<span class="tah-tag tah-tag-transparent">${label} ${mod}</span>`
                }).join('')}</div>`
                : ''

            const tagsJoined = [rarityHtml, traitsHtml, traits2Html, traitsAltHtml].join('')

            const tagsHtml = (tagsJoined) ? `<div class="tah-tags">${tagsJoined}</div>` : ''

            const headerTags = (tagsHtml || modifiersHtml) ? `<div class="tah-tags-wrapper">${tagsHtml}${modifiersHtml}</div>` : ''

            if (!description && !tagsHtml && !modifiersHtml) return name

            return `<div>${nameHtml}${headerTags}${description}${propertiesHtml}</div>`
        }

        #getWeaponProperties (weaponProperties) {
            if (!weaponProperties) return null
            return Object.entries(weaponProperties)
                .filter(([id, selected]) => selected && WEAPON_PROPERTY[id])
                .map(([id, _]) => coreModule.api.Utils.i18n(WEAPON_PROPERTY[id]))
        }
    }
})
