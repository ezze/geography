import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

import packageJson from './package.json';

export default defineConfig({
  plugins: [pluginReact(), pluginSass({ sassLoaderOptions: { sassOptions: { quietDeps: true } } })],
  source: {
    decorators: { version: 'legacy' },
    define: {
      VERSION: JSON.stringify(packageJson.version)
    }
  },
  tools: {
    // MobX decorators don't need type metadata, which would reference type-only imports
    swc: { jsc: { transform: { decoratorMetadata: false } } }
  },
  html: {
    template: './index.html'
  },
  output: {
    distPath: { root: 'build' },
    externals: {
      cesium: 'Cesium',
      '@cesium/engine': 'Cesium'
    },
    copy: [
      { from: 'node_modules/cesium/Build/Cesium', to: 'cesium' },
      { context: 'src/challenges', from: '**/*.json', to: 'challenges' }
    ]
  }
});
