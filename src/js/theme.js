(function ($, Drupal) {
  Drupal.behaviors.themename = {
    attach: function (context, settings) {

      //
      // The mobile header menu and search toggles.
      //
      $('.site-header__toggle').once('site-header-toggle').on('click', function(event) {
        // Check if this button is currently marked as expanded.
        var currentlyExpanded = $(this).attr('aria-expanded');
        // Toggle all site header buttons to not expanded.
        $('.site-header__toggle').attr('aria-expanded', 'false');
        // If this button started as not expanded, we want to expand it and show the mobile drawer.
        if (currentlyExpanded == 'false') {
          $(this).attr('aria-expanded', 'true');
          $('body').addClass('mobile-drawer-open');
        } else {
          // If we are closing the currently opened item, hide the mobile drawer.
          $('body').removeClass('mobile-drawer-open');
        }
      });
      // Since javascript is working, toggle the mobile nav closed on page load.
      $('.site-header__toggle').attr('aria-expanded', 'false');
      // Close the mobile header panes if the window is resized.
      $(window).once('window-resize-mobile').resize(function () {
        $('.site-header__toggle').attr('aria-expanded', 'false');
        $('body').removeClass('mobile-drawer-open');
      });

      //
      // Add the utility menu to the main menu region for display on mobile.
      //
      $('#region--header-utility nav').clone().addClass('mobile-only').appendTo('#region--header-menu');
      // Make sure the copy of the nav and heading don't have duplicate ids.
      $('#region--header-menu .mobile-only').each(function() {
        $(this).attr('id', $(this).attr('id') + '-mobile');
        $(this).attr('aria-labelledby', $(this).attr('aria-labelledby') + '-mobile');
        $('h2', this).attr('id', $('h2', this).attr('id') + '-mobile');
      });

      //
      // Hide the drupal admin toolbar drawer when resizing to mobile, and show it when resizing to desktop.
      //
      $(window).once('window-resize-toolbar').resize(Drupal.debounce(function () {
        if ($(window).width() < 1070) {
          $('#toolbar-item-administration.is-active').click();
        } else {
          $('#toolbar-item-administration:not(.is-active)').click();
        }
      }, 50));
    }
  };
})(jQuery, Drupal);
