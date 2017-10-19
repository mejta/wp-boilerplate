let mix = require('laravel-mix');

mix

.js('themes/plugin-name-theme/resources/js/theme.js', 'themes/plugin-name-theme/static/theme.js')
.sass('themes/plugin-name-theme/resources/scss/theme.scss', 'themes/plugin-name-theme/static/theme.css')

.js('admin/resources/js/admin.js', 'admin/static/admin.js')
.sass('admin/resources/scss/admin.scss', 'admin/static/admin.css')

.js('site/resources/js/site.js', 'site/static/site.js')
.sass('site/resources/scss/site.scss', 'site/static/site.css')

.sourceMaps()
.browserSync({
    proxy: 'localhost',
    open: false,
});
