const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => !(plugin instanceof ModuleScopePlugin),
  );
  config.resolve.alias['use-menu-hook$'] = path.resolve(__dirname, '../../src');
  config.resolve.alias['react$'] = path.resolve(__dirname, '../../node_modules/react');
  config.resolve.alias['react-dom$'] = path.resolve(__dirname, '../../node_modules/react-dom');
  return config;
};
