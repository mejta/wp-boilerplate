# WordPress development boilerplate

Development boilerplate for building custom plugin and theme. This boilerplate is for projects, that have no continuous development (therefore there is no WordPress framework used) and that:

* use Twig for templates, 
* requires plugins that are necessary for it's run, 
* provide standard way for updates/deployments (every deployment is plugin update and goes through standard update process),
* have a theme that takes care only of data representation,
* have a plugin that takes care of everything else (custom post types, custom fields, forms, etc.),
* have one repository for theme and plugin,
* have a possibility to have multiple themes,
* have a nice structure that leverage modern , WordPress and frontend development,
* uses composer for it's dependencies (that are not WP plugins).

## What's inside:
* Plugin boilerplate inspired by [WPPB.me](https://wppb.me/)
* Templates are written with Twig thanks to [Timber](https://www.upstatement.com/timber/)
* Assets are compiled with [Laravel Mix](https://github.com/JeffreyWay/laravel-mix/tree/master/docs#readme)
* Plugin dependencies on other plugins are managed by [TGM Plugin Activation](http://tgmpluginactivation.com/)
* Plugin can be updated in a same way as any other plugin from WordPress.org with [Plugin Update Checker](https://github.com/YahnisElsts/plugin-update-checker)

## How to contribute
If you want to improve this boilerplate, feel free to open pull request.
