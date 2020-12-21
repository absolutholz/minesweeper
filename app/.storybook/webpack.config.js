const path = require('path');

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.(scss)$/,
		include: path.resolve(__dirname, './../'),
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					importLoaders: 1,
				},
			},
			// {
			// 	loader: 'postcss-loader',
			// 	options: {
			// 		sourceMap: true,
			// 		ident: 'postcss',
			// 		plugins: () => [ autoprefixer ],
			// 	},
			// },
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
					implementation: require('node-sass'),
				},
			},
		],
	});

	let rule = config.module.rules.find(r =>
		// it can be another rule with file loader
		// we should get only svg related
		r.test && r.test.toString().includes('svg') &&
		// file-loader might be resolved to js file path so "endsWith" is not reliable enough
		r.loader && r.loader.includes('file-loader')
	);
	rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

	config.module.rules.push(
		{
			test: /\.svg$/,
			loader: 'vue-svg-loader',
			options: {
				svgo: {
					plugins: [
						{
							removeXMLNS: true,
						},
						{
							// https://github.com/guylando/svgo-addViewBox/blob/master/addViewBox.js
							// https://github.com/svg/svgo/issues/722#issuecomment-385028841
							removeSvgId: {
								type: 'perItem',
								name: 'convertDimensionsToViewbox',
								description: 'replaces width, height attributes of an svg with viewBox attribute to make it responsive',
								fn: function (item) {
									if (
										item.isElem(['svg']) &&
										!item.hasAttr('viewBox') &&
										item.hasAttr('width') &&
										item.hasAttr('height')
									) {
										var width = parseFloat(
											item
												.attr('width')
												.value.replace(/px$/, '')
										);
										var height = parseFloat(
											item
												.attr('height')
												.value.replace(/px$/, '')
										);
										item.removeAttr('width');
										item.removeAttr('height');
										item.addAttr({
											name: 'viewBox',
											prefix: '',
											local: 'viewBox',
											value:
												'0 0 ' +
												width +
												' ' +
												height,
										});
									}
								},
							},
						},
					],
				},
			},
		},
	);

	return config;
};
