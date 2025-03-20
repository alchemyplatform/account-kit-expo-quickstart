const { getDefaultConfig } = require("expo/metro-config");

// Find the project and workspace directories
const projectRoot = __dirname;
const path = require("path");
const config = getDefaultConfig(projectRoot);

// Important to allow importing package exports
config.resolver.unstable_enablePackageExports = true;

config.resolver.unstable_conditionNames = [
	"browser",
	"require",
	"react-native",
];

const ALIASES = {
	"@noble/hashes/crypto": path.resolve(
		__dirname,
		"node_modules/@noble/hashes/crypto.js"
	),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
	if (ALIASES[moduleName]) {
		return {
			filePath: ALIASES[moduleName],
			type: "sourceFile",
		};
	}
	return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
