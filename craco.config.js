const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const  packageJson = require('./package.json');

const overrideWebpackConfig = ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
  webpackConfig.plugins.push(new CopyPlugin({
    patterns: [
      { from: 'node_modules/cesium/Build/Cesium', to: 'cesium' },
      { context: 'src/challenges', from: '**/*.json', to: 'challenges' }
    ]
  }));

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(packageJson.version)
  }));

  webpackConfig.externals = {
    cesium: 'Cesium',
    '@cesium/engine': 'Cesium'
  };

  return webpackConfig;
};

module.exports = {
  webpack: {
    configure: {
      ignoreWarnings: [
        function (warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        }
      ]
    }
  },
  plugins: [{ plugin: { overrideWebpackConfig }}]
};
