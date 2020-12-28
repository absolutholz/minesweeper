module.exports = {
	chainWebpack: (config) => {
		config
			.plugin('html')
			.tap((args) => {
				args[0].title = 'Minesweeper';
				return args;
			});

		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			.use('babel-loader')
			.loader('babel-loader')
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.tap((options) => {
				return {
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
				};
			});
	},

	css: {
		sourceMap: true,
	},

	pwa: {
		themeColor: '#fffff8',
		manifestOptions: {
			name: 'Minesweeper',
			short_name: 'Minesweeper',
			description: 'A simple minesweeper game by absolutholz',
			display: 'fullscreen',
			background_color: '#fffff8',
			icons: [
				{
				  src: './favicon-32x32.png',
				  sizes: '32x32',
				  type: 'image/png',
				},
				{
				  src: './favicon-16x16.png',
				  sizes: '16x16',
				  type: 'image/png',
				},
				{
				  src: './apple-touch-icon-152x152.png',
				  sizes: '152x152',
				  type: 'image/png',
				},
				{
				  src: './safari-pinned-tab.svg',
				  sizes: '942x942',
				  type: 'image/svg+xml',
				},
				{
				  src: './mstile-144x144.png',
				  sizes: '144x144',
				  type: 'image/png',
				},
			],
		},
		iconPaths: {
			favicon32: 'favicon-32x32.png',
			favicon16: 'favicon-16x16.png',
			appleTouchIcon: 'apple-touch-icon-152x152.png',
			maskIcon: 'safari-pinned-tab.svg',
			msTileImage: 'mstile-144x144.png',
		},
	},
};
