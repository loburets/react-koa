'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
const webpack = require('webpack');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const passport = require('./auth/passport');
const session = require('koa-generic-session');
const db = require('./models');
const send = require('koa-send');
// todo replace to some proper session storage like as Redis
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const config = require('./config/config.json');

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

app.keys = [config.appSecret];

app.use(serve('public'));

let server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is started on ${port} port`);
  /* eslint-enable no-console */
});

app.use(bodyParser())
    .use(session({
        store: new SequelizeSessionStore(
            db.sequelize, {
                tableName: 'sessions',
            },
        )
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async ctx => {
        await send(ctx, 'public/index.html');
    });

module.exports = server;