import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	request,
	Setting,
} from "obsidian";
import { stringify } from "querystring";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	applicationKey: string;
	authToken: string;

}

const DEFAULT_SETTINGS: MyPluginSettings = {
	applicationKey: "",
	authToken: "",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon(
			"dice",
			"Sample Plugin",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				new Notice("This is a notice!");
			}
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "get world",
			name: "Gets World Anvil World",
			callback: () => {
				const requestParams = {
					url: "https://www.worldanvil.com/api/aragorn/article/a23bee60-b566-4afc-87fd-f24bff57750a",
					method: "GET",
					contentType: "application/json",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "app://obsidian.md",
						"User-Agent": "PhD20 Obsidian Plugin",
						"x-application-key": this.settings.applicationKey,
						"x-auth-token": this.settings.authToken,
					},
				};
				request(requestParams).then((data) => {
					console.log(data);
				});
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for World Anvil Obsidian Updater." });

		new Setting(containerEl)
			.setName("Application Key")
			.setDesc("You'll need to obtain this from a World Anvil admin.")
			.addText((text) =>
				text
					.setPlaceholder("Enter your application key")
					.setValue(this.plugin.settings.applicationKey)
					.onChange(async (value) => {
						// console.log("Secret: " + value);
						this.plugin.settings.applicationKey = value;
						await this.plugin.saveSettings();
					})
			);

			new Setting(containerEl)
			.setName("Auth Token")
			.setDesc("You can set up an auth token under Account Details on World Anvil.")
			.addText((text) =>
				text
					.setPlaceholder("Enter your auth token")
					.setValue(this.plugin.settings.authToken)
					.onChange(async (value) => {
						console.log("Secret: " + value);
						this.plugin.settings.authToken = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
