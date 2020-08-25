(function ($, Drupal) {
  Drupal.behaviors.themename = {
    attach: function (context, settings) {

      // Toggle the site header mobile buttons.
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

      // Actions taken when the window changes sizes.
      $(window).once('window-resize').resize(
        // Use debounce to only run the resizing functions every 50ms.
        Drupal.debounce(function () {
          // Hide the drupal admin toolbar drawer when resizing to mobile, and show it when resizing to desktop.
          if ($(window).width() < 1070) {
            $('#toolbar-item-administration.is-active').click();
          } else {
            $('#toolbar-item-administration:not(.is-active)').click();
          }
          // Close the mobile header panes if the window is resized.
          $('.site-header__toggle').attr('aria-expanded', 'false');
        }, 50)
      );

    }
  };
})(jQuery, Drupal);
