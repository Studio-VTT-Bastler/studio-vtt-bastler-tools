/**
 * @file Defines constants used throughout the module.
 * @module const
 */

/**
 * A frozen object containing all module-specific constants.
 * Using a single object as a namespace prevents polluting the global scope
 * and makes it clear where constants are coming from.
 */
export const CONST = Object.freeze({
  /**
   * The unique ID for this module, used for settings, flags, and template paths.
   * @type {string}
   */
  MODULE_ID: "studio-vtt-bastler-tools",

  /**
   * Paths to the Handlebars templates used by the module's applications.
   * @type {object}
   */
  TEMPLATES: {
    WINDOW: "modules/studio-vtt-bastler-tools/templates/window.hbs",
    CITY_VIEW: "modules/studio-vtt-bastler-tools/templates/city-view.hbs",
  },

  /**
   * Keys for the flags used by this module to store data on users or other documents.
   * @type {object}
   */
  FLAGS: {
    CITY_MODULES: "cityModules",
  },
});