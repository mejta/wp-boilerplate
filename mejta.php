<?php
/**
 * Plugin Name: Mejta.net
 * Version:     1.0.0
 * Author:      Daniel Mejta
 * Author URI:  https://www.mejta.net
 * Text Domain: mejta
 */


# Require composer dependencies
require_once dirname( __FILE__ ) . '/vendor/autoload.php';


# Register themes directory
# https://codex.wordpress.org/Function_Reference/register_theme_directory
register_theme_directory(dirname( __FILE__ ) . '/themes');


# Get environment variables
add_action('init', function () {
    $dotenv = new Dotenv\Dotenv(__DIR__);
    $dotenv->load();
});


# Required and recommended plugins
add_action('tgmpa_register', function () {
	$plugins = [
		[
			'name' => 'Timber',
			'slug' => 'timber-library',
            'required' => true,
            'force_activation' => true,
        ],
        [
            'name' => 'Advanced Custom Fields',
            'slug' => 'advanced-custom-fields',
            'required' => true,
            'force_activation' => true,
        ],
    ];

    if(getenv('APP_ENV') != 'production') {
        $plugins = array_merge($plugins, [
            [
                'name' => 'Debug Bar',
                'slug' => 'debug-bar',
                'required' => false,
            ],
            [
                'name' => 'Timber Debug Bar',
                'slug' => 'debug-bar-timber',
                'required' => false,
            ]
        ]);
    }

	$config = [
		'id' => 'tgmpa',
		'menu' => 'tgmpa-install-plugins',
		'parent_slug' => 'plugins.php',
		'capability' => 'install_plugins',
		'has_notices' => true,
		'dismissable' => false,
		'is_automatic' => true,
    ];

	tgmpa( $plugins, $config );
});
