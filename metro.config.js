const { getDefaultConfig } = require("expo/metro-config");

// Find the project and workspace directories
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [projectRoot];

// config.resolver.extraNodeModules = {
// 	...config.resolver.extraNodeModules,
// 	...require.resolve("node-libs-react-native"),
// 	...require.resolve("crypto-browserify"),
// 	...require.resolve("stream-browserify"),
// 	net: require("node-libs-react-native/mock/net"),
// };

// Important to allow importing package exports
config.resolver.unstable_enablePackageExports = true;

config.resolver.unstable_conditionNames = [
	"browser",
	"require",
	"react-native",
];

module.exports = config;
