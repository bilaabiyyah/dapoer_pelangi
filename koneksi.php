<?php
$servername = "34.101.179.252";
$username = "root";
$password = "umkmdapoerpelangi";
$dbname = "dapoer_pelangi";

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

return $conn;