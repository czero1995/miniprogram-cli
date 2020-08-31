const path = require('path');
const glob = require('globby');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const chalk = require('chalk');
const figlet = require('figlet');

const ENTRY_PATH = {
	pattern: ['app/pages/**/*.scss', 'app/components/**/*.scss', 'app/app.scss'],
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

const config = {
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
				test: /\.(scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: '/app/[name].wxss'
		})
	],
	resolve: {
		extensions: ['.scss']
	}
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
init();
module.exports = config;
