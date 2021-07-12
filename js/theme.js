(function ($, Drupal) {
  Drupal.behaviors.themename = {
    attach: function (context, settings) {

      //
      // Add a toggle buttons to open and close any submenus on mobile and with keyboard navigation.
      //
      $('#region--header-menu nav > ul > li > ul, #region--mobile-menus nav > ul > li > ul').once('header-menu-toggle').each(function() {
        var id = Math.random().toString(36).substring(2, 15);
        $(this).attr('id', 'menu-item-' + id)
        $(this).before('<button class="header-menu-toggle" aria-controls="menu-item-' + id + '" aria-expanded="false"><span class="visually-hidden">Toggle submenu</span><svg style="max-width:1em; max-height: 1em;" aria-hidden="true"><use xlink:href="#symbol-open" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>');
      });


      //
      // Bind a click function to menu toggles, and any other button that controls the visibility of another element.
      //
      $('button[aria-controls][aria-expanded]').once('aria-expanded-toggle').each(function() {
        // Get the element that the buttons controls.
        var element = '#' + $(this).attr('aria-controls');
        // Toggle the expanded state and element visibility on click.
        $(this).on('click', function(event) {
          if ($(this).attr('aria-expanded') == 'false') {
            $(this).attr('aria-expanded', 'true');
            $(element).show();
          } else {
            $(this).attr('aria-expanded', 'false');
            $(element).hide();
          }
        });
        // If aria-expanded is set to false to start, hide the element.
        if ($(this).attr('aria-expanded') == 'false') {
          $(element).hide();
        }
      });


      //
      // Display the mobile menus and search in a drawer when they are open.
      //
      $('.site-header__toggle').once('site-header-toggle').on('click', function(event) {
        // On toggle, open the mobile drawers if any element is expanded.
        if ($('.site-header__toggle[aria-expanded="true"]').length ) {
          $('body').addClass('mobile-drawer-open');
        } else {
          $('body').removeClass('mobile-drawer-open');
        }
      });
      // Close the mobile header panes if the window is resized.
      $(window).once('window-resize-mobile').resize(function () {
        $('.site-header__toggle[aria-expanded="true"]').click();
      });


      //
      // If the width of a menu dropdown is greater than the space available on a desktop screen, align it to the right of the parent.
      //
      $('#region--header-menu nav > ul > li').bind("mouseenter",  function(event) {
        if ($('ul', this).width() > $(window).width() - $(this).offset().left) {
          $(this).addClass('dropdown-align-right');
        } else {
          $(this).removeClass('dropdown-align-right');
        }
      });
      // Also check the dropdown width on keyboard focus.
      $('#region--header-menu nav > ul > li > a').focus(function () {
        $(this).parent().trigger('mouseenter');
      })


      //
      // Don't show the submenu toggles on desktop if a user clicks on a menu link.
      //
      $('#region--header-menu nav a').mousedown(function () {
        $(this).parents('nav').attr('data-mouse-click', 'true');
      });
      $('#region--header-menu nav a').mouseleave(function () {
        $(this).parents('nav').removeAttr('data-mouse-click');
        $(this).blur();
      });


      //
      // If the search form input label is hidden, show it as a placeholder.
      //
      $('#region--header-search label.visually-hidden').each(function() {
        $(this).next('input').attr('placeholder', $(this).html());
      });


      //
      // Replace the search submit input with a button containing a magnifying glass icon.
      //
      $('#region--header-search input[type="submit"]').each(function() {
        $(this).after('<button type="submit"><span class="visually-hidden">' + $(this).attr('value') + '</span><svg style="max-width:1em; max-height: 1em;" aria-hidden="true"><use xlink:href="#symbol-search" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>');
        $(this).remove();
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


      //
      // Don't include admin toolbar links or inputs in the tab index.
      //
      $('a, input', '#toolbar-administration').attr('tabindex', '-1');
      // The collapse button is added after page load, so we need to remove it from the index when focused.
      $('#toolbar-administration').on('focus', 'button:not([tabindex="-1"])', function() {
        $(this).attr('tabindex', '-1');
        $('#site-header a').first().focus();
      });

    }
  };
})(jQuery, Drupal);
