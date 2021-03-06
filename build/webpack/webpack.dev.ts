import config from './webpack.base';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const debugDirectory = path.resolve(__dirname, '../../src/debug');

config
    .entry('index')
    .clear()
    .add('css-hot-loader/hotModuleReplacement')
    .add(path.resolve(debugDirectory, 'index.ts'));

config.watch(true);

config.mode('development').devtool('inline-cheap-module-source-map' as any);
config.output.filename('[name].js').path(path.resolve(__dirname, '../../dist'));

config.devServer
    .port(9999)
    .disableHostCheck(true)
    .hot(true)
    .allowedHosts.add('0.0.0.0')
    .end()
    .watchContentBase(true);

config.plugin('html').use(HtmlWebpackPlugin, [
    {
        template: path.resolve(debugDirectory, 'index.html')
    }
]);
config.plugin('hot').use(webpack.HotModuleReplacementPlugin);

export default config.toConfig();
