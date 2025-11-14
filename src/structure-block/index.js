import { ExtensionBuilder } from "@stripoinc/ui-editor-extensions";
import { StructureBlockWithEmptyContainer } from "./blocks/StructureBlockWithEmptyContainer";
import en from "./i18n/en";
import uk from "./i18n/uk";
import { StructureBlockWithTwoContainers } from "./blocks/StructureBlockWithTwoContainers";

const structureBlockExtension = new ExtensionBuilder()
  .withLocalization({
    en: en,
    uk: uk,
  })
  .addBlock(StructureBlockWithEmptyContainer)
  .addBlock(StructureBlockWithTwoContainers)
  .build();

export default structureBlockExtension;
