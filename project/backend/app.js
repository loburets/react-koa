'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
const webpack = require('webpack');
const router = require('./routes')

const port = process.env.PORT || PORT;
const app = new Koa();

const compiler = webpack(require('../webpack.config.js'), (err, stats) => {
  if (err || stats.hasErrors()) {
    /* eslint-disable no-console */
    console.log('There are webpack exception', err, stats.toJson('minimal'));
    /* eslint-enable no-console */
    return;
  }

  /* eslint-disable no-console */
  console.log('webpack initialized successfully');
  /* eslint-enable no-console */
});

compiler.watch({}, () => {
  /* eslint-disable no-console */
  console.log('building...');
  /* eslint-enable no-console */
});

app.use(serve('public'));

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is started on ${port} port`);
  /* eslint-enable no-console */
});

app.use(router.routes())
    .use(router.allowedMethods());