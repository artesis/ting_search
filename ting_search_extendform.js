(function($) {

  $(document).ready(function() {
    Drupal.setSelectedLabel();
    Drupal.extendedQueryDisplay();
    Drupal.collapseExtendedSearch();
    Drupal.initSearchBlock();
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

  Drupal.behaviors.clearSearchInput = {
    attach:function(context, settings) {
      var inputs = $('#block-search-form input[type=text]', context);
      var btn = $('.btn.clear', context);

      inputs.bind('change click keyup', function () {
        btn.removeAttr('disabled');
        $(this).focus();
      });

      var val = 0;
      inputs.each(function(key, input){
        val += input.getAttribute('value').length;
      });
      val ? btn.removeAttr('disabled') : btn.attr('disabled', true);

      btn.click(function() {
        inputs.val('');
        $(this).attr('disabled', true);
      });
    }
  };

  Drupal.behaviors.readyExtendedForm = {
    attach: function(context, settings) {
      var btn = $('.btn.advanced', context);
      var extendsearch = $('.extendsearch-advanced', context);

      btn.click(function(){
        extendsearch.find('.fieldset-title').click();
        $(this).toggleClass('active');
      });

      // Make the button active on expanded search.
      if (!extendsearch.hasClass('collapsed')) {
        btn.addClass('active');
      }
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
      }
    });

    if (parts.length > 0) {
      $('#search-query-string').text(parts.join(Drupal.t(" AND ")));
    }
  };

  Drupal.collapseExtendedSearch = function() {
    var inside_form = false;
    $('#search-block-form').live('mouseenter', function() {
      inside_form = true;
    }).live('mouseleave', function() {
      inside_form = false;
    });

    $(document).click(function(event) {
      if (!inside_form) {
        if (!$('#edit-advanced-search').hasClass('collapsed')) {
          $(".extendsearch-advanced .fieldset-title").click();
          $('.btn.advanced').toggleClass('active');
        }
      }
    });
  };

  Drupal.initSearchBlock = function() {
    var form = $('#search-block-form');

    // Toggle class for focused fields.
    form.find('.extendsearch-advanced input[type=text]').focus(function() {
      $(this).parents('.form-item:first').addClass('active');
    }).blur(function() {
      $(this).parents('.form-item:first').removeClass('active');
    });

    // Opens advanced search if search fields are not empty.
    form.find('.form-item-search-block-form input.form-text').focus(function() {
      $('.extendsearch-advanced.enabled .form-item').each(function() {
        if ($(this).find('input').val().length > 0) {
          $('.extendsearch-advanced .fieldset-title').click();
          $('.btn.advanced').addClass('active');
          return false;
        }
      });
    });

    form.submit(function() {
      $('ul.ui-autocomplete').hide();
    });
  };

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

