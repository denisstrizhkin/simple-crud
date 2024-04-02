<?php
require_once(__DIR__ . '/api-request.php');

function render(array $products) {
  $message = 'This page shows products with price';
  $price_from = null;
  $price_to = null;

  if (isset($_GET['price_from'])) {
    $price_from = $_GET['price_from'];
    $message .= ' from ' . $price_from;
  }

  if (isset($_GET['price_to'])) {
    $price_to = $_GET['price_to'];
    $message .= ' up to ' . $price_to;
  }

  echo '<h1>Product Price Query</h1>';
  echo '<p>This page shows products with price</p>';
  echo '<p>' . $message . '</p>';
  echo '<ul>';
  foreach ($products as $product) {
    if ($price_from > $product['price']) {
      continue;
    }
    if ($price_to < $product['price']) {
      continue;
    }
    echo '<li>';
    echo '<p><b>' . $product['name'] . ': </b>' . $product['price'] . '</p>';
    echo '</li>';
  }
  echo '</ul>';
}

$products = get_json('/products')['data'];
render($products);
