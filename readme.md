# Wordpress development boiler plate

This development boiler plate is a plugin with custom theme folder inside the plugin.

## Used technologies:
* Assets are compiled with [laravel-mix](https://github.com/JeffreyWay/laravel-mix/tree/master/docs#readme)
* Plugin dependencies are managed by [TGM Plugin Activation](http://tgmpluginactivation.com/)

## Structure:
* / - plugin folder
* /themes/[theme name]/ - theme folder
* /themes/[theme name]/resources/ - source scss and js files
* /themes/[theme name]/static/ - compiled css and js files
* /themes/[theme name]/templates/ - .twig templates
* .env - file with enviroment variables

