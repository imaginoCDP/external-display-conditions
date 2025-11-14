import { SAVE_TEMPLATE_KEY } from "./creds";

/* Call stripoAPI to compile the template currently in edition. */
function compile() {
  return new Promise((resolve, reject) => {
    const сompileEmailCallback = (error, html) => {
      if (error) {
        reject(error);
      }
      resolve(html);
    };
    // Create the html email that will be sent with fusion tag syntax
    window.StripoEditorApi.actionsApi.compileEmail({
      callback: сompileEmailCallback,
    });
  });
}

/* Call stripoAPI to retrieve the structured HTML in the template currently in edition. */
function getTemplate() {
  return new Promise((resolve) => {
    window.StripoEditorApi.actionsApi.getTemplateData(({ html, css }) => {
      resolve({ html, css });
    });
  });
}

/**
 * This method saves the current changes made by the user in the email editor.
 * It is particularly useful when autosave is disabled. Required since stripo V2
 * for Manual Save because all template loaded in the editor are recorded
 * in the “reference email” in Stripo’s database, autosave enabled or not.
 *
 * @see https://plugin.stripo.email/plugin-invocations/javascript-api#actions-api
 */
function saveTemplate() {
  if (!window.StripoEditorApi) {
    return; // Nothing to do if the editor is stripo V1
  }
  return new Promise((resolve, reject) => {
    window.StripoEditorApi.actionsApi.save((error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

// Get the current template from the editor and save it to localStorage
async function saveCurrentTemplate() {
  const compilePromise = compile();
  const templatePromise = getTemplate();

  const [html, internalStructure] = await Promise.all([
    compilePromise,
    templatePromise,
  ]);
  const strInternalStruct = JSON.stringify(internalStructure);

  localStorage.setItem(SAVE_TEMPLATE_KEY, strInternalStruct);
  alert(
    "Current template saved successfully to localStorage",
    internalStructure
  );
  return { html, strInternalStruct };
}

function loadSavedTemplate() {
  const savedTemplate = localStorage.getItem(SAVE_TEMPLATE_KEY);

  // If template already saved, load it from localStorage
  if (savedTemplate) {
    try {
      const loadedTemplate = JSON.parse(savedTemplate);
      console.log("loadedTemplate from localStorage", loadedTemplate);
      return loadedTemplate;
    } catch (error) {
      console.error("Failed to load template from localStorage", error);
      return null;
    }
  }
  return null;
}

const setupSaveHandler = () => {
  const saveTemplateBtn = document.getElementById("saveTemplate");
  saveTemplateBtn.onclick = saveTemplate;
};

export { setupSaveHandler, loadSavedTemplate, saveCurrentTemplate };
