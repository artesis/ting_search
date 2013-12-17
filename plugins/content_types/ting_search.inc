<?php

$plugin = array(
  'title' => t('Ting search - search results text'),
  'description' => t('Show a string with "Showing x - y of z results"'),
  'single' => TRUE,
  'content_types' => array('ting_search'),
  'render callback' => 'ting_search_ting_search_content_type_render',
  'admin info' => 'ting_search_ting_search_admin_info',
  'edit form' => 'ting_search_ting_search_content_type_edit_form',
  'category' => t('Ting'),
  'render last' => TRUE,
  'defaults' => array(
    'show_pager' => FALSE,
  ),
);

/**
 * Render the ting search results amount block.
 */
function ting_search_ting_search_content_type_render($subtype, $conf, $panel_args, $context) {
  global $pager_page_array, $pager_total;
  $block = new stdClass();

  if ($pager_total[0]) {
    $results = drupal_static('ting_search_results');
    $from = ($pager_page_array[0] < 1 ? 0 : $pager_page_array[0]) * $results->getPerPage(
      ) + 1;
    $to = $from + (count($results) - 1);
    $total = $results->getTotal();

    $markup = format_plural(
      $total,
      'Show %from-%to of 1 result',
      'Show %from-%to of <em class="placeholder">@count</em> results',
      array(
        '%from' => $from,
        '%to' => $to,
      )
    );

    $render_array = array();
    $render_array['content'] = array(
      '#type' => 'container',
      '#attributes' => array(
        'class' => array('ting-search-amount-block')
      ),
    );
    $render_array['content']['text'] = array(
      '#type' => 'markup',
      '#markup' => $markup,
    );

    // Add previous/next pages.
    if (!empty($conf['show_pager'])) {
      $render_array['content'] = array_merge(
        $render_array['content'],
        _ting_search_ting_search_pages()
      );
    }

    $block->title = $conf['override_title'] ? $conf['override_title_text'] : '';
    $block->content = $render_array;
  }

  return $block;
}

/**
 * Enable admin settings page
 */
function ting_search_ting_search_content_type_edit_form($form, &$form_state) {
  $conf = $form_state['conf'];

  $form['show_pager'] = array(
    '#title' => t('Show previous/next page links'),
    '#type' => 'checkbox',
    '#default_value' => $conf['show_pager'],
  );

  return $form;
}

/**
 * The submit form stores the data in $conf.
 */
function ting_search_ting_search_content_type_edit_form_submit($form, &$form_state) {
  foreach (array_keys($form_state['plugin']['defaults']) as $key) {
    if (isset($form_state['values'][$key])) {
      $form_state['conf'][$key] = $form_state['values'][$key];
    }
  }
}

/**
 * 'admin info' callback for panel pane.
 */
function ting_search_ting_search_admin_info($subtype, $conf, $contexts) {
  $block = new stdClass;
  $block->title = $conf['override_title'] ? $conf['override_title_text'] : '';
  $block->content = t(
    'Showing previous/next page links: <em>@show_pages</em>.',
    array(
      '@show_pages' => $conf['show_pager'] ? t('Yes') : t('No'),
    )
  );

  return $block;
}

/**
 * Create markup for page links.
 */
function _ting_search_ting_search_pages() {
  global $pager_page_array, $pager_total;
  $render_array = array();

  $page = $pager_page_array[0];
  $last = $pager_total[0];

  // See theme_pager_link().
  $query = pager_get_query_parameters();
  $attributes = array();
  if ($page > 0) {
    // Do not add "page=0".
    if ($page -1 > 0) {
      $query['page'] = $page - 1;
    }
  }
  else {
    $attributes['class'][] = 'disabled';
  }
  $attributes['href'] = url($_GET['q'], array('query' => $query));

  $render_array['prev'] = array(
    '#type' => 'markup',
    '#markup' => '<a ' . drupal_attributes($attributes) . '><span class="i-wrap"><i class="icon-left-open"></i></span></a>',
  );

  $attributes = array();
  if ($page < $last - 1) {
    $query['page'] = $page + 1;
  }
  else {
    $attributes['class'][] = 'disabled';
  }
  $attributes['href'] = url($_GET['q'], array('query' => $query));

  $render_array['next'] = array(
    '#type' => 'markup',
    '#markup' => '<a ' . drupal_attributes($attributes) . '><span class="i-wrap"><i class="icon-right-open"></i></span></a>',
  );

  return $render_array;
}
