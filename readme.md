# Token Action HUD SW5e

Token Action HUD is a repositionable HUD of actions for a selected token.

![Token Action HUD](.github/readme/token-action-hud.gif)

# Features
- Make rolls directly from the HUD instead of opening your character sheet.
- Use items from the HUD or right-click an item to open its sheet.
- Move the HUD and choose to expand the menus up or down.
- Unlock the HUD to customise groups and actions.
- Add your own macros and Journal Entry and Roll Table compendiums.

# Installation

## Method 1

1. On Foundry VTT's **Configuration and Setup** screen, go to **Add-on Modules**
2. Click **Install Module**
3. In the Manifest URL field, paste: `https://github.com/sw5e-foundry/token-action-hud-sw5e/releases/latest/download/module.json`
4. Click **Install** next to the pasted Manifest URL

## Required Modules

**IMPORTANT** - Token Action HUD SW5e requires the [Token Action HUD Core](https://foundryvtt.com/packages/token-action-hud-core) module to be installed.

## Recommended Modules
Token Action HUD uses either the [Color Picker](https://foundryvtt.com/packages/color-picker), [libThemer](https://foundryvtt.com/packages/lib-themer) or [VTTColorSettings](https://foundryvtt.com/packages/colorsettings) library modules for its color picker settings. Only one is required.

# For Developers
## Hooks
The following hooks are available to use:
- **tokenActionHudSystemActionHoverOn**: Called when an action in the HUD is hovered on.
- **tokenActionHudSystemActionHoverOff**: Called when an action in the HUD is hovered off.

# Support

For a guide on using Token Action HUD, go to: [How to Use Token Action HUD](https://github.com/Larkinabout/fvtt-token-action-hud-core/wiki/How-to-Use-Token-Action-HUD)

For questions, feature requests or bug reports, please open an issue [here](https://github.com/sw5e-foundry/token-action-hud-sw5e/issues).

Pull requests are welcome. Please include a reason for the request or create an issue before starting one.

# Acknowledgements

First and foremost, thank you to the Community Helpers on Foundry's Discord who provide tireless support for people seeking help with the HUD.
Enormous thanks also goes to the following people for their help in getting the HUD to its current state: Larkinabout, Drental, Kekilla, Rainer, Xacus, Giddy, and anyone who has provided advice to any and all of my problems on Discord, as well as all the other developers who make FoundryVTT a joy to use.

# License

This Foundry VTT module is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) and this work is licensed under [Foundry Virtual Tabletop EULA - Limited License Agreement for module development](https://foundryvtt.com/article/license/).

The original [fvtt-token-action-hud-dnd5e](https://github.com/Larkinabout/fvtt-token-action-hud-dnd5e) module by [Larkinabout](https://github.com/Larkinabout) which this module is based on is also licensed under CC BY 4.0.
