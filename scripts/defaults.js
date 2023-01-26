/**
 * Default categories and subcategories
 */
export const DEFAULTS = {
    categories: [
        {
            nestId: 'inventory',
            id: 'inventory',
            name: game.i18n.localize('DND5E.Inventory'),
            subcategories: [
                {
                    nestId: 'inventory_weapons',
                    id: 'weapons',
                    name: game.i18n.localize('ITEM.TypeWeaponPl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'inventory_equipment',
                    id: 'equipment',
                    name: game.i18n.localize('ITEM.TypeEquipmentPl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'inventory_consumables',
                    id: 'consumables',
                    name: game.i18n.localize('ITEM.TypeConsumablePl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'inventory_tools',
                    id: 'tools',
                    name: game.i18n.localize('ITEM.TypeToolPl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'inventory_containers',
                    id: 'containers',
                    name: game.i18n.localize('ITEM.TypeContainerPl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'inventory_loot',
                    id: 'loot',
                    name: game.i18n.localize('ITEM.TypeLootPl'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'features',
            id: 'features',
            name: game.i18n.localize('DND5E.Features'),
            subcategories: [
                {
                    nestId: 'features_active-features',
                    id: 'active-features',
                    name: game.i18n.localize('tokenActionHud.dnd5e.activeFeatures'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    id: 'passive-features',
                    nestId: 'features_passive-features',
                    name: game.i18n.localize('tokenActionHud.dnd5e.passiveFeatures'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'spells',
            id: 'spells',
            name: game.i18n.localize('ITEM.TypeSpellPl'),
            subcategories: [
                {
                    nestId: 'spells_at-will-spells',
                    id: 'at-will-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.atWillSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_innate-spells',
                    id: 'innate-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.innateSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_pact-spells',
                    id: 'pact-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.pactSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_cantrips',
                    id: 'cantrips',
                    name: game.i18n.localize('tokenActionHud.dnd5e.cantrips'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_1st-level-spells',
                    id: '1st-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.1stLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_2nd-level-spells',
                    id: '2nd-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.2ndLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_3rd-level-spells',
                    id: '3rd-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.3rdLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_4th-level-spells',
                    id: '4th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.4thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_5th-level-spells',
                    id: '5th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.5thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_6th-level-spells',
                    id: '6th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.6thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_7th-level-spells',
                    id: '7th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.7thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_8th-level-spells',
                    id: '8th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.8thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'spells_9th-level-spells',
                    id: '9th-level-spells',
                    name: game.i18n.localize('tokenActionHud.dnd5e.9thLevelSpells'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'attributes',
            id: 'attributes',
            name: game.i18n.localize('DND5E.Attributes'),
            subcategories: [
                {
                    nestId: 'attributes_abilities',
                    id: 'abilities',
                    name: game.i18n.localize('tokenActionHud.dnd5e.abilities'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'attributes_skills',
                    id: 'skills',
                    name: game.i18n.localize('tokenActionHud.dnd5e.skills'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'effects',
            id: 'effects',
            name: game.i18n.localize('DND5E.Effects'),
            subcategories: [
                {
                    nestId: 'effects_temporary-effects',
                    id: 'temporary-effects',
                    name: game.i18n.localize('DND5E.EffectTemporary'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'effects_passive-effects',
                    id: 'passive-effects',
                    name: game.i18n.localize('DND5E.EffectPassive'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'conditions',
            id: 'conditions',
            name: game.i18n.localize('tokenActionHud.dnd5e.conditions'),
            subcategories: [
                {
                    nestId: 'conditions_conditions',
                    id: 'conditions',
                    name: game.i18n.localize('tokenActionHud.dnd5e.conditions'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        },
        {
            nestId: 'utility',
            id: 'utility',
            name: game.i18n.localize('tokenActionHud.utility'),
            subcategories: [
                {
                    nestId: 'utility_combat',
                    id: 'combat',
                    name: game.i18n.localize('tokenActionHud.combat'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'utility_token',
                    id: 'token',
                    name: game.i18n.localize('tokenActionHud.token'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'utility_rests',
                    id: 'rests',
                    name: game.i18n.localize('tokenActionHud.dnd5e.rests'),
                    type: 'system',
                    hasDerivedSubcategories: false
                },
                {
                    nestId: 'utility_utility',
                    id: 'utility',
                    name: game.i18n.localize('tokenActionHud.utility'),
                    type: 'system',
                    hasDerivedSubcategories: false
                }
            ]
        }
    ],
    subcategories: [
        { id: '1st-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.1stLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '2nd-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.2ndLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '3rd-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.3rdLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '4th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.4thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '5th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.5thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '6th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.6thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '7th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.7thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '8th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.8thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: '9th-level-spells', name: game.i18n.localize('tokenActionHud.dnd5e.9thLevelSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: 'abilities', name: game.i18n.localize('tokenActionHud.dnd5e.abilities'), type: 'system', hasDerivedSubcategories: false },
        { id: 'actions', name: game.i18n.localize('DND5E.ActionPl'), type: 'system', hasDerivedSubcategories: true },
        { id: 'active-features', name: game.i18n.localize('tokenActionHud.dnd5e.activeFeatures'), type: 'system', hasDerivedSubcategories: false },
        { id: 'at-will-spells', name: game.i18n.localize('tokenActionHud.dnd5e.atWillSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: 'bonus-actions', name: game.i18n.localize('tokenActionHud.dnd5e.bonusActions'), type: 'system', hasDerivedSubcategories: true },
        { id: 'cantrips', name: game.i18n.localize('tokenActionHud.dnd5e.cantrips'), type: 'system', hasDerivedSubcategories: false },
        { id: 'checks', name: game.i18n.localize('tokenActionHud.dnd5e.checks'), type: 'system', hasDerivedSubcategories: false },
        { id: 'combat', name: game.i18n.localize('tokenActionHud.combat'), type: 'system', hasDerivedSubcategories: false },
        { id: 'conditions', name: game.i18n.localize('tokenActionHud.dnd5e.conditions'), type: 'system', hasDerivedSubcategories: false },
        { id: 'consumables', name: game.i18n.localize('ITEM.TypeConsumablePl'), type: 'system', hasDerivedSubcategories: false },
        { id: 'containers', name: game.i18n.localize('ITEM.TypeContainerPl'), type: 'system', hasDerivedSubcategories: false },
        { id: 'crew-actions', name: game.i18n.localize('tokenActionHud.dnd5e.crewActions'), type: 'system', hasDerivedSubcategories: true },
        { id: 'equipment', name: game.i18n.localize('ITEM.TypeEquipmentPl'), type: 'system', hasDerivedSubcategories: false },
        { id: 'equipped', name: game.i18n.localize('DND5E.Equipped'), type: 'system', hasDerivedSubcategories: false },
        { id: 'innate-spells', name: game.i18n.localize('tokenActionHud.dnd5e.innateSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: 'lair-actions', name: game.i18n.localize('tokenActionHud.dnd5e.lairActions'), type: 'system', hasDerivedSubcategories: true },
        { id: 'legendary-actions', name: game.i18n.localize('tokenActionHud.dnd5e.legendaryActions'), type: 'system', hasDerivedSubcategories: true },
        { id: 'loot', name: game.i18n.localize('ITEM.TypeLootPl'), type: 'system', hasDerivedSubcategories: false },
        { id: 'other-actions', name: game.i18n.localize('tokenActionHud.dnd5e.otherActions'), type: 'system', hasDerivedSubcategories: true },
        { id: 'pact-spells', name: game.i18n.localize('tokenActionHud.dnd5e.pactSpells'), type: 'system', hasDerivedSubcategories: false },
        { id: 'passive-effects', name: game.i18n.localize('DND5E.EffectPassive'), type: 'system', hasDerivedSubcategories: false },
        { id: 'passive-features', name: game.i18n.localize('tokenActionHud.dnd5e.passiveFeatures'), type: 'system', hasDerivedSubcategories: false },
        { id: 'reactions', name: game.i18n.localize('DND5E.ReactionPl'), type: 'system', hasDerivedSubcategories: true },
        { id: 'rests', name: game.i18n.localize('tokenActionHud.dnd5e.rests'), type: 'system', hasDerivedSubcategories: false },
        { id: 'saves', name: game.i18n.localize('DND5E.ClassSaves'), type: 'system', hasDerivedSubcategories: false },
        { id: 'skills', name: game.i18n.localize('tokenActionHud.dnd5e.skills'), type: 'system', hasDerivedSubcategories: false },
        { id: 'temporary-effects', name: game.i18n.localize('DND5E.EffectTemporary'), type: 'system', hasDerivedSubcategories: false },
        { id: 'token', name: game.i18n.localize('tokenActionHud.token'), type: 'system', hasDerivedSubcategories: false },
        { id: 'tools', name: game.i18n.localize('ITEM.TypeToolPl'), type: 'system', hasDerivedSubcategories: false },
        { id: 'unequipped', name: game.i18n.localize('DND5E.Unequipped'), type: 'system', hasDerivedSubcategories: false },
        { id: 'utility', name: game.i18n.localize('tokenActionHud.utility'), type: 'system', hasDerivedSubcategories: false },
        { id: 'weapons', name: game.i18n.localize('ITEM.TypeWeaponPl'), type: 'system', hasDerivedSubcategories: false }
    ]
}
