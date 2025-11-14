import { PLUGIN_ID, SECRET_KEY, EDITOR_URL, EMAIL_ID, USER_ID } from "./creds";
import {
  loadSavedTemplate,
  saveCurrentTemplate,
  setupSaveHandler,
} from "./saveTemplate.js";

import externalDisplayConditionsExtension from "./external-display-conditions";
import customFontExtension from "./external-custom-font";
import couponBlockExtension from "./coupon-block";
import externalAiAssistantExtension from "./external-ai-assistant";
import externalSmartElementsExtension from "./external-smart-elements";
import blocksPanelExtension from "./blocks-panel";
import simpleBlockExtension from "./simple-block";
import structureBlockExtension from "./structure-block";
import externalMergeTagsUiExtension from "./external-merge-tags";

// Wait for the Stripo editor script to load
function loadStripoEditor() {
  const script = document.createElement("script");
  script.id = "UiEditorScript";
  script.src = EDITOR_URL;
  script.type = "module";
  script.onload = _initializeEditor;
  document.head.appendChild(script);
}

// Initialize the editor
function _initializeEditor() {
  _loadDemoTemplate((template) => {
    _runEditor(template);
  });
}

// Run the editor with the provided template and extension
function _runEditor(template) {
  console.log("template.html passed to the editor", template.html);

  window.UIEditor.initEditor(document.querySelector("#stripoEditorContainer"), {
    html: template.html,
    css: template.css,
    // A boolean parameter that forces the replacement of an existing email in
    // Stripo’s database with new HTML and CSS during editor initialization.
    forceRecreate: true, // For now, setting this to true => display condition's extraData is not returned
    metadata: {
      emailId: EMAIL_ID,
    },
    locale: "en",
    onTokenRefreshRequest: function (callback) {
      _request(
        "POST",
        "https://plugins.stripo.email/api/v1/auth",
        JSON.stringify({
          pluginId: PLUGIN_ID,
          secretKey: SECRET_KEY,
          userId: USER_ID,
          role: "admin",
        }),
        function (data) {
          callback(JSON.parse(data).token);
        }
      );
    },
    codeEditorButtonSelector: "#codeEditor",
    undoButtonSelector: "#undoButton",
    redoButtonSelector: "#redoButton",
    versionHistoryButtonSelector: "#versionHistoryButton",
    mobileViewButtonSelector: "#mobileViewButton",
    desktopViewButtonSelector: "#desktopViewButton",
    ignoreClickOutsideSelectors: ["#externalMergeTags"],
    conditionsEnabled: true, // IMPORTANT: Enable display conditions
    extensions: [
      externalDisplayConditionsExtension,
      // customFontExtension,
      // couponBlockExtension,
      // externalAiAssistantExtension,
      // externalSmartElementsExtension,
      // externalMergeTagsUiExtension,
      // blocksPanelExtension,
      // simpleBlockExtension,
      // structureBlockExtension,
    ],
    onSaveCompleted: (error) => {
      console.log("onSaveCompleted", error);
      if (!error) {
        saveCurrentTemplate();
      }
    },
    onTemplateLoaded: () => {
      setupSaveHandler();
      // We pass an initial template to stripo with emailId.
      // Then load the editor again with another template using the same
      // emailId, stripo keep loading the initial template, ignoring
      // the current template passed to the editor
      // The only workaround for now is to call `actionsApi.updateHtmlAndCss`
      // with the new template
      /*
      window.StripoEditorApi.actionsApi.updateHtmlAndCss(
        template.html,
        template.css
      );
      */
    },
  });
}

function _request(method, url, data, callback) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      callback(req.responseText);
    } else if (req.readyState === 4 && req.status !== 200) {
      console.error(
        "Can not complete request. Please check you entered a valid PLUGIN_ID and SECRET_KEY values"
      );
    }
  };
  req.open(method, url, true);
  if (method !== "GET") {
    req.setRequestHeader("content-type", "application/json");
  }
  req.send(data);
}

// Load demo template from GitHub or localStorage
function _loadDemoTemplate(callback) {
  const savedTemplate = loadSavedTemplate();
  // If template already saved, load it from localStorage
  if (savedTemplate) {
    return callback(savedTemplate);
  }

  import("./template.json")
    .then(({ default: template }) => {
      console.log("Load demo template from template.json", template);
      callback(template);
    })
    .catch((error) => {
      console.error("Error loading demo template from template.json", error);
    });
}

// Start loading when the page is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadStripoEditor);
} else {
  loadStripoEditor();
}
