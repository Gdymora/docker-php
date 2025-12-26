<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jdymora
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<!-- parts -->
	<?php 
	//get_template_part('partials/part');
	?>
	<?php 
	//get_template_part('partials/part', 'one');
	?>  

	<?php wp_body_open(); ?>
  <div class="menu">
    <div class="div-menu-main">
      <div class="div-30">
        <div><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/6286169e7e678585cf65272c_logo.png" loading="lazy" height="25" alt class="image-2">
          <div class="text-block">ВАШ МАЙСТЕР</div>
        </div>
      </div>
      <div class="div-40">
        <div class="text-header-2-copy"><a onclick="return gtag_report_conversion('tel:+380662435814');" href="tel:+380662435814" class="link-2"><span class="text-span">+38 (066) </span>243 58 14</a>
          <br>
        </div>
      </div>
      <div class="div-30-2">
        <div onclick="openModal()" class="button-main-copy">ЗАМОВИТИ ДЗВІНОК</div>
      </div>
    </div>
  </div>


