# WordPress development boilerplate

Development boilerplate for building custom plugin and theme. This boilerplate is for projects, that have no continuous development (therefore there is no WordPress framework used) and that:

* uses Twig for templates, 
* requires plugins in admin that are necessary for it's run,
* provides standard way for updates/deployments (every deployment is plugin update and goes through standard update process),
* has a theme that takes care only of data representation,
* has a plugin that takes care of everything else (custom post types, custom fields, forms, etc.),
* has one repository for theme and plugin,
* has a possibility to have multiple themes,
* has a nice structure that leverage modern , WordPress and frontend development,
* uses composer for it's dependencies (that are not WP plugins).

## What's inside:
* Plugin boilerplate inspired by [WPPB.me](https://wppb.me/)
* Templates are written with Twig thanks to [Timber](https://www.upstatement.com/timber/)
* Assets are compiled with [Laravel Mix](https://github.com/JeffreyWay/laravel-mix/tree/master/docs#readme)
* Plugin dependencies on other plugins are managed by [TGM Plugin Activation](http://tgmpluginactivation.com/)
* Plugin can be updated in a same way as any other plugin from WordPress.org with [Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker)

## How to contribute
If you want to improve this boilerplate, feel free to open a pull request.

## Requirements
* Running WordPress instance
* Node.js

## How to start a new project development
1. Create project with composer inside `wp-content/plugins` directory:
```bash
cd wp-content/plugins
composer create-project mejta/wp-boilerplate [your plugin name]
cd [your plugin name]
```
2. Install dependencies:
```bash
npm install
```
3. Edit `plugin-info.json` file and whitelabel your plugin. (Be careful, you can do it only once, so do it right):
```bash
node whitelabel.js
```
4. Compile your assets for development:
```bash
npm run watch
```
5. Compile your assets for production:
```bash
npm run production
```
