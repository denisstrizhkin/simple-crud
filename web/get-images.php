<?php
require_once(__DIR__ . '/api-request.php');

function render(array $products) {
  echo '<h1>Product Images</h1>';
  echo '<p>This pages lists images for all products.</p>';
  echo '<ul>';
  foreach ($products as $product) {
    echo '<li>';
    echo '<img src="' . $product['image'] . '" />';
    echo '<h3>' . $product['name'] . '</h3>';
    echo '</li>';
  }
  echo '</ul>';
}

$products = get_json('/products')['data'];
render($products);
