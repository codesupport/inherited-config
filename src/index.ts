import * as process from "process";
import * as path from "path";
import * as fs from "fs";

interface Options {
	path: string;
	log: boolean;
}

class InheritedConfig {
	private readonly config: Record<string, any> = {};
	private readonly options: Options = {
		log: false,
		path: ""
	};

	require(path: string): any {
		// eslint-disable-next-line global-require
		return require(path);
	}

	private log(message: string): void {
		if (this.options.log) {
			console.debug(`[@codesupport/inherited-config DEBUG] ${message}`);
		}
	}

	constructor(options?: Partial<Options>) {
		const root = path.resolve(process.cwd(), options?.path ?? "");
		const productionConfig = path.resolve(root, "config.json");

		this.options = { ...this.options, ...options };

		if (fs.existsSync(productionConfig)) {
			this.config = this.require(productionConfig);

			const env = process.env.NODE_ENV;
			const envConfig = path.resolve(root, `config.${env?.toLowerCase()}.json`);

			if (env && fs.existsSync(envConfig)) {
				this.config = {
					...this.config,
					...this.require(envConfig)
				};
			}
		} else {
			this.log(`Failed to initialise Inherited Config: no file at location '${productionConfig}'.`);
		}
	}

	getValue<T>(key: string): T | undefined {
		return this.config[key];
	}
}

export default InheritedConfig;