// System Module Imports
import { ACTIVATION_TYPE_ICON, ACTION_TYPE, PREPARED_ICON, PROFICIENCY_LEVEL_ICON } from './constants.js'
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
        displaySpellInfo = null
        showItemsWithoutActivationCosts = null
        showUnchargedItems = null
        showUnequippedItems = null
        showUnpreparedSpells = null

        // Initialize groupIds variables
        activationgroupIds = null
        featuregroupIds = null
        inventorygroupIds = null
        spellgroupIds = null

        // Initialize action variables
        featureActions = null
        inventoryActions = null
        spellActions = null

        systemVersion = game.dnd5e.version

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
            this.displaySpellInfo = Utils.getSetting('displaySpellInfo')
            this.showItemsWithoutActivationCosts = Utils.getSetting('showItemsWithoutActivationCosts')
            this.showUnchargedItems = Utils.getSetting('showUnchargedItems')
            this.showUnequippedItems = Utils.getSetting('showUnequippedItems')
            if (this.actorType === 'npc' && !this.showUnequippedItems) {
                this.showUnequippedItems = Utils.getSetting('showUnequippedItemsNpcs')
            }
            this.showUnpreparedSpells = Utils.getSetting('showUnpreparedSpells')

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
                'race-features',
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

            this.spellgroupIds = [
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

                this._buildCharacterActions()
            }
            if (this.actorType === 'vehicle') {
                this.inventorygroupIds = [
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
            this._buildSkills()
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
            const abilities = (!this.actor) ? game.dnd5e.config.abilities : this.actor.system.abilities

            // Exit if no abilities exist
            if (abilities.length === 0) return

            // Get actions
            const actions = Object.entries(abilities)
                .filter((ability) => abilities[ability[0]].value !== 0)
                .map((ability) => {
                    const abilityId = ability[0]
                    const id = `${actionType}-${ability[0]}`
                    const abbreviatedName = abilityId.charAt(0).toUpperCase() + abilityId.slice(1)
                    const label = this.systemVersion.startsWith('2.2') ? game.dnd5e.config.abilities[abilityId].label : game.dnd5e.config.abilities[abilityId]
                    const name = this.abbreviateSkills ? abbreviatedName : label
                    // Localise
                    const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                    const listName = `${actionTypeName}${label}`
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

                // Create parent group data
                const parentgroupData = { id: activationGroupId, type: 'system' }

                // Add group to HUD
                await this.addGroup(groupDataClone, parentgroupData)

                // Add spell slot info to group
                this.addGroupInfo(groupData)

                // Build actions
                this._buildActions(activationItems.get(activationGroupId), groupDataClone, actionType)
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
                initiative: { id: 'initiative', name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.rollInitiative') },
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
                { type: 'class', groupId: 'class-features' },
                { type: 'monster', groupId: 'monster-features' },
                { type: 'race', groupId: 'race-features' },
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
                'active-features': coreModule.api.Utils.i18n('tokenActionHud.dnd5e.activeFeatures'),
                'passive-features': coreModule.api.Utils.i18n('tokenActionHud.dnd5e.passiveFeatures')
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
                equipped: coreModule.api.Utils.i18n('DND5E.Equipped'),
                unequipped: coreModule.api.Utils.i18n('DND5E.Unequipped'),
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
                this._buildActions(inventory, groupData)

                // Build activations
                if (this.activationgroupIds) {
                    this.buildActivations(inventory, groupData)
                }
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
                shortRest: { name: coreModule.api.Utils.i18n('DND5E.ShortRest') },
                longRest: { name: coreModule.api.Utils.i18n('DND5E.LongRest') }
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
         * Build Skills
         * @private
         */
        _buildSkills () {
            const actionType = 'skill'

            // Get skills
            const skills = (!this.actor) ? game.dnd5e.config.skills : this.actor.system.skills

            // Exit if there are no skills
            if (skills.length === 0) return

            // Get actions
            const actions = Object.entries(skills)
                .map((skill) => {
                    try {
                        const id = skill[0]
                        const abbreviatedName = id.charAt(0).toUpperCase() + id.slice(1)
                        const name = this.abbreviateSkills ? abbreviatedName : game.dnd5e.config.skills[id].label
                        const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
                        const listName = `${actionTypeName}${game.dnd5e.config.skills[id].label}`
                        const encodedValue = [actionType, id].join(this.delimiter)
                        const icon1 = this._getProficiencyIcon(skills[id].value)
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
         * Build Spells
         */
        _buildSpells () {
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

            const groupMappings = {
                '1st-level-spells': { spellMode: 1, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.1stLevelSpells') },
                '2nd-level-spells': { spellMode: 2, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.2ndLevelSpells') },
                '3rd-level-spells': { spellMode: 3, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.3rdLevelSpells') },
                '4th-level-spells': { spellMode: 4, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.4thLevelSpells') },
                '5th-level-spells': { spellMode: 5, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.5thLevelSpells') },
                '6th-level-spells': { spellMode: 6, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.6thLevelSpells') },
                '7th-level-spells': { spellMode: 7, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.7thLevelSpells') },
                '8th-level-spells': { spellMode: 8, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.8thLevelSpells') },
                '9th-level-spells': { spellMode: 9, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.9thLevelSpells') },
                'at-will-spells': { spellMode: 'atwill', name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.atWillSpells') },
                cantrips: { spellMode: 0, name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.cantrips') },
                'innate-spells': { spellMode: 'innate', name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.innateSpells') },
                'pact-spells': { spellMode: 'pact', name: coreModule.api.Utils.i18n('tokenActionHud.dnd5e.pactSpells') }
            }

            const spellSlotModes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'pact']

            for (const groupId of this.spellgroupIds) {
                const spellMode = groupMappings[groupId].spellMode
                const groupName = groupMappings[groupId].name

                // Skip if no spells exist
                if (!spellsMap.has(groupId)) continue

                const levelInfo = (spellMode === 'pact') ? pactSlot[1] : spellSlots.find(spellSlot => spellSlot[0] === `spell${spellMode}`)?.[1]
                const slots = levelInfo?.value
                const max = levelInfo?.max
                const slotsAvailable = levelInfo?.slotAvailable

                // Skip if spells require spell slots and none are available
                if (!slotsAvailable && spellSlotModes.includes(spellMode)) continue

                // Create group data=
                const groupInfo = {}
                groupInfo.info1 = { class: 'tah-spotlight', text: (max >= 0) ? `${slots}/${max}` : '' }
                const groupData = {
                    id: groupId,
                    name: groupName,
                    type: 'system',
                    info: groupInfo
                }

                // Add spell slot info to group
                this.addGroupInfo(groupData)

                const spells = spellsMap.get(groupId)

                // Build actions
                this._buildActions(spells, groupData, actionType)

                // Build activations
                if (this.activationgroupIds) { this.buildActivations(spells, groupData, actionType) }
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
                deathSave: { name: coreModule.api.Utils.i18n('DND5E.DeathSave') },
                inspiration: { name: coreModule.api.Utils.i18n('DND5E.Inspiration') }
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

            // Add actions to action list
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
                name += ` (${coreModule.api.Utils.i18n('DND5E.Recharge')})`
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
            if (components?.vocal) componentsArray.push(coreModule.api.Utils.i18n('DND5E.ComponentVerbal'))
            if (components?.somatic) componentsArray.push(coreModule.api.Utils.i18n('DND5E.ComponentSomatic'))
            if (components?.material) componentsArray.push(coreModule.api.Utils.i18n('DND5E.ComponentMaterial'))

            if (componentsArray.length) {
                info1.title = componentsArray.join(', ')
                info1.text = componentsArray.map(component => component.charAt(0).toUpperCase()).join('')
            }

            // Concentration
            if (components?.concentration) {
                const title = coreModule.api.Utils.i18n('DND5E.Concentration')
                info2.title = title
                info2.text = title.charAt(0).toUpperCase()
            }

            // Ritual
            if (components?.ritual) {
                const title = coreModule.api.Utils.i18n('DND5E.Ritual')
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
                const activationType = value.system?.activation?.type
                if (!slowActivationTypes.includes(activationType)) filteredItems.set(key, value)
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
            const title = (prepared) ? coreModule.api.Utils.i18n('DND5E.SpellPrepared') : coreModule.api.Utils.i18n('DND5E.SpellUnprepared')

            // Return icon if the preparation mode is 'prepared' and the spell is not a cantrip
            return (preparationMode === 'prepared' && level !== 0) ? `<i class="${icon}" title="${title}"></i>` : ''
        }
    }
})
