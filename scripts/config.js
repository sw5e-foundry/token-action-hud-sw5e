import { importClass } from './utils.js'

export const coreModuleVersion = '0.1.1'
const coreModulePath = '../../token-action-hud-core/'
const coreActionHandlerFile = `${coreModulePath}scripts/action-handlers/action-handler.js`
const coreActionListExtenderFile = `${coreModulePath}scripts/action-handlers/action-list-extender.js`
const coreCategoryManagerFile = `${coreModulePath}scripts/category-manager.js`
const corePreRollHandlerFile = `${coreModulePath}scripts/roll-handlers/pre-roll-handler.js`
const coreRollHandlerFile = `${coreModulePath}scripts/roll-handlers/roll-handler.js`
const coreSystemManagerFile = `${coreModulePath}scripts/system-manager.js`
const loggerFile = `${coreModulePath}scripts/logger.js`
const coreUtilsFile = `${coreModulePath}scripts/utilities/utils.js`

export const CoreActionHandler = await importClass(coreActionHandlerFile)
export const CoreActionListExtender = await importClass(coreActionListExtenderFile)
export const CoreCategoryManager = await importClass(coreCategoryManagerFile)
export const CorePreRollHandler = await importClass(corePreRollHandlerFile)
export const CoreRollHandler = await importClass(coreRollHandlerFile)
export const CoreSystemManager = await importClass(coreSystemManagerFile)
export const Logger = await importClass(loggerFile)
export const CoreUtils = await import(coreUtilsFile)
