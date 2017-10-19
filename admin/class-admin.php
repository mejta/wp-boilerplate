<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.mejta.net
 * @since      1.0.0
 *
 * @package    Mejta
 * @subpackage Mejta/admin
 */

namespace Mejta;

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Mejta
 * @subpackage Mejta/Admin
 * @author     Daniel Mejta <daniel@mejta.net>
 */

class Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'static/admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'static/admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Require or recommend plugin installation with TGMPA
	 */
	public function tgmpa_register() {
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
			[
				'name' => 'Debug Bar',
				'slug' => 'debug-bar',
				'required' => false,
			],
			[
				'name' => 'Timber Debug Bar',
				'slug' => 'debug-bar-timber',
				'required' => false,
			],
			[
				'name' => 'WP Inspect',
				'slug' => 'wp-inspect',
				'required' => false,
			],
		];

		$config = [
			'id' => 'tgmpa',
			'menu' => 'tgmpa-install-plugins',
			'parent_slug' => 'plugins.php',
			'capability' => 'install_plugins',
			'has_notices' => true,
			'dismissable' => true,
			'is_automatic' => true,
		];

		tgmpa( $plugins, $config );
	}
}
