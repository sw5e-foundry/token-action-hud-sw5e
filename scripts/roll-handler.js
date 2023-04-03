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

            if (!this.actor && actionId !== 'toggleCombat') {
                for (const token of canvas.tokens.controlled) {
                    const tokenActorId = token.actor?.id
                    const tokenTokenId = token.id
                    await this._handleMacros(
                        event,
                        actionType,
                        tokenActorId,
                        tokenTokenId,
                        actionId
                    )
                }
            } else {
                await this._handleMacros(event, actionType, actionId)
            }
        }

        /**
     * Handle Macros
     * @private
     * @param {object} event
     * @param {string} actionType
     * @param {string} actorId
     * @param {string} tokenId
     * @param {string} actionId
     */
        async _handleMacros (event, actionType, actionId) {
            switch (actionType) {
            case 'ability':
                this._rollAbility(event, actionId)
                break
            case 'check':
                this._rollAbilityTest(event, actionId)
                break
            case 'save':
                this._rollAbilitySave(event, actionId)
                break
            case 'condition':
                if (!this.token) return
                await this._toggleCondition(event, actionId)
                break
            case 'effect':
                await this._toggleEffect(event, actionId)
                break
            case 'feature':
            case 'item':
            case 'spell':
            case 'weapon':
                if (this.isRenderItem()) this.doRenderItem(actionId)
                else this._useItem(event, actionId)
                break
            case 'magicItem':
                this._rollMagicItem(event, actionId)
                break
            case 'skill':
                this._rollSkill(event, actionId)
                break
            case 'utility':
                await this._performUtilityMacro(event, actionId)
                break
            default:
                break
            }
        }

        /**
     * Roll Ability
     * @private
     * @param {object} event
     * @param {string} actionId
     */
        _rollAbility (event, actionId) {
            this.actor.rollAbility(actionId, { event })
        }

        /**
     * Roll Ability Save
     * @private
     * @param {object} event
     * @param {string} actionId
     */
        _rollAbilitySave (event, actionId) {
            this.actor.rollAbilitySave(actionId, { event })
        }

        /**
     * Roll Ability Test
     * @private
     * @param {object} event
     * @param {string} actionId
     */
        _rollAbilityTest (event, actionId) {
            this.actor.rollAbilityTest(actionId, { event })
        }

        /**
     * Roll Magic Item
     * @private
     * @param {object} event
     * @param {string} actionId
     */
        _rollMagicItem (event, actionId) {
            const actionParts = actionId.split('>')

            const itemId = actionParts[0]
            const magicEffectId = actionParts[1]

            const magicItemActor = MagicItems.actor(this.actor.id)

            // magicitems module 3.0.0 does not support Item5e#use
            magicItemActor.roll(itemId, magicEffectId)

            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
     * Roll Skill
     * @private
     * @param {object} event
     * @param {string} actionId
     */
        _rollSkill (event, actionId) {
            this.actor.rollSkill(actionId, { event })
        }

        /**
     * Use Item
     * @private
     * @param {object} event
     * @param {string} actionId
     * @returns {object}
     */
        _useItem (event, actionId) {
            const item = coreModule.api.Utilss.getItem(this.actor, actionId)

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
     * @param {object} event
     * @param {string} actorId
     * @param {string} tokenId
     * @param {string} actionId
     */
        async _performUtilityMacro (event, actionId) {
            switch (actionId) {
            case 'deathSave':
                this.actor.rollDeathSave({ event })
                break
            case 'endTurn':
                if (!this.token) break
                if (game.combat?.current?.tokenId === this.token.id) {
                    await game.combat?.nextTurn()
                }
                break
            case 'initiative':
                await this._rollInitiative(this.actor.id)
                break
            case 'inspiration': {
                const update = !this.actor.system.attributes.inspiration
                this.actor.update({ 'data.attributes.inspiration': update })
                break
            }
            case 'longRest':
                this.actor.longRest()
                break
            case 'shortRest':
                this.actor.shortRest()
                break
            case 'toggleCombat':
                if (canvas.tokens.controlled.length === 0) break
                await canvas.tokens.controlled[0].toggleCombat()
                break
            case 'toggleVisibility':
                if (!this.token) break
                this.token.toggleVisibility()
                break
            }

            // Update HUD
            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
     * Roll Initiative
     * @private
     */
        async _rollInitiative () {
            await this.actor.rollInitiative({ createCombatants: true })

            Hooks.callAll('forceUpdateTokenActionHud')
        }

        /**
     * Toggle Condition
     * @private
     * @param {object} event
     * @param {object} effect
     */
        async _toggleCondition (event, actionId, effect = null) {
            if (!this.token) return
            const isRightClick = this.isRightClick(event)
            if (game.dfreds && effect?.flags?.isConvenient) {
                const effectLabel = effect.label
                game.dfreds.effectInterface._toggleEffect(effectLabel)
            } else {
                const condition = this.findCondition(actionId)
                if (!condition) return

                isRightClick
                    ? await this.token.toggleEffect(condition, { overlay: true })
                    : await this.token.toggleEffect(condition)
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
     * @param {object} event
     * @param {string} actionId
     */
        async _toggleEffect (event, actionId) {
            const effects = 'find' in this.actor.effects.entries ? this.actor.effects.entries : this.actor.effects
            const effect = effects.find((e) => e.id === actionId)

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
