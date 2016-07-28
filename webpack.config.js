const Html = require('html-webpack-plugin');
const LiveReload = require('webpack-livereload-plugin');

module.exports = {
	entry: './src/App.js',
	output: {
		path: './out',
		filename: 'app.js'
	},
	plugins: [
		new Html({ template: './index.template.html', title: 'Calendar' }),
		new LiveReload({ appendScriptTag: true })
	],
	module: {
		loaders: [{
			test: /.js$/,
			exclude: /(node_modules|out)/,
			loader: 'babel'
		}, {
			test: /.js$/,
			exclude: /(node_modules|out)/,
			loader: 'eslint'
		}]
	},
	devtool: 'source-map',
	eslint: {
		configFile: './.eslintrc'
	}
}
