(function($) {
  $(document).ready(function() {

    // Handle async material status update.
    $(document).bind('materials_status', function(e, data) {
      $.each(data, function(i, e) {
        // Reservation.
        var $reservation_controls = $('.btn.reservation'); // .reservation !!
        if (e.show_reservation_button) {
          $reservation_controls.show();
        }
        else {
          $reservation_controls.remove();
        }

        // Holdings.
        var $holdings_controls = $('.btn.find-it-here, .group_holdings');
        var $sticky_menu_item = $('.goto-' + $($holdings_controls[1]).attr('id'));

        if (e.holdings_available.length > 0) {
          $holdings_controls.show();
          $sticky_menu_item.show();
        }
        else {
          $holdings_controls.remove();
          $sticky_menu_item.remove();
        }
      });
    });

  });
})(jQuery);
