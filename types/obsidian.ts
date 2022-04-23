import { CachedMetadata, FrontMatterCache } from "obsidian";
import { StateType, TemplateType } from "./article";

export interface FrontMatter extends FrontMatterCache {
    template?: TemplateType;
    state?: StateType;
    isDraft?: 0 | 1;
    isWip?: 0 | 1;
}
