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
})(jQuery);
