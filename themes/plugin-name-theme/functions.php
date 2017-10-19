<?php

# https://timber.github.io/docs/getting-started/

if ( !class_exists( 'Timber' ) ) {
	add_action( 'admin_notices' , function () {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter( 'template_include' , function ($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = [ 'templates' , 'views' ];

add_action( 'wp_enqueue_scripts' , function () {
	wp_enqueue_style( 'plugin-name-theme' , get_template_directory_uri() . '/static/theme.css' );
	wp_enqueue_script( 'plugin-name-theme' , get_template_directory_uri() . '/static/theme.js', ['jquery'] , false , true ); 
} );

add_action( 'after_setup_theme' , function () {
	add_theme_support( 'post-formats' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'menus' );
	add_theme_support( 'html5', [ 'search-form' , 'comment-form' , 'comment-list' , 'gallery' , 'caption' ] );
	add_theme_support( 'title-tag' );
	register_nav_menu( 'top', 'Top menu' );
	load_theme_textdomain( 'plugin-name-theme' );
});
