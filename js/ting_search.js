(function($) {
  $(document).ready(function() {

    // Handle async material status update.
    $(document).bind('materials_status', function(e, data) {
      $.each(data, function(i, e) {
        var $context = $('#availability-' + e.local_id).closest('.search-result');

        // Reservation.
        var $reservation_controls = $('.btn.reservation', $context);
        if (!e.show_reservation_button) {
          $reservation_controls.remove();
        }

        // Holdings.
        var $holdings_controls = $('.btn.find-it-here, .group_holdings', $context);
        var $sticky_menu_item = $('.goto-' + $($holdings_controls[1]).attr('id'), $context);

        if (e.holdings_available.length == 0) {
          $holdings_controls.remove();
          $sticky_menu_item.remove();
        }
      });
    });

  });

  Drupal.behaviors.permalink = {
    attach: function(context, settings) {
      $('.btn.permalink', context).click(function(e){;
        var self = $(this);
        self.addClass('active');
        var content = $('<div>\
          <input onclick="this.focus();this.select();" type="text" value="' + self.attr('href') + '">\
          <a class="btn btn-artesis-turquoise d-follow" href="' + self.attr('href') + '">' + Drupal.t('Follow') + '</a>\
          </div>'
        );
        var dialog = content.dialog({
          'autoOpen': false,
          'modal': true,
          'title': Drupal.t('Permalink'),
          'beforeClose': function() {
            self.removeClass('active');
          }
        });

        dialog.dialog('open');
        $('textarea', content).select();

        return false;
      });
    }
  };

})(jQuery);
