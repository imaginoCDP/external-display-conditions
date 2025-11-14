import { ExtensionBuilder } from "@stripoinc/ui-editor-extensions";
import MyExternalSmartElementsLibrary from "./MyExternalSmartElementsLibrary.ts";

const externalSmartElementsExtension = new ExtensionBuilder()
  .withExternalSmartElementsLibrary(MyExternalSmartElementsLibrary)
  .build();

export default externalSmartElementsExtension;
