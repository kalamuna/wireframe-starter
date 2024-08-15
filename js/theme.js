(function ($, Drupal) {
  Drupal.behaviors.themename = {
    attach: function (context, settings) {

      //
      // Add a toggle buttons to open and close any submenus on mobile and with keyboard navigation.
      //
      $(once('mobile-menus-toggle', '#region--header-menu nav > ul > li > ul, #region--mobile-menus nav > ul > li > ul')).each(function() {
        var id = Math.random().toString(36).substring(2, 15);
        $(this).attr('id', 'menu-item-' + id)
        $(this).before('<button class="menu-item-toggle" aria-controls="menu-item-' + id + '" aria-expanded="false"><span class="visually-hidden">Toggle submenu</span><svg style="max-width:1em; max-height: 1em;" aria-hidden="true"><use xlink:href="#symbol-open" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>');
      });


      //
      // General click actions for any buttons that control the visibility of another element like menus or accordions.
      //
      $(once('aria-expanded-toggle', 'button[aria-controls][aria-expanded]')).each(function() {
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
      // Listener for header toggles to show/hide the mobile drawer and close when needed.
      //
      $(once('region-toggle', '#site-header .region-toggle[data-mobile-drawer="true"]')).on('click', function(event) {
        // If op the mobile search or menus, make sure the other is closed.
        if ($(this).attr('aria-expanded') == 'true') {
          $(this).siblings('[data-mobile-drawer="true"][aria-expanded="true"]').click();
        }
        // On toggle, open the mobile drawers if any element is expanded.
        if ($('#site-header .region-toggle[data-mobile-drawer="true"][aria-expanded="true"]').length ) {
          $('body').addClass('mobile-drawer-open');
        } else {
          $('body').removeClass('mobile-drawer-open');
        }
      }).attr('style', ''); // Remove the display: none added in the mobile regions when the click function has been successfully loaded.


      //
      // Close the mobile header panes if the window is resized (more than just an incidental amount from scroll bar visibility or rendering jitter).
      //
      var mobileDrawerWidth;
      $(once('window-resize-mobile', window)).resize(function () {
        if ($('body').hasClass('mobile-drawer-open')) {
          // If the drawer has just been opened, save the original mobile drawer width.
          if (!mobileDrawerWidth) { mobileDrawerWidth = $(window).width(); }
          // If the window size has gotten more than a little bigger or smaller, close the mobile drawer.
          if ($(window).width() > (mobileDrawerWidth + 20) || $(window).width() < (mobileDrawerWidth - 20)) {
            $('#site-header .region-toggle[data-mobile-drawer="true"][aria-expanded="true"]').click();
            mobileDrawerWidth = false;
          }
        }
      });


      //
      // Store the status of the alert toggle in a cookie, and start closed if the user has already dismissed it.
      //
      if ($('#region--alert').length) {
        var alertHash = $('#region--alert').html().split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        $('#region-toggle--alert').click(function() {
          // If we are closing the alert, set a cookie so it stays closed on subsequent pages.
          document.cookie = "alertHash=" + ($(this).attr('aria-expanded') == 'false' ? alertHash : '');
        });
        // If this alert has previously been hidden, start it hidden again.
        if (document.cookie.includes("alertHash=" + alertHash)) {
          $('#region-toggle--alert').click();
        }
      }

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
      // Wrap tables in divs to make them overflow on mobile. Move sticky table head along with the table.
      //
      $(once('table-scroll', "table")).wrap("<div class='table-scroll'></div>");
      $(once('table-scroll-sticky-header', '.table-scroll')).scroll(function() {
        $('.sticky-header', this).css('left', (-$(this).scrollLeft() + $(this).position().left) + 'px');
      });


      //
      // Hide the drupal admin toolbar drawer when resizing to mobile, and show it when resizing to desktop.
      //
      $(once('window-resize-toolbar', window)).resize(Drupal.debounce(function () {
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


      //
      // Add a preview of alt text for editors.
      //
      $(once('alt-text', '.contextual-region img')).each(function() {
        $(this).after('<div class="alt-preview">Alt text: ' + $(this).attr('alt') + "</div>");
      });
    }
  };
})(jQuery, Drupal);
