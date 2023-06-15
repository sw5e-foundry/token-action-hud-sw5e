// System Module Imports
import { ACTIVATION_TYPE_ICON, ACTION_TYPE, PREPARED_ICON, PROFICIENCY_LEVEL_ICON, GROUP } from './constants.js'
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
        activationGroupIds = null
        featureGroupIds = null
        inventoryGroupIds = null
        powerGroupIds = null

        // Initialize action variables
        featureActions = null
        inventoryActions = null
        powerActions = null

        /**
         * Build System Actions
         * @override
         * @param {array} groupIds
         * @returns {object}
         */
        async buildSystemActions (groupIds) {
        // Set actor and token variables
            this.actors = (!this.actor) ? this._getActors() : [this.actor]
            this.tokens = (!this.token) ? this._getTokens() : [this.token]
            this.actorType = this.actor?.type

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = this._discardSlowItems(items)
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            // Set settings variables
            this.abbreviateSkills = Utils.getSetting('abbreviateSkills')
            this.displayPowerInfo = Utils.getSetting('displayPowerInfo')
            this.showItemsWithoutActivationCosts = Utils.getSetting('showItemsWithoutActivationCosts')
            this.showUnchargedItems = Utils.getSetting('showUnchargedItems')
            this.showUnequippedItems = Utils.getSetting('showUnequippedItems')
            this.showUnpreparedPowers = Utils.getSetting('showUnpreparedPowers')

            this.activationGroupIds = [
                'actions',
                'bonus-actions',
                'crew-actions',
                'lair-actions',
                'legendary-actions',
                'reactions',
                'other-actions'
            ]

            this.featureGroupIds = [
                'active-features',
                'passive-features',
                'background-features',
                'class-features',
                'feats',
                'monster-features',
                'species-features',
                'defensive-tactics',
                'fighting-styles',
                'maneuvers',
                'metamagic-options',
                'multiattacks',
                'runes',
            ]

            this.powerGroupIds = [
                'at-will-powers',
                'innate-powers',
                '1st-level-powers',
                '2nd-level-powers',
                '3rd-level-powers',
                '4th-level-powers',
                '5th-level-powers',
                '6th-level-powers',
                '7th-level-powers',
                '8th-level-powers',
                '9th-level-powers'
            ]

            if (["character", "npc"].includes(this.actorType)) {
                this.inventoryGroupIds = [
                    'equipped',
                    'consumables',
                    'containers',
                    'equipment',
                    'loot',
                    'tools',
                    'weapons',
                    'unequipped'
                ]

                this._buildCharacterActions()
            }

            if (this.actorType === 'starship') {
                this.inventoryGroupIds = [
                    'equipped',
                    'consumables',
                    'containers',
                    'equipment',
                    'loot',
                    'tools',
                    'weapons',
                    'unequipped'
                ]

                this._buildStarshipActions()
            }

            if (this.actorType === 'vehicle') {
                this.inventoryGroupIds = [
                    'consumables',
                    'equipment',
                    'tools',
                    'weapons'
                ]

                this._buildVehicleActions()
            }
            if (!this.actor) {
                this._buildMultipleTokenActions()
            }
        }

        /**
         * Build Character Actions
         * @private
         * @returns {object}
         */
        async _buildCharacterActions () {
            this._buildAbilities('ability', 'abilities')
            this._buildAbilities('check', 'checks')
            this._buildAbilities('save', 'saves')
            this._buildCombat()
            this._buildConditions()
            this._buildEffects()
            this._buildFeatures()
            this._buildInventory()
            this._buildRests()
            this._buildRepairs()
            this._buildSkills()
            this._buildPowers()
            this._buildUtility()
        }

        /**
         * Build Starship Actions
         * @private
         * @returns {object}
         */
        async _buildStarshipActions () {
            this._buildAbilities('ability', 'abilities')
            this._buildAbilities('check', 'checks')
            this._buildAbilities('save', 'saves')
            this._buildCombat()
            this._buildConditions()
            this._buildEffects()
            this._buildFeatures()
            this._buildInventory()
            this._buildRepairs()
            this._buildStarshipSkills()
            this._buildStarshipUtility()
        }

        /**
         * Build Vehicle Actions
         * @private
         * @returns {object}
         */
        async _buildVehicleActions () {
            this._buildAbilities('ability', 'abilities')
            this._buildAbilities('check', 'checks')
            this._buildAbilities('save', 'saves')
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
            this._buildAbilities('check', 'checks')
            this._buildAbilities('save', 'saves')
            this._buildCombat()
            this._buildConditions()
            this._buildRests()
            this._buildRepairs()
            this._buildSkills()
            this._buildStarshipSkills()
            this._buildUtility()
        }

        /**
         * Build Abilities
         * @private
         * @param {string} actionType
         * @param {string} groupId
         */
        _buildAbilities (actionType, groupId) {
        // Get abilities
            const abilities = (!this.actor) ? game.sw5e.config.abilities : this.actor.system.abilities

            // Exit if no abilities exist
            if (abilities.length === 0) return

            // Get actions
            const actions = Object.entries(abilities)
                .filter((ability) => abilities[ability[0]].value !== 0)
                .map((ability) => {
                    const abilityId = ability[0]
                    const id = `${actionType}-${ability[0]}`
                    const abbreviatedName = abilityId.charAt(0).toUpperCase() + abilityId.slice(1)
                    const name = this.abbreviateSkills ? abbreviatedName : game.sw5e.config.abilities[abilityId]
                    // Localise
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${game.sw5e.config.abilities[abilityId]}`
                    const encodedValue = [actionType, abilityId].join(this.delimiter)
                    const icon1 = (groupId !== 'checks') ? this._getProficiencyIcon(abilities[abilityId].proficient) : ''
                    return {
                        id,
                        name,
                        encodedValue,
                        icon1,
                        listName
                    }
                })

            // Create group data
            const groupData = { id: groupId, type: 'system' }

            // Add actions to action list
            this.addActions(actions, groupData)
        }

        async buildActivations (items, groupData, actionType = 'item') {
        // Create map of items according to activation type
            const activationItems = new Map()

            // Create group mappings
            const groupMappings = {
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

            // Loop through action group ids
            for (const groupId of this.activationGroupIds) {
                const activationType = groupMappings[groupId]

                // Skip if no items exist
                if (!activationItems.has(activationType)) continue

                // Clone and add to group data
                const groupDataClone = { ...groupData, id: `${groupId}+${groupData.id}`, type: 'system-derived' }

                // Create parent group data
                const parentGroupData = { id: groupId, type: 'system' }

                // Add group to HUD
                await this.addGroup(groupDataClone, parentGroupData)

                // Add power slot info to group
                this.addGroupInfo(groupData)

                // Build actions
                this._buildActions(activationItems.get(activationType), groupDataClone, actionType)
            }
        }

        /**
         * Build Combat
         * @private
         */
        _buildCombat () {
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
         * Build Conditions
         * @private
         */
        _buildConditions () {
            if (this.tokens?.length === 0) return

            const actionType = 'condition'

            // Get conditions
            const conditions = CONFIG.statusEffects.filter((condition) => condition.id !== '')

            // Exit if no conditions exist
            if (conditions.length === 0) return

            // Get actions
            const actions = conditions.map((condition) => {
                const id = condition.id
                const name = coreModule.api.Utils.i18n(condition.label)
                const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                const listName = `${actionTypeName}${name}`
                const encodedValue = [actionType, id].join(this.delimiter)
                const active = this.actors.every((actor) => {
                    const effects = actor.effects
                    return effects
                        .map((effect) => effect.flags?.core?.statusId)
                        .some((statusId) => statusId === id)
                })
                    ? ' active'
                    : ''
                const cssClass = `toggle${active}`
                const img = coreModule.api.Utils.getImage(condition)
                return {
                    id,
                    name,
                    encodedValue,
                    img,
                    cssClass,
                    listName
                }
            })

            // Create group data
            const groupData = { id: 'conditions', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build Effects
         * @private
         */
        _buildEffects () {
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
            this._buildActions(passiveEffects, { id: 'passive-effects', type: 'system' }, actionType)

            // Build temporary effects
            this._buildActions(temporaryEffects, { id: 'temporary-effects', type: 'system' }, actionType)
        }

        /**
         * Build Features
         * @private
         */
        _buildFeatures () {
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
                { type: 'classfeature', groupId: 'class-features' },
                { type: 'deploymentfeature', groupId: 'deployment-features' },
                { type: 'starshipfeature', groupId: 'starship-features' },
                { type: 'monster', groupId: 'monster-features' },
                { type: 'species', groupId: 'species-features' },
                { type: 'feats', groupId: 'feats' }
            ]

            const classFeatureTypes = [
                { type: 'defensiveTactic', groupId: 'defensive-tactics' },
                { type: 'fightingStyle', groupId: 'fighting-styles' },
                { type: 'maneuver', groupId: 'maneuvers' },
                { type: 'metamagic', groupId: 'metamagic-options' },
                { type: 'multiattack', groupId: 'multiattacks' },
                { type: 'rune', groupId: 'runes' }
            ]

            for (const [key, value] of feats) {
                const activationType = value.system.activation?.type
                const type = value.system.type.value
                const subType = value.system.type?.subtype
                const excludedActivationTypes = ['', 'lair', 'legendary']
                if (activationType && !excludedActivationTypes.includes(activationType)) {
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
            for (const groupId of this.featureGroupIds) {
                if (!featuresMap.has(groupId)) continue

                // Create group data
                const groupData = {
                    id: groupId,
                    name: groupNameMappings[groupId] ?? '',
                    type: 'system'
                }

                const features = featuresMap.get(groupId)

                // Build actions
                this._buildActions(features, groupData, actionType)

                // Build activations
                if (groupNameMappings[groupId]) this.buildActivations(features, groupData, actionType)
            }
        }

        /**
         * Build Inventory
         * @private
         */
        _buildInventory () {
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

            // Loop through inventory group ids
            for (const groupId of this.inventoryGroupIds) {
                if (!inventoryMap.has(groupId)) continue

                // Create group data
                const groupData = {
                    id: groupId,
                    name: groupNameMappings[groupId],
                    type: 'system'
                }

                const inventory = inventoryMap.get(groupId)

                // Build actions
                this._buildActions(inventory, groupData)

                // Build activations
                if (this.activationGroupIds) this.buildActivations(inventory, groupData)
            }
        }

        /**
         * Build Rests
         * @private
         */
        _buildRests () {
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
         * Build Repairs
         * @private
         */
        _buildRepairs () {
            // Exit if every actor is not the starship type
            if (this.actors.length === 0) return
            if (!this.actors.every(actor => actor.type === 'starship')) return

            const actionType = 'utility'

            // Set repair types
            const repairTypes = {
                rechargeRepair: { name: coreModule.api.Utils.i18n('SW5E.RechargeRepair') },
                refittingRepair: { name: coreModule.api.Utils.i18n('SW5E.RefittingRepair') },
                regenRepair: { name: coreModule.api.Utils.i18n('SW5E.RegenRepair') },
            }

            // Get actions
            const actions = Object.entries(repairTypes)
                .map((repairType) => {
                    const id = repairType[0]
                    const name = repairType[1].name
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
            const groupData = { id: 'repairs', type: 'system' }

            // Add actions to HUD
            this.addActions(actions, groupData)
        }

        /**
         * Build Skills
         * @private
         */
        _buildSkills () {
            // Exit if there are any starships selected
            if (this.actors.length === 0) return
            if (!this.actors.every((actor) => actor.type !== 'starship')) return

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
                        const icon1 = this._getProficiencyIcon(skills[id].value)
                        const mod = skills[id].mod
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
         * Build Skills
         * @private
         */
        _buildStarshipSkills () {
            // Exit if every actor is not the starship type
            if (this.actors.length === 0) return
            if (!this.actors.every((actor) => actor.type === 'starship')) return

            const actionType = 'skill'

            // Get skills
            const skills = (!this.actor) ? game.sw5e.config.starshipSkills : this.actor.system.skills

            // Exit if there are no skills
            if (skills.length === 0) return

            // Get actions
            const actions = Object.entries(skills)
                .map((skill) => {
                    try {
                        const id = skill[0]
                        const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                        const name = this.abbreviateSkills ? abbreviatedName : game.sw5e.config.starshipSkills[id].label
                        const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                        const listName = `${actionTypeName}${game.sw5e.config.starshipSkills[id].label}`
                        const encodedValue = [actionType, id].join(this.delimiter)
                        const icon1 = this._getProficiencyIcon(skills[id].value)
                        const mod = skills[id].mod
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
         * Build Powers
         */
        _buildPowers () {
            // Exit if there are any starships selected
            if (this.actors.length === 0) return
            if (!this.actors.every((actor) => actor.type !== 'starship')) return

            const actionType = 'power'

            const powersMap = new Map()

            // Loop through items
            for (const [key, value] of this.items) {
                const type = value.type
                if (type === 'power') {
                    const isUsableItem = this._isUsableItem(value)
                    const isUsablePower = this._isUsablePower(value)
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
                        default:
                        { const level = value.system.level
                            switch (level) {
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
            const powerSlots = []
            let powerSlotAvailable = this.showUnchargedItems
            for (const [key, value] of systemPowers) {
                const hasValue = value.value > 0
                const hasMax = value.max > 0
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

            const groupMappings = {
                'at-will-powers': { powerMode: 'atwill', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.atWillPowers') },
                'innate-powers': { powerMode: 'innate', name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.innatePowers') },
                '1st-level-powers': { powerMode: 1, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.1stLevelPowers') },
                '2nd-level-powers': { powerMode: 2, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.2ndLevelPowers') },
                '3rd-level-powers': { powerMode: 3, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.3rdLevelPowers') },
                '4th-level-powers': { powerMode: 4, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.4thLevelPowers') },
                '5th-level-powers': { powerMode: 5, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.5thLevelPowers') },
                '6th-level-powers': { powerMode: 6, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.6thLevelPowers') },
                '7th-level-powers': { powerMode: 7, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.7thLevelPowers') },
                '8th-level-powers': { powerMode: 8, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.8thLevelPowers') },
                '9th-level-powers': { powerMode: 9, name: coreModule.api.Utils.i18n('tokenActionHud.sw5e.9thLevelPowers') }
            }

            const powerSlotModes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

            for (const groupId of this.powerGroupIds) {
                const powerMode = groupMappings[groupId].powerMode
                const groupName = groupMappings[groupId].name

                // Skip if no powers exist
                if (!powersMap.has(groupId)) continue

                const levelInfo = powerSlots.find(powerSlot => powerSlot[0] === `power${powerMode}`)?.[1]
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
                this._buildActions(powers, groupData, actionType)

                // Build activations
                if (this.activationGroupIds) { this.buildActivations(powers, groupData, actionType) }
            }
        }

        /**
         * Build Utility
         * @private
         */
        _buildUtility () {
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
         * Build Starship Utility
         * @private
         */
        _buildStarshipUtility () {
            // Exit if starship is not destroyed
            if (this.actor.system.attributes.hp.value > 0) return

            const actionType = 'utility'

            // Set utility types
            const utilityTypes = {
                destructionSave: { name: coreModule.api.Utils.i18n('SW5E.DestructionSave') }
            }

            // Get actions
            const actions = Object.entries(utilityTypes)
                .map((utilityType) => {
                    const id = utilityType[0]
                    const name = utilityType[1].name
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${name}`
                    const encodedValue = [actionType, id].join(this.delimiter)
                    let cssClass = ''
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
         * Get Actions
         * @private
         * @param {object} items
         * @param {object} groupData
         * @param {string} actionType
         */
        _buildActions (items, groupData, actionType = 'item') {
        // Exit if there are no items
            if (items.size === 0) return

            // Exit if there is no groupId
            const groupId = (typeof groupData === 'string' ? groupData : groupData?.id)
            if (!groupId) return

            // Get actions
            const actions = [...items].map(item => this._getAction(actionType, item[1]))

            // Add actions to HUD
            this.addActions(actions, groupData)
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
            const icon1 = this._getActivationTypeIcon(entity?.system?.activation?.type)
            let icon2 = null
            let info = null
            if (entity.type === 'power') {
                icon2 = this._getPreparedIcon(entity)
                if (this.displayPowerInfo) info = this._getPowerInfo(entity)
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
                listName
            }
        }

        /**
         * Is Active Item
         * @param {object} item
         * @returns {boolean}
         */
        _isActiveItem (item) {
            if (this.showItemsWithoutActivationCosts) return true
            const activationTypes = Object.keys(game.sw5e.config.abilityActivationTypes).filter((at) => at !== 'none')
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
            const excludedTypes = ['consumable', 'power', 'feat']
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
         * Is Usable Power
         * @param {object} power  The power
         * @returns {boolean}
         */
        _isUsablePower (power) {
            if (this.actorType !== 'character' && this.showUnequippedItems) return true
            const prepared = power.system.preparation.prepared
            if (this.showUnpreparedPowers) return true
            // Set variables
            const level = power.system.level
            const preparationModes = Object.keys(game.sw5e.config.powerPreparationModes)
                .filter(preparationMode => preparationMode !== 'prepared')
            const preparationMode = power.system.preparation.mode

            // Return true if power is a at-will, has a preparation mode other than 'prepared' or is prepared
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
         * Add Power Info
         * @param {object} power
         */
        _getPowerInfo (power) {
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
         * Get Actors
         * @private
         * @returns {object}
         */
        _getActors () {
            const allowedTypes = ['character', 'npc', 'starship']
            const actors = canvas.tokens.controlled.filter(token => token.actor).map((token) => token.actor)
            if (actors.every((actor) => allowedTypes.includes(actor.type))) {
                return actors
            } else {
                return []
            }
        }

        /**
         * Get Actors
         * @private
         * @returns {object}
         */
        _getTokens () {
            const allowedTypes = ['character', 'npc', 'starship']
            const tokens = canvas.tokens.controlled
            const actors = tokens.filter(token => token.actor).map((token) => token.actor)
            if (actors.every((actor) => allowedTypes.includes(actor.type))) {
                return tokens
            } else {
                return []
            }
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
            const showSlowActions = Utils.getSetting('showSlowActions')

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
            const title = CONFIG.SW5E.proficiencyLevels[level] ?? ''
            const icon = PROFICIENCY_LEVEL_ICON[level]
            if (icon) return `<i class="${icon}" title="${title}"></i>`
        }

        /**
         * Get icon for the activation type
         * @param {object} activationType
         * @returns {string}
         */
        _getActivationTypeIcon (activationType) {
            const title = CONFIG.SW5E.abilityActivationTypes[activationType] ?? ''
            const icon = ACTIVATION_TYPE_ICON[activationType]
            if (icon) return `<i class="${icon}" title="${title}"></i>`
        }

        /**
         * Get icon for a prepared power
         * @param {boolean} prepararation
         * @returns
         */
        _getPreparedIcon (power) {
            const level = power.system.level
            const preparationMode = power.system.preparation.mode
            const prepared = power.system.preparation.prepared
            const icon = (prepared) ? PREPARED_ICON : `${PREPARED_ICON} tah-icon-disabled`
            const title = (prepared) ? coreModule.api.Utils.i18n('SW5E.PowerPrepared') : coreModule.api.Utils.i18n('SW5E.PowerUnprepared')

            // Return icon if the preparation mode is 'prepared' and the power is not an at-will
            return (preparationMode === 'prepared' && level !== 0) ? `<i class="${icon}" title="${title}"></i>` : ''
        }
    }
})
