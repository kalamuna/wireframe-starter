(function ($, Drupal) {
  Drupal.behaviors.themename = {
    attach: function (context, settings) {

      // Activate the mobile drawer on menu and search toggles.
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

      // If the width of a dropdown is greater than the space available on screen, align it to the right of the parent.
      $('#region--header-menu nav > ul > li').bind("mouseenter",  function(event) {
        if ($('ul', this).width() > $(window).width() - $(this).offset().left) {
          $(this).addClass('align-right');
        } else {
          $(this).removeClass('align-right');
        }
      });
      // Also check the dropdown width on keyboard focus.
      $('#region--header-menu nav > ul > li > a').focus(function () {
        $(this).parent().trigger('mouseenter');
      })

      // Add a toggle button to open and close the submenus on mobile.
      $('#region--header-menu nav > ul > li > ul').once('header-menu-toggle').each(function() {
        var id = Math.random().toString(36).substring(2, 15);
        $(this).before('<button class="header-menu-toggle" aria-expanded="false"><span class="visually-hidden">Toggle submenu</span><svg style="max-width:1em; max-height: 1em;" aria-hidden="true"><use xlink:href="#symbol-open" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>');
        $(this).prev('button').click(function () {
          $(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'false' ? 'true' : 'false');
        });
      });

      // Add the utility menu to the main menu region for display on mobile.
      $('#region--header-utility nav').clone().appendTo('#region--header-menu').each(function() {
        $(this).attr('id', $(this).attr('id') + '-mobile');
        $(this).attr('aria-labelledby', $(this).attr('aria-labelledby') + '-mobile');
        $('h2', this).attr('id', $('h2', this).attr('id') + '-mobile');
      });


      // If the search form input label is hidden, show it as a placeholder.
      $('#region--header-search label.visually-hidden').each(function() {
        $(this).next('input').attr('placeholder', $(this).html());
      });


      // Replace the search submit input with a button containing a magnifying glass icon.
      $('#region--header-search input[type="submit"]').each(function() {
        $(this).after('<button type="submit"><span class="visually-hidden">' + $(this).attr('value') + '</span><svg style="max-width:1em; max-height: 1em;" aria-hidden="true"><use xlink:href="#symbol-search" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>');
        $(this).remove();
      });


      // Hide the drupal admin toolbar drawer when resizing to mobile, and show it when resizing to desktop.
      $(window).once('window-resize-toolbar').resize(Drupal.debounce(function () {
        if ($(window).width() < 1070) {
          $('#toolbar-item-administration.is-active').click();
        } else {
          $('#toolbar-item-administration:not(.is-active)').click();
        }
      }, 50));

      // Don't include admin toolbar links or inputs in the tab index.
      $('a, input', '#toolbar-administration').attr('tabindex', '-1');
      // The collapse button is added after page load, so we need to remove it from the index when focused.
      $('#toolbar-administration').on('focus', 'button:not([tabindex="-1"])', function() {
        $(this).attr('tabindex', '-1');
        $('#site-header a').first().focus();
      });

    }
  };
})(jQuery, Drupal);
