<?php 
session_start();
$env = parse_ini_file(__DIR__ . '/../.env');

$spotify_client =  $env['SPOTIFY_CLIENT_ID'];
$spotify_secret = $env['SPOTIFY_CLIENT_SECRET'];
$redirect_uri = strtolower("http://127.0.0.1:5173");
$spotify_login_endpoint = "https://accounts.spotify.com/authorize?";
$spotify_token_endpoint = "https://accounts.spotify.com/api/token?";

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

?>