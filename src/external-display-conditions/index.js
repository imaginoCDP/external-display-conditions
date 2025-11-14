import { ExtensionBuilder } from "@stripoinc/ui-editor-extensions";
import { MyExternalDisplayConditions } from "./MyExternalDisplayConditions";

const externalDisplayConditionsExtension = new ExtensionBuilder()
  .withExternalDisplayCondition(MyExternalDisplayConditions)
  .build();

export default externalDisplayConditionsExtension;
