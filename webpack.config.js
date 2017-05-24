const { resolve } = require('path');

module.exports = {
	entry: './src/main.jsx',
	output: {
		filename: 'app.js',
		path: resolve(__dirname, 'app/js')
	},
	resolve: {
    extensions: ['.js', '.jsx']
  },
	devServer: {
		inline: true,
		port: 3332
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|browser_components)/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}