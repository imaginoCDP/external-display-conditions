export const PLUGIN_ID = import.meta.env.VITE_PLUGIN_ID || "YOUR_PLUGIN_ID";
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "YOUR_SECRET_KEY";

export const EDITOR_URL =
  import.meta.env.VITE_EDITOR_URL ||
  "https://plugins.stripo.email/resources/uieditor/latest/UIEditor.js";

export const USER_ID = import.meta.env.VITE_USER_ID || "1";
export const EMAIL_ID = `${PLUGIN_ID}_${USER_ID}_demo_external_cond22`;

export const SAVE_TEMPLATE_KEY = "template";
