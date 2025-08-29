<?php
require "config.php";
function generateRandomString($length = 16)
{
    return bin2hex(random_bytes($length / 2));
}

$state = generateRandomString(32);
$_SESSION['spotify_state'] = $state ?? uniqid(date('YmdHis'));  
$scope = "user-library-read playlist-modify-public playlist-modify-private";

// Build Spotify authorize URL
$params = [
    "response_type" => "code",
    "client_id"     => $spotify_client,
    "scope"         => $scope,
    "redirect_uri"  => $redirect_uri,
    "state"         => $state
];

$url = $spotify_login_endpoint . http_build_query($params);

echo json_encode(["url" => $url]);
