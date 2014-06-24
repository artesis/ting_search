(function($) {
  $(document).ready(function() {

    // Handle async material status update.
    $(document).bind('materials_status', function(e, data) {
      if (typeof(data.error) != "undefined") {
        // Authentication or another error.
        return;
      }

      $.each(data, function(i, e) {
        var $context = $('#availability-' + e.local_id.toLowerCase()).closest('.search-result');

        // Reservation.
        var $reservation_controls = $('.btn.reservation', $context);
        if (!e.show_reservation_button) {
          $reservation_controls.remove();
        }
        else {
          $reservation_controls.removeClass('ui-hidden');
        }

        // Holdings.
        var $holdings_controls = $('.btn.find-it-here, .group_holdings', $context);
        var $sticky_menu_item = $('.goto-' + $($holdings_controls[1]).attr('id'), $context);

        if (e.holdings.length === 0) {
          $holdings_controls.remove();
          $sticky_menu_item.remove();
        }
        else {
          $holdings_controls.removeAttr('disabled').removeClass('ui-hidden');
        }
      });
    });

  });

  Drupal.behaviors.permalink = {
    attach: function(context, settings) {
      $('.btn.permalink', context).click(function(e){;
        var self = $(this);
        self.addClass('active');

        var qr_img = '<img\
          class="d-qr-code"\
          src="http://api.qrserver.com/v1/create-qr-code/?data=' + self.data('creators') + encodeURIComponent('\n') + self.data('title') + encodeURIComponent('\n\n') + encodeURIComponent(self.attr('href')) + '&size=100x100"\
          alt="' + Drupal.t('QR code') + '"\
          title="' + Drupal.t('QR code with link to item') + '" >\
        ';

        var content = $('<div>\
          <input onclick="this.focus();this.select();" type="text" value="' + self.attr('href') + '">\
          <a class="btn btn-artesis-turquoise d-follow" href="' + self.attr('href') + '">' + Drupal.t('Follow') + '</a>'
          + qr_img +
          '</div>'
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
