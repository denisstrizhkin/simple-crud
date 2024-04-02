<?php

function get_json(string $url): mixed {
    $url = $_ENV['API_URL'] . $url;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $result=curl_exec($ch);
    curl_close($ch);

    return json_decode($result, true);
}
