require('dotenv').config();
let mix = require('laravel-mix');

mix
.js('themes/mejta/resources/js/app.js', 'themes/mejta/static/js')
.sass('themes/mejta/resources/scss/app.scss', 'themes/mejta/static/css')
.version()
.sourceMaps()
.setPublicPath('themes/mejta')
.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery'],
})
.browserSync({
    proxy: process.env.APP_URL,
    open: false,
});
