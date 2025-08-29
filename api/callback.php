<?php
require __DIR__ . '/../vendor/autoload.php';
use GuzzleHttp\Client;
require "config.php";

// $state = $_GET['state'] ?? null;
// if ($state !== ($_SESSION['spotify_state'] ?? null)) {
//     exit("Error: invalid request.");
// }

$client = new Client();

if (isset($_GET['code'])) {
    $code = $_GET['code'];

    try {
        $res = $client->post($spotify_token_endpoint, [
            "headers" => [
                "Content-Type" => "application/x-www-form-urlencoded",
                "Authorization" => "Basic " . base64_encode("$spotify_client:$spotify_secret")
            ],
            "form_params" => [
                'grant_type' => 'authorization_code',
                'code' => $code,
                'redirect_uri' => $redirect_uri,
            ]
        ]);

        $data = json_decode($res->getBody(), true);

        if (isset($data['access_token'])) {
            $expiresAt = time() + $data['expires_in'];

            echo json_encode([
                "status" => "success",
                "accessToken" => $data['access_token'],
                "expiresAt" => $expiresAt * 1000
            ]);
        } else {
            echo json_encode([
                "error" => "Error: No access token returned",
            ]);
        }

    } catch (\Exception $e) {
        exit("Token exchange failed: " . $e->getMessage());
    }

} elseif (isset($_GET['error'])) {
    echo json_encode([
        "error" => "Error: " . htmlspecialchars($_GET['error']) . " — Login failed",
    ]);
} else {
    echo json_encode([
        "error" => "Unknown error login failed",
    ]);
}
