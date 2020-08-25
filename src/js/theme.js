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
        // If this button started as not expanded, we want to expand it.
        if (currentlyExpanded == 'false') {
          $(this).attr('aria-expanded', 'true');
        }
      });
      // Since javascript is working, toggle the mobile nav closed on page load.
      $('.site-header__toggle').attr('aria-expanded', 'false');
      // Close the mobile header panes if the window is resized.
      $(window).once('window-resize-mobile').resize(function () {
        $('.site-header__toggle').attr('aria-expanded', 'false');
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
