// Patch mocha colours
// https://github.com/mochajs/mocha/issues/1200
Object.assign(require('mocha/lib/reporters/base').colors, {
	'pass': 92,
	'error stack': 92,
	'fast': 92,
	'light': 92,
	'diff gutter': 92,
	'diff added': 34,
	'diff removed': 33
});
