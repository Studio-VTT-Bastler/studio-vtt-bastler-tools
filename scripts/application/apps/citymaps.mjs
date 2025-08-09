import { CONST } from "../../utils/const.mjs";
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;
export default class CityMapApplication extends HandlebarsApplicationMixin(ApplicationV2) {
  /** @override */
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: `${CONST.MODULE_ID}-city-map`,
    window: {
      title: "City Map Menu",
      resizable: true
    },
    tag: "form",
    position: { width: 640, height: "auto" },
    classes: ["SVTTB-application city-map-window"],
    form: {
      handler: this.prototype._onSubmitForm, // Binds to the instance method
      submitOnChange: false, // Only submit on explicit button clicks
    }
  });


  /** @override */
  static PARTS = {
    body: {
      template: CONST.TEMPLATES.WINDOW,
    },
  };

  /** @override */
  static actions = {
    allOn: this.#allOn,
    allOff: this.#allOff,
    toggleDaytime: this.#toggleDaytime,
    selectCity: this.#selectCity,
    setAreaOn: this.#setAreaOn,
    setArea50: this.#setArea50,
    setAreaOff: this.#setAreaOff,
  };

  // Action Handlers
  static #selectCity(event) {
    const cityId = event.currentTarget.dataset.cityId;
    console.log(`Selected city: ${cityId}`);
    this._revealAreas(cityId);
  }
  static #setAreaOn(event) {
    const tag = event.currentTarget.closest("[data-tag]").dataset.tag;
    setByTag(tag, false);
  }
  static #setArea50(event) {
    const tag = event.currentTarget.closest("[data-tag]").dataset.tag;
    setByChance(tag, 0.5);
  }
  static #setAreaOff(event) {
    const tag = event.currentTarget.closest("[data-tag]").dataset.tag;
    setByTag(tag, true);
  }
  static #allOn() { setAll(false); }
  static #allOff() { setAll(true); }
  static #toggleDaytime() { toggleDaytime(); }

  // Instance Methods
  async _prepareContext(options) {
    const registeredCityModules = game.user.getFlag(CONST.MODULE_ID, CONST.FLAGS.CITY_MODULES) || [];
    const cities = registeredCityModules.map(module => {
      const defaultIcon = `modules/${module.id}/assets/${module.id}.webp`;
      return { id: module.id || "unknown", name: module.name || "Unnamed City", icon: module.icon || defaultIcon };
    });
    return { cities };
  }
  async _revealAreas(cityId) {
    const registeredCityModules = game.user.getFlag(CONST.MODULE_ID, CONST.FLAGS.CITY_MODULES) || [];
    const cityModule = registeredCityModules.find(city => city.id === cityId);
    if (!cityModule) {
      ui.notifications.warn(`City '${cityId}' is not registered.`);
      return;
    }
    const areas = cityModule.areas || [];
    const areaContainer = this.element.querySelector(".area-buttons");
    areaContainer.innerHTML = "";
    const categorizedAreas = areas.reduce((acc, area) => {
      const category = area.category || "Areas";
      if (!acc[category]) acc[category] = [];
      acc[category].push(area);
      return acc;
    }, {});
    for (const [category, categoryAreas] of Object.entries(categorizedAreas)) {
      const categoryHeading = document.createElement("h3");
      categoryHeading.textContent = category;
      categoryHeading.className = "area-category";
      areaContainer.appendChild(categoryHeading);
      categoryAreas.forEach(area => {
        const row = document.createElement("div");
        row.className = "area-controls";
        row.dataset.tag = area.tag;
        row.innerHTML = `
          <div class="area-name">${area.name}</div>
          <button class="SVTTB-citymap-button" data-action="setAreaOn">On</button>
          <button class="SVTTB-citymap-button" data-action="setArea50">50%</button>
          <button class="SVTTB-citymap-button" data-action="setAreaOff">Off</button>
        `;
        areaContainer.appendChild(row);
      });
    }
    this.element.querySelector(".area-sections")?.classList.remove("hidden");
  }
}

// Add City Module
async function addCityModule(moduleId, moduleName) {
  try {
    if (!game.user.isGM) return;

    let cityModules = game.user.getFlag("dsa5-citymaps", "cityModules") || [];
    if (cityModules.some(city => city.id === moduleId)) {
      console.log(`City module '${moduleName}' is already registered.`);
      return;
    }

    cityModules.push({ id: moduleId, name: moduleName });
    await game.user.setFlag("dsa5-citymaps", "cityModules", cityModules);

    console.log(`City module '${moduleName}' has been added.`);
  } catch (err) {
    console.error("Error adding city module:", err);
  }
}

// Core Functions

function setByTag(tag, isOn) {
  const items = Tagger.getByTag(tag);
  if (items.length > 0) {
    const updates = items.map(i => ({ _id: i.id, hidden: isOn }));
    canvas.scene.updateEmbeddedDocuments("AmbientLight", updates);
  }
}

function setByChance(tag, prob) {
  const items = Tagger.getByTag(tag);
  if (items.length > 0) {
    const updates = items.map(i => ({
      _id: i.id,
      hidden: Math.random() < prob,
    }));
    canvas.scene.updateEmbeddedDocuments("AmbientLight", updates);
  }
}

function setAll(isOn) {
  canvas.lighting.updateAll({ hidden: isOn });
}

function toggleDaytime() {
  const isDay = canvas.scene.data.darkness < 0.5;
  canvas.scene.update({ darkness: isDay ? 1 : 0 }, { animateDarkness: true });
}