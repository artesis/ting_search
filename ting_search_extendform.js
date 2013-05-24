(function($) {

  $(document).ready(function() {
    Drupal.setSelectedLabel();
    Drupal.extendedQueryDisplay();
  });

  $.TingExtendedForm = {};
  $.TingExtendedForm.showExtended = false;


  Drupal.behaviors.clearExtendForm = {
      attach:function(context, settings) {
          $('#extend-form-clear', context).click(function() {
              $("#edit-creator").val('');
              $("#edit-title").val('');
              $("#edit-subject").val('');
              $("#edit-search-block-form--2").val('');
              return false;
          });
      }
  };

  Drupal.behaviors.readyExtendedForm = {
    // If there's no 'Show advanced search' link, set display: block.
    attach: function(context, settings) {
      $('#extend-form', context).ready(function() {
        if (!$('#extend-form-show')) {
          $("#search-extend-form").addClass('extend-form-show');
        }
      });
    }
  };

  Drupal.behaviors.clearExtendForm = {
    attach:function(context, settings) {
      $('#extend-form-clear', context).click(function() {
        $("#edit-creator").val('');
        $("#edit-title").val('');
        $("#edit-subject").val('');
        $("#edit-search-block-form--2").val('');
        return false;
      });
    }
  };

  Drupal.behaviors.toggleSort = {
    attach: function(context, settings) {
      $('#edit-sort').change(function() {
        $('#ting-search-sort-form').trigger("submit");
      });
    }
  };

  Drupal.setSelectedLabel = function() {
    $('.form-item-size').find('label').removeClass('labelSelected');
    $('input[name=size]').filter(':checked').parent().find('label').addClass('labelSelected');
  };

  Drupal.extendedQueryDisplay = function() {

    var queryText = $("input").filter("[name='search_block_form']").val()
    var parts = [];
    if (queryText) {
      parts.push(queryText);
    }
    var val;
    var label;
    $('#edit-advanced .form-item').each(function (i, elem) {
      if ((val = $('input', elem).val()) && (label = $('label', elem).text())) {
        parts.push(label + " = " + val);
        console.dir(parts);
      }
    });

    if (parts.length > 0) {
      $('#search-query-string').text(parts.join(Drupal.t(" AND ")));
    }
  };

  /**
   *
   */
  Drupal.behaviors.permalink = {
      attach: function(context, settings) {
        $('.btn.permalink').click(function(e){
          $(this).addClass('active');
          var content = $('<div><textarea>' + this.getAttribute('href') + '</textarea></div>');
          var self = $(this);
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

} (jQuery));

