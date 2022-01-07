import {SinonSandbox, createSandbox, SinonSpy} from "sinon";
import { expect } from "chai";
import InheritedConfig from "../src/index";

describe("InheritedConfig", () => {
	let sandbox: SinonSandbox;
	let requireSpy: SinonSpy;

	beforeEach(() => {
		sandbox = createSandbox();
		requireSpy = sandbox.spy(InheritedConfig.prototype, "require");
	});

	afterEach(() => sandbox.restore());

	describe("constructor()", () => {
		it("requires in the config.json", () => {
			new InheritedConfig({ path: "test" });

			expect(requireSpy.args[0].toString().endsWith("config.json")).to.be.true;
		});

		it("requires in the environment config", () => {
			process.env.NODE_ENV = "dev";

			new InheritedConfig({ path: "test" });

			expect(requireSpy.args[1].toString().endsWith("config.dev.json")).to.be.true;
		});
	});

	describe("getValue()", () => {
		it("returns the config.json value if no valid environment is set", () => {
			process.env.NODE_ENV = "test";

			const config = new InheritedConfig({path: "test" });

			expect(config.getValue("timeout")).to.equal(300);
		});

		it("returns the environment config value if a valid environment is set", () => {
			process.env.NODE_ENV = "dev";

			const config = new InheritedConfig({ path: "test" });

			expect(config.getValue("timeout")).to.equal(3600);
		});
	});
});