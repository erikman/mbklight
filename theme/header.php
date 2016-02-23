<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package MBKLight
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?>>
    <div id="page" class="hfeed site">
      <a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'mbklight' ); ?></a>

    <nav id="site-navigation" class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-logo" href="<?php echo home_url(); ?>">
						<?php 
							if ( get_theme_mod( 'mbklight_logo' ) ) : ?>
								<img src="<?php echo esc_url( get_theme_mod( 'mbklight_logo' ) ); ?>"/><?php
							endif; ?>
          </a>
          <a class="navbar-brand" href="<?php echo home_url(); ?>"><?php echo bloginfo( 'name' ); ?></a>
        </div>

        <?php
          wp_nav_menu( array(
            'menu'              => 'primary',
            'theme_location'    => 'primary',
            'depth'             => 2,
            'container'         => 'div',
            'container_class'   => 'collapse navbar-collapse',
            'container_id'      => 'mbklight-navbar-collapse-primary',
            'menu_class'        => 'nav navbar-nav',
            'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
            'walker'            => new wp_bootstrap_navwalker())
          );?>
      </div>
    </nav><!-- #site-navigation -->

    <div id="content" class="site-content container">
