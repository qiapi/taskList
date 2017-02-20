var webpack = require('webpack');		// 引入webpack模块
var path = require('path');				// 引入path模块
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
	entry: [
		path.resolve(__dirname,'./index.js')
	],
	output: {
		path:path.resolve(__dirname,'./build/'),
		filename:'bundle.js'
	},
	resolve: {
		extensions:[' ','.js','.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				loader:'babel-loader',
				exclude: /node_modules/,
				query: {
					presets:['es2015','react']
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080/webpack-dev-server/demo1.html'
		})
	]
}