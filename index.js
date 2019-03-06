const intercept = require("intercept-require");
const replacementFor = {};
let _verbose = false;

intercept((moduleExport, info) => {
	const toModule = replacementFor[info.moduleId];
	
	if (toModule) {
		if (_verbose) {
			console.log(`-- REPLACED -- require("${info.moduleId}") from ${info.callingFile}`);
		}
		
		if (typeof toModule === "string") {
			// Require from path
			return require(toModule);
		}
		
		return toModule;
	}
	
	if (_verbose) {
		console.log(`require("${info.moduleId}") from ${info.callingFile}`);
	}
	
	return moduleExport;
}, {});

/**
 * Intercepts any require() calls to the "from" module and
 * returns the "to" module instead. Useful for unit testing
 * and mocking by passing a mock library that pretends to
 * do things that the real library would do.
 * @param {String} from The path of the module to replace,
 * just as you would type it if you were requiring it from
 * another module. Only require() calls that match exact
 * path you specify will be replaced.
 * @param {NodeModule} to The module to replace with.
 * @returns {*} Nothing.
 */
const replaceModule = (from, to) => {
	replacementFor[from] = to;
};

/**
 *
 * @param from
 */
const revertModule = (from) => {
	delete replacementFor[from];
};

const verbose = (val) => {
	_verbose = val;
};

module.exports = {
	replaceModule,
	revertModule,
	verbose
};