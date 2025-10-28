# Taba: Virtual Lab Tata Bahasa Indonesia

Selamat datang di website Taba, sebuah media pembelajaran interaktif berbasis web yang dirancang sebagai *virtual lab*. Web ini fokus pada materi Tata Tulis Karya Ilmiah (TTKI), khususnya **Ejaan**, **Tata Kata**, dan **Tata Kalimat** dalam Bahasa Indonesia. 

Aplikasi ini sepenuhnya berjalan di sisi *browser* (*frontend*) dan memanfaatkan Supabase sebagai *Backend as a Service* (BaaS) untuk autentikasi pengguna dan penyimpanan data.

**Tautan Web:** [https://pawm-ttki-virtual-lab.vercel.app/](https://pawm-ttki-virtual-lab.vercel.app/) 

---

## 🚀 Fitur Utama

* **Autentikasi Pengguna:**
    * Login dan Register menggunakan Email & Password.
    * Login dan Register menggunakan akun Google (OAuth).
    * Manajemen sesi pengguna via Supabase Auth.
* **Materi Pembelajaran:**
    * Modul terstruktur untuk Ejaan, Tata Kata, dan Tata Kalimat.
    * Navigasi sub-materi yang mudah di dalam setiap modul.
    * Konten disajikan dengan definisi, contoh, tabel, dan poin-poin penting.
* **Kuis Interaktif:**
    * Kuis *Multiple Choice* (Pilihan Ganda) untuk materi Ejaan.
    * Kuis Benar/Salah untuk materi Tata Kata.
    * Kuis *Drag and Drop* (Seret dan Lepas) untuk materi Tata Kalimat (Klasifikasi Kalimat Efektif/Tidak Efektif).
* **Penyimpanan State Pengguna:**
    * Hasil kuis (skor dan total soal) disimpan ke *database* Supabase per pengguna.
    * Menampilkan halaman rekapitulasi hasil kuis.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend:**
    * React JS
    * Vite (Build Tool)
    * React Router DOM (Routing)
    * CSS (Styling Kustom)
    * Lucide React (Ikon)
* **Backend (BaaS):**
    * Supabase
        * Authentication (Email/Password, Google OAuth)
        * Database (PostgreSQL) untuk menyimpan hasil kuis
* **Deployment:**
    * Vercel (Frontend Hosting)

---
## 👥 Kontributor

* Gabriela Jennifer Sandy - 18223092
* Naila Selvira Budiana - 18223018
