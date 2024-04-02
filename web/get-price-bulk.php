<?php
require_once(__DIR__ . '/api-request.php');

function render(array $products) {
  echo '<h1>Product Bulk Prices</h1>';
  echo '<p>This page lists bulk prices for products.</p>';
  echo '<ul>';
  foreach ($products as $product) {
    echo '<li>';
    echo '<p><b>' . $product['name'] . ': </b>'
      . $product['quantity'] * $product['price'] . ' = '
      . $product['quantity'] . ' * ' . $product['price']
      . '</p>';
    echo '</li>';
  }
  echo '</ul>';
}

$products = get_json('/products')['data'];
render($products);
