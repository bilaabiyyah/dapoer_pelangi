<?php
$servername = "34.101.179.252";
$username = "root";
$password = "umkmdapoerpelangi";
$dbname = "dapoer_pelangi";

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$nama = $data['nama'];
$email = $data['email'];
$no_hp = $data['no_hp'];
$tgl_pesan = $data['tgl_pesan'];
$wkt_pesan = $data['wkt_pesan'];
$alamat_pesan = $data['alamat_pesan'];
$kode = $data['kode'];
$cart = $data['cart']; // Perubahan disini

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Hitung total_harga dan total_item
$total_harga = 0;
$total_item = 0;
foreach($cart as $item) {
    $qty = (int)$item['quantity'];
    $harga_pcs = (int)$item['price'];
    $total_harga += $qty * $harga_pcs;
    $total_item += $qty;
}

// Prepared statement untuk memasukkan data ke dalam table total_pesanan
$stmt3 = $conn->prepare("INSERT INTO total_pesanan (code, total_harga, total_item, ongkir) VALUES (?, ?, ?, 0)");
$stmt3->bind_param("sii", $kode, $total_harga, $total_item);
if (!$stmt3->execute()) {
    echo "Error: " . $stmt3->error . "<br>";
    exit();
}

// Prepared statement untuk memasukkan data ke dalam table tb_pesanan
$stmt1 = $conn->prepare("INSERT INTO tb_pesanan (nama, email, no_hp, tgl_pesan, wkt_pesan, alamat_pesan) VALUES (?, ?, ?, ?, ?, ?)");
$stmt1->bind_param("ssssss", $nama, $email, $no_hp, $tgl_pesan, $wkt_pesan, $alamat_pesan);
if ($stmt1->execute()) {
    // Mengambil id_pelanggan yang baru dibuat
    $id_pelanggan = $stmt1->insert_id;

    // Prepared statement untuk memasukkan data ke dalam table pesanan
    foreach($cart as $item) {
        $nama_product = $item['title'];
        $qty = (int)$item['quantity'];
        $harga_pcs = (int)$item['price'];
        $stmt2 = $conn->prepare("INSERT INTO pesanan (nama_product, qty, harga_pcs, code, id_pelanggan) VALUES (?, ?, ?, ?, ?)");
        $stmt2->bind_param("siisi", $nama_product, $qty, $harga_pcs, $kode, $id_pelanggan);
        if (!$stmt2->execute()) {
            echo "Error: " . $stmt2->error . "<br>";
            exit();
        }
    }
    echo "New records created successfully";
    
} else {
    echo "Error: " . $stmt1->error . "<br>";
}

// Menutup koneksi
$conn->close();

?>

