const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

const ExtractTextPluginConfig = new ExtractTextPlugin('./dist/style.css', {
    allChunks: true
});

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: "index_bundle.js"
	},
	module: {
		loaders: [
			{test: /\.scss$/, loader: ExtractTextPlugin.extract('style', "css-loader!sass-loader")},
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.json$/, exclude: /node_modules/, loader: "json-loader"}
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		ExtractTextPluginConfig
	],
	devServer: {
    port: 8081
  },
}