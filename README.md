# Inherited Config

## About
This repository contains the code for Inherited Config - a configuration library with inheritance support for multiple environments for TypeScript projects.

## Usage
1. Install the package using `npm i @codesupport/inherited-config`
2. In the entry point of your project add the following code:
```ts
import InheritedConfig from "@codesupport/inherited-config";

const config = new InheritedConfig();
```
3. Use `config.getValue()` to get a value from the config, for example:
```ts
if (config.getValue<boolean>("ENABLE_LOGS")) {
    console.log("Logs are enabled.");
}
```

If your `config.json` and corresponding environment based config files are not in the root of your project you can change the path InheritedConfig looks at by using the `path` option.
For example, if your `config.json` is within the `src` directory you can do:
```ts
import InheritedConfig from "@codesupport/inherited-config";

const config = new InheritedConfig({
    path: "src"
});
```

If you're having problems with InheritedConfig reading your config files you can enable debug logging:
```ts
import InheritedConfig from "@codesupport/inherited-config";

const config = new InheritedConfig({
    log: true
});
```

## Scripts
- To build the source code use `npm run build`
- To test the code use `npm test`
- To lint the code use `npm run lint`

**Any Questions?** Feel free to mention @LamboCreeper#6510 in the [CodeSupport Discord](https://discord.gg/Hn9SETt).