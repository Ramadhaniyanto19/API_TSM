const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors()); // Mengizinkan akses CORS

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apitsm",
});

// Koneksi ke database MySQL
db.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke MySQL:", err);
    return;
  }
  console.log("Terhubung ke MySQL");
});

// Endpoint untuk mendapatkan data toko
app.get("/api/stores", (req, res) => {
  const query = "SELECT * FROM stores";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Kesalahan SQL:", err);
      res.status(500).json({ error: "Terjadi kesalahan dalam server" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint untuk mendapatkan data visitors
app.get("/api/visitor_data", (req, res) => {
  const query = "SELECT * FROM visitor_data";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Kesalahan SQL:", err);
      res.status(500).json({ error: "Terjadi kesalahan dalam server" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint untuk melakukan pencarian berdasarkan nama (store)
app.get("/api/stores/search", (req, res) => {
  const searchText = req.query.searchText; // Mengambil parameter pencarian dari query string

  // Kode SQL untuk melakukan pencarian data berdasarkan nama
  const query = "SELECT * FROM stores WHERE name LIKE ?";

  db.query(query, [`%${searchText}%`], (err, results) => {
    if (err) {
      console.error("Kesalahan SQL:", err);
      res.status(500).json({ error: "Terjadi kesalahan dalam server" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint untuk melakukan pencarian berdasarkan nama (visitor)
app.get("/api/visitor_data/search", (req, res) => {
  const searchText = req.query.searchText; // Mengambil parameter pencarian dari query string

  // Kode SQL untuk melakukan pencarian data berdasarkan nama
  const query = "SELECT * FROM visitor_data WHERE name LIKE ?";

  db.query(query, [`%${searchText}%`], (err, results) => {
    if (err) {
      console.error("Kesalahan SQL:", err);
      res.status(500).json({ error: "Terjadi kesalahan dalam server" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
