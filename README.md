# 🎓 StudentHub – Student Management System

Projek individu **CDIM262** (Advanced Web Design and Content Management).

**Live website:** https://YOUR-USERNAME.github.io/studenthub/
**GitHub repository:** https://github.com/YOUR-USERNAME/studenthub

## 📖 Project Description

StudentHub ialah prototaip aplikasi web untuk menguruskan pelajar dan kursus. Pengguna log masuk, melihat dashboard yang ada statistik dan carta, serta melayari jadual pelajar dan kursus yang boleh dicari. Ia menggunakan tema ungu dan putih, dan berfungsi pada desktop serta mobile.

Projek ini hanya front-end. Tiada backend atau database. Semua data ialah data contoh dalam `script.js`.

## ✨ Features

- Login page dengan kelayakan simulasi dan mesej ralat (Bootstrap alert)
- Register page dengan validasi (ruang kosong, kata laluan pendek, kata laluan tidak sama, username sudah wujud)
- Semakan sesi: halaman dilindungi akan kembali ke login jika belum log masuk
- Butang logout
- Navbar responsif yang konsisten, dengan menu hamburger pada mobile
- Dashboard dengan 4 kad statistik dan 2 carta Chart.js
- Halaman Students: 16 pelajar, carian langsung, badge status berwarna
- Halaman Courses: 8 kursus, carian langsung, bilangan enrolled dan progress bar
- Reka bentuk responsif (desktop, tablet, mobile)
- Struktur kandungan: setiap halaman ada title, meta description dan seksyen `nav`, `main`, `header`, `section`, `footer`.

## 🔐 How to Test the Login

1. Buka pautan live website di atas.
2. Masukkan akaun demo:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Klik **Login** untuk masuk ke dashboard.

Anda juga boleh cuba kata laluan yang salah untuk melihat mesej ralat, atau daftar akaun sendiri di halaman Register.

Nota: akaun dari halaman Register disimpan dalam browser anda sahaja (`localStorage`). Ini hanya simulasi dan tidak selamat.

## 🛠️ Frameworks and Libraries Used

| Technology | Purpose |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Tema ungu dan putih (`style.css`) |
| JavaScript (ES6) | Login, sesi, carian dan carta (`script.js`) |
| [Bootstrap 5.3.3](https://getbootstrap.com/) | Grid, navbar, kad, jadual, borang, butang, alert, badge |
| [Chart.js 4.4.3](https://www.chartjs.org/) | Carta pada dashboard |

## 👤 Author

intan nadhirah – CDIM262 Individual Project