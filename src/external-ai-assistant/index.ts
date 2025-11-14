import { ExtensionBuilder } from "@stripoinc/ui-editor-extensions";
import { MyExternalAiAssistant } from "./MyExternalAiAssistant";

const externalAiAssistantExtension = new ExtensionBuilder()
  .withExternalAiAssistant(MyExternalAiAssistant)
  .build();

export default externalAiAssistantExtension;
