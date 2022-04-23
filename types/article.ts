export interface CreateArticleParams {
	world: string;
	title: string;
	template: TemplateType;
	isDraft: 0 | 1;
	isWip: 0 | 1;
	state: StateType;
	content?: string;
	tags?: string;
}

export type StateType =
	| "public"
	| "private";

export type TemplateType =
	| "article" // Generic Article
	| "person" // Character
	| "militaryConflict" // Conflict
	| "condition" // Condition
	| "document" // Document
	| "ethnicity" // Ethnicity
	| "formation" // Formation
	| "location" // Geographic location
	| "item" // Item
	| "language" // Language
	| "law" // Law
	| "settlement" // Location, Settlement
	| "landmark" // Location, Landmark
	| "material" // Material
	| "myth" // Myth / Legend
	| "organization" // Organization
	| "prose" // Prose
	| "profession" // Profession
	| "rank" // Rank/Title
	| "spell" // Spell
	| "species" // Species
	| "technology" // Technology
	| "ritual" // Tradition / Ritual
	| "vehicle"; // Vehicle
