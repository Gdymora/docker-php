<?php
/**
 * Plugin Name: jdProperty
 * Description: First Plugin
 * Version: 1.0
 * Author: Petroff
 * Licence: GPLv2 or later
 * Text Domain: jdproperty
 */
if (!defined('ABSPATH')) {
    die;
}

class jdProperty
{

    public function register()
    {

        add_action('init', [$this, 'custom_post_type']);
    }

    public function custom_post_type()
    {
        register_post_type(
            'property',
            array(
                'public' => true,
                'has_archive' => true,
                'rewrite' => array('slug' => 'properties'),
                'label' => 'Property',
                'supports' => array('title', 'editor', 'thumbnail')
            )
        );

        register_post_type(
            'agent',
            array(
                'public' => true,
                'has_archive' => true,
                'rewrite' => array('slug' => 'properties'),
                'label' => 'Agents',
                'supports' => array('title', 'editor', 'thumbnail'),
                'show_in_rest' => true
            )
        );
        // Add new taxonomy, make it hierarchical (like categories)
        $labels = array(
            'name' => _x('Locations', 'taxonomy general name', 'jdproperty'),
            'singular_name' => _x('Location', 'taxonomy singular name', 'jdproperty'),
            'search_items' => __('Search Locations', 'jdproperty'),
            'all_items' => __('All Locations', 'jdproperty'),
            'parent_item' => __('Parent Location', 'jdproperty'),
            'parent_item_colon' => __('Parent Location:', 'jdproperty'),
            'edit_item' => __('Edit Location', 'jdproperty'),
            'update_item' => __('Update Location', 'jdproperty'),
            'add_new_item' => __('Add New Location', 'jdproperty'),
            'new_item_name' => __('New Location Name', 'jdproperty'),
            'menu_name' => __('Location', 'jdproperty'),
        );
        $args = array(
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'properties/location'),
            'labels' => $labels,
        );

        register_taxonomy(
            'location',
            'property',
            $args
        );
    }

    static function activation()
    {
        //hook activation
        flush_rewrite_rules();
    }

    static function deactivation()
    {
        flush_rewrite_rules();
    }
}

if (class_exists('jdProperty')) {
    $jdProperty = new jdProperty();
    $jdProperty->register();
}


register_activation_hook(__FILE__, array($jdProperty, 'activation'));
register_deactivation_hook(__FILE__, array($jdProperty, 'deactivation'));