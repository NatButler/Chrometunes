module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'index.js',
		path: '/public'
	},
	devServer: {
		inline: true,
		port: 3332
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}