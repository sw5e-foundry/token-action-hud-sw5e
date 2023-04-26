export let RollHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    RollHandler = class RollHandler extends coreModule.api.RollHandler {
    /**
     * Handle Action Event
     * @override
     * @param {object} event
     * @param {string} encodedValue
     */
        async doHandleActionEvent (event, encodedValue) {
            const payload = encodedValue.split('|')

            if (payload.length !== 2) {
                super.throwInvalidValueErr()
            }

            const actionType = payload[0]
            const actionId = payload[1]

            if (!this.actor) {
                for (const token of canvas.tokens.controlled) {
                    const actor = token.actor
                    await this._handleMacros(event, actionType, actor, token, actionId)
                }
            } else {
                await this._handleMacros(event, actionType, this.actor, this.token, actionId)
            }
        }

        /**
         * Handle Macros
         * @private
         * @param {object} event
         * @param {string} actionType
         * @param {object} actor
         * @param {object} token
         * @param {string} actionId
         */
        async _handleMacros (event, actionType, actor, token, actionId) {
            switch (actionType) {
            case 'ability':
                this._rollAbility(event, actor, actionId)
                break
            case 'check':
                this._rollAbilityTest(event, actor, actionId)
                break
            case 'save':
                this._rollAbilitySave(event, actor, actionId)
                break
            case 'condition':
                if (!token) return
                await this._toggleCondition(event, token, actionId)
                break
            case 'effect':
                await this._toggleEffect(event, actor, actionId)
                break
            case 'feature':
            case 'item':
            case 'power':
            case 'weapon':
                if (this.isRenderItem()) this.doRenderItem(actor, actionId)
                else this._useItem(event, actor, actionId)
                break
            case 'magicItem':
                this._rollMagicItem(actor, actionId)
                break
            case 'skill':
                this._rollSkill(event, actor, actionId)
                break
            case 'utility':
                await this._performUtilityMacro(event, actor, token, actionId)
                break
            default:
                break
            }
        }

        /**
         * Roll Ability
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        _rollAbility (event, actor, actionId) {
            if (!actor) return
            if (!actor.system?.abilities) return
            actor.rollAbility(actionId, { event })
        }

        /**
         * Roll Ability Save
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        _rollAbilitySave (event, actor, actionId) {
            if (!actor) return
            if (!actor.system?.abilities) return
            actor.rollAbilitySave(actionId, { event })
        }

        /**
         * Roll Ability Test
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        _rollAbilityTest (event, actor, actionId) {
            if (!actor) return
            if (!actor.system?.abilities) return
            actor.rollAbilityTest(actionId, { event })
        }

        /**
         * Roll Magic Item
         * @private
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        _rollMagicItem (actor, actionId) {
            const actionParts = actionId.split('>')

            const itemId = actionParts[0]
            const magicEffectId = actionParts[1]

            const magicItemActor = MagicItems.actor(actor.id)

            // magicitems module 3.0.0 does not support Item5e#use
            magicItemActor.roll(itemId, magicEffectId)

            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
         * Roll Skill
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        _rollSkill (event, actor, actionId) {
            if (!actor) return
            if (!actor.system?.skills) return
            actor.rollSkill(actionId, { event })
        }

        /**
         * Use Item
         * @private
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         * @returns {object}        The item
         */
        _useItem (event, actor, actionId) {
            const item = coreModule.api.Utils.getItem(actor, actionId)

            if (this._needsRecharge(item)) {
                item.rollRecharge()
                return
            }

            return item.use({ event })
        }

        /**
         * Needs Recharge
         * @private
         * @param {object} item
         * @returns {boolean}
         */
        _needsRecharge (item) {
            return (
                item.system.recharge &&
                !item.system.recharge.charged &&
                item.system.recharge.value
            )
        }

        /**
         * Perform Utility Macro
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {object} token    The token
         * @param {string} actionId The action id
         */
        async _performUtilityMacro (event, actor, token, actionId) {
            switch (actionId) {
            case 'deathSave':
                actor.rollDeathSave({ event })
                break
            case 'destructionSave':
                actor.rollDestructionSave({ event })
                break
            case 'endTurn':
                if (!token) break
                if (game.combat?.current?.tokenId === token.id) {
                    await game.combat?.nextTurn()
                }
                break
            case 'initiative':
                await this._rollInitiative(actor)
                break
            case 'inspiration': {
                const update = !actor.system.attributes.inspiration
                actor.update({ 'data.attributes.inspiration': update })
                break
            }
            case 'longRest':
                actor.longRest()
                break
            case 'shortRest':
                actor.shortRest()
                break
            case "rechargeRepair":
                actor.rechargeRepair()
                break
            case "refittingRepair":
                actor.refittingRepair()
                break
            case "regenRepair":
                actor.regenRepair()
                break
            }

            // Update HUD
            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
         * Roll Initiative
         * @param {object} actor The actor
         * @private
         */
        async _rollInitiative (actor) {
            if (!actor) return
            await actor.rollInitiative({ createCombatants: true })

            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
         * Toggle Condition
         * @private
         * @param {object} event    The event
         * @param {object} token    The token
         * @param {string} actionId The action id
         * @param {object} effect   The effect
         */
        async _toggleCondition (event, token, actionId, effect = null) {
            if (!token) return
            const isRightClick = this.isRightClick(event)
            if (game.dfreds && effect?.flags?.isConvenient) {
                const effectLabel = effect.label
                game.dfreds.effectInterface._toggleEffect(effectLabel)
            } else {
                const condition = this.findCondition(actionId)
                if (!condition) return

                isRightClick
                    ? await token.toggleEffect(condition, { overlay: true })
                    : await token.toggleEffect(condition)
            }

            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
         * Get Condition
         * @private
         * @param {string} actionId
         * @returns {object}
         */
        findCondition (actionId) {
            return CONFIG.statusEffects.find((effect) => effect.id === actionId)
        }

        /**
         * Toggle Effect
         * @param {object} event    The event
         * @param {object} actor    The actor
         * @param {string} actionId The action id
         */
        async _toggleEffect (event, actor, actionId) {
            const effects = 'find' in actor.effects.entries ? actor.effects.entries : actor.effects
            const effect = effects.find(effect => effect.id === actionId)

            if (!effect) return

            const isRightClick = this.isRightClick(event)

            if (isRightClick) {
                await effect.delete()
            } else {
                await effect.update({ disabled: !effect.disabled })
            }

            Hooks.callAll('forceUpdateTokenActionHud')
        }
    }
})
