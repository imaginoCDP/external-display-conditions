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
  saveTemplateBtn.onclick = saveCurrentTemplate;
};

export { setupSaveHandler, loadSavedTemplate };
