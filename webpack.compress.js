const path = require('path');
const glob = require('globby');
const chalk = require('chalk');
const figlet = require('figlet');

const ENTRY_PATH = {
	pattern: ['img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}'],
	app: path.join(__dirname, 'app')
};

const getEntryPath = (config) => {
	const fileList = glob.sync(config.pattern);
	return fileList.reduce((previous, current) => {
		const filePath = path.parse(path.relative(config.app, current));
		const withoutSuffix = path.join(filePath.dir, filePath.name);
		previous[withoutSuffix] = path.resolve(__dirname, current);
		return previous;
	}, {});
};

const init = () => {
	console.log(
		chalk.bold.green(
			figlet.textSync('MINIAPP CLI', {
				horizontalLayout: 'default',
				verticalLayout: 'default'
			})
		)
	);
};

let config = {
	entry: getEntryPath(ENTRY_PATH),
	output: {
		path: __dirname
	},
	mode: 'production',
	watch: true,
	watchOptions: {
		ignored: ['cli/**', 'node_modules/**']
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							publicPath: 'app/assets',
							outputPath: 'app/assets'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							pngquant: {
								quality: [0.6, 0.9],
								speed: 4
							}
						}
					}
				]
			}
		]
	}
};
init();
module.exports = config;
